import { Gift, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";

export function Registry() {
  return (
    <section data-section="registry" className="relative px-6 py-28 overflow-hidden">
      {/* Background soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-80 max-w-2xl bg-[radial-gradient(ellipse_at_center,oklch(0.86_0.12_84/0.12),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <SectionHeader
          eyebrow="Wedding Registry"
          title="With Gratitude & Love"
          className="mx-auto max-w-xl"
        />

        <Reveal delay={150}>
          <div className="mt-12 rounded-[1.75rem] border border-gold/30 bg-deep/50 p-8 sm:p-12 shadow-[0_30px_90px_-30px_oklch(0.2_0.1_30/0.8)] backdrop-blur-sm">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full border border-gold/35 bg-gold/10 text-gold-soft">
              <Gift className="h-6 w-6 stroke-[1.5]" />
            </div>

            <p className="font-display text-xl sm:text-2xl leading-relaxed text-gold-soft font-normal">
              Your blessings and presence is more than enough for us, but should you wish to give a gift, our registry is available here:
            </p>

            <div className="mt-8 flex justify-center">
              <a
                href="https://withjoy.com/prithvi-and-vinathi/registry"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-gold/50 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 px-7 py-3.5 text-sm font-medium tracking-wide text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-deep hover:shadow-[0_0_25px_oklch(0.86_0.12_84/0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>View Wedding Registry</span>
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <p className="mt-4 text-[0.7rem] text-muted-foreground break-all">
              <a
                href="https://withjoy.com/prithvi-and-vinathi/registry"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-gold/40 hover:text-gold transition-colors"
              >
                https://withjoy.com/prithvi-and-vinathi/registry
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
