
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { initiativesData, type Initiative } from '@/lib/initiatives-data';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ExternalLink, Heart } from 'lucide-react';

// Function to get initiative data by slug
async function getInitiative(slug: string): Promise<Initiative | undefined> {
  return initiativesData.find((initiative) => initiative.slug === slug);
}

// Generate static paths for all initiatives
export async function generateStaticParams() {
  return initiativesData.map((initiative) => ({
    slug: initiative.slug,
  }));
}

interface InitiativeDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function InitiativeDetailPage({ params }: InitiativeDetailPageProps) {
  const { slug } = await params;
  const initiative = await getInitiative(slug);

  if (!initiative) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground">
      {/* Initiative Hero Section */}
      <section className="relative py-16 sm:py-24 bg-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4 text-sm py-1 px-3 bg-accent text-accent-foreground rounded-full">{initiative.category}</Badge>
          <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary mb-6">
            {initiative.title}
          </h1>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            <Card className="shadow-xl rounded-lg overflow-hidden">
              <Image
                src={initiative.image}
                alt={initiative.title}
                data-ai-hint={initiative.imageHint}
                width={1200}
                height={675}
                className="w-full object-cover aspect-video"
                priority
              />
            </Card>

            <section>
              <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-primary mb-4">
                About This Initiative
              </h2>
              <p className="text-md sm:text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                {initiative.fullDescription}
              </p>
            </section>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-2 space-y-8">
            <Card className="bg-card shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary flex items-center">
                  <CheckCircle size={28} className="mr-3 text-accent" />
                  Impact & Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-foreground/80 list-disc pl-5">
                  {initiative.impactAchievements.map((achievement, index) => (
                    <li key={index} className="text-md leading-relaxed">{achievement}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-accent/10 shadow-lg rounded-lg p-6 text-center">
              <Heart size={40} className="mx-auto mb-4 text-accent" />
              <h3 className="text-2xl font-headline font-semibold text-primary mb-3">
                Support This Initiative
              </h3>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                Your contribution can help us continue and expand this vital work. Every donation makes a difference.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-md w-full">
                <Link href="/donate">
                  Donate Now <ExternalLink size={18} className="ml-2" />
                </Link>
              </Button>
            </Card>

            <div className="text-center">
                 <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-md">
                    <Link href="/initiatives">View All Initiatives</Link>
                 </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
