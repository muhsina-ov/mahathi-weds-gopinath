import { useState } from "react";
import { Home, ExternalLink, Copy, Check, Heart, Gift } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";

export function Registry() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const AMAZON_REGISTRY_URL = "https://www.amazon.com/wedding/guest-view/1PFKKW7K51D2N";
  const PAYPAL_EMAIL = "Nukavarapug@gmail.com";
  const PAYPAL_PHONE = "7792762757";
  const PAYPAL_PHONE_FORMATTED = "+1 (779) 276-2757";
  const PAYPAL_SEND_URL = "https://www.paypal.me/GopinathNukavarapu";

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedItem(label);
    window.setTimeout(() => setCopiedItem(null), 2500);
  };

  return (
    <section data-section="registry" className="relative px-6 py-28 overflow-hidden">
      {/* Background soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-80 max-w-2xl bg-[radial-gradient(ellipse_at_center,oklch(0.86_0.12_84/0.12),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <SectionHeader
          eyebrow="Wedding Registry"
          title="GIFTS & BLESSINGS"
          className="mx-auto max-w-xl"
        />

        <Reveal delay={150}>
          <div className="mt-12 rounded-[1.75rem] border border-gold/30 bg-deep/55 p-8 sm:p-12 shadow-[0_30px_90px_-30px_oklch(0.2_0.1_30/0.8)] backdrop-blur-md">
            <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold-soft shadow-[0_0_20px_rgba(225,190,120,0.15)]">
              <Gift className="h-7 w-7 stroke-[1.5]" />
            </div>

            <p className="font-display text-xl sm:text-2xl leading-relaxed text-gold-soft font-normal">
              Your presence and prayers are the greatest gift of all. For friends and family who
              have kindly inquired about a registry, we have curated a wedding wish list and also
              established a fund for our first home together.
            </p>

            {/* Amazon Registry Primary Card */}
            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-gold/40 bg-gradient-to-b from-card/85 to-card/55 p-6 text-center shadow-lg transition-all duration-300 hover:border-gold/70">
              <div className="flex items-center justify-between border-b border-gold/20 pb-3">
                <span className="font-display text-lg text-foreground font-semibold">
                  Amazon Wedding Registry
                </span>
                <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[0.62rem] uppercase tracking-wider text-gold-soft font-medium">
                  Official Wishlist
                </span>
              </div>

              <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                Explore our selected registry items on Amazon for our home and kitchen.
              </p>

              <div className="mt-5">
                <a
                  href={AMAZON_REGISTRY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gold/70 bg-gradient-to-r from-gold/30 via-gold/20 to-gold/30 px-5 py-3.5 text-xs uppercase tracking-[0.25em] font-medium text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-deep hover:shadow-[0_0_25px_oklch(0.86_0.12_84/0.4)]"
                >
                  <span>View Amazon Registry</span>
                  <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Subtle separator */}
            <div className="relative mx-auto my-10 flex max-w-xs items-center gap-4">
              <span className="h-px flex-1 bg-gold/25" />
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-soft/70 font-sans">
                OR
              </span>
              <span className="h-px flex-1 bg-gold/25" />
            </div>

            {/* PayPal Details Card */}
            <div className="mx-auto max-w-md rounded-2xl border border-gold/30 bg-card/75 p-6 text-left shadow-inner">
              <div className="flex items-center justify-between border-b border-gold/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg text-foreground font-semibold">
                    PayPal Contribution
                  </span>
                </div>
                <span className="text-[0.65rem] tracking-wider uppercase text-gold-soft font-medium">
                  Direct &amp; Secure
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {/* PayPal Email */}
                <div className="flex items-center justify-between gap-3 rounded-xl border border-gold/20 bg-deep/40 p-3.5">
                  <div>
                    <span className="text-[0.6rem] uppercase tracking-wider text-muted-foreground block">
                      PayPal Email
                    </span>
                    <span className="font-sans text-sm font-medium text-foreground select-all break-all">
                      {PAYPAL_EMAIL}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PAYPAL_EMAIL, "email")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gold/30 px-3 py-1.5 text-xs text-gold-soft hover:bg-gold/15 transition-all shrink-0 cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedItem === "email" ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* PayPal Phone */}
                <div className="flex items-center justify-between gap-3 rounded-xl border border-gold/20 bg-deep/40 p-3.5">
                  <div>
                    <span className="text-[0.6rem] uppercase tracking-wider text-muted-foreground block">
                      Phone Number
                    </span>
                    <span className="font-sans text-sm font-medium text-foreground select-all">
                      {PAYPAL_PHONE_FORMATTED}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PAYPAL_PHONE, "phone")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gold/30 px-3 py-1.5 text-xs text-gold-soft hover:bg-gold/15 transition-all shrink-0 cursor-pointer"
                    title="Copy Phone Number"
                  >
                    {copiedItem === "phone" ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Direct Link to PayPal */}
              <div className="mt-6">
                <a
                  href={PAYPAL_SEND_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gold/60 bg-gradient-to-r from-gold/25 via-gold/15 to-gold/25 px-5 py-3 text-xs uppercase tracking-[0.25em] font-medium text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-deep hover:shadow-[0_0_25px_oklch(0.86_0.12_84/0.4)]"
                >
                  <span>Send via PayPal</span>
                  <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            <p className="mt-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>Thank you for showering your love and warmth</span>
              <Heart className="h-3.5 w-3.5 fill-gold/50 text-gold" />
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
