import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Globe, Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const Header = () => {
  const { t, otherLangs, lang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#chi-siamo", label: t.nav.about, id: "chi-siamo" },
    { href: "#prestazioni", label: t.nav.services, id: "prestazioni" },
    { href: "#galerie", label: t.nav.gallery, id: "galerie" },
    { href: "#orari", label: t.nav.hours, id: "orari" },
    { href: "#contatti", label: t.nav.contact, id: "contatti" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <a href="/" className="flex flex-col">
          <span className={`font-serif text-xl font-semibold transition-colors ${
            isScrolled ? "text-primary" : "text-white"
          }`}>
            De Checchi
          </span>
          <span className={`text-xs tracking-widest transition-colors ${
            isScrolled ? "text-muted-foreground" : "text-white/70"
          }`}>
            {t.nav.profession}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side - Language Switcher & Call Button */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
              isScrolled
                ? "text-foreground hover:text-primary"
                : "text-white/80 hover:text-white"
            }`}>
              <Globe className="h-4 w-4" />
              {lang.toUpperCase()}
            </button>
            <div className="absolute right-0 top-full mt-2 w-32 bg-background rounded-lg shadow-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-border">
              {otherLangs.map((otherlang) => (
                <Link
                  key={otherlang.code}
                  to={otherlang.path}
                  className="block px-4 py-2 text-sm hover:bg-primary/10 hover:text-primary first:rounded-t-lg last:rounded-b-lg transition-colors"
                >
                  {otherlang.label}
                </Link>
              ))}
            </div>
          </div>

          <Button asChild size="sm" className="gap-2">
            <a href="tel:+41917438427">
              <Phone className="h-4 w-4" />
              {t.nav.call}
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden"
        >
          {isMobileMenuOpen ? (
            <X className={`h-6 w-6 ${isScrolled ? "text-foreground" : "text-white"}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? "text-foreground" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-border pt-4 mt-4 space-y-3">
              <div className="text-xs font-semibold text-muted-foreground mb-2">
                {t.nav.profession}
              </div>
              {otherLangs.map((otherlang) => (
                <Link
                  key={otherlang.code}
                  to={otherlang.path}
                  className="block text-sm text-foreground hover:text-primary transition-colors"
                >
                  {otherlang.label}
                </Link>
              ))}
              <Button asChild size="sm" className="w-full gap-2 mt-4">
                <a href="tel:+41917438427">
                  <Phone className="h-4 w-4" />
                  {t.nav.call}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
