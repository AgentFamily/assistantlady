import { motion } from 'framer-motion';
import { useState } from 'react';

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
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Stripe payment links
  const STRIPE_LINKS = {
    starter: 'https://buy.stripe.com/6oUdR87Yz8PL0t17md', // £20
    professional: 'https://buy.stripe.com/cNi9ASfr11nj7Vt9ul', // £99
    enterprise: 'https://buy.stripe.com/9B614mbaLaXT0t10XP', // £200
  };

  const CALENDLY_LINK = 'https://calendly.com/mkarimianzade';

  const handleStartTrial = (tier = 'professional') => {
    // Direct to Stripe payment for the selected tier
    window.location.href = STRIPE_LINKS[tier];
  };

  const handleBookDemo = () => {
    window.open(CALENDLY_LINK, '_blank');
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    // Simple email capture - no backend needed
    setEmailSubmitted(true);
    console.log('Email captured:', email);
    
    // After showing success message, redirect to Calendly
    setTimeout(() => {
      handleBookDemo();
    }, 2000);
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
              <div className="inline-block bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 shadow-sm">
                <p className="text-xs sm:text-sm font-semibold text-green-700">🎙️ AI-Powered Lead Assistant</p>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 break-words leading-tight">
                Never Miss a Lead. <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Ever Again.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 leading-relaxed">
                Your AI assistant answers every call, qualifies leads instantly, and books appointments to your calendar—24/7, without fail.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 w-full">
                <Button
                  onClick={() => handleStartTrial('professional')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white whitespace-nowrap w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  Start Free Trial
                </Button>
                <Button
                  onClick={handleBookDemo}
                  variant="outline"
                  className="border-2 border-slate-300 text-slate-700 hover:border-green-600 hover:text-green-600 hover:bg-green-50 whitespace-nowrap w-full sm:w-auto transition-all"
                >
                  Book Demo
                </Button>
              </div>

              {/* Proof Row */}
              <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>&lt;1 min response</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>24/7 coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Books to your calendar</span>
                </div>
              </div>
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

      {/* Key Metrics */}
      <section className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { metric: '24/7', label: 'Always Available' },
              { metric: '<1min', label: 'Response Time' },
              { metric: '100%', label: 'Lead Capture' },
              { metric: '∞', label: 'Follow-up Cycles' },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-1 sm:mb-2">{item.metric}</p>
                <p className="text-xs sm:text-sm md:text-base text-slate-300">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="w-full px-4 sm:px-6 py-12 sm:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">What Miss.Lead Does For You</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to capture, qualify, and convert every lead—automatically
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-green-500 hover:shadow-xl transition-all group"
              >
                <div className="text-4xl sm:text-5xl mb-4 transform group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-slate-900 group-hover:text-green-600 transition-colors">{feature.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="w-full bg-slate-900 text-white py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-16 text-center">The Miss.Lead Workflow</h2>
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
      <section id="pricing" className="w-full bg-gradient-to-b from-white to-slate-50 py-12 sm:py-24 border-t border-slate-200 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Simple, Transparent Pricing</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              No hidden fees. No long-term commitments. Scale as you grow.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              { 
                tier: 'Starter', 
                price: '£20', 
                leads: 'Up to 50 leads/mo',
                features: [
                  '24/7 call answering',
                  'Basic lead qualification',
                  'Email notifications',
                  'Calendar integration',
                  'Call recordings',
                  'Monthly reports'
                ],
                featured: false,
                stripeKey: 'starter'
              },
              { 
                tier: 'Professional', 
                price: '£99', 
                leads: 'Up to 500 leads/mo',
                features: [
                  'Everything in Starter',
                  'Advanced qualification',
                  'Custom scripts',
                  'Priority support',
                  'CRM integrations',
                  'Real-time analytics'
                ],
                featured: true,
                stripeKey: 'professional'
              },
              { 
                tier: 'Enterprise', 
                price: '£200', 
                leads: 'Unlimited leads',
                features: [
                  'Everything in Professional',
                  'Dedicated account manager',
                  'Custom AI training',
                  'White-label options',
                  'API access',
                  'SLA guarantees'
                ],
                featured: false,
                stripeKey: 'enterprise',
                isEnterprise: true
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-6 sm:p-8 relative ${
                  plan.featured
                    ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white border-2 border-green-500 lg:transform lg:scale-105 shadow-2xl'
                    : 'bg-white border-2 border-slate-200 shadow-lg hover:shadow-xl transition-shadow'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-slate-900 text-xs font-bold px-4 py-1 rounded-full shadow-md">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{plan.tier}</h3>
                <div className="mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                  <span className={plan.featured ? 'text-green-100' : 'text-slate-400'}>/mo</span>
                </div>
                <p className={`mb-6 sm:mb-8 font-medium text-sm sm:text-base ${
                  plan.featured ? 'text-green-50' : 'text-slate-600'
                }`}>
                  {plan.leads}
                </p>
                
                {/* Features List */}
                <ul className={`space-y-3 mb-8 text-sm ${plan.featured ? 'text-white' : 'text-slate-600'}`}>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className={`mt-0.5 ${plan.featured ? 'text-green-200' : 'text-green-600'}`}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => plan.isEnterprise ? handleBookDemo() : handleStartTrial(plan.stripeKey)}
                  className={`w-full text-sm sm:text-base font-semibold ${
                    plan.featured
                      ? 'bg-white text-green-600 hover:bg-green-50 shadow-lg'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-md'
                  }`}
                >
                  {plan.isEnterprise ? 'Talk to Sales' : 'Get Started'}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full bg-white py-12 sm:py-24 px-4 sm:px-6 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-base sm:text-lg text-slate-600">
              Everything you need to know about Miss.Lead
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: 'Does it sound human?',
                a: 'Yes! Miss.Lead uses advanced AI trained on thousands of real conversations. Leads won\'t know they\'re speaking with an AI—she sounds natural, professional, and personable.'
              },
              {
                q: 'What if it can\'t answer a question?',
                a: 'Miss.Lead is trained on your business specifics, but if she encounters something unexpected, she\'ll politely take a message and ensure you get notified immediately to follow up personally.'
              },
              {
                q: 'Can I customize the script?',
                a: 'Absolutely. You can tailor the conversation flow, talking points, qualification questions, and even Miss.Lead\'s personality to match your brand and sales process perfectly.'
              },
              {
                q: 'Can it transfer calls to me?',
                a: 'Yes! If a lead requests to speak with you directly, or if Miss.Lead identifies a high-priority opportunity, she can transfer the call to you or your team in real-time.'
              },
              {
                q: 'What integrations are available?',
                a: 'Miss.Lead integrates with all major CRMs (Salesforce, HubSpot, Zoho), calendar systems (Google, Outlook, Calendly), and communication tools. We also offer API access for custom integrations.'
              }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-slate-900">{faq.q}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="w-full bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white py-12 sm:py-24 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMTEuMDQ1LTguOTU1LTIwLTIwLTIwUzAtNC45NTUgMCA2czguOTU1IDIwIDIwIDIwIDIwLTguOTU1IDIwLTIwem0tMTQgMGMwIDMuMzE0LTIuNjg2IDYtNiA2cy02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Ready to Capture Every Lead?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 opacity-95 max-w-2xl mx-auto">
            Join hundreds of real estate professionals who never miss an opportunity. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button 
              onClick={() => handleStartTrial('professional')}
              className="bg-white text-green-600 hover:bg-slate-50 w-full sm:w-auto shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all font-semibold"
            >
              Start Free Trial
            </Button>
            <Button 
              onClick={handleBookDemo}
              variant="outline" 
              className="text-white border-2 border-white hover:bg-white/10 w-full sm:w-auto backdrop-blur-sm transition-all font-semibold"
            >
              Book Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-slate-900 text-slate-300 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-6 sm:mb-8">
            <div>
              <p className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Miss.Lead</p>
              <p className="text-xs sm:text-sm">AI-powered lead management for real estate professionals.</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Product</p>
              <ul className="text-xs sm:text-sm space-y-2">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Support</p>
              <ul className="text-xs sm:text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
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
            <p>© 2026 Miss.Lead. All rights reserved. | Licensed domains: misslead.* | assistantlady.*</p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 p-3 shadow-2xl z-50 backdrop-blur-lg bg-white/95">
        <div className="flex gap-2 max-w-md mx-auto">
          <Button
            onClick={() => handleStartTrial('professional')}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-semibold shadow-lg"
          >
            Start Trial
          </Button>
          <Button
            onClick={handleBookDemo}
            variant="outline"
            className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-50 text-sm font-semibold"
          >
            Book Demo
          </Button>
        </div>
      </div>

      {/* Add bottom padding on mobile to prevent content being covered by sticky CTA */}
      <div className="md:hidden h-20"></div>
    </div>
  );
}