import { motion } from 'framer-motion';
import { Magic } from 'magic-sdk';
import { useEffect, useMemo, useState } from 'react';

function resolveMagicPublishableKey() {
  if (typeof window !== 'undefined') {
    const w = window;
    if (typeof w.__MAGIC_PUBLISHABLE_KEY__ === 'string' && w.__MAGIC_PUBLISHABLE_KEY__.trim()) {
      return w.__MAGIC_PUBLISHABLE_KEY__.trim();
    }
  }
  try {
    const meta = typeof import.meta !== 'undefined' ? import.meta : undefined;
    const key = meta?.env?.VITE_MAGIC_PUBLISHABLE_KEY;
    if (typeof key === 'string' && key.trim()) return key.trim();
  } catch {
    // ignore
  }
  return 'YOUR_MAGIC_PUBLISHABLE_KEY';
}

function Button({ children, className = '', variant = 'default', disabled = false, onClick }) {
  const baseStyles = 'px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base';
  const variantStyles = variant === 'outline' 
    ? 'border-2 bg-transparent' 
    : 'shadow-md hover:shadow-lg';
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const magicKey = useMemo(() => resolveMagicPublishableKey(), []);

  const magic = useMemo(() => {
    if (typeof window === 'undefined') return null;
    if (!magicKey || magicKey === 'YOUR_MAGIC_PUBLISHABLE_KEY') return null;
    return new Magic(magicKey);
  }, [magicKey]);

  useEffect(() => {
    if (magicKey === 'YOUR_MAGIC_PUBLISHABLE_KEY') {
      setStatus('Configure Magic publishable key: set window.__MAGIC_PUBLISHABLE_KEY__ (or VITE_MAGIC_PUBLISHABLE_KEY).');
    } else {
      setStatus(null);
    }
  }, [magicKey]);

  const handleMagicLogin = async () => {
    if (!email.trim()) {
      setStatus('Please enter a valid email.');
      return;
    }
    if (!magic) {
      setStatus('Magic Link is not configured yet. Add your publishable key (window.__MAGIC_PUBLISHABLE_KEY__).');
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      await magic.auth.loginWithMagicLink({ email: email.trim() });
      setStatus('✅ Login link verified. Redirect to dashboard (wire routing next).');
    } catch (err) {
      console.error(err);
      setStatus('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200 w-full">
        <div className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="text-lg sm:text-2xl font-bold whitespace-nowrap">
            <span>Assistant</span>
            <span className="text-green-600"> Lady</span>
          </div>
          <div className="hidden md:flex items-center gap-6 sm:gap-8">
            <a href="#features" className="text-sm sm:text-base text-slate-600 hover:text-slate-900 transition">Features</a>
            <a href="#how-it-works" className="text-sm sm:text-base text-slate-600 hover:text-slate-900 transition">How It Works</a>
            <a href="#pricing" className="text-sm sm:text-base text-slate-600 hover:text-slate-900 transition">Pricing</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="w-full px-4 sm:px-6 py-12 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="inline-block bg-green-50 border border-green-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm font-semibold text-green-700">🎙️ 24/7 Lead Management</p>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 break-words">
                Meet <span className="text-green-600">Assistant Lady</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-3 sm:mb-4 leading-relaxed">
                <strong>Bottom line:</strong> Assistant Lady answers calls and qualifies leads 24/7—so you never miss an opportunity.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-slate-500 mb-6 sm:mb-10 leading-relaxed">
                <strong>Briefly:</strong> Real-time qualification, automatic appointment booking, and relentless follow-up—all handled professionally.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 w-full">
                <input
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:flex-1 rounded-full border border-slate-300 px-4 sm:px-6 py-2.5 sm:py-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
                <Button
                  onClick={handleMagicLogin}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white whitespace-nowrap w-full sm:w-auto"
                >
                  {loading ? 'Sending...' : 'Get Started'}
                </Button>
              </div>

              {status && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs sm:text-sm bg-white/70 border border-slate-200 rounded-full p-3 sm:p-4 inline-block max-w-md"
                >
                  {status}
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full flex items-center justify-center"
            >
              <div className="w-full max-w-sm sm:max-w-md h-96 sm:h-[28rem] flex items-center justify-center">
                <img
                  src="/assistant-lady.svg"
                  alt="Assistant Lady AI Assistant"
                  className="w-full h-full object-contain drop-shadow-2xl"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Showcase Section */}
      <section id="brand" className="w-full bg-gradient-to-r from-green-50 to-blue-50 py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-slate-900">Miss.Lead - The Original</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Powered by advanced AI technology and years of real estate expertise
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center w-full"
          >
            <div className="w-full max-w-2xl h-64 sm:h-80 md:h-96 overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/misslead.svg"
                alt="Miss.Lead Brand"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="w-full bg-white py-12 sm:py-16 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { metric: '24/7', label: 'Always Available' },
              { metric: '< 1min', label: 'Response Time' },
              { metric: '100%', label: 'Lead Capture' },
              { metric: '∞', label: 'Follow-up Cycles' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-1 sm:mb-2">{item.metric}</p>
                <p className="text-xs sm:text-sm md:text-base text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="w-full px-4 sm:px-6 py-12 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-16">What Assistant Lady Does For You</h2>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {[
              {
                title: '24/7 Call Handling',
                desc: 'Answers incoming calls at all times—no voicemail, no delays. Immediate professional response to every lead.',
                icon: '☎️',
              },
              {
                title: 'Real-time Qualification',
                desc: 'Asks the right questions to identify serious buyers, sellers, and investors. Saves hours of agent time.',
                icon: '🎙️',
              },
              {
                title: 'Automatic Appointment Booking',
                desc: 'Schedules viewings, valuations, and consultations directly into your calendar. Zero manual scheduling.',
                icon: '📅',
              },
              {
                title: 'Relentless Follow-up',
                desc: 'Polite, persistent follow-ups ensure no lead falls through cracks. Professional nurturing at scale.',
                icon: '🔄',
              },
              {
                title: 'Outbound Lead Generation',
                desc: 'Manages large call volumes for new listings, old enquiries, and nurture campaigns automatically.',
                icon: '📞',
              },
              {
                title: 'Scalable Cost Reduction',
                desc: 'Eliminate staffing overhead for lead handling. Scale your agency without hiring more staff.',
                icon: '💰',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="w-full bg-slate-900 text-white py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-16 text-center">The Assistant Lady Workflow</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              { step: 1, title: 'Detect', desc: 'Lead arrives (call, form, portal)' },
              { step: 2, title: 'Answer', desc: 'Assistant responds instantly' },
              { step: 3, title: 'Qualify', desc: 'Real-time intent & budget check' },
              { step: 4, title: 'Book', desc: 'Auto-schedule & notify agent' },
              { step: 5, title: 'Follow-up', desc: 'Persistent nurture until close' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 sm:p-6 h-full">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center font-bold mb-3 sm:mb-4 text-sm sm:text-base">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm">{item.desc}</p>
                </div>
                {i < 4 && (
                  <div className="hidden lg:block absolute top-1/4 -right-3 transform -translate-y-1/2">
                    <div className="text-green-600 text-2xl">→</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="w-full bg-white py-12 sm:py-24 border-t border-slate-200 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Simple. Performance-Based Pricing.</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              No hidden fees. No commitments. Scale up or down with your business.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              { tier: 'Starter', price: '$99', leads: 'Up to 50 leads/mo', featured: false },
              { tier: 'Professional', price: '$299', leads: 'Up to 500 leads/mo', featured: true },
              { tier: 'Enterprise', price: 'Custom', leads: 'Unlimited leads', featured: false },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-6 sm:p-8 ${
                  plan.featured
                    ? 'bg-green-600 text-white border-2 border-green-600 lg:transform lg:scale-105'
                    : 'bg-white border border-slate-200'
                }`}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{plan.tier}</h3>
                <div className="mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-slate-400">/mo</span>}
                </div>
                <p className={`mb-6 sm:mb-8 font-medium text-sm sm:text-base ${
                  plan.featured ? 'text-green-50' : 'text-slate-600'
                }`}>
                  {plan.leads}
                </p>
                <Button
                  className={`w-full text-sm sm:text-base ${
                    plan.featured
                      ? 'bg-white text-green-600 hover:bg-green-50'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-12 sm:py-24 px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Stop Leaving Money on the Table</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-10 opacity-95 max-w-2xl mx-auto">
            Every missed lead is a missed commission. Assistant Lady ensures you capture every opportunity, qualify faster, and close more deals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button className="bg-white text-green-600 hover:bg-slate-50 w-full sm:w-auto">
              Start Free Trial
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-green-700 w-full sm:w-auto">
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-slate-900 text-slate-300 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-6 sm:mb-8">
            <div>
              <p className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Assistant Lady</p>
              <p className="text-xs sm:text-sm">AI-powered lead management for real estate professionals.</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Product</p>
              <ul className="text-xs sm:text-sm space-y-2">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Support</p>
              <ul className="text-xs sm:text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Legal</p>
              <ul className="text-xs sm:text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 sm:pt-8 text-center text-xs sm:text-sm">
            <p>© 2026 Assistant Lady. All rights reserved. | Licensed domains: assistantlady.* | misslead.*</p>
          </div>
        </div>
      </footer>
    </div>
  );
}