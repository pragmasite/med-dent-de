import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const Contact = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Phone,
      label: t.contact.phone,
      value: "+41 91 743 84 27",
      href: "tel:+41917438427",
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: "studio.dent.dechecchi@bluewin.ch",
      href: "mailto:studio.dent.dechecchi@bluewin.ch",
    },
    {
      icon: MapPin,
      label: t.contact.address,
      value: "Via San Gottardo 80, 6648 Minusio, CH",
      href: "https://maps.google.com/?q=Via+San+Gottardo+80,+6648+Minusio,+CH",
    },
  ];

  return (
    <section id="contatti" className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.1 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-primary">{t.contact.label}</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2">{t.contact.title1}</h2>
          <h3 className="font-serif text-3xl md:text-4xl text-accent mt-2">{t.contact.title2}</h3>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mt-4">{t.contact.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={index}
                  href={item.href}
                  target={item.label === t.contact.address ? "_blank" : undefined}
                  rel={item.label === t.contact.address ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="rounded-2xl bg-card p-6 border border-border shadow-soft hover:shadow-medium hover:border-primary/50 transition-all hover:scale-105 block"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold text-foreground">{item.label}</h4>
                      <p className="text-foreground/70 break-all">{item.value}</p>
                    </div>
                  </div>
                </motion.a>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <Button asChild size="lg" className="w-full gap-2">
                <a href="tel:+41917438427">
                  <Phone className="h-5 w-5" />
                  {t.contact.cta}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-soft h-96 border border-border"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2743.2434567890123!2d8.814284!3d46.177103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47847ce9f0f0f0f1%3A0x1234567890abcdef!2sVia%20San%20Gottardo%2080%2C%206648%20Minusio!5e0!3m2!1sde!2sch!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Studio location map"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
