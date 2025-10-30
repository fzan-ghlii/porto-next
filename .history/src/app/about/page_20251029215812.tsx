'use client'; // Diperlukan untuk Framer Motion

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    // Kita gunakan min-h-screen agar konten mengisi halaman
    <main className="min-h-screen container mx-auto px-8 py-20 pt-32">
      <motion.div
        // Animasi fade-in dan slide-up saat halaman dimuat
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Judul Halaman */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">About Me</h2>
          {/* Garis bawah judul, meniru desain asli */}
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded"></div>
        </div>

        {/* Konten About: Layout 2 Kolom */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Kolom Gambar */}
          <div className="flex-1 w-full md:w-1/2">
            <Image
              src="/images/fotoprofil1.jpg" // Pastikan gambar ini ada di /public/images
              alt="Fauzan Al Gholi"
              width={500}
              height={500}
              className="rounded-lg shadow-custom-light dark:shadow-custom-dark object-cover aspect-square"
            />
          </div>

          {/* Kolom Teks */}
          <div className="flex-1 w-full md:w-1/2">
            <h3 className="text-3xl font-semibold text-foreground mb-6">My Journey</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              I am a Digital Business undergraduate specializing in the dynamic fields of web development and financial technology. My core passion lies in using technical market analysis and modern digital tools to advance capital market education for a wider audience.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              My leadership experience includes serving as Vice Head of the Investment Division at KSPM GIBEI UNIMED and as a Fundraising Staff for Sikkola Rakyat, where I've honed skills in financial literacy and community outreach. An internship with Commission E at the North Sumatra DPRD also provided me with a unique understanding of how public policy shapes social welfare initiatives.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Driven by these experiences, I am actively seeking to apply my skills in a professional setting. I am eager to contribute to collaborative, hands-on projects and am particularly interested in opportunities within the fintech and digital product sectors that focus on data-driven investing and innovation.
            </p>
            
            {/* Tombol Aksi */}
            <Link
              href="https://wa.me/6281260284201"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-custom-light dark:shadow-custom-dark"
            >
              More About Me
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

