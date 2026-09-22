import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import RSVPForm from '@/components/rsvp';

const previewGuest = {
  id: 'preview',
  slug: 'preview',
  display_name: 'Ari & Luna',
  is_attending: null,
  whatsapp_number: '',
  wedding_wishes: '',
};

async function getGuest(slug: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    return slug ? previewGuest : null;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return slug ? previewGuest : null;
  }

  return data;
}

export default async function InvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guest = await getGuest(slug);

  if (!guest) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#2d2522]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_34%),radial-gradient(circle_at_bottom,_rgba(127,90,76,0.12),_transparent_40%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-md items-center justify-center px-4 py-8">
        <div className="w-full overflow-hidden rounded-[2rem] border border-[#eadcc9] bg-white/80 p-5 shadow-[0_30px_80px_rgba(63,46,33,0.12)] backdrop-blur-md">
          <div className="mb-5 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d3b16c] bg-[#fffdf9] text-lg font-semibold tracking-[0.18em] text-[#362f2a]">
              H & E
            </div>
          </div>

          <p className="text-center text-[10px] uppercase tracking-[0.38em] text-[#8a7b6d]">The Wedding Of</p>
          <h1 className="mt-4 text-center font-serif text-4xl leading-tight text-[#2f2a27]">{guest.display_name}</h1>

          <div className="my-5 border-y border-[#efe3d3] py-4 text-center">
            <p className="text-sm font-medium text-[#4c413c]">Saturday, October 15, 2026</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[#8a7b6d]">The Grand Ballroom, Jakarta</p>
          </div>

          <div className="mb-6 text-center">
            <p className="text-xs italic text-[#8a7b6d]">Dear {guest.display_name},</p>
            <p className="mt-2 text-sm leading-6 text-[#544c46]">
              You are warmly invited to join us for a joyful celebration of love, family, and a lifetime full of beautiful memories.
            </p>
          </div>

          <RSVPForm guest={guest} />
        </div>
      </div>
    </main>
  );
}