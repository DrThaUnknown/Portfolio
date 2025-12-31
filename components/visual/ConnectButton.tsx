"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from 'react'

export default function ConnectButton() {
  return (
    <>
    <Link href="/"><motion.button
    whileHover={{scale:1.05}}
    whileTap={{scale: 0.95}}
    className="flex h-10 w-32 rounded-full bg-transparent opacity-40 border justify-center"
    >
        hello
    </motion.button></Link>
    </>
  )
}
