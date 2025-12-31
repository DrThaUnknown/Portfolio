import React from 'react'
import Link from "next/link";

export default function footer() {
  return (
    <section className='flex absolute'>
      <div className='bg-(--bg-light) w-fit h-full'>
        <nav className="py-5">
            <ul>
            <li><Link href="/"><button>Home</button></Link></li>
            <li><Link href="/about"><button>About</button></Link></li>

            </ul>
        </nav>
      </div>
    </section>
  )
}
