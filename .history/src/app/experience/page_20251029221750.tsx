'use client'; // Diperlukan untuk Framer Motion

import { motion } from 'framer-motion';

// Data untuk timeline, diambil dari HTML asli Anda
const experienceData = [
  {
    date: 'August 2023 - Now',
    title: 'Digital Business Student',
    company: 'Medan State University',
    description: 'Majoring in a curriculum focused on leveraging digital technology for business innovation, covering strategies for both internal process optimization and external market expansion.',
  },
  {
    date: 'October 2024 - Now',
    title: 'Vice Head of Investment Division',
    company: 'KSPM GIBEI UNIMED',
    description: 'Led educational programs on financial literacy and capital markets. Developed content on stock analysis and organized public events to enhance investment knowledge.',
  },
  {
    date: 'June 2025 - Now',
    title: 'Fundraising Staff',
    company: 'Sikkola Rakyat',
    description: 'Drove fundraising efforts by creating innovative campaigns and exploring entrepreneurial ventures. Successfully built strategic partnerships to secure sponsorships for community-based education programs.',
  },
  {
    date: 'July 2025 - August 2025',
    title: 'Internship',
    company: 'DPRD North Sumatra (Commission E)',
    description: 'Gained hands-on experience in public administration by managing official correspondence, documenting meeting proceedings, and supporting team coordination efforts within the commission.',
  },
  {
    date: 'September 2024',
    title: 'Committee Member',
    company: 'Stocklab Investment Competition',
    description: 'Contributed to a major investment competition by supervising the Stocklab simulation, managing in-game financial transactions, and ensuring a smooth and orderly event flow.',
  },
  {
    date: 'August 2020 - May 2023',
    title: 'Natural Sciences Student',
    company: 'Senior High School 1 Percut Sei Tuan',
    description: 'Completed a rigorous Natural Sciences curriculum, developing a strong analytical and quantitative foundation through core subjects like Mathematics, Physics, and Chemistry.',
  },
];

export default function ExperiencePage() {
  return (
    <main className="min-h-screen container mx-auto px-8 py-20 pt-32">
      {/* Judul Halaman */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold">Experience & Education</h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded"></div>
      </motion.div>

      {/* Kontainer Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Garis Vertikal Timeline */}
        <div className="absolute top-0 bottom-0 w-1 bg-primary left-5 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2"></div>

        {/* Memetakan data pengalaman */}
        {experienceData.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div key={index} className="relative mb-12">
              {/* Titik pada Timeline */}
              <div className="absolute w-5 h-5 bg-background border-4 border-primary rounded-full z-10 top-1 left-5 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2"></div>

              {/* Konten Kartu (dengan animasi) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.4 }} // Animasi terpicu saat 40% kartu terlihat
                className={`ml-12 md:ml-0 ${
                  isLeft
                    ? 'md:w-1/2 md:mr-[50%] md:text-right md:pr-10'
                    : 'md:w-1/2 md:ml-[50%] md:text-left md:pl-10'
                }`}
              >
                <div className="bg-card p-6 rounded-lg border border-border shadow-custom-light dark:shadow-custom-dark transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:hover:shadow-primary/30">
                  <p className="text-primary font-semibold mb-2">{item.date}</p>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground font-medium mb-3">{item.company}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
