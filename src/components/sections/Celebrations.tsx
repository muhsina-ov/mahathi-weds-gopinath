import { useRef, useState } from "react";
import { CalendarPlus, MessageCircle, Phone, Check, Copy } from "lucide-react";

import frameAsset from "@/assets/r1.png.asset.json";
import coupleAsset from "@/assets/r2.png.asset.json";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { gsap, useGSAP, useMotionOk } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Event = {
  name: string;
  date: string; // human-readable, e.g. "31 October 2026"
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
    date: "31 October 2026",
    time: "Muhurtham 11:52 AM",
    place: "One Trenton Events & Retreat Mandap",
    note: "Sacred vows, auspicious rituals, and saat phere surrounded by divine blessings, family, and loved ones.",
    attire: "Traditional Indian Attire",
    start: "2026-10-31T10:30:00-05:00",
    end: "2026-10-31T14:30:00-05:00",
    slug: "wedding-ceremony",
  },
];

const RSVP_CONTACTS = [
  {
    name: "Gopinath",
    phone: "+1 (779) 276-2757",
    rawPhone: "17792762757",
    whatsappUrl:
      "https://wa.me/17792762757?text=Hi%20Gopinath,%20I%20would%20love%20to%20RSVP%20for%20the%20Wedding%20Ceremony%20of%20Mahathi%20%26%20Gopinath!",
  },
  {
    name: "Family / RSVP Desk",
    phone: "+1 (513) 545-6104",
    rawPhone: "15135456104",
    whatsappUrl:
      "https://wa.me/15135456104?text=Hi,%20I%20would%20love%20to%20RSVP%20for%20the%20Wedding%20Ceremony%20of%20Mahathi%20%26%20Gopinath!",
  },
];

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
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const copyNumber = (phone: string) => {
    void navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2500);
  };

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
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold-soft">
              <MessageCircle className="h-6 w-6 stroke-[1.5]" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl gold-text">
              RSVP for Wedding
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm leading-relaxed text-foreground/80">
              Please confirm your presence via WhatsApp so we can gladly prepare for your warm welcome and hospitality.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gradient-to-r from-gold/25 via-gold/15 to-gold/25 px-6 py-3 text-xs uppercase tracking-[0.25em] font-medium text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-deep hover:shadow-[0_0_25px_oklch(0.86_0.12_84/0.35)] cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    RSVP via WhatsApp
                  </button>
                </DialogTrigger>
                <DialogContent className="border-gold/35 bg-deep text-foreground sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl gold-text">
                      RSVP for Wedding
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                      Reach out directly on WhatsApp to let us know you'll be joining our special day!
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-4 space-y-4">
                    {RSVP_CONTACTS.map((contact) => (
                      <div
                        key={contact.rawPhone}
                        className="rounded-xl border border-gold/25 bg-card/60 p-4 transition-colors hover:border-gold/50"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gold-soft">
                              {contact.name}
                            </p>
                            <p className="font-display text-base text-foreground mt-0.5">
                              {contact.phone}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyNumber(contact.phone)}
                            className="inline-flex items-center gap-1.5 rounded-md border border-gold/30 px-2.5 py-1 text-[0.68rem] text-gold-soft hover:bg-gold/10 transition-colors"
                            title="Copy Phone Number"
                          >
                            {copiedPhone === contact.phone ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="mt-3 flex gap-2">
                          <a
                            href={contact.whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 px-3 py-2 text-xs font-medium text-[#25D366] transition-all hover:bg-[#25D366] hover:text-black"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            Chat on WhatsApp
                          </a>
                          <a
                            href={`tel:${contact.rawPhone}`}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gold/30 px-3 py-2 text-xs text-gold-soft hover:bg-gold/10 transition-colors"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            Call
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              <a
                href="https://wa.me/17792762757?text=Hi%20Gopinath,%20I%20would%20love%20to%20RSVP%20for%20the%20Wedding%20Ceremony%20of%20Mahathi%20%26%20Gopinath!"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/5 px-5 py-3 text-xs tracking-wider text-gold-soft hover:bg-gold/15 transition-colors"
              >
                <span>Direct WhatsApp: +1 (779) 276-2757</span>
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
