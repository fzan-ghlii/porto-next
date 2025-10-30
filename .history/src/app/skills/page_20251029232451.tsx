'use client'; // Diperlukan untuk Framer Motion

import { motion } from 'framer-motion';

// Data untuk Technical Skills
const technicalSkills = [
  { name: 'Microsoft Office', percentage: 80 },
  { name: 'Stock Analysis', percentage: 75 },
  { name: 'HTML & CSS', percentage: 70 },
  { name: 'JavaScript', percentage: 65 },
  { name: 'PHP', percentage: 55 },
];

// Data untuk Soft Skills
const softSkills = [
  { name: 'Quick Learn', percentage: 95 },
  { name: 'Problem Solving', percentage: 90 },
  { name: 'Adaptation', percentage: 85 },
  { name: 'Leadership', percentage: 80 },
  { name: 'Team Working', percentage: 75 },
];

// Komponen kecil untuk Skill Bar yang bisa dianimasikan
// Kita definisikan di dalam file yang sama agar mudah
type SkillBarProps = {
  skill: {
    name: string;
    percentage: number;
  };
};

const SkillBar = ({ skill }: SkillBarProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-foreground">{skill.name}</span>
        <span className="text-sm text-primary font-semibold">{skill.percentage}%</span>
      </div>
      <div className="w-full bg-border rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full"
          // Animasi: lebar akan bertambah dari 0 ke persentase
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }} // Animasi hanya berjalan sekali
        >
        </motion.div>
      </div>
    </div>
  );
};


export default function SkillsPage() {
  return (
    <main className="min-h-screen container mx-auto px-8 py-20 pt-32">
      {/* Judul Halaman */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold">My Skills</h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded"></div>
      </motion.div>

      {/* Kontainer Grid untuk 2 Kolom Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        
        {/* Kolom Technical Skills */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-card p-8 rounded-lg border border-border shadow-custom-light dark:shadow-custom-dark"
        >
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Technical Skills
          </h3>
          <div>
            {technicalSkills.map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
        </motion.div>

        {/* Kolom Soft Skills */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-card p-8 rounded-lg border border-border shadow-custom-light dark:shadow-custom-dark"
        >
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Soft Skills
          </h3>
          <div>
            {softSkills.map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
}
