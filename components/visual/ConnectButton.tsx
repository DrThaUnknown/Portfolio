"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from 'react'

export default function ConnectButton() {
  return (
    <Link href="/contact">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-12 w-40 items-center justify-center rounded-full bg-(--primary) text-(--bg-dark) font-medium border border-(--primary) hover:bg-transparent hover:text-(--primary) transition-colors duration-300"
      >
        Get in Touch
      </motion.button>
    </Link>
  )
}
