import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
  ArrowDown,
  CalendarCheck,
  Clock,
  MapPin,
  Phone,
  Star,
  Users,
  UtensilsCrossed,
  Leaf,
  Flame,
  Music,
  Wine
} from "lucide-react";

import ReserveTableForm from "@/components/ReserveTableForm";
import MenuAccordion from "@/components/MenuAccordion";
import { cn } from "@/lib/utils";

import {
  events,
  faqs,
  media,
  menuCategories,
  signatureDishes,
  siteConfig,
  testimonials
} from "@/mock";

const NAV = [
  { id: "signature", label: "Signature" },
  { id: "menu", label: "Menu" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" }
];

// Intersection Observer Hook for scroll animations
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}

// Animated Section Component
function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Section({ id, eyebrow, title, desc, children, className = "", dark = false }) {
  const [ref, isInView] = useInView();

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-20 md:py-28",
        dark ? "bg-[var(--color-primary-dark)] text-[var(--color-cream)]" : "",
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div
          ref={ref}
          className={cn(
            "max-w-3xl transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {eyebrow && (
            <p className={cn(
              "eyebrow mb-4",
              dark ? "text-[var(--color-accent)]" : ""
            )}>
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className={cn(
              "section-title",
              dark ? "text-[var(--color-cream)]" : "text-[var(--color-primary-dark)]"
            )}>
              {title}
            </h2>
          )}
          {desc && (
            <p className={cn(
              "mt-5 text-lg leading-relaxed",
              dark ? "text-[var(--color-cream)]/80" : "text-[var(--color-charcoal)]/70"
            )}>
              {desc}
            </p>
          )}
          <div className="divider-accent mt-6" />
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function Stars({ rating = 5 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i <= rating
              ? "text-[var(--color-accent)] fill-[var(--color-accent)]"
              : "text-[var(--color-charcoal)]/20"
          )}
        />
      ))}
    </div>
  );
}

