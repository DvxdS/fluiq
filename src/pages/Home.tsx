import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { UserPlus, Sparkles, TrendingUp, Zap, Globe, Lock, Calendar, Instagram, Twitter, Linkedin, ChevronDown, Check, LucideIcon } from 'lucide-react';
import React from 'react';
import { FlagSlider } from '@/components/layout/FlagSlider';

// =================================================================
// TYPE DEFINITIONS & INTERFACES
// =================================================================

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

interface FloatingOrbProps {
  className: string;
  delay?: number;
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  text: string;
  delay?: number;
}

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  label: string;
}

interface PrimaryButtonProps {
  children: React.ReactNode;
  to?: string;
  // Use explicit union type for Button component size compatibility
  size?: 'default' | 'sm' | 'lg' | 'icon'; 
  className?: string;
}

// =================================================================
// ANIMATION VARIANTS
// =================================================================

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// =================================================================
// REUSABLE COMPONENTS
// =================================================================

const FloatingOrb: React.FC<FloatingOrbProps> = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
    animate={{
      x: [0, 40, -30, 0],
      y: [0, -50, 30, 0],
      scale: [1, 1.05, 0.98, 1],
    }}
    transition={{
      duration: 25,
      repeat: Infinity,
      delay,
    }}
  />
);

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '', id }) => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true }); 
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, text, delay = 0 }) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.08)" }} 
      transition={{ type: 'spring', stiffness: 300, damping: 25, delay: delay * 0.1 }}
      className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg overflow-hidden relative cursor-pointer"
    >
      <div className="mb-4 w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center">
        <Icon className="w-7 h-7 text-orange-600" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </motion.div>
  );
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix = '', label }) => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
  const [displayValue, setDisplayValue] = useState(value.includes('-') ? value : '0');

  useEffect(() => {
    if (inView && !value.includes('-')) {
      const numValue = parseInt(value.replace(/[^0-9]/g, ''));
      let start = 0;
      const duration = 2000;
      const increment = numValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numValue) {
          setDisplayValue(numValue.toString());
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start).toString());
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  const finalDisplayValue = value.includes('-') ? value : displayValue + suffix;

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-7xl font-extrabold text-orange-600">
        {finalDisplayValue}
      </div>
      <p className="text-gray-700 mt-2 text-lg font-medium">{label}</p>
    </div>
  );
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, to = '/auth', size = 'lg', className = '' }) => (
    <Button
      asChild
      // Use size directly as it's defined in the interface to align with Button's supported types
      size={size as 'default' | 'sm' | 'lg' | 'icon'} 
      className={`text-lg px-8 py-6 rounded-full font-semibold bg-orange-600 text-white hover:bg-orange-700 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 ${className}`}
    >
      <Link to={to}>{children}</Link>
    </Button>
);

// =================================================================
// MAIN HOME COMPONENT
// =================================================================

