'use client'; // Diperlukan untuk useState, useEffect, dan Framer Motion

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X } from 'lucide-react';

// Tipe data untuk setiap proyek
type Project = {
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string; // Link live demo (opsional)
};

// Data proyek, di-update dengan liveUrl dari HTML asli
const portfolioData: Project[] = [
  {
    title: 'WeeFood',
    description: 'A restaurant catalog PWA.',
    longDescription: 'A restaurant catalog Progressive Web App (PWA) that fetches data from a public API. It features offline capabilities and installability, utilizing IndexedDB for local data storage, retrieval, and deletion, ensuring full functionality without an internet connection. The app is built with high accessibility standards.',
    imageUrl: '/images/project1.png',
    githubUrl: 'https://github.com/fzan-ghlii', // Asumsi, ganti jika perlu
    liveUrl: 'https://wee-food.vercel.app/', // Diambil dari HTML
  },
  {
    title: 'Sneagefy Shop',
    description: 'Landing page shoe store.',
    longDescription: 'A clean and modern landing page designed for Sneagefy Shop, showcasing a diverse collection of footwear. The project focuses on creating an engaging visual experience to attract customers and highlight featured products.',
    imageUrl: '/images/project2.png',
    githubUrl: 'https://github.com/fzan-ghlii', // Asumsi, ganti jika perlu
    liveUrl: 'https://sneagefyshop.vercel.app/', // Diambil dari HTML
  },
  {
    title: 'Bookshelf Apps',
    description: 'bookshelf management.',
    longDescription: 'A dynamic bookshelf management application built with a focus on user interaction and data persistence. The app allows users to add, manage, and categorize books based on their reading status (completed or in-progress), with all data handled seamlessly in the browser.',
    imageUrl: '/images/project3.png',
    githubUrl: 'https://github.com/fzan-ghlii', // Asumsi, ganti jika perlu
    liveUrl: 'https://bookshelf-ashy-six.vercel.app/', // Diambil dari HTML
  },
  {
    title: 'Landing Page - Agensi Digital',
    description: 'Desain landing page modern.',
    longDescription: 'Sebuah landing page modern dan responsif untuk agensi digital. Didesain untuk menarik klien potensial dengan menonjolkan portofolio, layanan, dan testimoni klien. Fokus pada UI/UX yang bersih dan konversi.',
    imageUrl: '/images/project4.png',
    githubUrl: '#',
    // liveUrl: opsional
  },
  {
    title: 'Portfolio Versi 1',
    description: 'Website portofolio pribadi.',
    longDescription: 'Versi pertama dari website portofolio pribadi saya, dibuat dengan HTML, CSS, dan JavaScript murni. Proyek ini adalah fondasi dari apa yang Anda lihat sekarang, menunjukkan evolusi kemampuan web development saya.',
    imageUrl: '/images/project5.png',
    githubUrl: '#',
    // liveUrl: opsional
  },
  {
    title: 'Investment Calculator',
    description: 'Kalkulator investasi simpel.',
    longDescription: 'Sebuah alat bantu berbasis web sederhana untuk menghitung potensi keuntungan investasi (Compound Interest). Dibuat dengan JavaScript untuk membantu visualisasi pertumbuhan dana dalam investasi jangka panjang.',
    imageUrl: '/images/project6.png',
    githubUrl: '#',
    // liveUrl: opsional
  },
];

// Varian animasi untuk modal
const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.1 } },
};

export default function PortfolioPage() {
  // State untuk mengelola modal
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
        <h2 className="text-4xl font-bold">Project Portfolio</h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded"></div>
      </motion.div>

      {/* Grid untuk Kartu Portfolio */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioData.map((project, index) => (
          <motion.div
            key={project.title}
            className="group relative w-full h-64 bg-card rounded-lg overflow-hidden shadow-custom-light dark:shadow-custom-dark border border-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Gambar Proyek */}
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay saat Hover */}
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-6 text-center
                        opacity-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-200 mb-4">{project.description}</p>
              
              {/* === PERUBAHAN DI SINI === */}
              <div className="flex space-x-4">
                {/* Tombol Preview (jika liveUrl ada) */}
                {project.liveUrl && (
                  <Link 
                    href={project.liveUrl} 
                    target="_blank" 
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium hover:bg-white/40 transition-colors"
                  >
                    <ExternalLink size={18} />
                    Preview
                  </Link>
                )}
                {/* Tombol Deskripsi */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/80 transition-colors"
                >
                  Deskripsi
                </button>
              </div>
              {/* === AKHIR PERUBAHAN === */}

            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Detil Proyek (Tidak ada perubahan, sudah benar) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalBackdropVariants}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop (klik untuk menutup) */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            ></div>

            {/* Konten Modal */}
            <motion.div
              className="relative w-full max-w-2xl bg-card rounded-lg shadow-lg z-10 overflow-hidden"
              variants={modalContentVariants}
            >
              <div className="w-full h-64 relative">
                <Image
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">{selectedProject.title}</h2>
                <p className="text-muted-foreground mb-6">{selectedProject.longDescription}</p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <Link href={selectedProject.githubUrl} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-border text-foreground rounded-lg hover:bg-border/80 transition-colors">
                      <Github size={18} /> Source Code
                    </Link>
                    {selectedProject.liveUrl && (
                      <Link href={selectedProject.liveUrl} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors">
                        <ExternalLink size={18} /> Live Demo
                      </Link>
                    )}
                  </div>
                  <button onClick={() => setSelectedProject(null)} className="p-2 text-muted-foreground hover:text-foreground">
                    <X size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

