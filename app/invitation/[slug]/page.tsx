import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import RSVPForm from '../../../components/RSVPForm';

// Initialize Supabase Server client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function InvitationPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Fetch guest data securely from Supabase based on the URL slug
  const { data: guest, error } = await supabase
    .from('guests')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !guest) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-[#FDFBF7] text-[#2C2C2C] flex flex-col items-center justify-between p-6 overflow-hidden">
      
      {/* 🖼️ CANVA IMAGE ASSET PLACEHOLDER 1: Top Floral/Border Decoration */}
      <div className="absolute top-0 left-0 w-full pointer-events-none opacity-90 animate-fade-in">
        {/* TODO: Replace src with your exported Canva graphic */}
        <img 
          src="/images/canva-top-floral.png" 
          alt="Top Floral Decoration" 
          className="w-full max-h-48 object-cover"
        />
      </div>

      {/* Main Invitation Card Content */}
      <div className="z-10 max-w-md w-full bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 my-auto text-center border border-[#EFECE6] transition-all duration-700 transform translate-y-0 animate-slide-up">
        
        {/* 🖼️ CANVA IMAGE ASSET PLACEHOLDER 2: Couple or Invitation Badge/Logo */}
        <div className="mx-auto w-24 h-24 mb-4 relative rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-sm">
          {/* TODO: Replace src with your exported Canva monogram or circular photo */}
          <img 
            src="/images/canva-monogram.png" 
            alt="Monogram" 
            className="w-full h-full object-cover animate-pulse duration-3000"
          />
        </div>

        <p className="text-xs uppercase tracking-widest text-[#8C8275] mb-2">The Wedding Of</p>
        <h1 className="text-3xl md:text-4xl font-serif text-[#3A3532] mb-4">
          {guest.display_name}
        </h1>

        <div className="border-t border-b border-[#EFECE6] py-4 my-4 space-y-1">
          <p className="text-sm font-medium text-[#59524C]">Saturday, October 15, 2026</p>
          <p className="text-xs text-[#8C8275]">The Grand Ballroom, Jakarta</p>
        </div>

        {/* Personalized Greeting */}
        <div className="mb-6">
          <p className="text-xs text-[#8C8275] italic">Special Invitation Dedicated To:</p>
          <p className="text-base font-semibold text-[#4A433D]">{guest.display_name}</p>
        </div>

        {/* RSVP Interactive Component */}
        <RSVPForm guest={guest} />
      </div>

      {/* 🖼️ CANVA IMAGE ASSET PLACEHOLDER 3: Bottom Floral/Border Decoration */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none opacity-90">
        {/* TODO: Replace src with your exported Canva bottom footer border */}
        <img 
          src="/images/canva-bottom-floral.png" 
          alt="Bottom Floral Decoration" 
          className="w-full max-h-40 object-cover"
        />
      </div>

      <footer className="z-10 text-[10px] text-[#A69E93] mt-4">
        Created with Next.js & Canva Assets
      </footer>
    </main>
  );
}