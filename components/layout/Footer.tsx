"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/DrThaUnknown", icon: "->" },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/contreras-linarez-anthony/",
      icon: "->",
    },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative z-10 mt-20 border-t border-(--border-muted) bg-(--bg-dark)/80 backdrop-blur-sm">
      <div className=" flex justify-center py-16">
        <div className="w-full max-w-[60rem] px-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <div className="flex flex-col gap-4">
              <motion.h3
                whileHover={{ scale: 1.02 }}
                className="text-2xl font-bold"
              >
                Anthony Contreras
              </motion.h3>
              <p className="text-(--text-muted) text-sm leading-relaxed">
                Developer passionate about creating beautiful and functional web experiences.
              </p>
                <p className="text-(--text-muted) text-sm leading-relaxed">
                Inspired after watching Interstellar and the wonders of the cosmos.
                </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold text-(--highlight)">Quick Links</h4>
              <nav>
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="relative text-(--text-muted) hover:text-(--text) transition-colors text-sm inline-block hover:translate-x-1 transition-transform duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold text-(--highlight)">Connect</h4>
              <ul className="flex flex-col gap-3">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-(--text-muted) hover:text-(--text) transition-colors text-sm group"
                    >
                      <span>{social.name}</span>
                      <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
                        {social.icon}
                      </span>
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
            className="flex justify-center items-center pt-8 border-t border-(--border-muted)"
          >
            <p className="text-(--text-muted) text-sm">
              © {currentYear} Anthony Contreras. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
