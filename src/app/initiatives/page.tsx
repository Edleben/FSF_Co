
"use client";

import { useState } from 'react';
import Image from '@/components/site-image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { initiativesData, initiativeCategories, type Initiative } from '@/lib/initiatives-data';
import { Separator } from '@/components/ui/separator';
import { ListFilter } from 'lucide-react';
import { ImageCarousel } from '@/components/ui/image-carousel';
import { useLanguage } from '@/contexts/LanguageContext';

export default function InitiativesPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredInitiatives = selectedCategory
    ? initiativesData.filter((initiative) => initiative.category === selectedCategory)
    : initiativesData;

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section for Initiatives Page */}
      <section className="relative py-20 sm:py-32 bg-primary text-primary-foreground text-center">
        <div className="absolute inset-0">
          <ImageCarousel
            images={[
              "/images/activities/mini_camp/activities_mini_camp (6).jpg",
              "/images/activities/mini_camp/activities_mini_camp (2).jpg",
              "/images/activities/mini_camp/activities_mini_camp (8).jpg",
              "/images/activities/mini_camp/activities_mini_camp (11).jpg",
              "/images/donations/kits_scolaires/davie/kit_davie (4).jpg",
              "/images/donations/kits_scolaires/davie/kit_davie (10).jpg"
            ]}
            alt="Collage of foundation's diverse initiatives"
            data-ai-hint="collage community education"
            className="opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">
            {t('initiatives.title')}
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-primary-foreground/90">
            {t('initiatives.explore_projects')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Filter Bar */}
        <section className="mb-10 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-3">
             <h2 className="text-xl font-semibold text-primary mr-0 sm:mr-4 flex items-center">
               <ListFilter size={24} className="mr-2 text-accent" />
               {t('initiatives.filter_by_category')}:
             </h2>
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
              className="rounded-md"
            >
              {t('initiatives.all_initiatives')}
            </Button>
            {initiativeCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="rounded-md"
              >
                {t(`initiatives.category.${category}`)}
              </Button>
            ))}
          </div>
        </section>
        
        <Separator className="mb-10 sm:mb-12" />

        {/* Initiatives Grid */}
        {filteredInitiatives.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInitiatives.map((initiative) => (
              <Card key={initiative.slug} className="flex flex-col bg-card shadow-lg rounded-lg overflow-hidden transition-all hover:shadow-xl">
                <CardHeader className="p-0">
                  <Image
                    src={initiative.image}
                    alt={initiative.title}
                    data-ai-hint={initiative.imageHint}
                    width={600}
                    height={400}
                    className="object-cover w-full aspect-video"
                  />
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <CardTitle className="text-2xl font-headline text-primary mb-2">{t(`initiative.${initiative.slug}.title`)}</CardTitle>
                  <p className="text-xs text-accent font-semibold mb-2 uppercase tracking-wider">{t(`initiative.${initiative.slug}.category`)}</p>
                  <CardDescription className="text-foreground/80 leading-relaxed">
                    {t(`initiative.${initiative.slug}.summary`)}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md w-full sm:w-auto">
                    <Link href={`/initiatives/${initiative.slug}`}>{t('common.learn_more')}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-foreground/70">{t('initiatives.no_initiatives_found')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
