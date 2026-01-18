import React from 'react'
import Planet from '../visual/Planet'
import ConnectButton from '../visual/ConnectButton';

export default function Hero() {
  return (
    <section className='flex justify-center gap-40 m-5'>
        <div className='flex flex-col gap-5'>
            <h1 className='text-4xl font-bold'>Welcome to <br /> My Portfolio Page</h1>
            <h2 className='text-2xl'>This is just a place to showcase <br /> my skills and passion</h2>
            <ConnectButton/>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Planet/>
    
        </div>
    </section>
  )
}
