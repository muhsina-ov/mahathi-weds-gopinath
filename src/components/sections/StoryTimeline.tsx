import { useEffect, useRef } from "react";

import { gsap } from "gsap";

const beginningImage = "https://media.invitestory.in/diya-haveli/src/assets/story-beginning.jpg";
const firstMeetingImage = "https://media.invitestory.in/diya-haveli/src/assets/story-first-meeting.jpg";
const questionImage = "https://media.invitestory.in/diya-haveli/src/assets/story-question.jpg";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ScrollTrigger, useGSAP, useMotionOk } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Milestone = {
  year: string;
  title: string;
  text: string;
  /** Optional photo placement. Absent = no image (breathing room). */
  photo?: { src: string; alt: string; placement: "left" | "right" | "below" };
};

const STORY: Milestone[] = [
  {
    year: "2019 — Meteorology",
    title: "The First Meeting",
    text: "A monsoon evening in Bengaluru. Two strangers share one umbrella at a tram crossing, and the rain never quite lets up.",
    photo: {
      src: firstMeetingImage,
      alt: "Mahathi and Gopinath sharing an umbrella on a rainy evening",
      placement: "right",
    },
  },
  {
    year: "2022 — Geography",
    title: "The First Journey",
    text: "A first journey together through winding countryside roads. A shared dream, laughter that filled every mile, and unforgettable memories.",
  },
  {
    year: "2025 — Devotion",
    title: "The Question",
    text: "A question asked beneath a serene starlit sky. A pause that answered itself before the words arrived.",
    photo: {
      src: questionImage,
      alt: "A heartwarming proposal at first light",
      placement: "below",
    },
  },
  {
    year: "2026 — Union",
    title: "The Beginning",
    text: "Two families. One sacred thread. Seven eternal vows. The beginning of forever surrounded by those we hold dearest.",
    photo: {
      src: beginningImage,
      alt: "The couple taking their first ceremonial steps together",
      placement: "left",
    },
  },
];

export function StoryTimeline() {
  const listRef = useRef<HTMLDivElement>(null);
  const ok = useMotionOk();

  // Single timeline scrub: thread opacity + bullet ✦ glow sweep the section.
  useGSAP(
    () => {
      if (!ok || !listRef.current) return;
      const listEl = listRef.current;
      const threadEl = listEl.querySelector<HTMLElement>("[data-thread]");
      const starEls = listEl.querySelectorAll<HTMLElement>("[data-star]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: listEl,
          start: "top 75%",
          end: "bottom 70%",
          scrub: 0.5,
        },
      });
      if (threadEl) {
        tl.fromTo(
          threadEl,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", transformOrigin: "top center" },
          0,
        );
      }
      if (starEls.length > 0) {
        tl.fromTo(
          starEls,
          { opacity: 0.2, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            stagger: 0.2,
          },
          0,
        );
      }
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    [ok],
  );

  // Recompute ScrollTrigger after the section measures correctly.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 50);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section data-section="story" className="relative px-6 py-32">
      <SectionHeader
        eyebrow="The Story"
        title="Four moments, one beginning."
        align="center"
        className="mx-auto max-w-2xl"
      />

      <div ref={listRef} className="relative mx-auto mt-20 max-w-4xl pl-10">
        {/* Gold thread — gradient vertical line tying the chapter markers */}
        <span
          data-thread
          aria-hidden
          className="absolute left-[14px] top-0 h-full w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, oklch(0.93 0.07 86 / 0.55) 12%, oklch(0.93 0.07 86 / 0.55) 88%, transparent 100%)",
          }}
        />

        <ol className="space-y-24">
          {STORY.map((m) => (
            <li key={m.year}>
              <MilestoneRow milestone={m} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function MilestoneRow({ milestone }: { milestone: Milestone }) {
  const photo = milestone.photo;
  const align = photo?.placement === "left" ? "md:flex-row" : "md:flex-row-reverse";

  return (
    <article className="relative">
      <span
        data-star
        aria-hidden
        className="absolute -left-10 top-1 font-display text-lg gold-text"
      >
        ✦
      </span>

      <div className="flex flex-col gap-6">
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft/70">
            {milestone.year}
          </p>
          <h3 className="mt-3 font-display text-3xl leading-snug gold-text sm:text-4xl">
            {milestone.title}
          </h3>
        </div>

        <p className="max-w-xl font-display text-base leading-loose text-foreground/85 sm:text-lg">
          {milestone.text}
        </p>

        {photo && (
          <figure
            className={cn(
              "flex flex-col gap-4",
              photo.placement === "below" ? "" : `md:flex-row md:items-start ${align}`,
            )}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className={cn(
                "object-cover",
                photo.placement === "below"
                  ? "aspect-[16/9] w-full rounded-sm"
                  : "aspect-[3/4] w-full max-w-[200px] rounded-sm",
              )}
            />
            <figcaption
              className={cn(
                "text-[0.6rem] uppercase tracking-[0.3em] text-gold-soft/50",
                photo.placement === "below" ? "" : "md:pt-2 md:max-w-[160px]",
              )}
            >
              {photo.alt}
            </figcaption>
          </figure>
        )}
      </div>
    </article>
  );
}
