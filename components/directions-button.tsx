'use client';

export function DirectionsButton() {
  const destination = 'Sheraton Grand Jakarta Gandaria City Hotel';
  const mapsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent(destination) +
    '&travelmode=driving';

  const handleOpenDirections = () => {
    if (typeof window === 'undefined') return;

    const ua = navigator.userAgent || '';
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);

    const fallbackDelay = 1200;

    if (isIOS) {
      window.location.href = 'maps://?daddr=' + encodeURIComponent(destination);
      setTimeout(() => {
        window.location.href = mapsUrl;
      }, fallbackDelay);
      return;
    }

    if (isAndroid) {
      const androidDeepLink =
        'geo:0,0?q=' + encodeURIComponent(destination);
      window.location.href = androidDeepLink;
      setTimeout(() => {
        window.location.href = mapsUrl;
      }, fallbackDelay);
      return;
    }

    window.location.href = mapsUrl;
  };

  return (
    <button
      type="button"
      onClick={handleOpenDirections}
      className="mt-3 inline-flex items-center justify-center rounded-full bg-[#312b28] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white"
    >
      Get Directions
    </button>
  );
}
