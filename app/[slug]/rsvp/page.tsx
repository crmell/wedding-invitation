import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import RSVPForm from '@/components/rsvp';
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

export default async function RsvpPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guest = await getGuest(slug);

  if (!guest) {
    notFound();
  }

  const directionsLinks = [
    {
      label: 'Google Maps',
      href:
        'https://www.google.com/maps/dir/?api=1&destination=Sheraton+Grand+Jakarta+Gandaria+City+Hotel&travelmode=driving',
    },
    {
      label: 'Waze',
      href: 'https://www.waze.com/ul?q=Sheraton%20Grand%20Jakarta%20Gandaria%20City%20Hotel&navigate=yes',
    },
    {
      label: 'Apple Maps',
      href: 'https://maps.apple.com/?daddr=Sheraton+Grand+Jakarta+Gandaria+City+Hotel&dirflg=d',
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1eb] text-[#2d2522]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_34%),radial-gradient(circle_at_bottom,_rgba(127,90,76,0.12),_transparent_40%)]" />

      <AnimatedWeddingCard className="relative z-10 mx-auto flex min-h-screen w-full max-w-md items-center justify-center px-4 py-8">
        <div className="w-full overflow-hidden rounded-[2rem] border border-[#eadcc9] bg-white/80 p-5 shadow-[0_30px_80px_rgba(63,46,33,0.12)] backdrop-blur-md">
          <div className="mb-5 flex justify-center">
            <img
              src="/logo-he.svg"
              alt="Hartano & Ernest monogram"
              className="h-20 w-20 rounded-full border border-[#d3b16c] bg-[#fffdf9] object-cover shadow-sm"
            />
          </div>

          <p className="text-center text-[10px] uppercase tracking-[0.38em] text-[#8a7b6d]">Dear,</p>
          <h1 className="mt-4 text-center font-serif text-4xl leading-tight text-[#2f2a27]">{guest.display_name}</h1>
          <p className="mt-2 text-center text-[10px] tracking-[0.38em] text-[#8a7b6d]">we invite you to celebrate with us</p>

          <div className="my-5 border-y border-[#efe3d3] py-4 text-center">
            <p className="text-lg font-bold tracking-[0.08em] text-[#4c413c]">Saturday, December 20, 2026</p>
            <p className="mt-1 text-[10px] tracking-[0.24em] text-[#8a7b6d]">Sheraton Grand Jakarta<br />Gandaria City Hotel, Jakarta</p>
          </div>

          <div className="rounded-[1.5rem] border border-[#efe3d3] bg-[#fffaf5] p-4">
            <p className="text-center text-[10px] uppercase tracking-[0.26em] text-[#8a7b6d]">Our Families</p>
            <div className="mt-3 row gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[
                {
                  title: 'The Groom',
                  name: 'Hartano Santoso',
                  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
                  parents: 'Son of Mr. & Mrs. Santoso',
                },
                {
                  title: 'The Bride',
                  name: 'Ernest',
                  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
                  parents: 'Daughter of Mr. & Mrs. ...',
                },
              ].map((person) => (
                <div
                  key={person.title}
                  className="mb-3 min-w-[84%] snap-center rounded-[1.5rem] border border-[#eadcc9] bg-white p-3 shadow-sm"
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8a7b6d]">{person.title}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={person.image}
                      alt={person.title}
                      className="h-14 w-14 rounded-full object-cover border border-[#d8b57d]"
                    />
                    <div>
                      <p className="text-base font-semibold text-[#312b28]">{person.name}</p>
                      <p className="mt-1 text-[10px] text-[#6a5f59]">{person.parents}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-[#efe3d3] bg-[#fffaf5] p-4">
            <p className="text-center text-[10px] uppercase tracking-[0.26em] text-[#8a7b6d]">Event Details</p>
            <div className="mt-3 space-y-2 text-sm text-[#534b45]">
              <div className="flex justify-between gap-2 border-b border-[#efe3d3] pb-2">
                <span>Holy Matrimony</span>
                <span className="font-medium text-[#312b28]">08:00 AM</span>
              </div>
              <div className="flex justify-between gap-2 border-b border-[#efe3d3] pb-2">
                <span>Tea Pai Ceremony</span>
                <span className="font-medium text-[#312b28]">03:00 PM</span>
              </div>
              <div className="flex justify-between gap-2 border-b border-[#efe3d3] pb-2">
                <span>Wedding Ceremony</span>
                <span className="font-medium text-[#312b28]">07:00 PM</span>
              </div>
              {/* <div className="flex justify-between gap-2">
                <span>Dress Code</span>
                <span className="font-medium text-[#312b28]">Formal Elegance</span>
              </div> */}
            </div>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-[#efe3d3] bg-[#fffaf5] p-4">
            <p className="text-center text-[10px] uppercase tracking-[0.26em] text-[#8a7b6d]">Venue Details</p>
            <div className="mt-3 text-center text-sm text-[#534b45]">
              <p className="font-semibold text-[#312b28]">Sheraton Grand Jakarta, Gandaria City</p>
              <p>Jl. Sultan Iskandar Muda No. 7, Jakarta Selatan</p>
              <div className="mt-3 flex flex-col gap-2">
                {directionsLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#312b28] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[1.25rem] border border-[#efe3d3] bg-[#fffaf5] p-3 text-center text-[10px] uppercase tracking-[0.22em] text-[#8a7b6d]">
            Kindly respond below
          </div>

          <div className="mt-5">
            <RSVPForm guest={guest} />
          </div>
        </div>
      </AnimatedWeddingCard>
    </main>
  );
}
