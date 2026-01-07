import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Gallery = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Placeholder gallery with descriptions in multiple languages
  const galleryTranslations: Record<string, { it: string; de: string; fr: string; en: string }[]> = {
    descriptions: [
      { it: "Studio moderno", de: "Modernes Büro", fr: "Bureau moderne", en: "Modern office" },
      { it: "Tecnologia avanzata", de: "Fortgeschrittene Technologie", fr: "Technologie avancée", en: "Advanced technology" },
      { it: "Ambiente professionale", de: "Professionelle Umgebung", fr: "Environnement professionnel", en: "Professional environment" },
      { it: "Attrezzature dentali", de: "Zahnmedizinische Ausrüstung", fr: "Équipement dentaire", en: "Dental equipment" },
      { it: "Sala di visita", de: "Wartezimmer", fr: "Salle d'attente", en: "Waiting area" },
      { it: "Comfort del paziente", de: "Patientenkomfort", fr: "Confort du patient", en: "Patient comfort" },
    ],
  };

  const getDescriptions = () => {
    const langKey = { it: "it", de: "de", fr: "fr", en: "en" } as const;
    const currentLang = langKey[t.nav.profession.includes("STUDIO") ? "it" : langKey[langKey[t.nav.profession.includes("ZAHNARZT") ? "de" : t.nav.profession.includes("CABINET") ? "fr" : "en"]]];

    // Fallback logic based on nav.profession
    let lang: "it" | "de" | "fr" | "en" = "it";
    if (t.nav.profession.includes("ZAHNARZT")) lang = "de";
    else if (t.nav.profession.includes("CABINET")) lang = "fr";
    else if (t.nav.profession.includes("DENTAL")) lang = "en";

    return galleryTranslations.descriptions.map(desc => desc[lang]);
  };

  const descriptions = getDescriptions();

  // Create placeholder images
  const images = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    src: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%236FA8A0' width='400' height='300'/%3E%3Ctext x='50%' y='50%' font-size='24' fill='white' text-anchor='middle' dy='.3em' font-family='Arial'%3EGalleria ${i + 1}%3C/text%3E%3C/svg%3E`,
    alt: descriptions[i] || `Gallery ${i + 1}`,
  }));

  return (
    <section id="galerie" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.1 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-primary">{t.gallery.label}</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2 mb-4">{t.gallery.title}</h2>
          <p className="text-lg text-foreground/70">{t.gallery.description}</p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              onClick={() => setSelectedImage(index)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium text-white">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="w-full h-auto rounded-2xl"
              />
              <motion.p className="text-center text-white mt-4 text-lg font-medium">
                {images[selectedImage].alt}
              </motion.p>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-foreground/20 hover:bg-foreground/40 rounded-full p-2 transition-colors"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
