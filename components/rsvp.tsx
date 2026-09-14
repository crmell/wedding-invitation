'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function RSVPForm({ guest }: { guest: any }) {
  const [isAttending, setIsAttending] = useState<boolean | null>(guest.is_attending);
  const [whatsapp, setWhatsapp] = useState(guest.whatsapp_number || '');
  const [wishes, setWishes] = useState(guest.wedding_wishes || '');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('guests')
      .update({
        is_attending: isAttending,
        whatsapp_number: whatsapp,
        wedding_wishes: wishes,
        updated_at: new Date(),
      })
      .eq('id', guest.id);

    setLoading(false);
    if (!error) {
      setSubmitted(true);
    } else {
      alert('Error updating RSVP. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#F4F1EA] p-4 rounded-xl text-center animate-fade-in">
        <p className="text-sm font-medium text-[#4A433D]">✨ Thank you! Your response has been saved.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label className="block text-xs font-medium text-[#736A62] mb-1">Will you attend?</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setIsAttending(true)}
            className={`py-2 text-xs rounded-lg border transition-all ${
              isAttending === true
                ? 'bg-[#4A433D] text-white border-[#4A433D]'
                : 'bg-white text-[#736A62] border-[#EFECE6] hover:bg-[#F9F8F6]'
            }`}
          >
            Joyfully Accept
          </button>
          <button
            type="button"
            onClick={() => setIsAttending(false)}
            className={`py-2 text-xs rounded-lg border transition-all ${
              isAttending === false
                ? 'bg-[#A65D57] text-white border-[#A65D57]'
                : 'bg-white text-[#736A62] border-[#EFECE6] hover:bg-[#F9F8F6]'
            }`}
          >
            Regretfully Decline
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#736A62] mb-1">WhatsApp Number</label>
        <input
          type="text"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="+628123456789"
          className="w-full px-3 py-2 text-xs border border-[#EFECE6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#736A62] mb-1">Wishes for the Couple</label>
        <textarea
          value={wishes}
          onChange={(e) => setWishes(e.target.value)}
          placeholder="Write a sweet message..."
          rows={2}
          className="w-full px-3 py-2 text-xs border border-[#EFECE6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
        />
      </div>

      <button
        type="submit"
        disabled={loading || isAttending === null}
        className="w-full py-2.5 bg-[#3A3532] text-white text-xs uppercase tracking-wider rounded-lg hover:bg-[#201D1B] disabled:opacity-50 transition-all"
      >
        {loading ? 'Saving...' : 'Confirm RSVP'}
      </button>
    </form>
  );
}