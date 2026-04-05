/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight, 
  Star, 
  Menu, 
  X, 
  Briefcase, 
  Users, 
  Gavel, 
  Building2, 
  HeartHandshake 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Review {
  id: number;
  text: string;
  author: string;
  rating: number;
}

// --- Data ---
const SERVICES: Service[] = [
  {
    id: 'commercial',
    title: 'Εμπορικό Δίκαιο',
    description: 'Εξειδικευμένη υποστήριξη σε θέματα εμπορικών συμβάσεων, ανταγωνισμού και προστασίας εμπορικών σημάτων.',
    icon: <Briefcase className="w-8 h-8" />,
  },
  {
    id: 'civil',
    title: 'Αστικό Δίκαιο',
    description: 'Διαχείριση υποθέσεων που αφορούν εμπράγματο δίκαιο, ενοχικό δίκαιο και αποζημιώσεις.',
    icon: <Scale className="w-8 h-8" />,
  },
  {
    id: 'inheritance',
    title: 'Κληρονομικό Δίκαιο',
    description: 'Συμβουλευτική και δικαστική εκπροσώπηση σε θέματα διαθηκών, κληρονομητηρίων και αποδοχής κληρονομιάς.',
    icon: <Gavel className="w-8 h-8" />,
  },
  {
    id: 'corporate',
    title: 'Εταιρικό Δίκαιο',
    description: 'Σύσταση εταιρειών, τροποποιήσεις καταστατικών και νομική καθοδήγηση για τη λειτουργία επιχειρήσεων.',
    icon: <Building2 className="w-8 h-8" />,
  },
  {
    id: 'family',
    title: 'Οικογενειακό Δίκαιο',
    description: 'Ευαίσθητος χειρισμός υποθέσεων διαζυγίου, επιμέλειας τέκνων και διατροφής με σεβασμό στον άνθρωπο.',
    icon: <Users className="w-8 h-8" />,
  },
];

