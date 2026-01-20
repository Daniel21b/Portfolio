'use client';

import { motion } from 'motion/react';
import HighlightText from './HighlightText';

const AboutSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-16 overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/70 p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] backdrop-blur-xl dark:border-zinc-700/50 dark:bg-zinc-800/70 md:p-8"
    >
      {/* Subtle gradient accent */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl" />

      <div className="relative text-zinc-600 dark:text-zinc-400">
        <p className="mb-6 leading-relaxed">
          Hey, I&apos;m Daniel. I&apos;m a{' '}
          <HighlightText color="indigo">data analyst</HighlightText> with experience in{' '}
          <HighlightText color="blue">cloud-based analytics</HighlightText>,{' '}
          <HighlightText color="purple">ETL pipeline development</HighlightText>, and{' '}
          <HighlightText color="green">business intelligence</HighlightText>. I&apos;m passionate
          about turning data into actionable insights that drive operational decisions across
          healthcare and business environments.
        </p>

        <p className="mb-6 leading-relaxed">
          I graduated from the{' '}
          <HighlightText color="amber">University of Maryland</HighlightText> with a Bachelor of
          Science in <HighlightText color="indigo">Computer Science</HighlightText> (GPA: 3.5) in
          August 2025. During my studies, I developed strong foundations in algorithms, software
          engineering, statistics, data science, and data visualization.
        </p>

        <p className="leading-relaxed">
          I&apos;m proficient in <HighlightText color="blue">SQL optimization</HighlightText>,{' '}
          <HighlightText color="purple">Python-based data processing</HighlightText>, and creating
          dashboards using <HighlightText color="green">Power BI</HighlightText> and{' '}
          <HighlightText color="green">Tableau</HighlightText>. I&apos;ve worked with modern data
          stack tools like <HighlightText color="amber">dbt</HighlightText>,{' '}
          <HighlightText color="amber">AWS</HighlightText>, and{' '}
          <HighlightText color="amber">Snowflake</HighlightText> to build robust data pipelines.
        </p>
      </div>
    </motion.div>
  );
};

export default AboutSection;
