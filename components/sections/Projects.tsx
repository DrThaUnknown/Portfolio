"use client";
import React from 'react'
import { motion } from "framer-motion";
import Planet from '../visual/Planet'


export default function Projects() {
  return (
    <motion.section className='m-20'>
    <motion.div
    className='flex flex-col justify-center items-center h-150 gap-20'
    >
      <div>
        <h2 className="text-4xl font-bold">Featured Projects</h2>
        <p className="text-2xl">Blah blah bleh bleh bleh blo blo vlo</p>
      </div>
      <div className='flex flex-row gap-10 '>
        <motion.div 
        whileHover={{scale: 1.02}}
        transition={{duration : 0.2}}
        className='w-80 h-40 bg-(--bg-light) border rounded-md'>
        <h3 className="font-bold p-3">Corazones Libres</h3>
        <p className='p-4'>Description</p>
        </motion.div>
        <motion.div 
        whileHover={{scale: 1.02}}
        transition={{duration : 0.2}}
        className='w-80 h-40 bg-(--bg-light) border rounded-md'>
        <h3 className="font-bold p-3">Setiment Analizys</h3>
        <p className='p-4'>Description</p>
        </motion.div>
        <motion.div 
        whileHover={{scale: 1.02}}
        transition={{duration : 0.2}}
        className='w-80 h-40 bg-(--bg-light) border rounded-md'>
        <h3 className="font-bold p-3">BlackJack Game</h3>
        <p className='p-4'>Description</p>
        </motion.div>
        <motion.div 
        whileHover={{scale: 1.02}}
        transition={{duration : 0.2}}
        className='w-80 h-40 bg-(--bg-light) border rounded-md'>
        <h3 className="font-bold p-3">Project 4</h3>
        <p className='p-4'>Description</p>
        </motion.div>
      </div>
    </motion.div>
    </motion.section>
  )
}