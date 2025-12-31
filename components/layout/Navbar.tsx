"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
const pathname = usePathname()
const [isVisible, setIsVisible] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);

useEffect(() => {
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
        setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
}, [lastScrollY]);

return (
    <motion.div
        whileHover={{scale : 1.02}}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        exit={{ y: -100 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-10"
    >
        <div>
            <section className='flex justify-center py-5'>
                <div className='flex justify-between items-center w-240 h-20 rounded-4xl bg-(--bg) hover:bg-linear-to-bl hover:from-(--bg-light) hover:to-(--bg) p-10 border border-t-(--highlight) border-(--border-muted)
                                drop-shadow-md hover:drop-shadow-neutral-500'>
                    <div className='flex'>
                        <Link href="/"><motion.button 
                            whileHover={{scale:1.05}}
                            whileTap={{scale: 0.95}}
                            className="flex justify-center">
                                <h3>Anthony Contreras</h3>
                        </motion.button></Link>
                    </div>
                    <div className='flex justify-center'>
                        <nav className="">
                            <ul className='flex flex-row gap-5'>
                                <li><Link href="/"><motion.button 
                                variants={{
                                    rest: { scale: 1 },
                                    hover: { scale: 1.05 },
                                }}
                                whileHover="hover"
                                whileTap={{scale: 0.95}}
                                initial="rest"
                                animate={pathname === "/" ? "hover" : "rest"}
                                transition={{ duration: 0.55 }}
                                className='relative text-neutral-300 hover:text-neutral-50'>
                                    Home
                                    <motion.span
                                        variants={{
                                        rest: { scaleX: 0 },
                                        hover: { scaleX: 1 },
                                        }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        className="absolute left-0 bottom-0 h-[2px] w-full bg-neutral-50 origin-left"
                                    />
                                    </motion.button></Link></li>
                                <li><Link href="/about"><motion.button 
                                variants={{
                                    rest: { scale: 1 },
                                    hover: { scale: 1.05 },
                                }}
                                whileHover="hover"
                                whileTap={{scale: 0.95}}
                                initial="rest"
                                animate={pathname === "/about" ? "hover" : "rest"}
                                transition={{ duration: 0.15 }}
                                className='relative text-neutral-300 hover:text-neutral-50'>
                                    About
                                    <motion.span
                                        variants={{
                                        rest: { scaleX: 0 },
                                        hover: { scaleX: 1 },
                                        }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        className="absolute left-0 bottom-0 h-[2px] w-full bg-neutral-50 origin-left"
                                    />
                                    </motion.button></Link></li>
                                <li><Link href="/projects"><motion.button
                                variants={{
                                    rest: { scale: 1 },
                                    hover: { scale: 1.05 },
                                }}
                                whileHover="hover"
                                whileTap={{scale: 0.95}}
                                initial="rest"
                                animate={pathname === "/projects" ? "hover" : "rest"}
                                transition={{ duration: 0.15 }}
                                className='relative text-neutral-300 hover:text-neutral-50'>
                                    Projects
                                    <motion.span
                                        variants={{
                                        rest: { scaleX: 0 },
                                        hover: { scaleX: 1 },
                                        }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        className="absolute left-0 bottom-0 h-[2px] w-full bg-neutral-50 origin-left"
                                    />
                                    </motion.button></Link></li>
                                <li><Link href="/contact"><motion.button 
                                variants={{
                                    rest: { scale: 1 },
                                    hover: { scale: 1.05 },
                                }}
                                whileHover="hover"
                                whileTap={{scale: 0.95}}
                                initial="rest"
                                animate={pathname === "/contact" ? "hover" : "rest"}
                                transition={{ duration: 0.15 }}
                                className='relative text-neutral-300 hover:text-neutral-50'>
                                    Contact
                                    <motion.span
                                        variants={{
                                        rest: { scaleX: 0 },
                                        hover: { scaleX: 1 },
                                        }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        className="absolute left-0 bottom-0 h-[2px] w-full bg-neutral-50 origin-left"
                                    />
                                    </motion.button></Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </div>
    </motion.div>
)
}
