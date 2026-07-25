"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LegalPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary mb-6">
        {t('footer.legal_mentions')}
      </h1>
      <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-headline font-semibold text-primary">
            1. Editor & Publisher
          </h2>
          <p>
            This website is published by the Frédéric Saba Foundation (FSF), a nonprofit organization.
            For any inquiries, please contact us via our contact page.
          </p>
          <p className="italic text-foreground/75">
            Ce site web est édité par la Fondation Frédéric Saba (FSF), une organisation à but non lucratif.
            Pour toute demande, veuillez nous contacter via notre page de contact.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-headline font-semibold text-primary">
            2. Hosting
          </h2>
          <p>
            This website is hosted by Firebase App Hosting / Google Cloud.
          </p>
          <p className="italic text-foreground/75">
            Ce site web est hébergé par Firebase App Hosting / Google Cloud.
          </p>
        </section>
      </div>
    </div>
  );
}
