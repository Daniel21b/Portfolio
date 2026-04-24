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
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-linear-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl" />

      <div className="relative text-zinc-600 dark:text-zinc-400">
        <p className="mb-6 leading-relaxed">
          Hey, I&apos;m Daniel. I&apos;m an{' '}
          <HighlightText color="indigo">ETL Developer</HighlightText> and{' '}
          <HighlightText color="blue">Analytics Engineer</HighlightText> focused on building
          reliable <HighlightText color="purple">Python + SQL pipelines</HighlightText>,
          dimensional models, and BI workflows that turn fragmented operational data into
          decision-ready insights.
        </p>

        <p className="mb-6 leading-relaxed">
          Most recently at <HighlightText color="amber">ICATT Consulting</HighlightText>, I
          engineered ETL pipelines that ingested 10,000+ financial records from multiple source
          systems and reduced reporting cycles from days to under three hours. I also modeled star
          schemas for Power BI, implemented <HighlightText color="green">dbt testing</HighlightText>{' '}
          to catch critical anomalies, and automated reconciliation workflows across internal tools.
        </p>

        <p className="leading-relaxed">
          Previously at <HighlightText color="amber">Boost Labs</HighlightText>, I automated weekly
          reporting pipelines, improved legacy data workflows by 3x, and built self-service
          dashboards for KPI visibility. I graduated from the{' '}
          <HighlightText color="indigo">University of Maryland</HighlightText> with a B.S. in
          Computer Science (GPA 3.5), and I continue building across AWS, dbt, Airflow, FastAPI,
          and modern analytics tooling.
        </p>
      </div>
    </motion.div>
  );
};

export default AboutSection;