const REVIEWS: Review[] = [
  {
    id: 1,
    text: "Άμεση εξυπηρέτηση και λύση στο πρόβλημά μας. Εξαιρετικός επαγγελματισμός.",
    author: "Πελάτης Α.",
    rating: 5,
  },
  {
    id: 2,
    text: "Συνέπεια και κατανόηση του ανθρώπινου παράγοντα. Αισθάνθηκα ασφάλεια από την πρώτη στιγμή.",
    author: "Πελάτης Β.",
    rating: 5,
  },
  {
    id: 3,
    text: "Αποτελεσματικότητα στην επίλυση σύνθετων νομικών ζητημάτων. Το συστήνω ανεπιφύλακτα.",
    author: "Πελάτης Γ.",
    rating: 5,
  },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Αρχική', href: '#home' },
    { name: 'Υπηρεσίες', href: '#services' },
    { name: 'Το Γραφείο', href: '#about' },
    { name: 'Επικοινωνία', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              ΣΟΦΙΑ Α. ΧΑΝΙΩΤΑΚΗ
            </span>
            <span className={`text-[10px] uppercase tracking-[0.2em] font-medium ${isScrolled ? 'text-rose-700' : 'text-rose-400'}`}>
              ΔΙΚΗΓΟΡΙΚΟ ΓΡΑΦΕΙΟ
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-rose-500 ${isScrolled ? 'text-slate-600' : 'text-white/90'}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={isScrolled ? 'text-slate-900' : 'text-white'}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-medium text-slate-800 hover:text-rose-600"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000"
        alt="Law Office Background"
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]" />
    </div>

    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          Νομική Υποστήριξη με <span className="text-rose-500">Συνέπεια</span> & Ανθρώπινο Πρόσωπο
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
          Στο γραφείο μας, η αμεσότητα και ο επαγγελματισμός συναντούν την κατανόηση του ανθρώπινου παράγοντα για την αποτελεσματική επίλυση των νομικών σας ζητημάτων.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="px-8 py-4 bg-rose-800 hover:bg-rose-900 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            Επικοινωνήστε Μαζί μας <ChevronRight className="w-4 h-4" />
          </a>
          <a
            href="#services"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-all border border-white/30"
          >
            Οι Υπηρεσίες μας
          </a>
        </div>
      </motion.div>
    </div>

    {/* Scroll Indicator */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
    >
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
        <div className="w-1 h-2 bg-white/50 rounded-full" />
      </div>
    </motion.div>
  </section>
);

const Services = () => (
  <section id="services" className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Τομείς Εξειδίκευσης</h2>
        <div className="w-20 h-1 bg-rose-800 mx-auto mb-6" />
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Παρέχουμε ολοκληρωμένες νομικές υπηρεσίες με έμφαση στην ποιότητα και την εξατομικευμένη προσέγγιση κάθε υπόθεσης.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
          >
            <div className="w-16 h-16 bg-rose-50 text-rose-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-rose-800 group-hover:text-white transition-colors">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              {service.description}
            </p>
            <a href="#contact" className="text-rose-800 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Μάθετε περισσότερα <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000"
              alt="Lawyer at work"
              className="rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-rose-800 text-white p-8 rounded-2xl hidden md:block">
              <p className="text-4xl font-bold mb-1">15+</p>
              <p className="text-sm uppercase tracking-wider font-medium">Χρόνια Εμπειρίας</p>
            </div>
          </motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-rose-50 rounded-full blur-3xl -z-10 opacity-50" />
        </div>

        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-rose-800 font-bold uppercase tracking-widest text-sm mb-4 block">Ποιοι Είμαστε</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Δικηγορικό Γραφείο Σοφία Α. Χανιωτάκη</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Με έδρα στην Κυψέλη, σε απόσταση αναπνοής από τα δικαστήρια της Ευελπίδων, το γραφείο μας προσφέρει υψηλού επιπέδου νομικές υπηρεσίες από το 2010.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Πιστεύουμε ότι κάθε νομικό πρόβλημα απαιτεί μια μοναδική λύση. Γι' αυτό εστιάζουμε στην προσωπική επαφή με τον πελάτη, προσφέροντας άμεση εξυπηρέτηση και άριστο επαγγελματισμό, χωρίς να παραβλέπουμε την ανθρώπινη πλευρά κάθε υπόθεσης.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <HeartHandshake className="text-rose-700" />, text: 'Ανθρωποκεντρική Προσέγγιση' },
                { icon: <Scale className="text-rose-700" />, text: 'Άριστος Επαγγελματισμός' },
                { icon: <Clock className="text-rose-700" />, text: 'Άμεση Εξυπηρέτηση' },
                { icon: <Star className="text-rose-700" />, text: 'Αποδεδειγμένη Αποτελεσματικότητα' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-2 bg-rose-50 rounded-lg">{item.icon}</div>
                  <span className="font-semibold text-slate-800">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const Reviews = () => (
  <section className="py-24 bg-slate-950 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Τι λένε οι πελάτες μας</h2>
        <div className="w-20 h-1 bg-rose-800 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REVIEWS.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-rose-500 text-rose-500" />
              ))}
            </div>
            <p className="text-lg italic text-white/90 mb-6 leading-relaxed">
              "{review.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-800/20 rounded-full flex items-center justify-center text-rose-500 font-bold">
                {review.author[review.author.length - 1]}
              </div>
              <span className="font-medium text-white/60">{review.author}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col items-center text-center p-12 lg:p-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Επικοινωνήστε μαζί μας</h2>
          <p className="text-slate-600 text-xl max-w-2xl mb-12">
            Είμαστε στη διάθεσή σας για οποιαδήποτε νομική συμβουλή ή εκπροσώπηση. Μπορείτε να μας βρείτε στα παρακάτω στοιχεία.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-rose-50 text-rose-800 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Διεύθυνση</h3>
              <p className="text-slate-600">Κυψέλης 64, Αθήνα, 11362</p>
              <p className="text-sm text-rose-700 italic mt-1">(Κοντά στην Ευελπίδων)</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-rose-50 text-rose-800 rounded-full flex items-center justify-center mb-6">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Τηλέφωνο</h3>
              <a href="tel:2103215201" className="text-slate-600 hover:text-rose-800 transition-colors">210 3215201</a>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-rose-50 text-rose-800 rounded-full flex items-center justify-center mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <a href="mailto:info@chaniotaki-law.gr" className="text-slate-600 hover:text-rose-800 transition-colors">info@chaniotaki-law.gr</a>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-slate-100 w-full">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-slate-500 mb-4">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Ωράριο Λειτουργίας</span>
              </div>
              <p className="text-slate-600">Δευτέρα - Παρασκευή: 09:00 - 20:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-950 text-white py-16 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col mb-6">
            <span className="text-2xl font-bold tracking-tight text-white">
              ΣΟΦΙΑ Α. ΧΑΝΙΩΤΑΚΗ
            </span>
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-rose-500">
              ΔΙΚΗΓΟΡΙΚΟ ΓΡΑΦΕΙΟ
            </span>
          </div>
          <p className="text-white/60 max-w-sm leading-relaxed">
            Παρέχουμε αξιόπιστες νομικές υπηρεσίες με επίκεντρο τον άνθρωπο και την αποτελεσματική προάσπιση των συμφερόντων σας.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Γρήγοροι Σύνδεσμοι</h4>
          <ul className="space-y-4 text-white/60">
            <li><a href="#home" className="hover:text-rose-400 transition-colors">Αρχική</a></li>
            <li><a href="#services" className="hover:text-rose-400 transition-colors">Υπηρεσίες</a></li>
            <li><a href="#about" className="hover:text-rose-400 transition-colors">Το Γραφείο</a></li>
            <li><a href="#contact" className="hover:text-rose-400 transition-colors">Επικοινωνία</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Επικοινωνία</h4>
          <ul className="space-y-4 text-white/60">
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-rose-500" />
              <span>Κυψέλης 64, Αθήνα</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-rose-500" />
              <span>210 3215201</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-rose-500" />
              <span>info@chaniotaki-law.gr</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
        <p>© {new Date().getFullYear()} Δικηγορικό Γραφείο Σοφία Α. Χανιωτάκη. Με επιφύλαξη παντός δικαιώματος.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Πολιτική Απορρήτου</a>
          <a href="#" className="hover:text-white transition-colors">Όροι Χρήσης</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-rose-100 selection:text-rose-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
