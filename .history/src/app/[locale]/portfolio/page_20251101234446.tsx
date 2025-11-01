'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, Info, Github } from 'lucide-react';
import { useTranslations } from '@/context/TranslationsProvider';
// Tipe data untuk Project
type Project = {
  key: string;
  imgSrc: string;
  liveUrl: string;
  githubUrl: string;
};

// Data Portofolio
const portfolioData: Project[] = [
  { 
    key: 'project1',
    imgSrc: '/images/project1.png', 
    liveUrl: 'https://wee-food.vercel.app/', 
    githubUrl: 'https://github.com/fzan-ghlii/WeeFood' // Asumsi, ganti jika salah
  },
  { 
    key: 'project2',
    imgSrc: '/images/project2.png', 
    liveUrl: 'https://sneagefyshop.vercel.app/', 
    githubUrl: 'https://github.com/fzan-ghlii/SneagefyShop' // Asumsi
  },
  { 
    key: 'project3',
    imgSrc: '/images/project3.png', 
    liveUrl: 'https://bookshelf-ashy-six.vercel.app/', 
    githubUrl: 'https://github.com/fzan-ghlii/Bookshelf-Apps' // Asumsi
  },
];

export default function PortfolioPage() {
  const t = useTranslations('PortfolioPage'); // Inisialisasi
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

      {/* Grid Portofolio */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioData.map((project) => (
          <motion.div
            key={project.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative w-full h-64 bg-card border border-border rounded-lg shadow-custom-light dark:shadow-custom-dark overflow-hidden"
          >
            <Image
              src={project.imgSrc}
              alt={t(`${project.key}_title`)}
              layout="fill"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-4 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t(`${project.key}_title`)}
              </h3>
              <p className="text-gray-200 mb-6">
                {t(`${project.key}_desc_short`)}
              </p>
              <div className="flex space-x-4">
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold transition-transform duration-300 transform hover:scale-105"
                >
                  <Eye size={18} />
                  {t('buttonPreview')}
                </Link>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold transition-transform duration-300 transform hover:scale-105"
                >
                  <Info size={18} />
                  {t('buttonDescription')}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)} // Menutup modal saat backdrop diklik
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card w-11/12 max-w-2xl rounded-lg shadow-lg relative p-8 border border-border"
              onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat konten modal diklik
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
              
              <h3 className="text-3xl font-bold text-foreground mb-6">
                {t(`${selectedProject.key}_title`)}
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t(`${selectedProject.key}_desc_long`)}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={selectedProject.githubUrl}
                  target="_blank"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold py-3 px-6 rounded-full transition-transform duration-300 transform hover:scale-105"
                >
                  <Github size={20} />
                  {t('modalButtonSource')}
                </Link>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-border text-foreground font-bold py-3 px-6 rounded-full transition-colors duration-300 hover:bg-border/80"
                >
                  {t('modalButtonClose')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
