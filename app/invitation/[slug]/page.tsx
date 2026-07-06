"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function InvitationPage() {
  const { slug } = useParams();
  const [guest, setGuest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [attending, setAttending] = useState<boolean | null>(null);
  const [diet, setDiet] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // 1. Fetch guest data on page load
  useEffect(() => {
    async function fetchGuest() {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("slug", slug)
        .single();

      if (data) {
        setGuest(data);
        setAttending(data.is_attending);
        setDiet(data.dietary_restrictions || "");
      }
      setLoading(false);
    }
    if (slug) fetchGuest();
  }, [slug]);

  // 2. Handle RSVP Form Submission
  const handleRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("guests")
      .update({ is_attending: attending, dietary_restrictions: diet, updated_at: new Date() })
      .eq("slug", slug);

    if (!error) setSubmitted(true);
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!guest) return <div className="text-center mt-20">Invitation not found.</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-stone-100 p-6 text-stone-800">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md border border-stone-200 text-center">
        <h2 className="italic text-sm tracking-widest text-stone-500 uppercase mb-2">You are invited</h2>
        <h1 className="text-3xl font-serif mb-6">Dear {guest.display_name},</h1>
        <p className="mb-8 text-stone-600">We request the pleasure of your company at our wedding celebration.</p>

        {submitted ? (
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl font-medium">
            Thank you! Your RSVP has been updated.
          </div>
        ) : (
          <form onSubmit={handleRSVP} className="space-y-6 text-left">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Will you attend?</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`flex-1 py-3 rounded-xl border font-medium transition ${attending === true ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-700 border-stone-300'}`}
                >
                  Joyfully Accept
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`flex-1 py-3 rounded-xl border font-medium transition ${attending === false ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-700 border-stone-300'}`}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            {attending && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Dietary Restrictions / Notes</label>
                <input
                  type="text"
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                  placeholder="e.g., Vegan, Nut allergy"
                  className="w-full px-4 py-2 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
              </div>
            )}

            <button type="submit" disabled={attending === null} className="w-full py-3 bg-stone-800 text-white rounded-xl font-medium hover:bg-stone-700 transition disabled:opacity-50">
              Submit RSVP
            </button>
          </form>
        )}
      </div>
    </main>
  );
}