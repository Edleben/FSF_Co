"use client";

import Image from "@/components/site-image";
import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Images, MapPin, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  galleryCategories,
  galleryImages,
  type GalleryCategory,
  type GalleryImage,
} from "@/lib/gallery-data";

const PAGE_SIZE = 24;
const SEARCH_DEBOUNCE_MS = 250;

function normalizeSearchValue(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function GalleryExplorer() {
  const { language, t } = useLanguage();
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setSearchQuery(searchInput), SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const filteredImages = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(searchQuery);
    return galleryImages.filter((image) => {
      const matchesCategory = category === "all" || image.category === category;
      if (!matchesCategory || !normalizedQuery) return matchesCategory;
      const searchableValue = normalizeSearchValue(
        `${image.name} ${image.nameFr} ${image.category} ${image.series} ${image.description} ${image.descriptionFr} ${image.location} ${image.date}`
      );
      return searchableValue.includes(normalizedQuery);
    });
  }, [category, searchQuery]);

  useEffect(() => setVisibleCount(PAGE_SIZE), [category, searchQuery]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || visibleCount >= filteredImages.length) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((count) => Math.min(count + PAGE_SIZE, filteredImages.length));
        }
      },
      { rootMargin: "500px 0px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [filteredImages.length, visibleCount]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(language, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }),
    [language]
  );

  const formatDate = (date: string) => {
    const [start, end] = date.split("/");
    if (!end) return dateFormatter.format(new Date(`${start}T00:00:00Z`));
    return `${dateFormatter.format(new Date(`${start}T00:00:00Z`))} – ${dateFormatter.format(
      new Date(`${end}T00:00:00Z`)
    )}`;
  };

  const getCategoryLabel = (image: GalleryImage) =>
    t(galleryCategories.find((item) => item.id === image.category)?.labelKey ?? image.category);
  const getImageName = (image: GalleryImage) => (language === "fr" ? image.nameFr : image.name);
  const getImageDescription = (image: GalleryImage) =>
    language === "fr" ? image.descriptionFr : image.description;

  const selectedIndex = selectedImage
    ? filteredImages.findIndex((image) => image.id === selectedImage.id)
    : -1;

  const selectAdjacentImage = (direction: -1 | 1) => {
    if (selectedIndex < 0 || filteredImages.length === 0) return;
    const nextIndex = (selectedIndex + direction + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const resetFilters = () => {
    setSearchInput("");
    setSearchQuery("");
    setCategory("all");
  };

  return (
    <>
      <section className="sticky top-16 z-30 border-y bg-background/95 py-5 shadow-sm backdrop-blur">
        <div className="container mx-auto grid gap-3 px-4 sm:px-6 md:grid-cols-[1fr_260px_auto] lg:px-8">
          <label className="relative">
            <span className="sr-only">{t("gallery.search.label")}</span>
            <Search
              size={19}
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder={t("gallery.search.placeholder")}
              className="h-11 pl-10"
            />
          </label>
          <Select value={category} onValueChange={(value) => setCategory(value as GalleryCategory | "all")}>
            <SelectTrigger className="h-11" aria-label={t("gallery.filter.category")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("gallery.category.all")}</SelectItem>
              {galleryCategories.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {t(item.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(searchInput || category !== "all") && (
            <Button type="button" variant="ghost" onClick={resetFilters} className="h-11">
              <X size={18} aria-hidden="true" className="mr-2" />
              {t("gallery.filters.reset")}
            </Button>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:px-8" aria-live="polite">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              {t("gallery.explorer.eyebrow")}
            </p>
            <h2 className="mt-1 text-3xl font-bold text-primary">{t("gallery.explorer.title")}</h2>
          </div>
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Images size={18} aria-hidden="true" />
            {filteredImages.length} {t("gallery.results")}
          </p>
        </div>

        {filteredImages.length === 0 ? (
          <div className="rounded-xl border border-dashed px-6 py-16 text-center">
            <h3 className="text-xl font-semibold text-primary">{t("gallery.empty.title")}</h3>
            <p className="mt-2 text-muted-foreground">{t("gallery.empty.description")}</p>
            <Button type="button" variant="outline" onClick={resetFilters} className="mt-6">
              {t("gallery.filters.reset")}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">
            {filteredImages.slice(0, visibleCount).map((image) => (
              <Card
                key={image.id}
                className="group overflow-hidden border-0 bg-card shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-0">
                  <button
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    aria-label={`${t("gallery.open")} ${getImageName(image)}`}
                    className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={image.path}
                        alt={getImageName(image)}
                        fill
                        unoptimized
                        loading="lazy"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-10 text-white">
                        <p className="line-clamp-1 text-sm font-semibold">{getImageName(image)}</p>
                        <p className="mt-1 text-xs text-white/80">{getCategoryLabel(image)}</p>
                      </div>
                    </div>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div ref={loadMoreRef} className="h-8" aria-hidden="true" />
        {visibleCount < filteredImages.length && (
          <p className="text-center text-sm text-muted-foreground">{t("gallery.loading_more")}</p>
        )}
      </section>

      <Dialog open={Boolean(selectedImage)} onOpenChange={(open) => !open && setSelectedImage(null)}>
        {selectedImage && (
          <DialogContent className="max-h-[94vh] max-w-5xl overflow-y-auto border-0 p-0">
            <div className="grid md:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)]">
              <div className="relative min-h-[48vh] bg-black md:min-h-[78vh]">
                <Image
                  src={selectedImage.path}
                  alt={getImageName(selectedImage)}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 70vw"
                  className="object-contain"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => selectAdjacentImage(-1)}
                  aria-label={t("gallery.modal.previous")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 border-white/50 bg-black/40 text-white hover:bg-white hover:text-primary"
                >
                  <ChevronLeft aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => selectAdjacentImage(1)}
                  aria-label={t("gallery.modal.next")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 border-white/50 bg-black/40 text-white hover:bg-white hover:text-primary"
                >
                  <ChevronRight aria-hidden="true" />
                </Button>
              </div>
              <DialogHeader className="justify-center p-6 text-left sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  {getCategoryLabel(selectedImage)}
                </p>
                <DialogTitle className="text-2xl leading-tight text-primary">
                  {getImageName(selectedImage)}
                </DialogTitle>
                <DialogDescription className="pt-2 text-base leading-relaxed">
                  {getImageDescription(selectedImage)}
                </DialogDescription>
                <dl className="space-y-4 pt-5 text-sm">
                  <div className="flex gap-3">
                    <MapPin size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <dt className="font-semibold">{t("gallery.modal.location")}</dt>
                      <dd className="text-muted-foreground">{selectedImage.location}</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CalendarDays size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <dt className="font-semibold">{t("gallery.modal.date")}</dt>
                      <dd className="text-muted-foreground">{formatDate(selectedImage.date)}</dd>
                    </div>
                  </div>
                </dl>
                <p className="pt-5 text-xs text-muted-foreground">
                  {selectedIndex + 1} / {filteredImages.length}
                </p>
              </DialogHeader>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
