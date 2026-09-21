export function VenueMap() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-gold/25 bg-deep/40 p-1 shadow-[0_30px_80px_-35px_oklch(0.2_0.1_30/0.9)]">
      <iframe
        title="One Trenton Events & Retreat on Google Maps"
        src="https://www.google.com/maps?q=11391+State+Hwy+121,+Trenton,+TX+75490&output=embed"
        className="h-[28rem] w-full rounded-[1.2rem] border-0 grayscale-[0.15]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 text-left">
        <div>
          <p className="font-display text-lg text-gold-soft">One Trenton Events &amp; Retreat</p>
          <p className="mt-1 text-xs text-foreground/55">11391 State Hwy 121, Trenton, TX 75490</p>
        </div>
        <a
          href="https://maps.app.goo.gl/f1uTpWw9SrSihrXP6?g_st=ic"
          target="_blank"
          rel="noreferrer"
          className="text-[0.6rem] uppercase tracking-[0.25em] text-gold-soft transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
        >
          Open Google Maps ↗
        </a>
      </div>
    </div>
  );
}
