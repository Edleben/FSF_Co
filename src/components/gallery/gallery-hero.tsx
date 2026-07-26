"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { galleryHeroImages } from "@/lib/gallery-data";

const SLIDE_INTERVAL_MS = 6000;

export function GalleryHero() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % galleryHeroImages.length),
      SLIDE_INTERVAL_MS
    );
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const showPrevious = () =>
    setActiveIndex((current) => (current - 1 + galleryHeroImages.length) % galleryHeroImages.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % galleryHeroImages.length);
  const activeSlide = galleryHeroImages[activeIndex];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t("gallery.hero.label")}
      className="relative min-h-[540px] overflow-hidden bg-primary text-primary-foreground"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {galleryHeroImages.map((slide, index) => (
        <div
          key={slide.category}
          aria-hidden={index !== activeIndex}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={slide.path}
            alt=""
            fill
            priority={index === 0}
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

      <div className="container relative z-10 mx-auto flex min-h-[540px] items-end px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
            {t(activeSlide.categoryDefinition.labelKey)}
          </p>
          <h1 className="mb-5 text-4xl font-bold sm:text-6xl">{t("nav.gallery")}</h1>
          <p className="max-w-2xl text-lg text-white/90 sm:text-xl">
            {t(activeSlide.categoryDefinition.descriptionKey)}
          </p>
          <p className="mt-5 text-sm text-white/75">{activeSlide.location}</p>
        </div>
      </div>

      <div className="absolute bottom-6 right-4 z-20 flex items-center gap-2 sm:right-8">
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={showPrevious}
          aria-label={t("gallery.hero.previous")}
          className="border-white/60 bg-black/30 text-white hover:bg-white hover:text-primary"
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        <div className="flex gap-2 px-2" aria-label={t("gallery.hero.slides")}>
          {galleryHeroImages.map((slide, index) => (
            <button
              key={slide.category}
              type="button"
              aria-label={`${t("gallery.hero.show")} ${t(slide.categoryDefinition.labelKey)}`}
              aria-current={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-accent" : "w-2.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={showNext}
          aria-label={t("gallery.hero.next")}
          className="border-white/60 bg-black/30 text-white hover:bg-white hover:text-primary"
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
