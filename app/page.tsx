import React from 'react'
import Hero from "@/components/sections/Hero";
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import ScrollDownArrow from '@/components/visual/ScrollDownArrow';

export default function page() {
  return (
    <section className="py-24">
      <Hero/>
      <ScrollDownArrow/>
      <Projects/>
      <Skills/>
    </section>
  )
}
