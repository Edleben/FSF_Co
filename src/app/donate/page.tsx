
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageCarousel } from "@/components/ui/image-carousel";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, BookOpen, Users, ShieldCheck, DollarSign, Gift } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const donationSchema = z.object({
  amount: z.preprocess(
    (val) => (val === "" || val === undefined || val === null || isNaN(Number(String(val).replace(/[^0-9.]/g, ""))) ? undefined : Number(String(val).replace(/[^0-9.]/g, ""))),
    z.number({ 
      required_error: "Donation amount is required.",
      invalid_type_error: "Please enter a valid numeric amount." 
    }).min(1, { message: "Donation amount must be at least $1." })
  ),
  frequency: z.enum(["one-time", "monthly"], {
    required_error: "Please select a donation frequency.",
  }),
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().optional(),
});

type DonationFormValues = z.infer<typeof donationSchema>;

const presetAmounts = [10, 25, 50, 100];

export default function DonatePage() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: undefined,
      frequency: "one-time",
      fullName: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: DonationFormValues) {
    // Placeholder for payment processing logic (e.g., Stripe, PayPal)
    console.log("Donation data:", data);

    toast({
      title: t('donate.thank_you'),
      description: t('donate.donation_received'),
      variant: "default", 
    });
    form.reset(); 
  }

  const impactItems = [
    {
      icon: BookOpen,
      title: t('initiatives.education'),
      description: t('donate.education_support'),
    },
    {
      icon: Heart,
      title: t('initiatives.healthcare'),
      description: t('donate.healthcare_support'),
    },
    {
      icon: Users,
      title: t('initiatives.family_support'),
      description: t('donate.family_assistance'),
    },
    {
      icon: ShieldCheck, 
      title: t('initiatives.disability_support'),
      description: t('donate.disability_support'),
    },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 bg-primary text-primary-foreground text-center">
        <div className="absolute inset-0">
          <ImageCarousel
            images={[
              "/images/donations/kits_scolaires/davie/kit_davie (1).jpg",
              "/images/donations/kits_scolaires/davie/kit_davie (5).jpg",
              "/images/donations/kits_scolaires/davie/kit_davie (12).jpg",
              "/images/donations/kits_scolaires/davie/kit_davie (18).jpg",
              "/images/donations/kits_scolaires/davie/kit_davie (24).jpg",
              "/images/activities/mini_camp/activities_mini_camp (4).jpg"
            ]}
            alt="Hands holding a heart, symbolizing donation and care"
            data-ai-hint="donation charity hands"
            className="opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">
            {t('donate.make_donation')}
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-primary-foreground/90">
            {t('donate.generosity_empowers')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Donation Form Section */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl rounded-lg">
              <CardHeader className="bg-primary/10">
                <CardTitle className="text-2xl sm:text-3xl font-headline text-primary flex items-center">
                  <Gift size={28} className="mr-3 text-accent" />
                  {t('donate.support_mission')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-primary">{t('donate.donation_amount')}</FormLabel>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {presetAmounts.map((amount) => (
                              <Button
                                key={amount}
                                type="button"
                                variant="default" 
                                className="rounded-md" 
                                onClick={() => {
                                  form.setValue("amount", amount, { shouldValidate: true });
                                }}
                              >
                                ${amount}
                              </Button>
                            ))}
                          </div>
                          <FormControl>
                            <div className="relative">
                               <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                               <Input 
                                 type="number" 
                                 placeholder={t('donate.enter_custom_amount')} 
                                 // Explicitly manage value and onChange for controlled input behavior
                                 value={field.value === undefined || field.value === null || isNaN(Number(field.value)) ? '' : String(field.value)}
                                 onChange={e => {
                                   const val = e.target.value;
                                   if (val === '') {
                                     field.onChange(undefined); // Pass undefined to RHF and Zod
                                   } else {
                                     const num = parseFloat(val);
                                     field.onChange(isNaN(num) ? undefined : num); // Pass number or undefined
                                   }
                                 }}
                                 onBlur={field.onBlur}
                                 name={field.name}
                                 ref={field.ref}
                                 className="pl-10 text-base"
                               />
                            </div>
                          </FormControl>
                          <FormDescription>
                            {t('donate.enter_desired_amount')}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="frequency"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-lg font-semibold text-primary">{t('donate.donation_frequency')}</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="one-time" className="text-primary focus:ring-primary" />
                                </FormControl>
                                <FormLabel className="font-normal text-md">
                                  {t('common.one_time')}
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="monthly" className="text-primary focus:ring-primary" />
                                </FormControl>
                                <FormLabel className="font-normal text-md">
                                  {t('common.monthly')}
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-primary">{t('contact.full_name')}</FormLabel>
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
                          <FormLabel className="text-lg font-semibold text-primary">{t('contact.email_address')}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} className="text-base" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-primary">{t('donate.message_optional')}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t('donate.leave_message')}
                              className="resize-y min-h-[100px] text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="text-xs text-muted-foreground">
                      {t('donate.secure_payment')}
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-md text-lg">
                      {t('donate.donate_now')}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* How Donations Help Section */}
          <aside className="lg:col-span-2 space-y-8">
            <Card className="bg-card shadow-lg rounded-lg">
              <CardHeader className="bg-accent/10">
                <CardTitle className="text-2xl font-headline text-primary flex items-center">
                  <Heart size={28} className="mr-3 text-accent" />
                  {t('donate.your_impact')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <p className="text-foreground/90 text-md leading-relaxed">
                  {t('donate.contributions_fuel')}
                </p>
                <ul className="space-y-4">
                  {impactItems.map((item) => (
                    <li key={item.title} className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-4">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">{item.title}</h4>
                        <p className="text-sm text-foreground/80">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                 <p className="text-foreground/90 text-md leading-relaxed pt-4">
                  {t('donate.every_donation_helps')}
                </p>
              </CardContent>
            </Card>
             <Card className="bg-secondary/30 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-headline font-semibold text-primary mb-3">{t('donate.questions_about_donating')}</h3>
                <p className="text-foreground/80 mb-4">
                    {t('donate.we_here_to_help')}
                </p>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary rounded-md">
                    <a href="/contact">{t('nav.contact')}</a>
                </Button>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

