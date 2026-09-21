import { Home, MapPin, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { cn } from "@/lib/utils";

type Accommodation = {
  id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  url: string;
  features: string[];
};

const ACCOMMODATIONS: Accommodation[] = [
  {
    id: "729760621553394744",
    name: "The Green House at Best Day Ever Ranch",
    location: "Whitewright, Texas",
    type: "Ranch Estate & Cabin",
    description:
      "A scenic countryside getaway surrounded by open pastures and nature trails, ideal for families and wedding groups.",
    url: "https://www.airbnb.com/rooms/729760621553394744?unique_share_id=286e1e51-347e-43ce-8bd5-6db715f1528b&viralityEntryPoint=1&s=76",
    features: ["Scenic Ranch Views", "Spacious Grounds", "Country Living"],
  },
  {
    id: "1675239633128335748",
    name: "Sweet Dreams Country Retreat",
    location: "Trenton, Texas",
    type: "Country Home",
    description:
      "A peaceful and private country home located minutes from One Trenton Events & Retreat, offering ultimate comfort and convenience.",
    url: "https://www.airbnb.com/rooms/1675239633128335748?unique_share_id=2bc4ca66-7194-4f6c-a7b7-799e752212dc&viralityEntryPoint=1&s=76",
    features: ["Minutes to Venue", "Peaceful & Quiet", "Full Kitchen & Amenities"],
  },
  {
    id: "918925616020823405",
    name: "The Bungalow at Chinquapin Creek",
    location: "Whitewright, Texas",
    type: "Private Bungalow",
    description:
      "A charming rustic cottage nestled near Chinquapin Creek with cozy interiors and serene outdoor porch seating.",
    url: "https://www.airbnb.com/rooms/918925616020823405?unique_share_id=71d96563-1492-4e24-8215-885ba7304a30&viralityEntryPoint=1&s=76",
    features: ["Creek Side", "Rustic Charm", "Private Porch"],
  },
  {
    id: "1248103727161450626",
    name: "The Five Acre Woods",
    location: "Whitewright, Texas",
    type: "3 BR · 2 BA Country Estate",
    description:
      "A gorgeous 5-acre property accommodating up to 6 guests with an expansive rear deck, relaxing hot tub, and open starry night fire pit.",
    url: "https://www.airbnb.com/rooms/1248103727161450626?unique_share_id=2314f70a-9f07-4186-af84-932f209bbb92&viralityEntryPoint=1&s=76",
    features: ["Hot Tub & Fire Pit", "5 Wooded Acres", "Sleeps 6 Guests"],
  },
  {
    id: "1567435617801022838",
    name: "Blue Ridge Bunkhouse",
    location: "Blue Ridge, Texas",
    type: "2 BR · 4 Beds · 2 Baths",
    description:
      "A delightful small-town haven designed for rest, featuring comfortable bedding, generous living space, and warm hospitality.",
    url: "https://www.airbnb.com/rooms/1567435617801022838?unique_share_id=f6d7f9f2-f235-4993-ba9c-1a8ab2154033&viralityEntryPoint=1&s=76",
    features: ["2 Bedrooms · 4 Beds", "Modern Comforts", "Short Scenic Drive"],
  },
];

export function Accommodations() {
  return (
    <section data-section="accommodations" className="relative px-6 py-28">
      <div className="relative mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Accommodations"
          title="Where to stay & unwind."
          align="center"
          className="mx-auto max-w-2xl"
        />

        <p className="mx-auto mt-6 max-w-2xl text-center font-display text-base italic leading-relaxed text-foreground/75">
          To ensure your stay is comfortable and seamless, we have curated nearby Airbnb homes and country
          retreats situated within easy driving distance of One Trenton Events &amp; Retreat.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACCOMMODATIONS.map((stay, index) => (
            <Reveal key={stay.id} delay={index * 100}>
              <div
                className={cn(
                  "group relative flex h-full flex-col justify-between rounded-2xl border border-gold/25 p-7 paper",
                  "transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_20px_50px_-15px_rgba(225,190,120,0.3)]",
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.25em] text-gold-soft/80">
                      <Home className="h-3.5 w-3.5 text-gold" />
                      {stay.type}
                    </span>
                    <span className="flex items-center gap-1 text-[0.6rem] text-muted-foreground">
                      <MapPin className="h-3 w-3 text-gold-soft/70" />
                      {stay.location}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl leading-tight gold-text">
                    {stay.name}
                  </h3>

                  <div className="my-4 h-px w-12 bg-gold/40 transition-all duration-500 group-hover:w-20" />

                  <p className="text-xs leading-relaxed text-foreground/70">
                    {stay.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {stay.features.map((feat) => (
                      <span
                        key={feat}
                        className="rounded-full border border-gold/20 bg-deep/40 px-2.5 py-0.5 text-[0.58rem] tracking-wide text-gold-soft/90"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gold/15">
                  <a
                    href={stay.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/45 bg-gold/10 px-4 py-2.5 text-[0.65rem] uppercase tracking-[0.28em] text-gold-soft transition-all duration-300 hover:bg-gold hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    View on Airbnb
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
