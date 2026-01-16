'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

interface HeroSectionProps {
  name: string;
  title: string;
  intro: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export default function HeroSection({ name, title, intro }: HeroSectionProps) {
  return (
    <div className="flex flex-col-reverse items-start sm:flex-row">
      <motion.div 
        className="flex flex-col pr-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1 
          variants={item}
          className="mb-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl"
        >
          {name}
        </motion.h1>
        <motion.h2 
          variants={item}
          className="mb-4 text-zinc-600 dark:text-zinc-300"
        >
          {title}
        </motion.h2>
        <motion.p 
          variants={item}
          className="mb-16 text-zinc-500 dark:text-zinc-400"
        >
          {intro}
        </motion.p>
      </motion.div>

      {/* Profile image with glowing spot effect */}
      <motion.div 
        className="relative mb-8 mr-auto w-[80px] sm:mb-0 sm:w-[176px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {/* Glowing background spot */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30 blur-2xl" />
        <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 blur-xl animate-pulse" />
        
        <Image
          alt="Daniel Berhane"
          height={500}
          width={500}
          src="/static/images/portfolio_profile.png"
          sizes="30vw"
          priority
          className="relative rounded-full ring-2 ring-white/20 dark:ring-white/10"
        />
      </motion.div>
    </div>
  );
}

