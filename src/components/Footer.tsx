import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t, otherLangs } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: "#chi-siamo", label: t.footer.about },
    { href: "#prestazioni", label: t.nav.services },
    { href: "#galerie", label: t.nav.gallery },
    { href: "#orari", label: t.nav.hours },
    { href: "#contatti", label: t.nav.contact },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
            <h3 className="font-serif text-2xl font-bold mb-2">De Checchi</h3>
            <p className="text-primary-foreground/70 mb-4">{t.footer.tagline}</p>
            <p className="text-sm text-primary-foreground/60">{t.footer.description}</p>
          </motion.div>

          {/* Navigation */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
            <h4 className="font-serif font-semibold mb-6">{t.footer.navigation}</h4>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Languages */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}>
            <h4 className="font-serif font-semibold mb-6">Lingue</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Italiano
                </Link>
              </li>
              {otherLangs.map((lang) => (
                <li key={lang.code}>
                  <Link to={lang.path} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {lang.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 pt-8 mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-center text-sm text-primary-foreground/60"
          >
            <p>
              © {currentYear} Med. Dent. De Checchi Stelio. {t.footer.copyright}
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="tel:+41917438427" className="hover:text-primary-foreground transition-colors">
                +41 91 743 84 27
              </a>
              <a href="mailto:studio.dent.dechecchi@bluewin.ch" className="hover:text-primary-foreground transition-colors">
                studio.dent.dechecchi@bluewin.ch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
