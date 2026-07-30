
"use client";

import Image from '@/components/site-image';
import { ImageCarousel } from '@/components/ui/image-carousel';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { newsAndEventsData, type NewsArticle, type EventItem } from '@/lib/news-events-data';
import { Separator } from '@/components/ui/separator';
import { Newspaper, CalendarClock, MapPin, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NewsAndEventsPage() {
  const { t } = useLanguage();
  const newsItems = newsAndEventsData
    .filter((item): item is NewsArticle => item.type === 'news')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const eventItems = newsAndEventsData
    .filter((item): item is EventItem => item.type === 'event')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Shows upcoming and recent, newest first

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section for News & Events Page */}
      <section className="relative py-20 sm:py-32 bg-primary text-primary-foreground text-center">
        <div className="absolute inset-0">
          <ImageCarousel
            images={[
              "/images/activities/mini_camp/activities_mini_camp (2).jpg",
              "/images/activities/mini_camp/activities_mini_camp (3).jpg",
              "/images/activities/mini_camp/activities_mini_camp (4).jpg",
              "/images/donations/kits_scolaires/davie/kit_davie (3).jpg",
              "/images/donations/kits_scolaires/davie/kit_davie (4).jpg"
            ]}
            interval={6000}
            alt="Community activities and donation highlights"
            dataAiHint="community activities donation"
            className="w-full h-full opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">
            {t('news.title')}
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-primary-foreground/90">
            {t('news.stay_updated')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        {/* Latest News Section */}
        <section>
          <div className="flex items-center mb-8 sm:mb-10">
            <Newspaper size={36} className="mr-3 text-accent" />
            <h2 className="text-3xl sm:text-4xl font-headline font-semibold text-primary">
              {t('news.latest_news')}
            </h2>
          </div>
          {newsItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((article) => (
                <Card key={article.slug} className="flex flex-col bg-card shadow-lg rounded-lg overflow-hidden transition-all hover:shadow-xl">
                  <CardHeader className="p-0">
                    <Image
                      src={article.image}
                      alt={article.title}
                      data-ai-hint={article.imageHint}
                      width={600}
                      height={338} // 16:9 aspect ratio
                      className="object-cover w-full aspect-[16/9]"
                    />
                  </CardHeader>
                  <CardContent className="flex-grow p-6">
                    <Badge variant="secondary" className="mb-2 text-xs py-1 px-2 bg-accent/10 text-accent font-semibold rounded">
                      {t(`news.category.${article.category}`)}
                    </Badge>
                    <CardTitle className="text-xl sm:text-2xl font-headline text-primary mb-2 leading-tight">
                      {t(`news.${article.slug}.title`)}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mb-3">
                      {format(new Date(article.date), 'MMMM d, yyyy')}
                      {article.author && ` by ${article.author}`}
                    </p>
                    <CardDescription className="text-foreground/80 leading-relaxed text-sm">
                      {t(`news.${article.slug}.summary`)}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md w-full sm:w-auto text-sm">
                      <Link href={`/news/${article.slug}`}>{t('news.read_more')} <ExternalLink size={16} className="ml-2" /></Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-md text-foreground/70">{t('news.no_news_available')}</p>
          )}
        </section>

        <Separator className="my-12 sm:my-16" />

        {/* Events Section */}
        <section>
          <div className="flex items-center mb-8 sm:mb-10">
            <CalendarClock size={36} className="mr-3 text-accent" />
            <h2 className="text-3xl sm:text-4xl font-headline font-semibold text-primary">
              {t('news.upcoming_events')}
            </h2>
          </div>
          {eventItems.length > 0 ? (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {eventItems.map((event) => (
                <Card key={event.slug} className="flex flex-col sm:flex-row bg-card shadow-lg rounded-lg overflow-hidden transition-all hover:shadow-xl">
                  <div className="sm:w-1/3">
                    <Image
                      src={event.image}
                      alt={event.title}
                      data-ai-hint={event.imageHint}
                      width={400}
                      height={400} // Square or slightly rectangular for event cards
                      className="object-cover w-full h-48 sm:h-full"
                    />
                  </div>
                  <div className="sm:w-2/3 flex flex-col">
                    <CardContent className="flex-grow p-6">
                      <Badge variant="outline" className="mb-2 text-xs py-1 px-2 border-accent text-accent font-semibold rounded">
                        {t(`news.category.${event.category}`)}
                      </Badge>
                      <CardTitle className="text-xl sm:text-2xl font-headline text-primary mb-2 leading-tight">
                        {t(`event.${event.slug}.title`)}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mb-1">
                        <strong>Date:</strong> {format(new Date(event.date), 'MMMM d, yyyy')} {event.time && `(${event.time})`}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3 flex items-center">
                        <MapPin size={14} className="mr-1.5 text-muted-foreground/80" />
                        <strong>Location:</strong> {t(`event.${event.slug}.location`)}
                      </p>
                      <CardDescription className="text-foreground/80 leading-relaxed text-sm">
                        {t(`event.${event.slug}.summary`)}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-md w-full sm:w-auto text-sm">
                        <Link href={`/events/${event.slug}`}>{t('news.view_details')} <ExternalLink size={16} className="ml-2" /></Link>
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-md text-foreground/70">{t('news.no_events_scheduled')}</p>
          )}
        </section>
      </div>
    </div>
  );
}
