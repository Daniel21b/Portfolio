'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  link?: {
    url: string;
    label: string;
  };
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative mb-16">
      {/* Gradient connecting line */}
      <div className="absolute left-[5px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-30" />
      
      <ol className="relative space-y-10">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="ml-6"
          >
            {/* Timeline dot */}
            <motion.div 
              className="absolute -left-[5px] mt-1.5 h-3 w-3 rounded-full border-2 border-indigo-500 bg-zinc-50 dark:bg-zinc-950"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
            />
            
            <time className="mb-1 block text-sm font-normal leading-none text-zinc-500 dark:text-zinc-400">
              {item.date}
            </time>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              {item.title}
            </h3>
            <p className="mt-1 text-base font-normal text-zinc-600 dark:text-zinc-400">
              {item.description}
            </p>
            
            {item.link && (
              <motion.a
                href={item.link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex items-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.link.label}
                <ArrowRight className="ml-2 h-3 w-3" />
              </motion.a>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

