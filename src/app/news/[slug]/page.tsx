
import Image from '@/components/site-image';
import { ImageCarousel } from '@/components/ui/image-carousel';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getNewsArticleBySlug, type NewsArticle } from '@/lib/news-events-data';
import { newsAndEventsData } from '@/lib/news-events-data';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, UserCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

export async function generateStaticParams() {
  return newsAndEventsData
    .filter(item => item.type === 'news')
    .map((article) => ({
      slug: article.slug,
    }));
}

interface NewsArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
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
          <Badge variant="secondary" className="mb-3 text-sm py-1 px-3 bg-accent text-accent-foreground rounded-full">{article.category}</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-primary mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center text-sm text-muted-foreground space-x-4">
            <div className="flex items-center">
              <CalendarDays size={16} className="mr-2 text-accent" />
              <span>Published on {format(new Date(article.date), 'MMMM d, yyyy')}</span>
            </div>
            {article.author && (
              <div className="flex items-center">
                <UserCircle size={16} className="mr-2 text-accent" />
                <span>By {article.author}</span>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl rounded-lg overflow-hidden mb-8 sm:mb-10">
            <ImageCarousel
              images={[
                article.image,
                "/images/activities/mini_camp/activities_mini_camp (3).jpg",
                "/images/activities/mini_camp/activities_mini_camp (4).jpg",
                "/images/donations/kits_scolaires/davie/kit_davie (5).jpg",
                "/images/donations/kits_scolaires/davie/kit_davie (6).jpg"
              ]}
              interval={5500}
              alt={article.title}
              dataAiHint={article.imageHint}
              className="w-full aspect-[16/9]"
            />
          </Card>

          <article className="prose prose-lg max-w-none text-foreground/90 leading-relaxed whitespace-pre-line">
            {/* Use a basic rendering for fullContent. For Markdown, a library would be needed. */}
            <p>{article.fullContent}</p>
          </article>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-md">
              <Link href="/donate">
                Support Our Work <ExternalLink size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
