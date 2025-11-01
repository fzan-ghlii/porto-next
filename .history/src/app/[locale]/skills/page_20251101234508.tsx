'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/context/TranslationsProvider';

// Data untuk Technical Skills
const technicalSkills = [
  { key: 'skill_office', percentage: 80 },
  { key: 'skill_stock', percentage: 75 },
  { key: 'skill_html_css', percentage: 70 },
  { key: 'skill_js', percentage: 65 },
  { key: 'skill_php', percentage: 55 },
];

// Data untuk Soft Skills
const softSkills = [
  { key: 'skill_learn', percentage: 95 },
  { key: 'skill_problem', percentage: 90 },
  { key: 'skill_adapt', percentage: 85 },
  { key: 'skill_lead', percentage: 80 },
  { key: 'skill_team', percentage: 75 },
];

// Komponen SkillBar (tetap di dalam file)
type SkillBarProps = {
  skill: { key: string; percentage: number };
  label: string;
};

const SkillBar = ({ skill, label }: SkillBarProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <span className="text-base font-medium text-foreground">{label}</span>
        <span className="text-sm font-medium text-primary">{skill.percentage}%</span>
      </div>
      <div className="w-full bg-border rounded-full h-2.5">
        <motion.div
          className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
        ></motion.div>
      </div>
    </div>
  );
};

// Komponen Halaman Utama
export default function SkillsPage() {
  const t = useTranslations('SkillsPage'); // Inisialisasi

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

      {/* Kontainer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        
        {/* Kolom Technical Skills */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-card border border-border p-8 rounded-lg shadow-custom-light dark:shadow-custom-dark"
        >
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">{t('technicalTitle')}</h3>
          <div>
            {technicalSkills.map((skill) => (
              <SkillBar key={skill.key} skill={skill} label={t(skill.key)} />
            ))}
          </div>
        </motion.div>

        {/* Kolom Soft Skills */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-card border border-border p-8 rounded-lg shadow-custom-light dark:shadow-custom-dark"
        >
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">{t('softTitle')}</h3>
          <div>
            {softSkills.map((skill) => (
              <SkillBar key={skill.key} skill={skill} label={t(skill.key)} />
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
}
