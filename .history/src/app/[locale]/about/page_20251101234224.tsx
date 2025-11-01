'use client'; 

import Image from 'next/image';
import { Link } from '@/navigation'; // PERBAIKI DI SINI
import { motion } from 'framer-motion';
import { useTranslations } from '@/context/TranslationsProvider'; // Import

export default function AboutPage() {
  const t = useTranslations('AboutPage'); // Inisialisasi

  return (
    <main className="min-h-screen container mx-auto px-8 py-20 pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Judul Halaman */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">{t('title')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded"></div>
        </div>

        {/* Konten About: Layout 2 Kolom */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Kolom Gambar */}
          <div className="flex-1 w-full md:w-1/2">
            <Image
              src="/images/fotoprofil1.jpg" 
              alt="Fauzan Al Gholi"
              width={500}
              height={500}
              className="rounded-lg shadow-custom-light dark:shadow-custom-dark object-cover aspect-square"
            />
          </div>

          {/* Kolom Teks */}
          <div className="flex-1 w-full md:w-1/2">
            <h3 className="text-3xl font-semibold text-foreground mb-6">{t('subtitle')}</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t('p1')}
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {t('p2')}
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t('p3')}
            </p>
            
            {/* Tombol Aksi */}
            <Link
              href="https://wa.me/6281260284201"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-custom-light dark:shadow-custom-dark"
            >
              {t('buttonMore')}
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
