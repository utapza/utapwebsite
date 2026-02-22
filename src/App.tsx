import { useEffect, useState } from 'react';
import { Menu, X, Smartphone, ShoppingBag, Zap, Users, CreditCard, Clock, Award, Mail, Phone, MapPin } from 'lucide-react';
import { useScrollAnimation } from './hooks/useScrollAnimation';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80');
  const [images, setImages] = useState<Record<string, string>>({});

  useScrollAnimation();

  useEffect(() => {
    const UNSPLASH_ACCESS_KEY = 'demo';

    const imageQueries = {
      hero: 'happy university students africa campus high five',
      about: 'diverse students collaborating studying campus',
      app: 'student using mobile phone app',
      shop: 'campus food market students eating',
      team: 'young african professionals team meeting',
      vision: 'modern african university building',
      footer: 'friends students campus phones connected'
    };

    const placeholderImages = {
      hero: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      about: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      app: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      shop: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      team: 'https://images.unsplash.com/photo-1522071901873-411886a10004?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      vision: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      footer: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    };

    setHeroImage(placeholderImages.hero);
    setImages(placeholderImages);

    if (UNSPLASH_ACCESS_KEY !== 'demo') {
      Object.entries(imageQueries).forEach(([key, query]) => {
        fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape`, {
          headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` }
        })
          .then(res => res.json())
          .then(data => {
            if (key === 'hero') setHeroImage(data.urls.full);
            setImages(prev => ({ ...prev, [key]: data.urls.full }));
          })
          .catch(() => {});
      });
    }
  }, []);

  const createConfetti = () => {
    const colors = ['#006400', '#228B22', '#90EE90', '#32CD32'];
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          z-index: 9999;
          animation: confettiFall 3s linear;
          pointer-events: none;
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }

        .section-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .section-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-700 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl">U</span>
            </div>
            <span className="text-2xl font-black text-green-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>UTAP</span>
          </div>

          <button
            className="md:hidden text-green-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <ul className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent shadow-md md:shadow-none md:space-x-8 p-4 md:p-0`}>
            {['Home', 'About', 'UTAP App', 'UShop', 'Team', 'Vision', 'Contact'].map(item => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="block py-2 md:py-0 text-gray-700 hover:text-green-600 font-medium transition-colors"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})`, marginTop: '72px' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl fade-in-up">
          <div className="inline-block mb-6 px-6 py-2 bg-green-600/90 rounded-full">
            <span className="text-white font-bold text-sm md:text-base" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Technology at Your Fingertips
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Smart ID.<br />Cashless Vibes.<br />Campus Wins.
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 font-medium" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Ditch the queues, tap into awesome. Your all-in-one campus superpower starts here.
          </p>
          <button
            onClick={createConfetti}
            className="bg-green-600 hover:bg-green-700 text-white px-12 py-5 rounded-full text-lg md:text-xl font-bold shadow-2xl transition-all transform hover:scale-105"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Get the App
          </button>
        </div>
      </section>

      <section id="about" className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="section-animate">
              <h2 className="text-4xl md:text-5xl font-black text-green-700 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Born in Jozi,<br />Built for Africa's Bold Students
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                UTAP Technologies is transforming African campuses into smart digital hubs. We are not just tech, we are your campus upgrade.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                <strong className="text-green-700">Our Vision:</strong> Every student empowered with secure, seamless digital tools that make campus life effortless.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                <strong className="text-green-700">Our Mission:</strong> Build a scalable platform connecting students, businesses, and institutions where you learn, eat, connect, and thrive.
              </p>
            </div>
            <div className="section-animate">
              <img
                src={images.about}
                alt="Diverse students collaborating on campus"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="utap-app" className="py-20 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              UTAP App: Your Campus Superpower
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
              One tap = No stress. ID, pay, access—all in your pocket.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: <Smartphone size={40} />, title: 'Digital Student ID', desc: 'Your identity, verified and secure. No more lost cards!' },
              { icon: <CreditCard size={40} />, title: 'Cashless Payments', desc: 'Tap, pay, done. From meals to merch, instant transactions.' },
              { icon: <Zap size={40} />, title: 'Event Access', desc: 'Unlock campus events and perks with a single scan.' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all section-animate">
                <div className="text-green-300 mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>{feature.title}</h3>
                <p className="text-green-100" style={{ fontFamily: 'Roboto, sans-serif' }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <img
              src={images.app}
              alt="UTAP mobile app dashboard"
              className="rounded-2xl shadow-2xl max-w-md w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

      <section id="ushop" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src={images.shop}
                alt="Vibrant campus food marketplace"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
            <div className="order-1 md:order-2 section-animate">
              <h2 className="text-4xl md:text-5xl font-black text-green-700 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                UShop: Fuel Your Day<br />Without the Wait
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Hungry? Shop smart, eat fresh, no lines. Pre-order your faves, skip the rush—feast mode activated!
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Clock size={32} />, title: 'Pre-Order Anything', desc: 'Meals, groceries, snacks—order ahead, pick up fast.' },
                  { icon: <ShoppingBag size={32} />, title: 'Campus Vendors United', desc: 'Support local businesses, discover new spots.' },
                  { icon: <Award size={32} />, title: 'Student Deals & Insights', desc: 'Data-driven perks just for you. Save big, eat better.' }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-4 bg-green-50 p-6 rounded-xl">
                    <div className="text-green-600 flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-green-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{feature.title}</h3>
                      <p className="text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-green-700 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Meet the Squad
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
              The dream team turning student life into a digital revolution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Lutho Ntloko',
                role: 'CEO',
                image: '/6.jpg',
                desc: 'Meet Lutho, the numbers guy who actually gets students. CIMA winner and BCom grad who traded corporate spreadsheets for a mission that matters: making your campus life easier. He\'s proof that finance doesn\'t have to be boring—it can power the apps that change your daily grind.'
              },
              {
                name: 'Aviwe Xaluva',
                role: 'Head of Marketing',
                image: '/7.jpg',
                desc: 'Aviwe is the creative genius who\'s worked on campaigns for Red Bull, Rocking the Daisies, and SABC—basically everywhere cool. He knows what students want before they do. When he\'s not crafting viral campaigns, he\'s building youth culture brands that actually slap.'
              },
              {
                name: 'Blessing Mpafa',
                role: 'CFO',
                image: '/8.png',
                desc: 'Blessing keeps the money right. Working in wealth management at a major bank, he knows how to make every rand count—skills he\'s bringing to UTAP to keep your student budget in check. He\'s all about smart investments and making sure UTAP stays affordable while scaling up.'
              },
              {
                name: 'Ayabonga Qwabi',
                role: 'CTO',
                image: '/9.png',
                desc: 'Aya is the tech wizard with 9 years of building apps that just work. From insurance to healthcare, he\'s coded solutions for millions—and now he\'s focused on you. As founder of Namoota and a Project CodeX grad, he\'s bringing Silicon Valley-level tech to African campuses.'
              }
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow section-animate">
                <img src={member.image} alt={member.name} className="w-full h-80 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-green-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{member.name}</h3>
                  <p className="text-green-600 font-semibold mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>{member.role}</p>
                  <p className="text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vision" className="py-20 bg-green-700 text-white relative bg-cover bg-center" style={{ backgroundImage: `url(${images.vision})` }}>
        <div className="absolute inset-0 bg-green-900/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center section-animate">
            <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Empowering You to Learn, Eat, Connect—Africa-Wide
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
              We are building more than an app. We are creating a movement where African students lead with tech, businesses thrive, and campuses become innovation hubs.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Strategic Objectives 2024</h3>
                <ul className="space-y-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  <li>✓ Launch in 10+ universities</li>
                  <li>✓ 50,000+ active student users</li>
                  <li>✓ 200+ campus vendors onboarded</li>
                  <li>✓ Expand to 5 African countries</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Our Value Proposition</h3>
                <p style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Scalable African innovation designed by students, for students. Secure, fast, and built to grow with you from first year to graduation—and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-green-700 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Let's Connect
              </h2>
              <p className="text-xl text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Got questions? Want to partner? We're all ears!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="text-green-600 flex-shrink-0" size={28} />
                  <div>
                    <h3 className="font-bold text-lg text-green-700 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Email</h3>
                    <p className="text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      <a href="mailto:ntlokolutho8@gmail.com" className="hover:text-green-600 transition-colors">ntlokolutho8@gmail.com</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="text-green-600 flex-shrink-0" size={28} />
                  <div>
                    <h3 className="font-bold text-lg text-green-700 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Phone</h3>
                    <p className="text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      <a href="tel:+27732801022" className="hover:text-green-600 transition-colors">+27 73 280 1022</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="text-green-600 flex-shrink-0" size={28} />
                  <div>
                    <h3 className="font-bold text-lg text-green-700 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Location</h3>
                    <p className="text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>24 8th Avenue, Parktown North<br/>Johannesburg, 2193</p>
                  </div>
                </div>
              </div>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-600 focus:outline-none resize-none"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                  onClick={(e) => { e.preventDefault(); createConfetti(); }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-green-900 text-white py-12 relative bg-cover bg-center" style={{ backgroundImage: `url(${images.footer})` }}>
        <div className="absolute inset-0 bg-green-900/90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-300 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-2xl">U</span>
                </div>
                <span className="text-3xl font-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>UTAP</span>
              </div>
              <p className="text-green-200" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Technology at Your Fingertips. Transforming African campuses, one tap at a time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Quick Links</h3>
              <ul className="space-y-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                <li><button onClick={() => scrollToSection('about')} className="text-green-200 hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('utap-app')} className="text-green-200 hover:text-white transition-colors">UTAP App</button></li>
                <li><button onClick={() => scrollToSection('ushop')} className="text-green-200 hover:text-white transition-colors">UShop</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-green-200 hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Follow Us</h3>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map(social => (
                  <button
                    key={social}
                    className="w-10 h-10 bg-green-700 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                    aria-label={social}
                  >
                    <Users size={20} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 pt-8 text-center space-y-2">
            <p className="text-green-200" style={{ fontFamily: 'Roboto, sans-serif' }}>
              © 2024 UTAP Technologies. All rights reserved. Built with passion for African students.
            </p>
            <p className="text-green-300" style={{ fontFamily: 'Roboto, sans-serif' }}>
              <a href="https://utaptech.co.za" className="hover:text-white transition-colors">www.utaptech.co.za</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