export default function RestaurantLanding() {
  const [config] = useState(siteConfig);
  const reserveRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const heroFeatures = useMemo(
    () => [
      { icon: Flame, label: "Wood-Oven Kitchen", desc: "Authentic flavors" },
      { icon: Wine, label: "Craft Cocktails", desc: "House specials" },
      { icon: Music, label: "Live Music", desc: "Every weekend" }
    ],
    []
  );

  const onReservationSaved = useCallback(() => {
    toast.success("Reservation request saved", {
      description: "We'll confirm shortly via call/WhatsApp."
    });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "header-blur py-3" : "bg-transparent py-5"
        )}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between">
          <button
            onClick={() => scrollTo("top")}
            className="text-left group"
            type="button"
          >
            <p className={cn(
              "font-display text-xl font-semibold tracking-tight transition-colors",
              scrolled ? "text-[var(--color-primary-dark)]" : "text-[var(--color-cream)]"
            )}>
              {config.brandName}
            </p>
            <p className={cn(
              "text-xs font-medium transition-colors",
              scrolled ? "text-[var(--color-primary)]/60" : "text-[var(--color-cream)]/70"
            )}>
              {config.city}
            </p>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => scrollTo(n.id)}
                className={cn(
                  "nav-link text-sm",
                  scrolled ? "" : "text-[var(--color-cream)] hover:text-[var(--color-accent)]"
                )}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <Button
            className="btn-accent"
            onClick={() => reserveRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            Reserve Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero - Massive Typography */}
      <section id="top" className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${media.heroBackground})` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-hero" />

        {/* Grain Texture */}
        <div className="grain-overlay" />

        {/* Content */}
        <div className="relative z-10 w-full pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            {/* Main Hero Content */}
            <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 items-end">
              {/* Left - Typography */}
              <div className="animate-fade-in-up">
                <Badge className="badge-premium mb-6">
                  <Leaf className="h-3 w-3 mr-2" />
                  Table Reservations • Private Events
                </Badge>

                <h1 className="hero-title text-[var(--color-cream)]">
                  Where the night
                  <br />
                  <span className="hero-title-accent">comes alive</span>
                </h1>

                <p className="mt-8 max-w-lg text-lg text-[var(--color-cream)]/85 leading-relaxed">
                  {config.tagline}
                </p>

                {/* Feature Pills */}
                <div className="mt-10 flex flex-wrap gap-4">
                  {heroFeatures.map((f, i) => (
                    <div
                      key={f.label}
                      className={cn(
                        "flex items-center gap-3 px-5 py-3 rounded-sm",
                        "bg-[var(--color-cream)]/10 backdrop-blur-sm",
                        "border border-[var(--color-cream)]/20",
                        "animate-fade-in-up",
                        i === 0 ? "stagger-2" : i === 1 ? "stagger-3" : "stagger-4"
                      )}
                    >
                      <f.icon className="h-5 w-5 text-[var(--color-accent)]" />
                      <div>
                        <p className="text-sm font-semibold text-[var(--color-cream)]">{f.label}</p>
                        <p className="text-xs text-[var(--color-cream)]/60">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => reserveRef.current?.scrollIntoView({ behavior: "smooth" })}
                    className="btn-accent text-base"
                  >
                    Reserve Your Table
                    <CalendarCheck className="ml-2 h-5 w-5" />
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => scrollTo("menu")}
                    className="border-[var(--color-cream)]/30 bg-transparent text-[var(--color-cream)] hover:bg-[var(--color-cream)]/10"
                  >
                    Explore Menu
                    <UtensilsCrossed className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Right - Quick Info */}
              <div className="animate-slide-in-right stagger-3">
                <Card className="card-dark rounded-none">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-[var(--color-accent)]" />
                        <span className="text-sm text-[var(--color-cream)]/70">Open Today</span>
                      </div>
                      <span className="font-semibold text-[var(--color-cream)]">
                        {config.contact.hours[0].value}
                      </span>
                    </div>

                    <Separator className="bg-[var(--color-cream)]/10" />

                    <a
                      href={`tel:${config.contact.phoneTel}`}
                      className="flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-[var(--color-accent)]" />
                        <span className="text-sm text-[var(--color-cream)]/70">Call Us</span>
                      </div>
                      <span className="font-semibold text-[var(--color-cream)] group-hover:text-[var(--color-accent)] transition-colors">
                        {config.contact.phoneDisplay}
                      </span>
                    </a>

                    <Separator className="bg-[var(--color-cream)]/10" />

                    <a
                      href={config.contact.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-[var(--color-accent)]" />
                        <span className="text-sm text-[var(--color-cream)]/70">Location</span>
                      </div>
                      <span className="font-semibold text-[var(--color-cream)] group-hover:text-[var(--color-accent)] transition-colors">
                        Get Directions →
                      </span>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 flex justify-center animate-fade-in stagger-5">
              <button
                onClick={() => scrollTo("signature")}
                className="scroll-indicator flex flex-col items-center gap-2 text-[var(--color-cream)]/50 hover:text-[var(--color-accent)] transition-colors"
              >
                <span className="text-xs uppercase tracking-widest">Discover</span>
                <ArrowDown className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dishes */}
      <Section
        id="signature"
        eyebrow="Chef's Selection"
        title="Signature Dishes"
        desc="Hand-picked favorites that define our kitchen — bold flavors, beautiful presentation, unforgettable taste."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {signatureDishes.slice(0, 6).map((d, i) => (
            <AnimatedSection key={d.id} delay={i * 100}>
              <Card className="card-premium rounded-none overflow-hidden group">
                <div className="img-zoom relative h-52">
                  <img
                    alt={d.name}
                    src={d.imageUrl}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/70 to-transparent" />
                  <Badge className="absolute left-4 bottom-4 badge-premium rounded-none">
                    {d.pill}
                  </Badge>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="font-display text-2xl text-[var(--color-primary-dark)]">
                    {d.name}
                  </CardTitle>
                  <p className="text-sm text-[var(--color-charcoal)]/60 leading-relaxed">
                    {d.desc}
                  </p>
                </CardHeader>

                <CardContent className="pt-0 pb-5 flex items-center justify-between">
                  <p className="price-tag text-xl">{d.price}</p>
                  <Button
                    variant="outline"
                    className="btn-secondary rounded-none"
                    onClick={() => scrollTo("menu")}
                  >
                    View in Menu
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Menu */}
      <Section
        id="menu"
        eyebrow="Our Menu"
        title="Taste the Diversity"
        desc="From Goan classics to wood-oven pizzas — every dish tells a story of local ingredients and global inspiration."
        className="bg-[var(--color-cream-dark)]"
      >
        <MenuAccordion categories={menuCategories} />
      </Section>

      {/* Events */}
      <Section
        id="events"
        eyebrow="What's Happening"
        title="Events & Experiences"
        desc="Live music, cocktail hours, and brunch clubs — there's always a reason to visit."
      >
        <div className="grid lg:grid-cols-3 gap-6">
          {events.map((e, i) => (
            <AnimatedSection key={e.id} delay={i * 150}>
              <Card className="card-premium rounded-none h-full flex flex-col">
                <CardHeader className="flex-1">
                  <div className="w-12 h-12 rounded-none bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                    {i === 0 ? <Music className="h-6 w-6 text-[var(--color-primary)]" /> :
                      i === 1 ? <Wine className="h-6 w-6 text-[var(--color-primary)]" /> :
                        <UtensilsCrossed className="h-6 w-6 text-[var(--color-primary)]" />}
                  </div>
                  <CardTitle className="font-display text-2xl text-[var(--color-primary-dark)]">
                    {e.title}
                  </CardTitle>
                  <p className="text-sm text-[var(--color-charcoal)]/60 leading-relaxed">
                    {e.desc}
                  </p>
                </CardHeader>

                <CardContent className="pt-0 pb-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-[var(--color-primary)]">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{e.when}</span>
                  </div>

                  <div className="px-4 py-3 bg-[var(--color-accent)]/10 text-sm text-[var(--color-accent-dark)]">
                    {e.highlight}
                  </div>

                  <Button
                    className="btn-primary w-full rounded-none"
                    onClick={() => reserveRef.current?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Reserve for This Event
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section
        id="gallery"
        eyebrow="The Vibe"
        title="Gallery"
        desc="Green overhead, warm lights, and plates that disappear fast — see it for yourself."
        className="bg-[var(--color-cream-dark)]"
      >
        <AnimatedSection>
          <Card className="card-premium rounded-none overflow-hidden">
            <CardContent className="p-0">
              <Carousel>
                <CarouselContent>
                  {media.gallery.map((img) => (
                    <CarouselItem key={img.id}>
                      <div className="relative h-[400px] md:h-[500px]">
                        <img
                          alt={img.label}
                          src={img.url}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/60 to-transparent" />
                        <div className="absolute left-6 bottom-6">
                          <Badge className="badge-premium rounded-none text-[var(--color-cream)] bg-[var(--color-primary-dark)]/80">
                            {img.label}
                          </Badge>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-[var(--color-cream)] hover:bg-[var(--color-accent)]" />
                <CarouselNext className="right-4 bg-[var(--color-cream)] hover:bg-[var(--color-accent)]" />
              </Carousel>
            </CardContent>
          </Card>
        </AnimatedSection>

        <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-3">
          {media.gallery.map((img, i) => (
            <AnimatedSection key={`thumb-${img.id}`} delay={i * 50}>
              <a
                href={img.url}
                target="_blank"
                rel="noreferrer"
                className="img-zoom block relative rounded-none overflow-hidden border border-[var(--color-primary)]/10"
              >
                <img
                  alt={img.label}
                  src={img.url}
                  className="h-24 w-full object-cover"
                />
                <div className="absolute inset-0 bg-[var(--color-charcoal)]/0 hover:bg-[var(--color-charcoal)]/20 transition-colors" />
              </a>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Reviews */}
      <Section
        id="reviews"
        eyebrow="Guest Reviews"
        title="What People Say"
        desc="Real words from real guests — the energy we aim for every night."
      >
        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 100}>
              <Card className="card-premium rounded-none h-full">
                <CardHeader>
                  <Stars rating={t.rating} />
                  <CardTitle className="font-display text-2xl text-[var(--color-primary-dark)] mt-3">
                    {t.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-6">
                  <p className="text-[var(--color-charcoal)]/70 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={400} className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button className="btn-primary rounded-none" asChild>
            <a href={config.socials.googleReviewsUrl} target="_blank" rel="noreferrer">
              Read All Reviews
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button className="btn-secondary rounded-none" asChild>
            <a href={config.socials.instagramUrl} target="_blank" rel="noreferrer">
              Follow on Instagram
            </a>
          </Button>
        </AnimatedSection>
      </Section>

      {/* Private Parties - Dark Section */}
      <Section
        id="private"
        eyebrow="Private Events"
        title="Your Celebration, Our Stage"
        desc="Birthdays, corporate dinners, intimate gatherings — we'll handle the details so you can enjoy the moment."
        dark={true}
      >
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Users, title: "Flexible Seating", desc: "From cozy corners to long tables for 30+" },
              { icon: UtensilsCrossed, title: "Custom Menu", desc: "Mix veg/non-veg, adjust spice levels" },
              { icon: Clock, title: "Smooth Pacing", desc: "Starters on arrival, mains on cue" },
              { icon: CalendarCheck, title: "Fast Confirmation", desc: "Details via call or WhatsApp" }
            ].map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 100}>
                <div className="p-5 border border-[var(--color-cream)]/15 bg-[var(--color-cream)]/5">
                  <f.icon className="h-6 w-6 text-[var(--color-accent)] mb-3" />
                  <p className="font-semibold text-[var(--color-cream)]">{f.title}</p>
                  <p className="text-sm text-[var(--color-cream)]/60 mt-1">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* FAQs */}
          <AnimatedSection delay={200}>
            <Card className="card-dark rounded-none">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-[var(--color-cream)]">
                  Quick FAQs
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-6">
                <Accordion type="single" collapsible>
                  {faqs.map((f) => (
                    <AccordionItem key={f.id} value={f.id} className="border-[var(--color-cream)]/10">
                      <AccordionTrigger className="hover:no-underline text-[var(--color-cream)] text-left">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-[var(--color-cream)]/70 leading-relaxed">{f.a}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={300} className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button className="btn-accent rounded-none" asChild>
            <a href={config.contact.whatsappWaMe} target="_blank" rel="noreferrer">
              WhatsApp Us Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            className="border-[var(--color-cream)]/30 text-[var(--color-cream)] hover:bg-[var(--color-cream)]/10 rounded-none"
            onClick={() => scrollTo("contact")}
          >
            View Contact Details
          </Button>
        </AnimatedSection>
      </Section>

      {/* Contact & Reservation */}
      <Section
        id="contact"
        eyebrow="Get in Touch"
        title="Reserve Your Table"
        desc="The fastest path to a confirmed seat — book online or reach out directly."
      >
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <AnimatedSection>
            <Card className="card-premium rounded-none h-full">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-[var(--color-primary-dark)]">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-6 space-y-5">
                {/* Address */}
                <div className="p-4 bg-[var(--color-primary)]/5">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-[var(--color-primary)] mt-1" />
                    <div>
                      <p className="font-semibold text-[var(--color-primary-dark)]">
                        {config.contact.addressLine1}
                      </p>
                      <p className="text-sm text-[var(--color-charcoal)]/60">
                        {config.contact.addressLine2}
                      </p>
                      <Button className="btn-primary rounded-none mt-4" asChild>
                        <a href={config.contact.mapsUrl} target="_blank" rel="noreferrer">
                          Get Directions
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="p-4 bg-[var(--color-primary)]/5">
                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-[var(--color-primary)] mt-1" />
                    <div className="flex-1">
                      <p className="font-semibold text-[var(--color-primary-dark)]">Opening Hours</p>
                      <div className="mt-2 space-y-1">
                        {config.contact.hours.map((h) => (
                          <div key={h.label} className="flex justify-between text-sm">
                            <span className="text-[var(--color-charcoal)]/60">{h.label}</span>
                            <span className="font-medium text-[var(--color-primary-dark)]">{h.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="p-4 bg-[var(--color-primary)]/5">
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-[var(--color-primary)] mt-1" />
                    <div>
                      <p className="font-semibold text-[var(--color-primary-dark)]">Call Us</p>
                      <a
                        href={`tel:${config.contact.phoneTel}`}
                        className="text-[var(--color-charcoal)]/60 hover:text-[var(--color-accent)] transition-colors"
                      >
                        {config.contact.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="pt-4 space-y-2">
                  <p className="text-sm font-semibold text-[var(--color-primary-dark)]">Quick Links</p>
                  {[
                    { label: "Zomato", url: config.socials.zomatoUrl },
                    { label: "Swiggy", url: config.socials.swiggyUrl },
                    { label: "Instagram", url: config.socials.instagramUrl }
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3 bg-[var(--color-primary)]/5 hover:bg-[var(--color-primary)]/10 transition-colors"
                    >
                      <span className="text-sm text-[var(--color-primary-dark)]">{link.label}</span>
                      <ArrowRight className="h-4 w-4 text-[var(--color-primary)]" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Reservation Form */}
          <AnimatedSection delay={200}>
            <div ref={reserveRef}>
              <ReserveTableForm onSuccess={onReservationSaved} />
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-[var(--color-primary-dark)] text-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
            <div>
              <p className="font-display text-2xl font-semibold">{config.brandName}</p>
              <p className="text-sm text-[var(--color-cream)]/60 mt-2 max-w-md">
                A tropical bar & kitchen built for long nights, loud laughs, and wood-oven comfort.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {NAV.map((n) => (
                <Button
                  key={`footer-${n.id}`}
                  variant="outline"
                  className="border-[var(--color-cream)]/20 text-[var(--color-cream)] hover:bg-[var(--color-cream)]/10 rounded-none"
                  onClick={() => scrollTo(n.id)}
                >
                  {n.label}
                </Button>
              ))}
            </div>
          </div>

          <Separator className="my-8 bg-[var(--color-cream)]/10" />

          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-sm text-[var(--color-cream)]/50">
            <p>© {new Date().getFullYear()} {config.brandName}. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{config.contact.addressLine1}, {config.city}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
