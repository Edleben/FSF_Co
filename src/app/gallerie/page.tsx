"use client";

import { GalleryExplorer } from "@/components/gallery/gallery-explorer";
import { GalleryHero } from "@/components/gallery/gallery-hero";

export default function GalleriePage() {
  return (
    <div className="bg-background text-foreground">
      <GalleryHero />
      <GalleryExplorer />
    </div>
  );
}
