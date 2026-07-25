
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Eye, Landmark, Heart, HandHeart } from 'lucide-react';
import Link from 'next/link';
import { ImageCarousel } from '@/components/ui/image-carousel';
import { useLanguage } from '@/contexts/LanguageContext';

const teamMembers = [
  {
    name: 'about.team_member_frederic_name',
    role: 'about.team_member_frederic_role',
    image: '/team/frederic-saba.png',
    hint: 'portrait professional',
    bio: 'about.team_member_frederic_bio',
  },
  {
    name: 'about.team_member_jane_name',
    role: 'about.team_member_jane_role',
    image: '/team/jane -doe.png',
    hint: 'portrait professional woman',
    bio: 'about.team_member_jane_bio',
  },
  {
    name: 'about.team_member_john_name',
    role: 'about.team_member_john_role',
    image: '/team/john-smith.png',
    hint: 'portrait professional man',
    bio: 'about.team_member_john_bio',
  },
];

const values = [
  { title: 'about.value_faith', description: 'about.value_faith_desc', icon: HandHeart },
  { title: 'about.value_compassion', description: 'about.value_compassion_desc', icon: Heart },
  { title: 'about.value_integrity', description: 'about.value_integrity_desc', icon: Landmark },
  { title: 'about.value_empowerment', description: 'about.value_empowerment_desc', icon: Users },
  { title: 'about.value_collaboration', description: 'about.value_collaboration_desc', icon: Users },
  { title: 'about.value_inclusivity', description: 'about.value_inclusivity_desc', icon: Users },
];

export default function AboutPage() {
  const { t } = useLanguage();
  
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section for About Page */}
      <section className="relative py-20 sm:py-32 bg-primary text-primary-foreground text-center">
        <div className="absolute inset-0">
          <ImageCarousel
            images={[
              "/images/activities/mini_camp/activities_mini_camp (3).jpg",
              "/images/activities/mini_camp/activities_mini_camp (5).jpg",
              "/images/activities/mini_camp/activities_mini_camp (7).jpg",
              "/images/activities/mini_camp/activities_mini_camp (10).jpg",
              "/images/donations/kits_scolaires/davie/kit_davie (2).jpg",
              "/images/donations/kits_scolaires/davie/kit_davie (8).jpg"
            ]}
            alt="Diverse group of people benefiting from foundation's work"
            dataAiHint="diverse people community"
            className="w-full h-full opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">
            {t('about.title')}
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-primary-foreground/90">
            {t('about.hero_description')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-24">
        {/* Introduction Section */}
        <section className="max-w-3xl mx-auto text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-headline font-semibold mb-6 text-primary">
            {t('about.our_purpose')}
          </h2>
          <p className="text-md sm:text-lg text-foreground/90 leading-relaxed">
            {t('about.purpose_description')}
          </p>
        </section>

        {/* Mission & Vision Section */}
        <section className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
          <Card className="bg-card shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-primary/10 p-6">
              <div className="flex items-center text-primary">
                <Target size={32} className="mr-3" />
                <CardTitle className="text-2xl sm:text-3xl font-headline">{t('about.mission')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-md sm:text-lg text-foreground/80 leading-relaxed">
                {t('about.mission_description')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-accent/10 p-6">
              <div className="flex items-center text-accent">
                <Eye size={32} className="mr-3" />
                <CardTitle className="text-2xl sm:text-3xl font-headline">{t('about.vision')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-md sm:text-lg text-foreground/80 leading-relaxed">
                {t('about.vision_description')}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* History Section */}
        <section className="max-w-3xl mx-auto text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-headline font-semibold mb-6 text-primary">
            {t('about.our_journey')}
          </h2>
          <div className="space-y-4 text-md sm:text-lg text-foreground/90 leading-relaxed">
            <p>
              {t('about.journey_p1')}
            </p>
            <p>
              {t('about.journey_p2')}
            </p>
          </div>
        </section>

        {/* Our Team Section */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-headline font-semibold mb-10 text-center text-primary">
            {t('about.meet_team')}
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="flex flex-col text-center bg-card shadow-md rounded-lg overflow-hidden items-center p-6 transition-all hover:shadow-xl">
                <Image
                  src={member.image}
                  alt={`Portrait of ${t(member.name)}`}
                  data-ai-hint={member.hint}
                  width={150}
                  height={150}
                  className="rounded-full mb-4 object-cover"
                />
                <CardTitle className="text-xl font-headline text-primary mb-1">{t(member.name)}</CardTitle>
                <p className="text-sm font-medium text-accent mb-2">{t(member.role)}</p>
                <CardContent className="text-sm text-foreground/80 leading-relaxed px-0 pb-0">
                  <p>{t(member.bio)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
           <p className="text-center text-md text-foreground/70 mt-8">
            {t('about.team_footer')}
          </p>
        </section>

        {/* Our Values Section */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-headline font-semibold mb-10 text-center text-primary">
            {t('about.guiding_principles')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="bg-card shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition-all hover:shadow-xl">
                <div className="p-3 bg-primary text-primary-foreground rounded-full mb-4 inline-block">
                  <value.icon size={32} />
                </div>
                <CardTitle className="text-xl font-headline text-primary mb-2">{t(value.title)}</CardTitle>
                <CardContent className="text-sm text-foreground/80 leading-relaxed px-0 pb-0">
                  <p>{t(value.description)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Call to Action to Donate/Volunteer */}
        <section className="text-center bg-secondary/30 p-8 sm:p-12 rounded-lg shadow-md">
            <h2 className="text-3xl sm:text-4xl font-headline font-semibold mb-6 text-primary">
                {t('about.join_us_title')}
            </h2>
            <p className="text-lg text-foreground/90 mb-8 max-w-2xl mx-auto">
                {t('about.join_us_desc')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-md px-8 py-3 text-lg">
                    <Link href="/donate">{t('nav.donate')}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-md px-8 py-3 text-lg">
                    <Link href="/volunteer">{t('nav.volunteer')}</Link>
                </Button>
            </div>
        </section>

      </div>
    </div>
  );
}

    
