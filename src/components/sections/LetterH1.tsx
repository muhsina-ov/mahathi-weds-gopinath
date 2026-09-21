import { Letters } from "@/hooks/use-letters";

/**
 * Static "Aarav & Meera" headline. Rendered without entrance animation so
 * the names are always visible the moment React hydrates — no GSAP, no
 * opacity transitions, no transform. The letter spans preserve the
 * gold-text gradient and inline layout; they are not animated.
 */
export function LetterH1() {
  return (
    <h1
      className="mt-5 font-display text-6xl leading-none gold-text sm:text-8xl"
      style={{ opacity: 1 }}
    >
      <Letters text="Mahathi" />
      <span className="mx-3 align-middle text-3xl sm:text-5xl">&amp;</span>
      <Letters text="Gopinath" />
    </h1>
  );
}
