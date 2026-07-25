"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary mb-6">
        {t('footer.privacy_policy')}
      </h1>
      <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-headline font-semibold text-primary">
            1. Data Collection
          </h2>
          <p>
            We do not collect any personal data through this website, except for the information you voluntarily provide in the contact or volunteer forms.
          </p>
          <p className="italic text-foreground/75">
            Nous ne collectons aucune donnée personnelle via ce site web, à l'exception des informations que vous fournissez volontairement dans les formulaires de contact ou de bénévolat.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-headline font-semibold text-primary">
            2. Cookies
          </h2>
          <p>
            We only use essential cookies to maintain your language preferences.
          </p>
          <p className="italic text-foreground/75">
            Nous utilisons uniquement des cookies essentiels pour conserver vos préférences de langue.
          </p>
        </section>
      </div>
    </div>
  );
}
