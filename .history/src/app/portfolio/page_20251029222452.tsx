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

// Data proyek, diambil dari HTML asli Anda
const portfolioData: Project[] = [
  {
    title: 'Fintech App - GIBEI UNIMED',
    description: 'Aplikasi edukasi investasi.',
    longDescription: 'Aplikasi Fintech Edukasi Investasi yang dirancang untuk platform Android dan iOS. Proyek ini bertujuan untuk meningkatkan literasi keuangan di kalangan mahasiswa melalui fitur-fitur interaktif seperti simulasi trading, artikel edukasi, dan forum diskusi.',
    imageUrl: '/images/project1.png', // Pastikan gambar ada di /public/images/
    githubUrl: 'https://github.com/fzan-ghlii/gibei-invest',
  },
  {
    title: 'Company Profile - Sikkola Rakyat',
    description: 'Website profil komunitas.',
    longDescription: 'Sebuah website company profile yang didedikasikan untuk Sikkola Rakyat, sebuah komunitas sosial yang berfokus pada pendidikan anak-anak kurang mampu. Website ini menampilkan visi, misi, program, dan galeri kegiatan untuk menarik donatur dan relawan.',
    imageUrl: '/images/project2.png',
    githubUrl: 'https://github.com/fzan-ghlii/sikkola-rakyat',
  },
  {
    title: 'E-commerce - UMKM Medan',
    description: 'Platform E-commerce produk lokal.',
    longDescription: 'Platform E-commerce untuk UMKM kota Medan. Proyek ini dibuat untuk membantu digitalisasi UMKM lokal, dilengkapi dengan fitur manajemen produk, keranjang belanja, dan sistem pembayaran sederhana untuk memfasilitasi penjualan online.',
    imageUrl: '/images/project3.png',
    githubUrl: '#',
  },
  {
    title: 'Landing Page - Agensi Digital',
    description: 'Desain landing page modern.',
    longDescription: 'Sebuah landing page modern dan responsif untuk agensi digital. Didesain untuk menarik klien potensial dengan menonjolkan portofolio, layanan, dan testimoni klien. Fokus pada UI/UX yang bersih dan konversi.',
    imageUrl: '/images/project4.png',
    githubUrl: '#',
  },
  {
    title: 'Portfolio Versi 1',
    description: 'Website portofolio pribadi.',
    longDescription: 'Versi pertama dari website portofolio pribadi saya, dibuat dengan HTML, CSS, dan JavaScript murni. Proyek ini adalah fondasi dari apa yang Anda lihat sekarang, menunjukkan evolusi kemampuan web development saya.',
    imageUrl: '/images/project5.png',
    githubUrl: '#',
  },
  {
    title: 'Investment Calculator',
    description: 'Kalkulator investasi simpel.',
    longDescription: 'Sebuah alat bantu berbasis web sederhana untuk menghitung potensi keuntungan investasi (Compound Interest). Dibuat dengan JavaScript untuk membantu visualisasi pertumbuhan dana dalam investasi jangka panjang.',
    imageUrl: '/images/project6.png',
    githubUrl: '#',
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
              <div className="flex space-x-4">
                <Link href={project.githubUrl} target="_blank" className="p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors">
                  <Github size={20} />
                </Link>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/80 transition-colors"
                >
                  Deskripsi
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Detil Proyek */}
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
