"use client";

import React from 'react'
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/DrThaUnknown', icon: '→' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/contreras-linarez-anthony/', icon: '→' },
  ];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className='mt-20 border-t border-(--border-muted)'>
      <div className='flex justify-center py-16'>
        <div className='w-240 px-10'>
          {/* Main Footer Content */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-12'>
            {/* Brand Section */}
            <div className='flex flex-col gap-4'>
              <motion.h3 
                whileHover={{ scale: 1.02 }}
                className='text-2xl font-bold'
              >
                Anthony Contreras
              </motion.h3>
              <p className='text-(--text-muted) text-sm leading-relaxed'>
                Full-stack developer passionate about creating beautiful and functional web experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div className='flex flex-col gap-4'>
              <h4 className='text-lg font-semibold text-(--highlight)'>Quick Links</h4>
              <nav>
                <ul className='flex flex-col gap-2'>
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href}>
                        <motion.button
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className='relative text-(--text-muted) hover:text-(--text) transition-colors text-sm'
                        >
                          {link.name}
                        </motion.button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Social Links */}
            <div className='flex flex-col gap-4'>
              <h4 className='text-lg font-semibold text-(--highlight)'>Connect</h4>
              <ul className='flex flex-col gap-3'>
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <Link href={social.href} target="_blank" rel="noopener noreferrer">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex items-center gap-2 text-(--text-muted) hover:text-(--text) transition-colors text-sm'
                      >
                        <span>{social.name}</span>
                        <motion.span
                          initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          {social.icon}
                        </motion.span>
                      </motion.button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-(--border-muted)'
          >
            <p className='text-(--text-muted) text-sm'>
              © {currentYear} Anthony Contreras. All rights reserved.
            </p>
            <div className='flex gap-6'>
              <Link href="#">
                <motion.button
                  whileHover={{ y: -2 }}
                  className='text-(--text-muted) hover:text-(--text) text-sm transition-colors'
                >
                  Privacy Policy
                </motion.button>
              </Link>
              <Link href="#">
                <motion.button
                  whileHover={{ y: -2 }}
                  className='text-(--text-muted) hover:text-(--text) text-sm transition-colors'
                >
                  Terms of Service
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
