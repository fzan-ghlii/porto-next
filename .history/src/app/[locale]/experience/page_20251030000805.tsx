'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl'; // Import

// Data sekarang hanya berisi data non-teks dan 'kunci' terjemahan
const experienceData = [
  { date: 'August 2023 - Now', key: 'item1' },
  { date: 'October 2024 - Now', key: 'item2' },
  { date: 'June 2025 - Now', key: 'item3' },
  { date: 'July 2025 - August 2025', key: 'item4' },
  { date: 'September 2024', key: 'item5' },
  { date: 'August 2020 - May 2023', key: 'item6' },
];

export default function ExperiencePage() {
  const t = useTranslations('ExperiencePage'); // Inisialisasi

  return (
    <main className="min-h-screen container mx-auto px-8 py-20 pt-32">
      {/* Judul Halaman */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold">{t('title')}</h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded"></div>
      </motion.div>

      {/* Kontainer Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Garis Tengah */}
        <div className="absolute left-5 md:left-1/2 w-1 h-full bg-primary/30 transform md:-translate-x-1/2"></div>

        {/* Item Timeline */}
        {experienceData.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className={`mb-10 flex md:justify-between items-center w-full ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Spacer (hanya di desktop) */}
              <div className="hidden md:block md:w-5/12"></div>
              
              {/* Titik di Garis */}
              <div className="absolute left-5 md:left-1/2 w-5 h-5 bg-background border-4 border-primary rounded-full transform -translate-x-1/2"></div>

              {/* Konten Kartu */}
              <div className="w-full md:w-5/12 ml-12 md:ml-0">
                <div className="bg-card border border-border p-6 rounded-lg shadow-custom-light dark:shadow-custom-dark hover:shadow-primary/20 transition-shadow duration-300">
                  <span className="text-primary font-semibold text-sm">{item.date}</span>
                  <h3 className="text-xl font-bold text-foreground mt-2">
                    {t(`${item.key}_title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {t(`${item.key}_org`)}
                  </p>
                  <p className="text-muted-foreground">
                    {t(`${item.key}_desc`)}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
