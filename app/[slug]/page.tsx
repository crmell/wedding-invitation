import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import { AnimatedWeddingCard } from '@/components/animated-wedding-card';
import { WeddingAudio } from '@/components/wedding-audio';

const previewGuest = {
  id: 'preview',
  slug: 'inivtes-and-inviteetwo',
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

export default async function InvitationSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guest = await getGuest(slug);

  if (!guest) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#2d2522]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_34%),radial-gradient(circle_at_bottom,_rgba(127,90,76,0.12),_transparent_40%)]" />
      <div className="absolute left-1/2 top-12 h-52 w-52 -translate-x-1/2 rounded-full bg-[#f4dfc3]/60 blur-3xl" />

      <AnimatedWeddingCard className="relative z-10 mx-auto flex min-h-screen w-full max-w-md items-center justify-center px-4 py-8">
        <div className="relative w-full overflow-hidden rounded-[2rem] border border-[#eadcc9] bg-white/80 p-5 shadow-[0_30px_80px_rgba(63,46,33,0.12)] backdrop-blur-md">
          <div className="absolute inset-x-8 top-0 h-20 rounded-b-[999px] bg-[radial-gradient(circle,_rgba(212,175,55,0.25),_transparent_65%)]" />

          <div className="relative">
            <div className="mb-5 flex justify-center">
              <img
                src="/logo-he.svg"
                alt="Hartano & Ernest monogram"
                className="h-20 w-20 rounded-full border border-[#d3b16c] bg-[#fffdf9] object-cover shadow-sm"
              />
            </div>

            <p className="text-center text-[10px] uppercase tracking-[0.38em] text-[#8a7b6d]">with joy in our hearts</p>
            <h1 className="mt-4 text-center font-serif text-4xl leading-tight text-[#2f2a27]">Hartano & Ernest</h1>

            <div className="my-5 border-y border-[#efe3d3] py-4 text-center">
              <p className="text-lg font-bold tracking-[0.08em] text-[#4c413c]">Saturday, December 20, 2026</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[#8a7b6d]">Sheraton Grand Jakarta<br></br>Gandaria City Hotel, Jakarta</p>
            </div>

            <div className="mb-6 text-center">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#8a7b6d]">A special invitation</p>
              <p className="mt-3 text-sm leading-6 text-[#544c46]">
                {/* Dear beloved family and friends, you are invited to celebrate our love, laughter, and a lifetime of beautiful memories together. */}
              </p>
            </div>

            <div className="space-y-3 rounded-[1.5rem] border border-[#efe3d3] bg-[#fffaf5] p-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.24em] text-[#9b8a79]">Date</p>
                  <p className="mt-2 text-xs font-medium text-[#3e3734]">Dec 20</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.24em] text-[#9b8a79]">Time</p>
                  <p className="mt-2 text-xs font-medium text-[#3e3734]">7 PM</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.24em] text-[#9b8a79]">Venue</p>
                  <p className="mt-2 text-xs font-medium text-[#3e3734]">Sheraton Ballroom</p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href={`/${slug}/rsvp`}
                className="block w-full rounded-full bg-[#312b28] px-5 py-3 text-center text-sm font-medium uppercase tracking-[0.18em] text-white shadow-lg shadow-[#312b28]/20 transition-all hover:bg-[#201d1b]"
              >
                RSVP Now
              </Link>
            </div>
          </div>
        </div>
      </AnimatedWeddingCard>
      <WeddingAudio />
    </main>
  );
}
