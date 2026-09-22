'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const previewNames = {
  first: 'Joe',
  second: 'Jane',
};

export default function HomePage() {
  const router = useRouter();
  const [slug, setSlug] = useState('inivtes-and-inviteetwo');
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenInvitation = () => {
    const safeSlug = slug.trim().replace(/^\/+|\/+$/g, '') || 'inivtes-and-inviteetwo';
    setIsOpening(true);
    window.setTimeout(() => {
      router.push(`/${safeSlug}`);
    }, 400);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#2d2522]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_40%),radial-gradient(circle_at_bottom,_rgba(129,88,67,0.12),_transparent_38%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-8"
      >
        <div className="w-full rounded-[2rem] border border-[#eadcc9] bg-white/75 p-5 shadow-[0_30px_80px_rgba(63,46,33,0.12)] backdrop-blur-md">
          <div className="flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d3b16c] bg-[#fffdf9] text-base font-semibold tracking-[0.18em] text-[#362f2a]">
              H & E
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#8a7b6d]">Wedding Invitation</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-[#2f2a27]">
              Dear {previewNames.first} & {previewNames.second},
            </h1>
            <p className="mt-3 text-base italic text-[#6d5d4d]">you are invited to celebrate our love.</p>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-[#efe3d3] bg-[linear-gradient(160deg,_#fffaf5_0%,_#f3eadf_50%,_#f4e8d8_100%)] p-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8a7b6d]">Together with their families</p>
            <h2 className="mt-4 font-serif text-4xl text-[#2d2522]">Ari <span className="text-[#af7a5f]">&</span> Luna</h2>
            <div className="mx-auto my-4 h-px w-16 bg-[#d5b888]" />
            <p className="text-xs uppercase tracking-[0.22em] text-[#695d54]">Saturday, 20 Dec 2026</p>
            <p className="mt-2 text-sm text-[#554d49]">Sheraton Grand Jakarta - Gandaria City Hotel, Jakarta</p>
          </div>

          <div className="mt-5 space-y-3">
            <label className="block text-[10px] uppercase tracking-[0.24em] text-[#7d6a5b]">
              Invitation slug
            </label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-full border border-[#e3d3c1] bg-[#fffdfb] px-4 py-3 text-sm text-[#2d2522] outline-none ring-0 placeholder:text-[#b8a894] focus:border-[#cfb06d]"
              placeholder="inivtes-and-inviteetwo"
            />
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenInvitation}
            className={`mt-5 w-full rounded-full bg-[#312b28] px-5 py-3 text-sm font-medium uppercase tracking-[0.18em] text-white shadow-lg shadow-[#312b28]/20 transition-all ${
              isOpening ? 'opacity-80' : 'hover:bg-[#201d1b]'
            }`}
          >
            {isOpening ? 'Opening...' : 'Open Invitation'}
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
