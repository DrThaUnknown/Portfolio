"use client";
import React from 'react'
import { motion } from "framer-motion";


export default function Projects() {
  return (
    <section className='m-20'>
    <motion.div
    className='flex flex-col h-200 gap-40'
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
        <h3 className="font-bold m-5">Project 1</h3>
        <p className='m-3'>Description</p>
        </motion.div>
        <motion.div 
        whileHover={{scale: 1.02}}
        transition={{duration : 0.2}}
        className='w-80 h-40 bg-(--bg-light) border rounded-md'>
        <h3 className="font-bold m-5">Project 2</h3>
        <p className='m-3'>Description</p>
        </motion.div>
        <motion.div 
        whileHover={{scale: 1.02}}
        transition={{duration : 0.2}}
        className='w-80 h-40 bg-(--bg-light) border rounded-md'>
        <h3 className="font-bold m-5">Project 3</h3>
        <p className='m-3'>Description</p>
        </motion.div>
        <motion.div 
        whileHover={{scale: 1.02}}
        transition={{duration : 0.2}}
        className='w-80 h-40 bg-(--bg-light) border rounded-md'>
        <h3 className="font-bold m-5">Project 4</h3>
        <p className='m-3'>Description</p>
        </motion.div>
      </div>
    

    </motion.div>
    </section>
  )
}