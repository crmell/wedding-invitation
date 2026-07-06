"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function InvitationPage() {
  const { slug } = useParams();
  const [guest, setGuest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Controls the Cover View
  
  // Form States
  const [attending, setAttending] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState("");
  const [wishes, setWishes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  // Live Guestbook Feed State
  const [allWishes, setAllWishes] = useState<any[]>([]);

  useEffect(() => {
    async function fetchInvitationData() {
      // 1. Fetch current guest info
      const { data: guestData } = await supabase
        .from("guests")
        .select("*")
        .eq("slug", slug)
        .single();

      if (guestData) {
        setGuest(guestData);
        setAttending(guestData.is_attending !== null ? String(guestData.is_attending) : "");
        setWhatsapp(guestData.whatsapp_number || "");
        setWishes(guestData.wedding_wishes || "");
      }

      // 2. Fetch all guest wishes for the live chatbox feed
      const { data: wishesData } = await supabase
        .from("guests")
        .select("display_name, wedding_wishes, updated_at")
        .not("wedding_wishes", "is", null)
        .order("updated_at", { ascending: false });

      if (wishesData) setAllWishes(wishesData);
      setLoading(false);
    }
    if (slug) fetchInvitationData();
  }, [slug]);

  const handleRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    const isAttendingBool = attending === "true";
    
    const { error } = await supabase
      .from("guests")
      .update({ 
        is_attending: isAttendingBool, 
        whatsapp_number: whatsapp, 
        wedding_wishes: wishes, 
        updated_at: new Date() 
      })
      .eq("slug", slug);

    if (!error) {
      setSubmitted(true);
      // Instantly refresh guestbook layout feed locally
      setAllWishes([{ display_name: guest.display_name, wedding_wishes: wishes }, ...allWishes]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F0EA] flex items-center justify-center">
        <p className="font-serif tracking-widest text-[#8C7A6B] animate-pulse text-xs uppercase">Loading Invitation...</p>
      </div>
    );
  }
  if (!guest) return <div className="min-h-screen bg-[#F4F0EA] flex items-center justify-center font-serif text-[#8C7A6B]">Invitation not found.</div>;

  return (
    <div className="bg-[#F4F0EA] text-[#3D342A] overflow-x-hidden min-h-screen selection:bg-[#E2D9CE]">
      
      {/* 1. OVERLAY COVER SCREEN */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 bg-[#F4F0EA] z-50 flex flex-col items-center justify-between p-12 text-center"
          >
            <div className="mt-8 space-y-2">
              <p className="text-xs tracking-[0.2em] text-[#8C7A6B] uppercase">Dear</p>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#5A4B3E]">{guest.display_name}</h2>
              <p className="text-[11px] tracking-wide text-[#A39284] italic">You are cordially invited to</p>
            </div>

            <div className="space-y-4">
              <span className="block text-[10px] tracking-[0.4em] uppercase text-[#A39284]">The Wedding of</span>
              <h1 className="text-5xl sm:text-6xl font-serif tracking-wide text-[#5A4B3E] font-light">
                Hartanto <span className="text-2xl block font-sans my-2 text-[#A39284] font-light">&</span> Clara
              </h1>
            </div>

            <button 
              onClick={() => setIsOpen(true)}
              className="mb-8 px-8 py-3 bg-[#5A4B3E] text-white text-xs tracking-[0.2em] uppercase font-medium rounded-full shadow-lg shadow-[#5A4B3E]/20 hover:bg-[#43372D] transition-all transform active:scale-95"
            >
              Open Invitation
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN SCROLLABLE CONTENT */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-xl mx-auto px-4 py-16 space-y-24 relative"
        >
          {/* Subtle Decorative Frames */}
          <div className="fixed inset-4 border border-[#8C7A6B]/10 pointer-events-none rounded-lg z-0" />

          {/* SECTION A: OUR COUPLE */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center space-y-12 z-10 relative"
          >
            <div className="space-y-1">
              <h2 className="text-3xl font-serif tracking-wider text-[#5A4B3E]">Our Couple</h2>
            </div>

            {/* Groom Block */}
            <div className="space-y-4">
              <h3 className="text-4xl font-serif italic text-[#5A4B3E]">Dr. Hartanto</h3>
              <div className="text-xs text-[#8C7A6B] space-y-1">
                <p className="italic font-light">The son of</p>
                <p className="font-medium text-[#4E4135]">Mr.  & Mrs. Everina</p>
              </div>
            </div>

            {/* Photo placeholders side by side */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="aspect-[3/4] bg-[#E6DFD5] rounded-2xl flex items-center justify-center border border-[#8C7A6B]/20 shadow-inner">
                <span className="text-[10px] uppercase tracking-wider text-[#A39284]">Photo of Boy</span>
              </div>
              <div className="aspect-[3/4] bg-[#E6DFD5] rounded-2xl flex items-center justify-center border border-[#8C7A6B]/20 shadow-inner">
                <span className="text-[10px] uppercase tracking-wider text-[#A39284]">Photo of Girl</span>
              </div>
            </div>

            {/* Bride Block */}
            <div className="space-y-4">
              <h3 className="text-4xl font-serif italic text-[#5A4B3E]">Clara Anastasia, S.Ds.</h3>
              <div className="text-xs text-[#8C7A6B] space-y-1">
                <p className="italic font-light">The daughter of</p>
                <p className="font-medium text-[#4E4135]">Mr. Hendra Wijaya & Mrs. Ratna Wijaya</p>
              </div>
            </div>
          </motion.section>

          {/* SECTION B: THE EVENT */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white text-center space-y-8 shadow-xl shadow-[#3D342A]/5 z-10 relative"
          >
            <span className="block text-[10px] tracking-[0.3em] uppercase text-[#A39284] font-bold">Save the Date</span>
            <h2 className="text-2xl font-serif uppercase tracking-widest text-[#5A4B3E]">The Event</h2>
            
            {/* Split Traditional Grid Calendar style */}
            <div className="flex items-center justify-center gap-6 text-[#5A4B3E] font-serif border-y border-[#E6DFD5] py-4 max-w-xs mx-auto">
              <span className="text-sm uppercase tracking-wider">Saturday</span>
              <span className="text-4xl border-x border-[#E6DFD5] px-6 font-light">28</span>
              <div className="text-left leading-none">
                <p className="text-xs uppercase tracking-wider">August</p>
                <p className="text-xs tracking-widest text-[#A39284]">2026</p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] tracking-widest text-[#A39284] uppercase">Time Sequence</p>
              <p className="text-lg font-serif text-[#4E4135]">19.00 WIB</p>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] tracking-widest text-[#A39284] uppercase">Venue Location</p>
              <p className="text-xl font-serif text-[#4E4135] leading-tight">Grand Hall, Lt. 9<br />Hotel Jakarta</p>
              <p className="text-xs text-[#8C7A6B] max-w-xs mx-auto font-light leading-relaxed">Jl. Jend. Sudirman No. Kav 21, Karet Tengsin, Tanah Abang, Jakarta Pusat</p>
            </div>

            <button 
              onClick={() => window.open("https://maps.google.com", "_blank")}
              className="px-6 py-2.5 bg-[#5A4B3E] text-white text-[11px] tracking-widest uppercase rounded-xl hover:bg-[#43372D] transition-all inline-flex items-center gap-2 shadow-md shadow-[#5A4B3E]/10"
            >
              Link Google Maps
            </button>
          </motion.section>

          {/* SECTION C: RSVP & WEDDING WISHES */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white rounded-2xl p-8 border border-[#EBE5DC] space-y-8 shadow-xl shadow-[#3D342A]/5 z-10 relative"
          >
            <div className="text-center">
              <h2 className="text-2xl font-serif text-[#5A4B3E] tracking-wide">RSVP & Wedding Wishes</h2>
              <div className="w-8 h-[1px] bg-[#8C7A6B]/30 mx-auto mt-2" />
            </div>

            {submitted ? (
              <div className="bg-[#EAF4EC] text-[#2C5E3B] p-6 rounded-xl text-center border border-[#D2E7D6]">
                <p className="font-serif italic text-lg mb-1">Terma Kasih!</p>
                <p className="text-xs tracking-wide text-[#3D774D]">Your RSVP and prayer wishes have been posted to our dashboard.</p>
              </div>
            ) : (
              <form onSubmit={handleRSVP} className="space-y-5 text-left">
                <div className="space-y-1">
                  <label className="block text-[11px] tracking-wider font-semibold uppercase text-[#8C7A6B]">Guest Name</label>
                  <input type="text" value={guest.display_name} disabled className="w-full px-4 py-3 bg-[#F4F0EA]/50 border border-[#E6DFD5] rounded-xl text-sm font-medium text-[#7C6E5C] cursor-not-allowed" />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] tracking-wider font-semibold uppercase text-[#8C7A6B]">WhatsApp Number</label>
                  <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required placeholder="e.g., 08123456789" className="w-full px-4 py-3 bg-white border border-[#D4C3B3] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5A4B3E]/20 focus:border-[#5A4B3E] transition-all" />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] tracking-wider font-semibold uppercase text-[#8C7A6B]">Attendance Confirmation</label>
                  <select value={attending} onChange={(e) => setAttending(e.target.value)} required className="w-full px-4 py-3 bg-white border border-[#D4C3B3] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5A4B3E]/20 focus:border-[#5A4B3E] transition-all appearance-none cursor-pointer">
                    <option value="" disabled>Select attendance option</option>
                    <option value="true">Joyfully Attend</option>
                    <option value="false">Regretfully Decline</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] tracking-wider font-semibold uppercase text-[#8C7A6B]">Your Blessings & Wishes</label>
                  <textarea rows={3} value={wishes} onChange={(e) => setWishes(e.target.value)} required placeholder="Write your warm wishes for the bride & groom here..." className="w-full px-4 py-3 bg-white border border-[#D4C3B3] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5A4B3E]/20 focus:border-[#5A4B3E] transition-all resize-none" />
                </div>

                <button type="submit" className="w-full py-4 bg-[#5A4B3E] text-white text-xs tracking-[0.2em] font-semibold uppercase rounded-xl hover:bg-[#43372D] transition-all active:scale-[0.99] shadow-md">
                  Send RSVP & Wishes
                </button>
              </form>
            )}

            {/* THE WEDDING GUESTBOOK CHATBOX FEED */}
            <div className="border-t border-[#E6DFD5] pt-6 space-y-4">
              <h3 className="text-xs tracking-[0.2em] text-[#8C7A6B] uppercase font-bold">Wishes Guestbook ({allWishes.length})</h3>
              
              <div className="max-h-60 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-[#D4C3B3]">
                {allWishes.map((item, index) => (
                  <div key={index} className="bg-[#F4F0EA]/60 p-4 rounded-xl border border-[#E6DFD5] text-left space-y-1">
                    <div className="flex justify-between items-baseline">
                      <p className="text-xs font-serif font-bold text-[#5A4B3E]">{item.display_name}</p>
                      <span className="text-[9px] text-[#A39284]">✓ Guest</span>
                    </div>
                    <p className="text-xs text-[#6E5F51] font-light leading-relaxed whitespace-pre-line">
                      "{item.wedding_wishes}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </div>
  );
}