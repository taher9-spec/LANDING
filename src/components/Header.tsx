import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
      isScrolled 
        ? 'bg-[#0A0A0B]/80 backdrop-blur-lg border-b border-[#2D2D3A]/30' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/1a298580-131a-4861-b0b5-5c1300328c1d.png" 
              alt="RuyaaCapital" 
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('solutions')}
              className="text-[#CCCCCC] hover:text-white transition-colors duration-300 font-medium"
            >
              Solutions
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className="text-[#CCCCCC] hover:text-white transition-colors duration-300 font-medium"
            >
              Demo
            </button>
            <button 
              onClick={() => scrollToSection('personal-ai')}
              className="text-[#CCCCCC] hover:text-white transition-colors duration-300 font-medium"
            >
              Personal AI
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-[#CCCCCC] hover:text-white transition-colors duration-300 font-medium"
            >
              Contact
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className="group flex items-center space-x-2 px-6 py-2 bg-transparent text-white rounded-lg border border-white hover:shadow-lg hover:shadow-white/20 transition-all duration-400 font-medium"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0A0A0B]/95 backdrop-blur-lg border-t border-[#2D2D3A]/30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('solutions')}
                className="block w-full text-left px-3 py-2 text-[#CCCCCC] hover:text-white transition-colors duration-300 font-medium"
              >
                Solutions
              </button>
              <button 
                onClick={() => scrollToSection('demo')}
                className="block w-full text-left px-3 py-2 text-[#CCCCCC] hover:text-white transition-colors duration-300 font-medium"
              >
                Demo
              </button>
              <button 
                onClick={() => scrollToSection('personal-ai')}
                className="block w-full text-left px-3 py-2 text-[#CCCCCC] hover:text-white transition-colors duration-300 font-medium"
              >
                Personal AI
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-[#CCCCCC] hover:text-white transition-colors duration-300 font-medium"
              >
                Contact
              </button>
              <button 
                onClick={() => scrollToSection('demo')}
                className="group flex items-center space-x-2 w-full text-left px-3 py-2 mt-2 bg-transparent text-white rounded-lg border border-white hover:shadow-lg hover:shadow-white/20 transition-all duration-400 font-medium"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;