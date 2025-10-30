'use client';

import { Link } from '@/navigation'; // PERBAIKI DI SINI
import Image from 'next/image';
import { Linkedin, Github, Instagram, Twitter } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { useTranslations } from 'next-intl'; // Import

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/fauzan-al-gholi-544b1a2bb' },
  { icon: Github, href: 'https://github.com/fzan-ghlii' },
  { icon: Instagram, href: 'https://www.instagram.com/fauzn_alghlii' },
  { icon: Twitter, href: '#' },
];

export default function HomeSection() {
  const t = useTranslations('HomePage'); // Inisialisasi

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden 
      before:absolute before:inset-0 before:-z-10
      dark:before:bg-[radial-gradient(ellipse_at_70%_30%,rgba(255,140,0,0.15),transparent_70%)]
      dark:after:bg-[radial-gradient(ellipse_at_30%_70%,rgba(255,215,0,0.15),transparent_70%)]
      after:absolute after:inset-0 after:-z-10"
    >
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-8 py-20 pt-32 md:pt-20">
        
        {/* Konten Teks */}
        <div className="flex items-center gap-8 text-center md:text-left">
          {/* Ikon Sosial */}
          <div className="hidden md:flex flex-col gap-6">
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-all duration-300 transform hover:scale-125"
                aria-label={`Fauzan's ${link.icon.displayName}`}
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>

          {/* Teks Utama */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {t('greeting')}
            </h1>
            <h3 className="text-2xl md:text-3xl text-primary font-semibold my-4 h-10">
              <TypeAnimation
                sequence={[
                  t('typedString1'), 1000,
                  t('typedString2'), 1000,
                  t('typedString3'), 1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h3>
            <p className="text-muted-foreground max-w-lg mb-8 mx-auto md:mx-0">
              {t('description')}
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-custom-light dark:shadow-custom-dark"
            >
              {t('buttonContact')}
            </Link>
          </div>
        </div>

        {/* Gambar Profil */}
        <div className="relative mb-12 md:mb-0">
          <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl shadow-primary/50 animate-float">
            <Image
              src="/images/fotoprofil2.jpg"
              alt="Fauzan Al Gholi"
              width={400}
              height={400}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
