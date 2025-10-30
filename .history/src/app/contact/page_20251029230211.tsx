'use client'; // Diperlukan untuk useState dan Framer Motion

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Linkedin, Github, Instagram, Download } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  // State untuk mengelola input form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State untuk status pengiriman form
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi handleSubmit yang baru, sekarang 'async'
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Mencegah halaman refresh
    setIsLoading(true);
    setSubmitStatus(null);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Terima kasih! Pesan Anda telah terkirim.');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        const errorData = await response.json();
        setSubmitStatus('error');
        setSubmitMessage(`Terjadi kesalahan: ${errorData.error || 'Silakan coba lagi.'}`);
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Terjadi kesalahan koneksi. Silakan periksa jaringan Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen container mx-auto px-8 py-20 pt-32">
      {/* Judul Halaman */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold">Hubungi Saya</h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded"></div>
      </motion.div>

      {/* Kontainer Utama (Kartu) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-card p-8 md:p-12 rounded-lg border border-border shadow-custom-light dark:shadow-custom-dark"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Kolom Kiri: Formulir Kontak */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-foreground mb-6">Kirim Pesan</h3>
            
            {/* Pesan status dinamis */}
            {submitMessage && (
              <div className={`p-4 rounded-md mb-6 ${
                submitStatus === 'success' ? 'bg-primary/10 border border-primary text-primary' : 'bg-red-500/10 border border-red-500 text-red-500'
              }`}>
                {submitMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Nama</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Email Anda"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Pesan</label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                  placeholder="Pesan Anda"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isLoading} // Tombol nonaktif saat loading
                className="w-full inline-block bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-custom-light dark:shadow-custom-dark
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </div>

          {/* Kolom Kanan: Info Kontak */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-foreground mb-6">Informasi Kontak</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-primary mt-1 shrink-0" />
                <span>Jl. Budi Utomo, Medan, Indonesia</span>
              </li>
              <li className="flex items-start gap-4">
                <Mail size={20} className="text-primary mt-1 shrink-0" />
                <a href="mailto:algholifauzan@gmail.com" className="hover:text-primary transition-colors">
                  algholifauzan@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Phone size={20} className="text-primary mt-1 shrink-0" />
                <a href="https://wa.me/6281260284201" target="_blank" className="hover:text-primary transition-colors">
                  +62 812 6028 4201
                </a>
              </li>
            </ul>

            {/* Media Sosial */}
            <div className="flex space-x-4 my-8">
              <a href="https://www.linkedin.com/in/fauzan-al-gholi-544b1a2bb" target="_blank" className="p-3 bg-border rounded-full text-foreground hover:text-primary transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/fzan-ghlii" target="_blank" className="p-3 bg-border rounded-full text-foreground hover:text-primary transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.instagram.com/fauzn_alghlii" target="_blank" className="p-3 bg-border rounded-full text-foreground hover:text-primary transition-colors">
                <Instagram size={24} />
              </a>
            </div>

            {/* Tombol Unduh CV */}
            <a
              href="/cvpojan.pdf" // Pastikan file ini ada di /public/cvpojan.pdf
              download
              className="mt-4 w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-custom-light dark:shadow-custom-dark"
            >
              <Download size={20} />
              Unduh CV Saya
            </a>
          </div>

        </div>
      </motion.div>
    </main>
  );
}

