import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { OpeningSequence } from "@/components/OpeningSequence";
import { InteractivePortrait } from "@/components/InteractivePortrait";
import { PalaceReveal } from "@/components/PalaceReveal";
import { Reveal } from "@/components/Reveal";
import { ScratchRevealDate } from "@/components/ScratchRevealDate";
import { AudioToggle } from "@/components/AudioToggle";
import { CursorFlecks } from "@/components/CursorFlecks";
import { RichPetals } from "@/components/RichPetals";
import { SectionScrubber, type SectionDef } from "@/components/SectionScrubber";
import { Accommodations } from "@/components/sections/Accommodations";
import { Breather } from "@/components/sections/Breather";
import { Celebrations } from "@/components/sections/Celebrations";
import { CountdownGreeting } from "@/components/sections/CountdownGreeting";
import { DiyaCeremony } from "@/components/sections/DiyaCeremony";
import { FlipCountdown } from "@/components/sections/FlipCountdown";
import { FloatingMotif } from "@/components/sections/FloatingMotif";
import { HeroParallax } from "@/components/sections/HeroParallax";
import { LetterH1 } from "@/components/sections/LetterH1";
import { QuoteScrub } from "@/components/sections/QuoteScrub";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { VenueMap } from "@/components/sections/VenueMap";
import { ScrollTrigger, useGSAP } from "@/lib/motion";

const SITE_URL = "https://mahathi-weds-gopinath.invitingyou.top";
const OG_IMAGE_URL =
  "https://raw.githubusercontent.com/muhsina-ov/mahathi-weds-gopinath/main/public/og-image.jpg";
const SITE_TITLE = "Mahathi & Gopinath — Wedding Invitation";
// Google SEO description (target: 140–160 chars) -> exactly 150 chars
const META_DESCRIPTION =
  "Join us to celebrate the wedding of Mahathi & Gopinath on October 31, 2026 at One Trenton Events & Retreat in Trenton, Texas. Muhurtham at 11:52 AM.";
// Social preview description (target: < 125 chars to prevent mobile truncation) -> exactly 107 chars
const OG_DESCRIPTION =
  "Join us to celebrate the wedding of Mahathi & Gopinath on October 31, 2026 at One Trenton Events & Retreat.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: META_DESCRIPTION },
      { property: "og:site_name", content: "Mahathi & Gopinath Wedding" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: OG_DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:secure_url", content: OG_IMAGE_URL },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Mahathi & Gopinath Wedding Invitation - October 31, 2026 at One Trenton Events & Retreat",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: OG_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE_URL },
      {
        name: "twitter:image:alt",
        content: "Mahathi & Gopinath Wedding Invitation - October 31, 2026",
      },
      { name: "twitter:url", content: `${SITE_URL}/` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "image_src", href: OG_IMAGE_URL },
      { rel: "preload", as: "image", href: "/og-image.jpg" },
    ],
  }),
  component: Invitation,
});

const WEDDING_DATE = "2026-10-31T11:52:00-05:00";

const SECTIONS: SectionDef[] = [
  { id: "hero", label: "Hero" },
  { id: "blessing", label: "Blessing" },
  { id: "countdown", label: "Countdown" },
  { id: "story", label: "Story" },
  { id: "celebrations", label: "Events" },
  { id: "venue", label: "Venue" },
  { id: "accommodations", label: "Stay" },
];

