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
      className="mt-5 flex flex-col items-center justify-center font-display leading-[0.95] gold-text text-5xl sm:text-7xl md:text-8xl"
      style={{ opacity: 1 }}
    >
      <span className="inline-block tracking-tight">
        <Letters text="Mahathi" />
      </span>
      <span className="my-1 font-serif text-2xl italic text-gold-soft/80 sm:my-2 sm:text-4xl md:text-5xl">
        &amp;
      </span>
      <span className="inline-block tracking-tight">
        <Letters text="Gopinath" />
      </span>
    </h1>
  );
}