export const Home: React.FC = () => {
  const [previewRef, previewInView] = useInView({ threshold: 0.2, triggerOnce: true });

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    
    if (target.parentElement) {
      target.parentElement.innerHTML = `
        <div class="w-full aspect-video bg-gray-100 rounded-xl flex items-center justify-center border border-gray-300">
          <span class="text-4xl font-bold text-gray-500">Aperçu du Dashboard Fluiq</span>
        </div>
      `;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION - Ensure min-h-screen and z-index are working */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-16"> {/* Increased pt-32 */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingOrb className="w-96 h-96 bg-orange-200 top-20 -left-48" delay={0} />
          <FloatingOrb className="w-80 h-80 bg-violet-200 top-40 right-0" delay={2} />
          <FloatingOrb className="w-72 h-72 bg-cyan-200 bottom-20 left-1/3" delay={4} />
        </div>

        <div className="relative z-20 max-w-5xl text-center"> {/* Set z-20 for content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-gray-900"
            >
              Il ne suffit pas d'avoir des milliers d'abonnés.
              <br />
              <span className="text-orange-600 inline-block mt-2">
                Il faut avoir le Fluiq.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto font-medium"
            >
              L'outil  des créateurs ouest-africains qui veulent transformer leur influence en opportunités et deals concrets.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                <PrimaryButton>
                  Commencer gratuitement
                </PrimaryButton>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-full border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 font-semibold shadow-lg"
                >
                  <a href="#comment-ca-marche">Voir comment ça marche <ChevronDown className="w-4 h-4 ml-2" /></a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-700 font-medium">
                <span className="px-4 py-2 rounded-full bg-white border border-gray-200 flex items-center gap-2 shadow-sm">
                  <Check className="w-4 h-4 text-orange-500" /> Gratuit actuellement
                </span>
                <span className="px-4 py-2 rounded-full bg-white border border-gray-200 flex items-center gap-2 shadow-sm">
                  <Check className="w-4 h-4 text-orange-500" /> 100% Mobile Ready
                </span>
              </div>
              <FlagSlider />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-gray-600 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <AnimatedSection className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-extrabold text-center mb-4 text-gray-900"
          >
            Une interface simple.
            <br />
            <span className="text-violet-600">Des résultats puissants.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-700 text-center mb-12 max-w-2xl mx-auto text-lg font-medium">
            Découvrez un tableau de bord conçu pour maximiser votre productivité et vos opportunités de deals.
          </motion.p>

          <motion.div
            ref={previewRef}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={previewInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.01 }}
            className="relative group rounded-3xl p-4 shadow-2xl shadow-gray-300/60 border border-gray-200 bg-white"
          >
            <div className="relative rounded-xl overflow-hidden">
              <img
                src="/fluiq.png"
                alt="Fluiq Dashboard"
                className="w-full rounded-xl"
                onError={handleImageError}
              />
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* COMMENT CA MARCHE */}
      <AnimatedSection id="comment-ca-marche" className="py-20 md:py-32 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-extrabold text-center mb-4 text-gray-900"
          >
            En
            <span className="text-orange-600"> 3 étapes </span>
            simples
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-700 text-center mb-16 max-w-2xl mx-auto text-lg font-medium">
            De l'inscription à ton premier deal, en quelques minutes seulement, sans aucune complexité.
          </motion.p>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { num: '01', icon: UserPlus, title: "Inscris-toi gratuitement", text: "Crée ton compte en 30 secondes. C'est rapide, simple et aucune carte n'est requise." },
              { num: '02', icon: Sparkles, title: "Crée ton pitch deck", text: "Génère un pitch professionnel et hyper-localisé en quelques clics pour n'importe quelle marque." },
              { num: '03', icon: TrendingUp, title: "Décroche des deals", text: "Envoie tes pitchs, utilise le calendrier local et tracke tes opportunités avec succès." },
            ].map((step, index) => (
              <motion.div
                key={step.num}
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)" }} 
                transition={{ type: 'spring', stiffness: 300, damping: 25, delay: index * 0.1 }}
                className="relative bg-white border border-gray-100 rounded-xl p-8 shadow-md"
              >
                <span className="text-5xl font-extrabold text-orange-600 opacity-20 absolute top-4 right-6">
                  {step.num}
                </span>
                <div className="mb-4 w-12 h-12 rounded-full bg-orange-600/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-700">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* POURQUOI FLUIQ */}
      <AnimatedSection className="py-20 md:py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-extrabold text-center mb-4 text-gray-900"
          >
            Pourquoi les créateurs choisissent
            <span className="text-cyan-600"> Fluiq</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-700 text-center mb-16 max-w-2xl mx-auto text-lg font-medium">
            Des outils puissants conçus spécifiquement pour les créateurs africains, pour une influence qui paie.
          </motion.p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "100% Gratuit actuellement", text: "Tous les outils dont tu as besoin, y compris les pitchs. Zéro frais actuellement." },
              { icon: Globe, title: "Hyper-Localisé", text: "Hashtags régionaux, slang, et contexte culturel pour que tes messages touchent vraiment les marques locales." },
              { icon: Calendar, title: "Calendrier de Contenu WA", text: "Ne rate plus un festival ou un jour important ! Planifie ton contenu autour des événements Ouest-Africains." },
              { icon: Lock, title: "Tes Données T'appartiennent", text: "Nous n'utilisons pas tes données de manière abusive. Simplicité et 'Privacy First'." },
              { icon: TrendingUp, title: "Deal Tracker Intégré", text: "Suis tes propositions de marque et ne laisse plus une opportunité te filer entre les doigts." },
              { icon: Sparkles, title: "Ultra Simple & Mobile", text: "Conçu pour être rapide même avec une connexion lente. Utilisation fluide sur ton mobile ou tablette." },
            ].map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} delay={index} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* SOCIAL PROOF STATS */}
      <section className="py-20 md:py-32 px-4 bg-gray-50 relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-16 text-gray-900"
          >
            Des chiffres qui prouvent l'impact
          </motion.h2>
          <div className="grid gap-12 md:grid-cols-3">
            <AnimatedCounter value="5K-50K" label="Range de Followers Idéaux" />
            <AnimatedCounter value="100" suffix="%" label="Outils Gratuits actuellement" />
            <AnimatedCounter value="4" label="Pays Actuellement Couverts" />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-32 px-4 relative overflow-hidden bg-white">
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Prêt à transformer ton influence en
              <span className="text-orange-600 inline-block"> revenus</span>
              ?
            </h2>
            <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto font-medium">
              Rejoins les créateurs qui ne se contentent plus de likes et font de leur passion un business réel.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <PrimaryButton className="text-xl px-12 py-7">
                Créer mon Fluiq
              </PrimaryButton>
            </motion.div>

            <p className="mt-6 text-sm text-gray-600 font-medium">
              Aucune carte requise • Prêt en 30 secondes
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 border-t border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-8">
            <Link to="/" className="text-3xl font-bold text-orange-600">
              Fluiq
            </Link>

            <nav className="flex flex-wrap justify-center gap-6">
              {['About', 'Contact', 'Privacy', 'Terms'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-orange-600 transition-colors duration-300 font-medium"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            <div className="text-center mt-4">
              <p className="text-gray-700 font-medium">
                Fait avec <span className="text-red-500">❤️</span> à Abidjan, Côte d'Ivoire
              </p>
              <p className="text-gray-500 text-sm mt-2">
                © {new Date().getFullYear()} Fluiq by NIMBAA. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};