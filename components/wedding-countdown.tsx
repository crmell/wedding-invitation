'use client';

import { useEffect, useMemo, useState } from 'react';

const targetDate = new Date('2026-12-20T19:00:00+07:00');

export function WeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = Date.now();
    const distance = Math.max(targetDate.getTime() - now, 0);

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = Date.now();
      const distance = Math.max(targetDate.getTime() - now, 0);

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const values = useMemo(
    () => [
      { label: 'Days', value: timeLeft.days },
      { label: 'Hours', value: timeLeft.hours },
      { label: 'Min', value: timeLeft.minutes },
      { label: 'Sec', value: timeLeft.seconds },
    ],
    [timeLeft],
  );

  return (
    <div className="rounded-[1.5rem] border border-[#efe3d3] bg-[#fffaf5] p-4">
      <p className="text-center text-[10px] uppercase tracking-[0.3em] text-[#8a7b6d]">See you in</p>
      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        {values.map((item) => (
          <div key={item.label} className="rounded-xl border border-[#eadcc9] bg-white p-2">
            <p className="text-xl font-bold text-[#312b28]">{String(item.value).padStart(2, '0')}</p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-[#8a7b6d]">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
