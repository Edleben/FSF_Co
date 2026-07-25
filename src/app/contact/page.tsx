
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
// Removed dynamic import for LeafletMap
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const contactFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const fsfAddress = "E. 161, Rue des Echis, non loin de la Télévision, Togo";
const fsfEmail = "info@fredericsabafoundation.example.org";
const fsfPhone = "+228 90 00 00 00"; // Example Togo phone number
// Removed mapPosition constant

const socialLinks = [
  { href: 'https://facebook.com/fredericsabafoundation', icon: Facebook, label: 'Facebook' },
  { href: 'https://twitter.com/fsf_org', icon: Twitter, label: 'Twitter' },
  { href: 'https://linkedin.com/company/frederic-saba-foundation', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://instagram.com/fredericsabafoundation', icon: Instagram, label: 'Instagram' },
];


export default function ContactPage() {
  const { toast } = useToast();
  const { t } = useLanguage();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log("Contact form data:", data);
    toast({
      title: t('contact.message_sent'),
      description: t('contact.thank_you_contact'),
      variant: "default",
    });
    form.reset();
  }

  return (
    <div className="bg-background text-foreground">
      <section className="relative py-20 sm:py-32 bg-primary text-primary-foreground text-center">
        <div className="absolute inset-0">
          <Image
            src="/images/activities/mini_camp/activities_mini_camp (5).jpg"
            alt="Contact us banner with diverse hands reaching out"
            data-ai-hint="contact support diverse hands"
            fill
            priority
            className="object-cover object-center opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">
            {t('contact.get_in_touch')}
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-primary-foreground/90">
            {t('contact.we_love_to_hear')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <div>
            <Card className="shadow-xl rounded-lg">
              <CardHeader className="bg-primary/10">
                <CardTitle className="text-2xl sm:text-3xl font-headline text-primary flex items-center">
                  <Send size={28} className="mr-3 text-accent" />
                  {t('contact.send_message')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold text-primary">{t('contact.subject')}</FormLabel>
                          <FormControl>
                            <Input placeholder="Reason for your message" {...field} className="text-base" />
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
                          <FormLabel className="text-lg font-semibold text-primary">{t('contact.message')}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message..."
                              className="resize-y min-h-[120px] text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-md text-lg">
                      {t('contact.send_message_button')}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Map Section */}
          <div className="space-y-8">
            <Card className="bg-card shadow-lg rounded-lg">
              <CardHeader className="bg-accent/10">
                <CardTitle className="text-2xl font-headline text-primary flex items-center">
                  <MapPin size={28} className="mr-3 text-accent" />
                  {t('contact.our_information')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-3 text-md text-foreground/90">
                  <p className="flex items-start">
                    <MapPin size={20} className="mr-3 mt-1 shrink-0 text-primary" />
                    <span>{fsfAddress}</span>
                  </p>
                  <p className="flex items-center">
                    <Mail size={20} className="mr-3 shrink-0 text-primary" />
                    <a href={`mailto:${fsfEmail}`} className="hover:text-accent transition-colors">
                      {fsfEmail}
                    </a>
                  </p>
                  <p className="flex items-center">
                    <Phone size={20} className="mr-3 shrink-0 text-primary" />
                    <a href={`tel:${fsfPhone.replace(/\s/g, '')}`} className="hover:text-accent transition-colors">
                      {fsfPhone}
                    </a>
                  </p>
                </div>
                <div className="pt-4">
                  <h4 className="text-lg font-semibold text-primary mb-3">{t('contact.follow_us')}</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="text-primary/80 hover:text-accent transition-colors"
                      >
                        <social.icon size={28} />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-lg overflow-hidden">
               <CardHeader>
                <CardTitle className="text-xl font-headline text-primary">{t('contact.our_location')}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div 
                  className="h-[400px] w-full flex items-center justify-center bg-muted rounded-md"
                  aria-label="Map placeholder"
                >
                  <p className="text-muted-foreground">{t('contact.map_placeholder')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
