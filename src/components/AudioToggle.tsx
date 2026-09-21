import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Floating audio mute/unmute toggle. Plays a looped audio file. If no audio
 * asset is available (404), the toggle still mounts but is a no-op and shows
 * a small "—" badge so it doesn't silently break the layout.
 *
 * Source resolution order:
 *   1. `import.meta.env.VITE_AUDIO_URL` — set in `.env` if you host audio
 *   2. `/__local/audio.mp3` — drop a file in `src/assets/` and add an
 *      `.asset.json` so it can be served at `/__local/audio.mp3`
 *
 * Hidden until the opening sequence finishes (pass `visible` from index.tsx).
 */
export function AudioToggle({ visible }: { visible: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    const src = (import.meta.env["VITE_AUDIO_URL"] as string | undefined) ?? "/__local/audio.mp3";
    const a = new Audio(src);
    a.loop = true;
    a.preload = "none";
    a.addEventListener("error", () => setBroken(true), { once: true });
    audioRef.current = a;
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a || broken) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      void a
        .play()
        .then(() => setPlaying(true))
        .catch(() => setBroken(true));
    }
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Mute music" : "Play music"}
      className={cn(
        "fixed bottom-5 left-5 z-30 grid h-10 w-10 place-items-center rounded-full",
        "border border-gold/30 bg-deep/70 text-gold-soft backdrop-blur-sm",
        "transition-colors hover:bg-deep/90",
      )}
    >
      {broken ? (
        <span className="text-[0.6rem]">—</span>
      ) : playing ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
    </button>
  );
}
