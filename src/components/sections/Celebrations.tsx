import { useRef, useState } from "react";
import { CalendarPlus, CalendarCheck, ExternalLink } from "lucide-react";

import frameAsset from "@/assets/r1.png.asset.json";
import coupleAsset from "@/assets/r2.png.asset.json";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { gsap, useGSAP, useMotionOk } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Event = {
  name: string;
  date: string; // human-readable, e.g. "10.31.2026"
  time: string; // e.g. "11:52 AM"
  place: string;
  note: string;
  attire: string;
  /** ISO start in CDT (-05:00). */
  start: string;
  /** ISO end in CDT (-05:00). */
  end: string;
  slug: string;
};

const EVENTS: Event[] = [
  {
    name: "Wedding Ceremony",
    date: "10.31.2026",
    time: "10 AM to 2 PM · Muhurtham 11:52 AM",
    place: "One Trenton Events & Retreat Mandap",
    note: "Sacred vows, auspicious rituals, and saat phere surrounded by divine blessings, family, and loved ones.",
    attire: "Traditional Indian Attire",
    start: "2026-10-31T10:00:00-05:00",
    end: "2026-10-31T14:00:00-05:00",
    slug: "wedding-ceremony",
  },
];

const RSVP_FORM_URL = "https://forms.gle/XF68doSr15DuQbYSA";

function fmtIcsStamp(iso: string) {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  if (!m) return iso;
  return `${m[1]}${m[2]}${m[3]}T${m[4]}${m[5]}${m[6]}`;
}

function buildIcs(e: Event) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mahathi and Gopinath//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${e.slug}@mahathi-gopinath-2026.wedding`,
    `DTSTAMP:${fmtIcsStamp(new Date().toISOString())}`,
    `DTSTART:${fmtIcsStamp(e.start)}`,
    `DTEND:${fmtIcsStamp(e.end)}`,
    `SUMMARY:Mahathi & Gopinath — ${e.name}`,
    `LOCATION:${e.place}`,
    `DESCRIPTION:${e.note} | Attire: ${e.attire}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

function icsHref(e: Event) {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(buildIcs(e))}`;
}

export function Celebrations() {
  return (
    <section
      data-section="celebrations"
      className="relative bg-cover bg-center bg-no-repeat px-6 py-32"
      style={{ backgroundImage: `url(${frameAsset.url})` }}
    >
      <div
        aria-hidden
        className="ken-burns-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${frameAsset.url})` }}
      />
      <div className="absolute inset-0 bg-deep/75" />
      <div className="relative mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="The Celebration"
          title="The Sacred Union"
          className="mx-auto max-w-2xl"
        />
        <div className="mx-auto mt-16 max-w-2xl">
          {EVENTS.map((e, i) => (
            <Reveal key={e.name} delay={i * 120}>
              <EventCard event={e} />
            </Reveal>
          ))}
        </div>

        {/* RSVP Section */}
        <Reveal delay={250}>
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-gold/30 bg-deep/60 p-6 sm:p-8 backdrop-blur-sm text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold-soft shadow-[0_0_20px_rgba(225,190,120,0.15)]">
              <CalendarCheck className="h-7 w-7 stroke-[1.5]" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl gold-text">
              RSVP for Wedding
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm leading-relaxed text-foreground/80">
              Please confirm your presence through our RSVP form so we can gladly prepare for your warm welcome and hospitality.
            </p>

            <div className="mt-8 flex justify-center">
              <a
                href={RSVP_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-gold/70 bg-gradient-to-r from-gold/30 via-gold/20 to-gold/30 px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-medium text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-deep hover:shadow-[0_0_25px_oklch(0.86_0.12_84/0.4)]"
              >
                <CalendarCheck className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>Submit RSVP</span>
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: Event }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const ok = useMotionOk();
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      if (!ok || !cardRef.current) return;
      const card = cardRef.current;
      const onMove = (e: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateX: -y * 4,
          rotateY: x * 5,
          transformPerspective: 800,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      };
      const onLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      return () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      };
    },
    [ok],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          ref={cardRef}
          className={cn(
            "group h-full cursor-pointer rounded-xl border border-gold/25 p-7 paper",
            "transition-shadow duration-500 hover:shadow-[0_30px_60px_-20px_rgba(225,190,120,0.4)]",
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flex items-center gap-2">
            <img
              src={coupleAsset.url}
              alt=""
              aria-hidden
              className="h-5 w-5 rounded-full object-cover ring-1 ring-gold/40"
            />
            <h3 className="font-display text-3xl gold-text">{event.name}</h3>
          </div>
          <div className="mt-3 w-12 gold-rule transition-all duration-500 group-hover:w-24" />
          <p className="mt-4 text-sm tracking-[0.2em] text-gold-soft/90">
            {event.date} · {event.time}
          </p>
          <p className="mt-2 text-sm text-foreground/85">{event.place}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[0.62rem] uppercase tracking-wider text-gold-soft font-medium">
              Attire: {event.attire}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{event.note}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72 border-gold/30 bg-card text-foreground">
        <div className="space-y-3">
          <p className="font-display text-xl gold-text">Save your seat for {event.name}</p>
          <p className="text-xs text-muted-foreground">
            {event.date} · {event.time} · {event.place}
          </p>
          <p className="text-[0.68rem] text-gold-soft">
            <strong className="text-gold">Attire:</strong> {event.attire}
          </p>
          <a
            href={icsHref(event)}
            download={`mahathi-gopinath-${event.slug}.ics`}
            className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold-soft transition-colors hover:bg-gold/10"
          >
            <CalendarPlus className="h-3.5 w-3.5" />
            Add to calendar
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
}
