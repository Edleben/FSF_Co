import galleryImageData from "@/data/gallery-images.json";

export type GalleryCategory = "activities" | "school-kits" | "food-aid";

export interface GalleryImage {
  id: string;
  name: string;
  nameFr: string;
  category: GalleryCategory;
  series: string;
  description: string;
  descriptionFr: string;
  path: string;
  location: string;
  date: string;
}

export interface GalleryCategoryDefinition {
  id: GalleryCategory;
  labelKey: string;
  descriptionKey: string;
}

export const galleryCategories: GalleryCategoryDefinition[] = [
  {
    id: "activities",
    labelKey: "gallery.category.activities",
    descriptionKey: "gallery.category.activities.description",
  },
  {
    id: "school-kits",
    labelKey: "gallery.category.school_kits",
    descriptionKey: "gallery.category.school_kits.description",
  },
  {
    id: "food-aid",
    labelKey: "gallery.category.food_aid",
    descriptionKey: "gallery.category.food_aid.description",
  },
];

export const galleryImages = galleryImageData as GalleryImage[];

export const galleryHeroImages = galleryCategories.map((category) => {
  const image = galleryImages.find((item) => item.category === category.id);
  if (!image) {
    throw new Error(`Missing gallery hero image for category: ${category.id}`);
  }
  return { ...image, categoryDefinition: category };
});
