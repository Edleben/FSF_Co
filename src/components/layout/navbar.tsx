
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, type FC } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import FsfLogo from '@/components/icons/fsf-logo';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const navLinks = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/about', labelKey: 'nav.about' },
  { href: '/initiatives', labelKey: 'nav.initiatives' },
  { href: '/news', labelKey: 'nav.news' },
  { href: '/gallerie', labelKey: 'nav.gallery' },
  { href: '/volunteer', labelKey: 'nav.volunteer' },
  { href: '/contact', labelKey: 'nav.contact' },
  { href: '/project-tracker', labelKey: 'nav.tracker' },
];

const Navbar: FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center" aria-label="Frédéric Saba Foundation Home">
            <Image
              src="/images/branding/logo/LOGO FSF (1).png"
              alt="FSF logo"
              width={250}
              height={250}
              className="h-8 w-auto mr-2"
              priority
            />
            <FsfLogo className="h-8 w-auto text-primary-foreground" />
          </Link>

          <nav className="hidden xl:flex items-center space-x-5">
            {navLinks.map((link) => (
              <Link
                key={link.labelKey}
                href={link.href}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="hidden xl:flex items-center space-x-4">
            <Button
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-md"
            >
              <Link href="/donate">{t('nav.donate')}</Link>
            </Button>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger 
                className="w-[120px] bg-transparent text-primary-foreground border-primary-foreground/30 hover:border-primary-foreground focus:ring-accent rounded-md"
                aria-label="Select language"
              >
                <Globe size={16} className="mr-2" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground rounded-md">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="xl:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
                  <Menu size={24} />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-primary text-primary-foreground p-6 flex flex-col">
                 <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                 <SheetDescription className="sr-only">
                    Main navigation links for the Frédéric Saba Foundation website.
                 </SheetDescription>
                <div className="flex justify-between items-center mb-6">
                   <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)} aria-label="Frédéric Saba Foundation Home">
                     <Image
                       src="/images/branding/logo/LOGO FSF (1).png"
                       alt="FSF logo"
                       width={48}
                       height={48}
                       className="h-10 w-auto mr-2"
                       priority
                     />
                     <FsfLogo className="h-8 w-auto text-primary-foreground" />
                   </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
                       <X size={24} />
                       <span className="sr-only">Close menu</span>
                     </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col space-y-4 mb-6">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.labelKey}>
                      <Link
                        href={link.href}
                        className="text-lg font-medium hover:text-accent transition-colors py-2"
                      >
                        {t(link.labelKey)}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <Button
                  asChild
                  className="bg-accent text-accent-foreground hover:bg-accent/90 w-full mb-6 rounded-md py-3 text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href="/donate">{t('nav.donate')}</Link>
                </Button>
                <Select value={language} onValueChange={(value) => {setLanguage(value as 'en' | 'fr'); setIsMobileMenuOpen(false)}}>
                  <SelectTrigger 
                    className="w-full bg-transparent text-primary-foreground border-primary-foreground/30 hover:border-primary-foreground focus:ring-accent rounded-md"
                    aria-label="Select language"
                  >
                    <Globe size={16} className="mr-2" />
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground rounded-md">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
