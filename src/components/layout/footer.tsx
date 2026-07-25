
"use client";

import Link from 'next/link';
import type { FC } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import FsfLogo from '@/components/icons/fsf-logo';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';

const quickLinks = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/about', labelKey: 'nav.about' },
  { href: '/initiatives', labelKey: 'nav.initiatives' },
  { href: '/news', labelKey: 'nav.news' },
  { href: '/donate', labelKey: 'nav.donate' },
  { href: '/volunteer', labelKey: 'nav.volunteer' },
  { href: '/contact', labelKey: 'nav.contact' },
];

const socialLinks = [
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
];

const Footer: FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link href="/" aria-label="Frédéric Saba Foundation Home">
              <FsfLogo className="h-10 w-auto text-primary-foreground" />
            </Link>
            <p className="text-sm text-primary-foreground/80">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-foreground">{t('footer.about')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-accent transition-colors text-primary-foreground/90"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-foreground">{t('footer.contact_us')}</h3>
            <address className="space-y-2 text-sm not-italic text-primary-foreground/90">
              <p className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 shrink-0 text-accent" />
                123 Foundation Rd, Hope City, Global 12345
              </p>
              <p className="flex items-center">
                <Mail size={16} className="mr-2 shrink-0 text-accent" />
                <a href="mailto:info@fredericsabafoundation.example.org" className="hover:text-accent transition-colors">
                  info@fredericsabafoundation.example.org
                </a>
              </p>
              <p className="flex items-center">
                <Phone size={16} className="mr-2 shrink-0 text-accent" />
                <a href="tel:+15559876543" className="hover:text-accent transition-colors">
                  +1 (555) 987-6543
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-foreground">{t('footer.follow_us')}</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-primary-foreground/90 hover:text-accent transition-colors"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20 my-8" />

        <div className="text-center text-sm text-primary-foreground/80 space-y-2 md:space-y-0 md:flex md:justify-between">
          <p>{t('footer.copyright')}</p>
          <div className="space-x-4">
            <Link href="/legal" className="hover:text-accent transition-colors">
              {t('footer.legal_mentions')}
            </Link>
            <Link href="/privacy" className="hover:text-accent transition-colors">
              {t('footer.privacy_policy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
