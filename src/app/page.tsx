'use client'
import Link from 'next/link';
import React from 'react';
import './globals.css';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    
        <Link href='/game/new-game' className='btn-start'>
          <button className="btn btn-primary">Start play tic tac toe</button>
        </Link>
        
      </main>
     
    </div>
  );
}
