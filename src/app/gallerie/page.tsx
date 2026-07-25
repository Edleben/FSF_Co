"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";

export default function GalleriePage() {
  const { t } = useLanguage();
  
  // Define curated folders from public/ to showcase
  const sections = useMemo(
    () => [
      {
        title: t('gallery.mini_camp'),
        basePath: "/images/activities/mini_camp",
        count: 13,
        pattern: (i: number) => `/images/activities/mini_camp/activities_mini_camp (${i}).jpg`,
        startIndex: 1,
      },
      {
        title: t('gallery.school_kits_davie'),
        basePath: "/images/donations/kits_scolaires/davie",
        count: 28,
        pattern: (i: number) => `/images/donations/kits_scolaires/davie/kit_davie (${i}).jpg`,
        startIndex: 1,
      },
      // The agogome folder contains many files; we can feature first 24
      {
        title: t('gallery.school_kits_agogome'),
        basePath: "/images/donations/kits_scolaires/agogome",
        count: 88,
        pattern: (i: number) => `/images/donations/kits_scolaires/agogome/Don_Kit-Agogome(${i}).jpg`,
        startIndex: 1,
      },
      // Vivres folders (feature subsets if present)
      {
        title: t('gallery.food_agogome'),
        basePath: "/images/donations/vivres/agogome",
        count: 32,
        pattern: (i: number) => `/images/donations/vivres/agogome/img_agogome (${i}).jpg`,
        startIndex: 1,
      },
      {
        title: t('gallery.food_notse'),
        basePath: "/images/donations/vivres/notse",
        count: 70,
        pattern: (i: number) => `/images/donations/vivres/notse/img_notse (${i}).jpg`,
        startIndex: 1,
      },
    ],
    []
  );

  return (
    <div className="bg-background text-foreground">
      <section className="relative py-16 sm:py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">{t('nav.gallery')}</h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-primary-foreground/90">
            {t('gallery.discover_actions')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14 sm:space-y-16">
        {sections.map((section) => {
          const images = Array.from({ length: section.count }, (_, idx) => idx + section.startIndex).map(
            (i) => section.pattern(i)
          );
          if (section.count === 0) return null;

          return (
            <div key={section.title}>
              <h2 className="text-2xl sm:text-3xl font-headline font-semibold mb-4 text-primary">
                {section.title}
              </h2>
              <Separator className="mb-6" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {images.map((src) => (
                  <Card key={src} className="overflow-hidden bg-card">
                    <CardContent className="p-0">
                      <div className="relative w-full aspect-square">
                        <Image
                          src={src}
                          alt={section.title}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


