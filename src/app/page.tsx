
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Users, HeartHandshake, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  
  const featuredInitiatives = [
    {
      title: t('home.initiative_education_title'),
      description: t('home.initiative_education_desc'),
      image: "/images/activities/mini_camp/activities_mini_camp (1).jpg",
      hint: "children classroom",
      link: "/initiatives/education-for-all",
    },
    {
      title: t('home.initiative_health_title'),
      description: t('home.initiative_health_desc'),
      image: "/images/activities/mini_camp/activities_mini_camp (5).jpg",
      hint: "medical care",
      link: "/initiatives/health-and-wellbeing",
    },
    {
      title: t('home.initiative_community_title'),
      description: t('home.initiative_community_desc'),
      image: "/images/activities/mini_camp/activities_mini_camp (9).jpg",
      hint: "community support",
      link: "/initiatives/empowering-communities",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] min-h-[500px] sm:min-h-[600px] flex items-center justify-center text-center text-white">
        <Image
          src="/images/branding/hero.jpg"
          alt="Humanitarian support showing diverse group of people"
          data-ai-hint="humanitarian support diverse people"
          fill
          priority
          className="object-cover object-center brightness-50"
        />
        <div className="relative z-10 p-6 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold mb-4">
            {t('home.hero.title')}
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            {t('home.hero.subtitle')}
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-md px-8 py-3 text-lg">
            <Link href="/donate">{t('nav.donate')}</Link>
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-24">
        {/* About FSF Section */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-headline font-semibold mb-6 text-primary">
            {t('home.about_fsf')}
          </h2>
          <div className="space-y-4 text-foreground/90 text-left sm:text-center text-md sm:text-lg">
            <p>
              {t('home.about_description_1')}
            </p>
            <p>
              {t('home.about_description_2')}
            </p>
          </div>
          <Button asChild variant="outline" className="mt-8 border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-md px-6 py-2.5">
            <Link href="/about">{t('common.learn_more')}</Link>
          </Button>
        </section>

        {/* Featured Initiatives Section */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-headline font-semibold mb-10 text-center text-primary">
            {t('home.featured_initiatives')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredInitiatives.map((initiative) => (
              <Card key={initiative.title} className="flex flex-col bg-card shadow-lg rounded-lg overflow-hidden transition-all hover:shadow-xl">
                <CardHeader className="p-0">
                  <Image
                    src={initiative.image}
                    alt={initiative.title}
                    data-ai-hint={initiative.hint}
                    width={600}
                    height={400}
                    className="object-cover w-full aspect-video"
                  />
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <CardTitle className="text-2xl font-headline text-primary mb-2">{initiative.title}</CardTitle>
                  <CardDescription className="text-foreground/80 leading-relaxed">{initiative.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md w-full sm:w-auto">
                    <Link href={initiative.link}>{t('common.learn_more')}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Volunteer Call-to-Action Section */}
        <section className="bg-secondary/30 p-8 sm:p-12 rounded-lg shadow-md text-center">
          <HeartHandshake className="mx-auto h-16 w-16 text-accent mb-6" />
          <h2 className="text-3xl sm:text-4xl font-headline font-semibold mb-6 text-primary">
            {t('home.volunteer_cta_title')}
          </h2>
          <p className="text-lg text-foreground/90 mb-8 max-w-2xl mx-auto">
            {t('home.volunteer_cta_desc')}
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-md px-8 py-3 text-lg">
            <Link href="/volunteer">{t('nav.volunteer')}</Link>
          </Button>
        </section>

        {/* Upcoming Events Banner Section */}
        <section className="bg-primary text-primary-foreground p-8 sm:p-12 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-shrink-0">
              <CalendarDays className="h-16 w-16 sm:h-20 sm:w-20 text-accent" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-headline font-semibold mb-3">
                {t('home.event_title')}
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-1">
                <strong>{t('home.event_date')}:</strong> {t('home.event_date_value')}
              </p>
              <p className="text-md text-primary-foreground/80">
                {t('home.event_description')}
              </p>
            </div>
            <div className="flex-shrink-0 mt-6 md:mt-0">
              <Button asChild variant="secondary" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-md">
                 <Link href="/events/annual-charity-gala-2024">{t('home.event_details')} <ExternalLink size={16} className="ml-1"/></Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
