"use client"; 
import { motion } from "framer-motion"; 
export default function Planet() { 
  return ( 
  <> 
  <motion.div 
  initial={{ opacity: 0, rotate: -10, y: 10 }} 
  animate={{ opacity: 1, rotate: 10, y: 0 }} 
  transition={{ opacity: { duration: 2 }, 
  rotate: { duration: 8, 
    repeat: Infinity, 
    ease: "easeInOut", 
    repeatType: "mirror" }, 
    y: { duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }, }} 
    className="flex relative justify-between rounded-full size-80 bg-radial-[at_25%_25%] from-(--primary) to-(secondary) to-75% drop-shadow-none sm:drop-shadow-xl sm:drop-shadow-lime-200"> <motion.span className="absolute rounded-full size-82 bg-radial-[at_25%_25%] from-lime-100 to-lime-950 to-75% opacity-5" > 
    </motion.span>
    </motion.div> 
    </> 
    ) 
  }