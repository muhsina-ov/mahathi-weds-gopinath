import { useRef } from "react";

import { gsap } from "gsap";

import { useGSAP, useMotionOk } from "@/lib/motion";

/**
 * Two stacked images of the bride and groom's hands over a sacred diya,
 * translating in opposite directions as the user scrolls. A traditional,
 * grounded opening — no raised-leg pose. Adds depth without breaking the
 * existing aesthetic. The bottom layer is at 25 % opacity so the layered
 * effect stays subtle.
 *
 * Driven by a ScrollTrigger `scrub` so the motion is tied directly to scroll
 * position, not to component state.
 */
const HERO_SRC = "/__local/wedding-hands.jpg";
export function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLImageElement>(null);
  const bottomRef = useRef<HTMLImageElement>(null);
  const ok = useMotionOk();

  useGSAP(() => {
    if (!ok || !ref.current || !topRef.current || !bottomRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });
    tl.to(topRef.current, { yPercent: -12, scale: 1.06 }, 0);
    tl.to(bottomRef.current, { yPercent: 18, scale: 1.12 }, 0);
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [ok]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <img
        ref={bottomRef}
        src={HERO_SRC}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        style={{ transform: "scale(1.06)", objectPosition: "50% 30%" }}
      />
      <img
        ref={topRef}
        src={HERO_SRC}
        alt="Bride and groom hands over a sacred diya, framed by warm light"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: "scale(1.06)", objectPosition: "50% 30%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deep/10 via-transparent to-deep/85" />
    </div>
  );
}
