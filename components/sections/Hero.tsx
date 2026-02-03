"use client";

import React from 'react'
import { motion } from 'framer-motion';
import Planet from '../visual/Planet'
import ConnectButton from '../visual/ConnectButton';

export default function Hero() {
  return (
    <section className='flex flex-col lg:flex-row justify-center gap-8 lg:gap-40 m-5 min-h-[80vh] items-center'>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='flex flex-col gap-6'
        >
            {/* Home Header */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-3xl sm:text-4xl lg:text-5xl font-bold'
            >
              Welcome! <br /> I'm Anthony
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='text-lg sm:text-xl lg:text-2xl text-(--text-muted)'
            >
              Building innovative solutions <br /> with passion and creativity
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <ConnectButton/>
            </motion.div>
        </motion.div>
        {/* Home Planet */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col items-center gap-4 w-full lg:w-auto max-w-xs lg:max-w-none"
        >
          <Planet/>
        </motion.div>
    </section>
  )
}
