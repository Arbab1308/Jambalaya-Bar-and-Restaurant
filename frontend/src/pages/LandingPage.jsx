import React, { useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

import {
  ArrowRight,
  CalendarCheck,
  Clock,
  MapPin,
  Phone,
  Star,
  Users,
  UtensilsCrossed
} from "lucide-react";

import ReserveTableForm from "@/components/ReserveTableForm";
import MenuAccordion from "@/components/MenuAccordion";
import {
  events,
  faqs,
  media,
  menuCategories,
  signatureDishes,
  siteConfig as defaultConfig,
  testimonials
} from "@/mock";
import { cn } from "@/lib/utils";

const CONFIG_STORAGE = "ghbk_site_config_v1";

function getConfig() {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE);
    return raw ? JSON.parse(raw) : defaultConfig;
  } catch {
    return defaultConfig;
  }
}

function saveConfig(next) {
  localStorage.setItem(CONFIG_STORAGE, JSON.stringify(next));
}

const Section = ({ id, eyebrow, title, desc, children, className = "" }) => (
  <section id={id} className={cn("scroll-mt-24", className)}>
    <div className="max-w-6xl mx-auto px-5">
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.22em] text-slate-800/80">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="mt-2 font-serif text-4xl md:text-5xl leading-[1.05] text-slate-950">
            {title}
          </h2>
        )}
        {desc && (
          <p className="mt-4 text-base md:text-lg text-slate-800/90 leading-relaxed">
            {desc}
          </p>
        )}
      </div>
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

function Stars({ rating = 5 }) {
  const items = Array.from({ length: 5 }).map((_, idx) => idx + 1);
  return (
    <div className="flex items-center gap-1">
      {items.map((i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i <= rating ? "text-slate-950 fill-slate-950" : "text-slate-400"
          )}
        />
      ))}
    </div>
  );
}