function Invitation() {
  const [opened, setOpened] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <OpeningSequence onFinish={() => setOpened(true)} />

      {/* Ambient layers */}
      <CursorFlecks />
      <SectionScrubber sections={SECTIONS} />
      <AudioToggle visible={opened} />

      {/* Scroll progress */}
      <div
        className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-gold/80 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />

      {/* Hero */}
      <section
        data-section="hero"
        className="relative flex min-h-screen items-end justify-center overflow-hidden"
      >
        <HeroParallax />
        <div className="relative z-10 mb-16 px-6 text-center">
          <Reveal>
            <p className="text-[0.65rem] uppercase tracking-[0.5em] text-gold-soft/80">
              Together with their families
            </p>
          </Reveal>
          <Reveal delay={200}>
            <LetterH1 />
          </Reveal>
          <Reveal delay={400}>
            <ScratchRevealDate />
          </Reveal>
          <Reveal delay={600}>
            <div className="mt-10 text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft/60">
              scroll
              <div className="mx-auto mt-3 h-10 w-px shimmer-line" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Blessing */}
      <section data-section="blessing" className="relative px-6 py-28">
        {opened && <RichPetals type="petals" count={7} />}
        <div className="relative mx-auto max-w-2xl text-center">
          <QuoteScrub text="“Where two souls meet, the lotus blooms — and every path becomes a garden.”" />
          <Reveal delay={200}>
            <div className="mx-auto mt-8 w-24 gold-rule" />
            <p className="mt-6 text-sm leading-loose text-muted-foreground">
              With the blessings of Shri &amp; Smt. Raghav Menon and Shri &amp; Smt. Devang Sharma,
              we invite you to share in the joy of our wedding.
            </p>
          </Reveal>
        </div>
        <FloatingMotif />
      </section>

      {/* Countdown */}
      <section data-section="countdown" className="relative px-6 pb-28">
        <SectionHeader
          eyebrow="The Countdown"
          title="Counting every heartbeat until forever."
          className="mx-auto max-w-2xl"
        />
        <div className="mt-10">
          <CountdownGreeting />
          <Reveal>
            <p className="mb-8 text-center text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft/70">
              The wedding begins in
            </p>
          </Reveal>
          <Reveal delay={150}>
            <FlipCountdown target={WEDDING_DATE} />
          </Reveal>
        </div>
      </section>

      {/* Story — gold thread + 3 selective photos */}
      <StoryTimeline />

      <InteractivePortrait />

      {/* Diya ritual — touch-and-hold to light, then 12 lanterns rise */}
      <DiyaCeremony />

      {/* Events */}
      <Celebrations />

      {/* Breather between celebrations and venue */}
      <Breather>Every journey has a place.</Breather>

      <PalaceReveal />

      {/* Venue — invitation style: heading + address first, then map */}
      <section data-section="venue" className="relative px-6 py-32">
        <SectionHeader
          eyebrow="The Venue"
          title="Where we begin forever."
          className="mx-auto max-w-2xl"
        />

        <Reveal>
          <div className="mx-auto mt-12 max-w-xl text-center">
            <p className="font-display text-3xl gold-text sm:text-4xl">One Trenton Events &amp; Retreat</p>
            <p className="mt-3 text-sm tracking-[0.25em] text-gold-soft/80 uppercase">
              11391 State Hwy 121 · Trenton, TX · 75490
            </p>
            <p className="mt-8 font-display text-lg italic leading-relaxed text-foreground/80">
              A breathtaking country sanctuary offering open panoramic skies, lush manicured grounds,
              and serene elegance for our sacred wedding union.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-16 max-w-2xl">
            <VenueMap />
          </div>
        </Reveal>
      </section>

      {/* Accommodations — 5 curated Airbnbs nearby */}
      <Accommodations />

      <footer className="relative mt-20 overflow-hidden border-t border-gold/15 px-6 pb-12 pt-28 text-center">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 mx-auto h-72 max-w-4xl bg-[radial-gradient(ellipse_at_top,oklch(0.86_0.12_84/0.18),transparent_68%)]"
        />
        <p className="relative text-[0.58rem] uppercase tracking-[0.55em] text-gold-soft/55">
          With love, and with your blessings
        </p>
        <p className="relative mt-7 text-balance font-display text-6xl leading-none gold-text sm:text-8xl">
          Mahathi <span className="font-light italic text-gold-soft/55">&amp;</span> Gopinath
        </p>
        <p className="relative mx-auto mt-7 max-w-xl font-display text-lg italic leading-relaxed text-foreground/65">
          We cannot wait to begin this chapter surrounded by the people who made every page before
          it possible.
        </p>
        <div className="relative mx-auto mt-14 flex max-w-3xl items-center gap-5">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/45" />
          <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/35 font-display text-xl text-gold-soft">
            ✦
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/45" />
        </div>
        <div className="relative mx-auto mt-12 flex max-w-3xl flex-col items-center justify-between gap-4 border-t border-gold/10 pt-6 text-[0.55rem] uppercase tracking-[0.3em] text-foreground/35 sm:flex-row">
          <span>31 October 2026 · Trenton, Texas</span>
          <span>#MahathiWedsGopinath</span>
        </div>
        <a
          href="https://www.instagram.com/invitestory.in/"
          target="_blank"
          rel="noreferrer"
          className="relative mt-6 inline-block text-[0.5rem] uppercase tracking-[0.3em] text-foreground/25 transition-colors hover:text-gold-soft/60"
        >
          Follow @invitestory.in on Instagram
        </a>
      </footer>
    </main>
  );
}
