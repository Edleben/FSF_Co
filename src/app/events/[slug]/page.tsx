
import Image from 'next/image';
import { ImageCarousel } from '@/components/ui/image-carousel';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getEventBySlug, type EventItem } from '@/lib/news-events-data';
import { newsAndEventsData } from '@/lib/news-events-data'; // For generateStaticParams
import { Badge } from '@/components/ui/badge';
import { CalendarClock, MapPin, Users, ArrowLeft, ExternalLink, Ticket } from 'lucide-react';
import { format } from 'date-fns';

export async function generateStaticParams() {
  return newsAndEventsData
    .filter(item => item.type === 'event')
    .map((event) => ({
      slug: event.slug,
    }));
}

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground">
      <section className="relative py-12 sm:py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="outline" className="mb-8 border-primary text-primary hover:bg-primary/10 rounded-md">
            <Link href="/news">
              <ArrowLeft size={18} className="mr-2" />
              Back to News & Events
            </Link>
          </Button>
          <Badge variant="outline" className="mb-3 text-sm py-1 px-3 border-accent text-accent font-semibold rounded-full">{event.category}</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-primary mb-6">
            {event.title}
          </h1>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-xl rounded-lg overflow-hidden">
              <ImageCarousel
                images={[
                  event.image,
                  "/images/activities/mini_camp/activities_mini_camp (1).jpg",
                  "/images/activities/mini_camp/activities_mini_camp (2).jpg",
                  "/images/donations/kits_scolaires/davie/kit_davie (1).jpg",
                  "/images/donations/kits_scolaires/davie/kit_davie (2).jpg"
                ]}
                interval={5000}
                className="w-full aspect-[16/9]"
                alt={event.title}
                dataAiHint={event.imageHint}
              />
            </Card>

            <section>
              <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-primary mb-4">
                About This Event
              </h2>
              <article className="prose prose-lg max-w-none text-foreground/90 leading-relaxed whitespace-pre-line">
                {/* Use a basic rendering for fullContent. For Markdown, a library would be needed. */}
                <p>{event.fullContent}</p>
              </article>
            </section>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-1 space-y-8">
            <Card className="bg-card shadow-lg rounded-lg">
              <CardHeader className="bg-accent/10">
                <CardTitle className="text-xl font-headline text-primary flex items-center">
                  <CalendarClock size={24} className="mr-3 text-accent" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                <div>
                  <p className="text-sm font-semibold text-foreground/80">Date & Time</p>
                  <p className="text-md text-primary">
                    {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                    {event.endDate && ` - ${format(new Date(event.endDate), 'MMMM d, yyyy')}`}
                  </p>
                  {event.time && <p className="text-md text-primary">{event.time}</p>}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground/80">Location</p>
                  <p className="text-md text-primary flex items-start">
                    <MapPin size={16} className="mr-2 mt-1 shrink-0 text-accent" /> {event.location}
                  </p>
                </div>
                {event.organizer && (
                  <div>
                    <p className="text-sm font-semibold text-foreground/80">Organizer</p>
                    <p className="text-md text-primary flex items-center">
                      <Users size={16} className="mr-2 text-accent" /> {event.organizer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Placeholder for Registration/Tickets if applicable */}
            {event.slug === 'annual-charity-gala-2024' && ( // Example: Specific CTA for Gala
                <Card className="bg-primary/10 shadow-lg rounded-lg p-6 text-center">
                    <Ticket size={40} className="mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-headline font-semibold text-primary mb-3">
                        Get Your Gala Tickets
                    </h3>
                    <p className="text-foreground/80 mb-6 leading-relaxed text-sm">
                        Support a great cause and enjoy an unforgettable evening.
                    </p>
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md w-full">
                        <Link href="/donate"> {/* Or a specific ticketing link */}
                        Purchase Tickets <ExternalLink size={18} className="ml-2" />
                        </Link>
                    </Button>
                </Card>
            )}

            <div className="text-center mt-6">
                 <Button asChild variant="outline" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-md w-full">
                    <Link href="/donate">Support FSF Initiatives</Link>
                 </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
