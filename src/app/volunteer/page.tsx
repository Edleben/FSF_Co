
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, Users, MessageSquareQuote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const volunteerFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  availability: z.string().optional(),
  skills: z.string().optional(),
  motivation: z.string().min(20, {
    message: "Please tell us a bit more about your motivation (at least 20 characters).",
  }),
});

type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;

export default function VolunteerPage() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      availability: "",
      skills: "",
      motivation: "",
    },
  });

  function onSubmit(data: VolunteerFormValues) {
    // Placeholder for submission logic (e.g., send to an API or email)
    console.log("Volunteer application data:", data);

    toast({
      title: t('volunteer.application_submitted'),
      description: t('volunteer.thank_you'),
      variant: "default",
    });
    form.reset();
  }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 bg-primary text-primary-foreground text-center">
        <div className="absolute inset-0">
          <ImageCarousel
            images={[
              "/images/activities/mini_camp/activities_mini_camp (4).jpg",
              "/images/activities/mini_camp/activities_mini_camp (1).jpg",
              "/images/activities/mini_camp/activities_mini_camp (3).jpg",
              "/images/donations/kits_scolaires/davie/kit_davie (7).jpg",
              "/images/donations/kits_scolaires/davie/kit_davie (8).jpg"
            ]}
            interval={5000}
            alt="Volunteering highlights at FSF"
            dataAiHint="volunteer community help"
            className="w-full h-full opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">
            {t('volunteer.title')}
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-primary-foreground/90">
            {t('volunteer.hero_description')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Volunteer Form Section */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl rounded-lg">
              <CardHeader className="bg-primary/10">
                <CardTitle className="text-2xl sm:text-3xl font-headline text-primary flex items-center">
                  <HeartHandshake size={28} className="mr-3 text-accent" />
                  {t('volunteer.join_team')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <p className="text-foreground/90 mb-6 text-md leading-relaxed">
                  {t('volunteer.intro_text')}
                </p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-primary">{t('volunteer.form.name')}</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Full Name" {...field} className="text-base" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-primary">{t('volunteer.form.email')}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} className="text-base" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-primary">{t('volunteer.phone_optional')}</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder={t('volunteer.phone_placeholder')} {...field} className="text-base" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-primary">{t('volunteer.availability')}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t('volunteer.availability_placeholder')}
                              className="resize-y min-h-[100px] text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {t('volunteer.availability_hint')}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-primary">{t('volunteer.skills')}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t('volunteer.skills_placeholder')}
                              className="resize-y min-h-[100px] text-base"
                              {...field}
                            />
                          </FormControl>
                           <FormDescription>
                            {t('volunteer.skills_hint')}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-primary">{t('volunteer.motivation')}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t('volunteer.motivation_placeholder')}
                              className="resize-y min-h-[120px] text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-md text-lg">
                      {t('volunteer.form.submit')}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Why Volunteer / Testimonial Section */}
          <aside className="lg:col-span-2 space-y-8">
            <Card className="bg-card shadow-lg rounded-lg">
              <CardHeader className="bg-accent/10">
                <CardTitle className="text-2xl font-headline text-primary flex items-center">
                  <Users size={28} className="mr-3 text-accent" />
                  {t('volunteer.why_volunteer_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4 text-foreground/90 text-md leading-relaxed">
                <p>
                  {t('volunteer.why_reason_1')}
                </p>
                <p>
                  {t('volunteer.why_reason_2')}
                </p>
                 <p>
                  {t('volunteer.why_reason_3')}
                </p>
                <p>
                  {t('volunteer.why_reason_4')}
                </p>
                 <p>
                  {t('volunteer.why_reason_5')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-secondary/30 shadow-md rounded-lg p-6">
               <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl font-headline text-primary flex items-center">
                  <MessageSquareQuote size={24} className="mr-3 text-accent" />
                  {t('volunteer.testimonial_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Image
                    src="/images/team/jane.jpg"
                    alt="Portrait of a volunteer"
                    data-ai-hint="volunteer portrait smiling"
                    width={80}
                    height={80}
                    className="rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-primary">{t('volunteer.testimonial_name')}</h4>
                    <p className="text-sm text-foreground/80">{t('volunteer.testimonial_role')}</p>
                  </div>
                </div>
                <blockquote className="text-foreground/80 italic border-l-4 border-accent pl-4">
                  {t('volunteer.testimonial_quote')}
                </blockquote>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

    