export default function LandingPage() {
  const [config, setConfig] = useState(() => getConfig());
  const [partyName, setPartyName] = useState("");
  const [partyPhone, setPartyPhone] = useState("");
  const [partyGuests, setPartyGuests] = useState("20");
  const [partyDate, setPartyDate] = useState("");
  const [partyNotes, setPartyNotes] = useState("");

  const reserveRef = useRef(null);

  const nav = useMemo(
    () => [
      { id: "menu", label: "Menu" },
      { id: "events", label: "Events" },
      { id: "gallery", label: "Gallery" },
      { id: "reviews", label: "Reviews" },
      { id: "private", label: "Private Parties" },
      { id: "contact", label: "Contact" }
    ],
    []
  );

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const onSaveConfig = (patch) => {
    const next = {
      ...config,
      ...patch,
      contact: { ...config.contact, ...(patch.contact || {}) },
      socials: { ...config.socials, ...(patch.socials || {}) }
    };
    setConfig(next);
    saveConfig(next);
    toast.success("Saved", { description: "Updated details are stored in this browser." });
  };

  const submitParty = (e) => {
    e.preventDefault();
    const payload = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name: partyName,
      phone: partyPhone,
      guests: partyGuests,
      date: partyDate,
      notes: partyNotes
    };

    const key = "ghbk_party_inquiries_v1";
    const raw = localStorage.getItem(key);
    const current = raw ? JSON.parse(raw) : [];
    current.unshift(payload);
    localStorage.setItem(key, JSON.stringify(current.slice(0, 30)));

    toast.success("Inquiry saved", {
      description: "We’ll reach out shortly to confirm the details."
    });

    setPartyName("");
    setPartyPhone("");
    setPartyGuests("20");
    setPartyDate("");
    setPartyNotes("");
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="sticky top-0 z-50">
        <div className="backdrop-blur-xl bg-white/35 border-b border-black/10">
          <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
            <button
              onClick={() => scrollTo("top")}
              className="text-left"
              type="button"
            >
              <p className="font-serif text-xl leading-none text-slate-950">
                {config.brandName}
              </p>
              <p className="text-xs text-slate-700">{config.city}</p>
            </button>

            <nav className="hidden lg:flex items-center gap-6">
              {nav.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => scrollTo(n.id)}
                  className="text-sm text-slate-800 hover:text-slate-950 transition-colors duration-200"
                >
                  {n.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white/30 border-black/15 hover:bg-white/45"
                  >
                    Edit details
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-[420px]">
                  <SheetHeader>
                    <SheetTitle className="font-serif">Site essentials</SheetTitle>
                  </SheetHeader>

                  <div className="mt-6 grid gap-4">
                    <div className="grid gap-2">
                      <Label>Restaurant name</Label>
                      <Input
                        value={config.brandName}
                        onChange={(e) =>
                          setConfig((s) => ({ ...s, brandName: e.target.value }))
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Phone (display)</Label>
                      <Input
                        value={config.contact.phoneDisplay}
                        onChange={(e) =>
                          setConfig((s) => ({
                            ...s,
                            contact: { ...s.contact, phoneDisplay: e.target.value }
                          }))
                        }
                      />
                      <p className="text-xs text-slate-600">
                        This is what visitors see.
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label>Phone (tel link)</Label>
                      <Input
                        value={config.contact.phoneTel}
                        onChange={(e) =>
                          setConfig((s) => ({
                            ...s,
                            contact: { ...s.contact, phoneTel: e.target.value }
                          }))
                        }
                      />
                      <p className="text-xs text-slate-600">
                        Example: +919876543210
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label>WhatsApp (wa.me link)</Label>
                      <Input
                        value={config.contact.whatsappWaMe}
                        onChange={(e) =>
                          setConfig((s) => ({
                            ...s,
                            contact: { ...s.contact, whatsappWaMe: e.target.value }
                          }))
                        }
                      />
                      <p className="text-xs text-slate-600">
                        Example: https://wa.me/919876543210
                      </p>
                    </div>

                    <Separator />

                    <div className="grid gap-2">
                      <Label>Address line 1</Label>
                      <Input
                        value={config.contact.addressLine1}
                        onChange={(e) =>
                          setConfig((s) => ({
                            ...s,
                            contact: { ...s.contact, addressLine1: e.target.value }
                          }))
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Address line 2</Label>
                      <Input
                        value={config.contact.addressLine2}
                        onChange={(e) =>
                          setConfig((s) => ({
                            ...s,
                            contact: { ...s.contact, addressLine2: e.target.value }
                          }))
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Google Maps URL</Label>
                      <Input
                        value={config.contact.mapsUrl}
                        onChange={(e) =>
                          setConfig((s) => ({
                            ...s,
                            contact: { ...s.contact, mapsUrl: e.target.value }
                          }))
                        }
                      />
                    </div>

                    <Button
                      onClick={() => onSaveConfig(config)}
                      className="bg-slate-950 text-white hover:bg-slate-900"
                    >
                      Save
                    </Button>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      This is MOCKED for now (frontend-only). When you’re ready, we
                      can connect it to a backend so edits persist across devices.
                    </p>
                  </div>
                </SheetContent>
              </Sheet>

              <Button
                onClick={() => reserveRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="bg-slate-950 text-white hover:bg-slate-900"
              >
                {config.primaryCtaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <header id="top" className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${media.heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-[hsl(var(--background))]/95" />
        <div className="absolute inset-0 hero-grain" />

        <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
            <div className="text-white">
              <Badge className="bg-white/15 text-white border-white/25 backdrop-blur-md">
                Table reservations • Groups • Private parties
              </Badge>

              <h1 className="mt-5 font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight">
                A bar & kitchen built for
                <span className="text-white/90"> long nights</span>.
              </h1>

              <p className="mt-6 max-w-xl text-base md:text-lg text-white/85 leading-relaxed">
                {config.tagline}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => reserveRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-white text-slate-950 hover:bg-white/90"
                >
                  Reserve in 30 seconds
                  <CalendarCheck className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => scrollTo("menu")}
                  className="border-white/35 bg-white/10 text-white hover:bg-white/15"
                >
                  See the menu
                  <UtensilsCrossed className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Card className="border-white/15 bg-white/10 backdrop-blur-xl text-white">
                  <CardContent className="p-4">
                    <p className="text-xs text-white/70">Today</p>
                    <p className="mt-1 font-semibold">Cocktail hour</p>
                    <p className="text-sm text-white/80">5 PM – 7 PM</p>
                  </CardContent>
                </Card>
                <Card className="border-white/15 bg-white/10 backdrop-blur-xl text-white">
                  <CardContent className="p-4">
                    <p className="text-xs text-white/70">Best seats</p>
                    <p className="mt-1 font-semibold">Stage-side tables</p>
                    <p className="text-sm text-white/80">Reserve early</p>
                  </CardContent>
                </Card>
                <Card className="border-white/15 bg-white/10 backdrop-blur-xl text-white">
                  <CardContent className="p-4">
                    <p className="text-xs text-white/70">Groups</p>
                    <p className="mt-1 font-semibold">20+ guests</p>
                    <p className="text-sm text-white/80">Private booking</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div ref={reserveRef} className="lg:pt-2">
              <ReserveTableForm variant="hero" />

              <div className="mt-4 grid gap-2">
                <div className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10 backdrop-blur-xl px-4 py-3 text-white">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-white/80" />
                    <p className="text-sm text-white/85">Open today</p>
                  </div>
                  <p className="text-sm font-medium">{config.contact.hours[1].value}</p>
                </div>
                <a
                  href={`tel:${config.contact.phoneTel}`}
                  className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10 backdrop-blur-xl px-4 py-3 text-white transition-colors duration-200 hover:bg-white/15"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-white/80" />
                    <p className="text-sm text-white/85">Call to confirm</p>
                  </div>
                  <p className="text-sm font-medium">{config.contact.phoneDisplay}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Signature */}
      <Section
        id="signature"
        eyebrow="Signature Picks"
        title="Start strong. Finish sweet."
        desc="A quick shortlist for first-timers and regulars — dishes that match the bar energy." 
        className="py-16 md:py-24"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {signatureDishes.map((d) => (
            <Card
              key={d.id}
              className="group overflow-hidden border-black/10 bg-white/20 backdrop-blur-xl"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  alt={d.name}
                  src={d.imageUrl}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <Badge className="absolute left-3 top-3 bg-white/20 text-white border-white/25 backdrop-blur-md">
                  {d.pill}
                </Badge>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-2xl text-slate-950">
                  {d.name}
                </CardTitle>
                <p className="text-sm text-slate-700 leading-relaxed">{d.desc}</p>
              </CardHeader>
              <CardContent className="pt-0 pb-5 flex items-center justify-between">
                <p className="font-semibold text-slate-950">{d.price}</p>
                <Button
                  variant="outline"
                  className="bg-white/30 border-black/15 hover:bg-white/45"
                  onClick={() => scrollTo("menu")}
                >
                  Find it
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Menu */}
      <Section
        id="menu"
        eyebrow="Menu"
        title="Big variety. Zero confusion."
        desc="Search and skim quickly — then settle in for the good part." 
        className="py-16 md:py-24"
      >
        <MenuAccordion categories={menuCategories} />
      </Section>

      {/* Events */}
      <Section
        id="events"
        eyebrow="Events"
        title="When the lights warm up, the room gets louder."
        desc="Book around our weekly moments — or bring your own reason to celebrate." 
        className="py-16 md:py-24"
      >
        <div className="grid lg:grid-cols-3 gap-6">
          {events.map((e) => (
            <Card
              key={e.id}
              className="border-black/10 bg-white/20 backdrop-blur-xl"
            >
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-slate-950">
                  {e.title}
                </CardTitle>
                <p className="text-sm text-slate-700 leading-relaxed">{e.desc}</p>
              </CardHeader>
              <CardContent className="pt-0 pb-6">
                <div className="grid gap-3">
                  <div className="flex items-center gap-2 text-sm text-slate-800">
                    <Clock className="h-4 w-4" />
                    <span>{e.when}</span>
                  </div>
                  <div className="rounded-lg border border-black/10 bg-white/25 px-3 py-2 text-sm text-slate-800">
                    {e.highlight}
                  </div>
                  <Button
                    className="bg-slate-950 text-white hover:bg-slate-900"
                    onClick={() =>
                      reserveRef.current?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Reserve for this
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section
        id="gallery"
        eyebrow="Gallery"
        title="The vibe, captured."
        desc="Green overhead, warm lights, and plates that disappear fast." 
        className="py-16 md:py-24"
      >
        <div className="grid gap-6">
          <Card className="border-black/10 bg-white/20 backdrop-blur-xl overflow-hidden">
            <CardContent className="p-0">
              <Carousel>
                <CarouselContent>
                  {media.gallery.map((img) => (
                    <CarouselItem key={img.id}>
                      <div className="relative h-[340px] md:h-[420px]">
                        <img
                          alt={img.label}
                          src={img.url}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <Badge className="absolute left-4 bottom-4 bg-white/20 text-white border-white/25 backdrop-blur-md">
                          {img.label}
                        </Badge>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3" />
                <CarouselNext className="right-3" />
              </Carousel>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {media.gallery.map((img) => (
              <a
                key={`thumb-${img.id}`}
                href={img.url}
                target="_blank"
                rel="noreferrer"
                className="group relative rounded-xl overflow-hidden border border-black/10"
              >
                <img
                  alt={img.label}
                  src={img.url}
                  className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-200" />
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* Reviews */}
      <Section
        id="reviews"
        eyebrow="Reviews"
        title="People come for the vibe. They come back for the food."
        desc="A few notes from guests — the kind of energy we aim for every night." 
        className="py-16 md:py-24"
      >
        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card
              key={t.id}
              className="border-black/10 bg-white/20 backdrop-blur-xl"
            >
              <CardHeader>
                <Stars rating={t.rating} />
                <CardTitle className="font-serif text-2xl text-slate-950 mt-2">
                  {t.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-6">
                <p className="text-sm text-slate-800 leading-relaxed">“{t.quote}”</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button
            className="bg-slate-950 text-white hover:bg-slate-900"
            asChild
          >
            <a href={config.socials.googleReviewsUrl} target="_blank" rel="noreferrer">
              Read more reviews
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            className="bg-white/30 border-black/15 hover:bg-white/45"
            asChild
          >
            <a href={config.socials.instagramUrl} target="_blank" rel="noreferrer">
              See latest on Instagram
            </a>
          </Button>
        </div>
      </Section>

      {/* Private parties CTA */}
      <section
        id="private"
        className="relative py-16 md:py-24 scroll-mt-24"
      >
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 hero-grain opacity-60" />
        <div className="relative max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
            <div className="text-white">
              <p className="text-xs uppercase tracking-[0.22em] text-white/70">
                Private Parties
              </p>
              <h2 className="mt-2 font-serif text-4xl md:text-5xl leading-[1.05]">
                Birthdays, team nights, and big group dinners.
              </h2>
              <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">
                Tell us the date + headcount. We’ll help you lock seating, food flow, and
                bar pacing — so your group actually enjoys the night.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-xl p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-white/80" />
                    <p className="font-medium">Flexible seating</p>
                  </div>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    From cozy corners to long tables for 30+.
                  </p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-xl p-4">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="h-4 w-4 text-white/80" />
                    <p className="font-medium">Custom menu plan</p>
                  </div>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Mix veg/non-veg, spice levels, and dessert finishes.
                  </p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-xl p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-white/80" />
                    <p className="font-medium">Smooth pacing</p>
                  </div>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Starters on arrival, mains on cue, drinks always moving.
                  </p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-xl p-4">
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="h-4 w-4 text-white/80" />
                    <p className="font-medium">Fast confirmation</p>
                  </div>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">
                    Share details and we’ll confirm by call/WhatsApp.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button className="bg-white text-slate-950 hover:bg-white/90" asChild>
                  <a href={config.contact.whatsappWaMe} target="_blank" rel="noreferrer">
                    WhatsApp us now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-white/35 bg-white/10 text-white hover:bg-white/15"
                  onClick={() => scrollTo("contact")}
                >
                  View contact details
                </Button>
              </div>
            </div>

            <Card className="border-white/15 bg-white/10 backdrop-blur-xl text-white">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Party inquiry</CardTitle>
                <p className="text-sm text-white/75">
                  Save an inquiry — we’ll follow up to confirm.
                </p>
              </CardHeader>
              <CardContent className="pt-0 pb-6">
                <form onSubmit={submitParty} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label className="text-white">Name</Label>
                    <Input
                      value={partyName}
                      onChange={(e) => setPartyName(e.target.value)}
                      placeholder="Your name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-white">Phone / WhatsApp</Label>
                    <Input
                      value={partyPhone}
                      onChange={(e) => setPartyPhone(e.target.value)}
                      placeholder="+91…"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label className="text-white">Guests</Label>
                      <Input
                        value={partyGuests}
                        onChange={(e) => setPartyGuests(e.target.value)}
                        inputMode="numeric"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-white">Preferred date</Label>
                      <Input
                        value={partyDate}
                        onChange={(e) => setPartyDate(e.target.value)}
                        placeholder="DD/MM"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-white">Notes</Label>
                    <Textarea
                      value={partyNotes}
                      onChange={(e) => setPartyNotes(e.target.value)}
                      placeholder="Birthday / corporate / seating preference…"
                      className="min-h-[96px] bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>

                  <Button type="submit" className="bg-white text-slate-950 hover:bg-white/90">
                    Send inquiry
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="text-xs text-white/70 leading-relaxed">
                    This form is MOCKED (saved in your browser). We can connect it
                    to backend + email/WhatsApp later.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Section
        id="faq"
        eyebrow="FAQ"
        title="Quick answers, so you can get to the fun part."
        desc="If you’re booking for a group, reserve early — weekends move fast." 
        className="py-16 md:py-24"
      >
        <div className="max-w-3xl">
          <Accordion type="single" collapsible>
            {faqs.map((f) => (
              <AccordionItem key={f.id} value={f.id} className="border-black/10">
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-left font-medium text-slate-950">{f.q}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-slate-800 leading-relaxed">{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Contact */}
      <Section
        id="contact"
        eyebrow="Contact"
        title="Find us, call us, or reserve now."
        desc="Use the essentials below — edit them anytime from the header." 
        className="py-16 md:py-24"
      >
        <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
          <Card className="border-black/10 bg-white/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-slate-950">
                Essentials
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-6 grid gap-4">
              <div className="rounded-xl border border-black/10 bg-white/25 p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-slate-950 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-950">{config.contact.addressLine1}</p>
                    <p className="text-sm text-slate-700">{config.contact.addressLine2}</p>
                    <div className="mt-3 flex flex-col sm:flex-row gap-2">
                      <Button
                        className="bg-slate-950 text-white hover:bg-slate-900"
                        asChild
                      >
                        <a href={config.contact.mapsUrl} target="_blank" rel="noreferrer">
                          Get directions
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-white/30 border-black/15 hover:bg-white/45"
                        asChild
                      >
                        <a href={config.contact.whatsappWaMe} target="_blank" rel="noreferrer">
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-black/10 bg-white/25 p-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-slate-950 mt-0.5" />
                  <div className="w-full">
                    <p className="font-medium text-slate-950">Opening hours</p>
                    <div className="mt-2 grid gap-1">
                      {config.contact.hours.map((h) => (
                        <div
                          key={h.label}
                          className="flex items-center justify-between text-sm text-slate-700"
                        >
                          <span>{h.label}</span>
                          <span className="font-medium text-slate-950">{h.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-black/10 bg-white/25 p-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-950 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-950">Call</p>
                    <a
                      className="text-sm text-slate-700 hover:text-slate-950 transition-colors duration-200"
                      href={`tel:${config.contact.phoneTel}`}
                    >
                      {config.contact.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-700">
                Note: these contact details are currently MOCKED and editable in your
                browser.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <ReserveTableForm className="" />

            <Card className="border-black/10 bg-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-slate-950">
                  Quick links
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-6 grid gap-2">
                <a
                  className="flex items-center justify-between rounded-xl border border-black/10 bg-white/25 px-4 py-3 transition-colors duration-200 hover:bg-white/40"
                  href={config.socials.zomatoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="text-sm text-slate-900">Zomato</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  className="flex items-center justify-between rounded-xl border border-black/10 bg-white/25 px-4 py-3 transition-colors duration-200 hover:bg-white/40"
                  href={config.socials.swiggyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="text-sm text-slate-900">Swiggy</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  className="flex items-center justify-between rounded-xl border border-black/10 bg-white/25 px-4 py-3 transition-colors duration-200 hover:bg-white/40"
                  href={config.socials.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="text-sm text-slate-900">Instagram</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-white/20 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div>
              <p className="font-serif text-xl text-slate-950">{config.brandName}</p>
              <p className="text-sm text-slate-700 mt-1">
                Reserve-first landing page — designed for high conversion.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {nav.map((n) => (
                <Button
                  key={`footer-${n.id}`}
                  variant="outline"
                  className="bg-white/30 border-black/15 hover:bg-white/45"
                  onClick={() => scrollTo(n.id)}
                >
                  {n.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <p className="text-xs text-slate-700">
              © {new Date().getFullYear()} {config.brandName}. All rights reserved.
            </p>
            <p className="text-xs text-slate-700 flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>
                {config.contact.addressLine1}, {config.city}
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
