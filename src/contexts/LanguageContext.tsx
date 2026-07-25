"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Fichiers de traduction
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.initiatives': 'Initiatives',
    'nav.news': 'News & Events',
    'nav.gallery': 'Gallery',
    'nav.volunteer': 'Volunteer',
    'nav.contact': 'Contact',
    'nav.tracker': 'Project Tracker',
    'nav.donate': 'Make a Donation',
    
    // Pages principales
    'home.hero.title': 'Welcome to Frédéric Saba Foundation',
    'home.hero.subtitle': 'Supporting educational and humanitarian initiatives for children, the sick, families in need, and people with disabilities.',
    'home.hero.cta': 'Learn More',
    
    // About page
    'about.title': 'About Us',
    'about.mission': 'Our Mission',
    'about.vision': 'Our Vision',
    'about.values': 'Our Values',
    
    // Initiatives
    'initiatives.title': 'Our Initiatives',
    'initiatives.education': 'Education',
    'initiatives.healthcare': 'Healthcare',
    'initiatives.family_support': 'Family Support',
    'initiatives.disability_support': 'Disability Support',
    
    // News & Events
    'news.title': 'News & Events',
    'news.view_all': 'View All News',
    
    // Gallery
    'gallery.title': 'Gallery',
    'gallery.activities': 'Activities',
    'gallery.donations': 'Donations',
    'gallery.team': 'Team',
    
    // Volunteer
    'volunteer.title': 'Volunteer',
    'volunteer.subtitle': 'Join us in making a difference',
    'volunteer.form.name': 'Full Name',
    'volunteer.form.email': 'Email',
    'volunteer.form.phone': 'Phone',
    'volunteer.form.message': 'Message',
    'volunteer.form.submit': 'Submit Application',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with us',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    
    // Footer
    'footer.about': 'About FSF',
    'footer.initiatives': 'Initiatives',
    'footer.news': 'News',
    'footer.contact': 'Contact',
    'footer.follow_us': 'Follow Us',
    'footer.copyright': '© 2024 Frédéric Saba Foundation. All rights reserved.',
    
    // Common
    'common.learn_more': 'Learn More',
    'common.read_more': 'Read More',
    'common.view_all': 'View All',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.no_results': 'No results found',
    'common.date': 'Date',
    'common.location': 'Location',
    'common.time': 'Time',
    'common.author': 'Author',
    'common.category': 'Category',
    'common.amount': 'Amount',
    'common.frequency': 'Frequency',
    'common.one_time': 'One-Time',
    'common.monthly': 'Monthly',
    'common.optional': 'Optional',
    'common.required': 'Required',
    
    // Initiatives page
    'initiatives.filter_by_category': 'Filter by Category',
    'initiatives.all_initiatives': 'All Initiatives',
    'initiatives.no_initiatives_found': 'No initiatives found for the selected category.',
    'initiatives.explore_projects': 'Explore the diverse range of projects and programs we undertake to make a meaningful impact on the lives of those we serve.',
    'initiatives.category.Education': 'Education',
    'initiatives.category.Humanitarian Aid': 'Humanitarian Aid',
    'initiatives.category.Family Assistance': 'Family Assistance',
    'initiatives.category.Disability Support': 'Disability Support',
    
    // News & Events page
    'news.latest_news': 'Latest News',
    'news.upcoming_events': 'Upcoming & Recent Events',
    'news.no_news_available': 'No news articles available at the moment. Please check back soon.',
    'news.no_events_scheduled': 'No events scheduled at the moment. Please check back soon.',
    'news.stay_updated': 'Stay updated with the latest announcements, stories, and upcoming events from the Frédéric Saba Foundation.',
    'news.read_more': 'Read More',
    'news.view_details': 'View Details',
    'news.category.Foundation News': 'Foundation News',
    'news.category.Education Program': 'Education Program',
    'news.category.Spiritual Support': 'Spiritual Support',
    'news.category.Disability Support': 'Disability Support',
    'news.category.Fundraiser': 'Fundraiser',
    'news.category.Workshop': 'Workshop',
    
    // Contact page
    'contact.get_in_touch': 'Get in Touch',
    'contact.we_love_to_hear': 'We\'d love to hear from you. Whether you have a question, a proposal, or just want to say hello, feel free to reach out.',
    'contact.send_message': 'Send Us a Message',
    'contact.full_name': 'Full Name',
    'contact.email_address': 'Email Address',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.reason_for_message': 'Reason for your message',
    'contact.your_message': 'Your message...',
    'contact.send_message_button': 'Send Message',
    'contact.our_information': 'Our Information',
    'contact.follow_us': 'Follow Us',
    'contact.our_location': 'Our Location',
    'contact.map_placeholder': 'Map will be displayed here.',
    'contact.message_sent': 'Message Sent!',
    'contact.thank_you_contact': 'Thank you for contacting us. We\'ll get back to you shortly.',
    
    // Donate page
    'donate.make_donation': 'Make a Donation',
    'donate.generosity_empowers': 'Your generosity empowers us to continue our vital work. Every contribution, big or small, makes a difference.',
    'donate.support_mission': 'Support Our Mission',
    'donate.donation_amount': 'Donation Amount',
    'donate.enter_custom_amount': 'Enter custom amount',
    'donate.enter_desired_amount': 'Enter your desired donation amount.',
    'donate.donation_frequency': 'Donation Frequency',
    'donate.message_optional': 'Message (Optional)',
    'donate.leave_message': 'Leave a message for the foundation...',
    'donate.secure_payment': 'Secure payment processing will be handled by our trusted partners. (Integration coming soon)',
    'donate.donate_now': 'Donate Now',
    'donate.your_impact': 'Your Impact',
    'donate.contributions_fuel': 'Your generous contributions directly fuel our mission, enabling us to:',
    'donate.education_support': 'Support learning resources and school programs for children.',
    'donate.healthcare_support': 'Provide medical aid and health services to the sick.',
    'donate.family_assistance': 'Help families in need with essential supplies and support.',
    'donate.disability_support': 'Empower individuals with disabilities through targeted programs.',
    'donate.every_donation_helps': 'Every donation, no matter the size, helps us create a brighter future for those we serve. Thank you for your partnership.',
    'donate.questions_about_donating': 'Questions about donating?',
    'donate.we_here_to_help': 'We\'re here to help. Feel free to reach out to our support team.',
    'donate.thank_you': 'Thank You!',
    'donate.donation_received': 'Your generous donation has been received. We appreciate your support.',
    
    // Gallery page
    'gallery.discover_actions': 'Discover our actions in images: activities, distributions and highlights.',
    'gallery.mini_camp': 'Mini Camp',
    'gallery.school_kits_davie': 'School Kits - Davie',
    'gallery.school_kits_agogome': 'School Kits - Agogomé',
    'gallery.food_agogome': 'Food - Agogomé',
    'gallery.food_notse': 'Food - Notse',
    
    // Home page - About section
    'home.about_fsf': 'About the Frédéric Saba Foundation',
    'home.about_description_1': 'The Frédéric Saba Foundation (FSF) is a nonprofit organization with a worldwide mission to support educational and humanitarian initiatives.',
    'home.about_description_2': 'We focus on providing aid and opportunities to children, the sick, families in need, and people with disabilities, empowering them to build better futures and fostering a global community of compassion and support.',
    'home.featured_initiatives': 'Our Featured Initiatives',
    'home.initiative_education_title': 'Education for All',
    'home.initiative_education_desc': 'Providing access to quality education and learning resources for underprivileged children worldwide.',
    'home.initiative_health_title': 'Health & Wellbeing Support',
    'home.initiative_health_desc': 'Offering medical assistance, healthcare access, and support to the sick and their families.',
    'home.initiative_community_title': 'Empowering Communities',
    'home.initiative_community_desc': 'Supporting families in need and individuals with disabilities through various programs for a better quality of life.',
    'home.volunteer_cta_title': 'Become a Volunteer',
    'home.volunteer_cta_desc': 'Make a difference in the lives of those we support. Join our dedicated team of volunteers and contribute your skills and passion to our cause.',
    'home.event_title': 'Upcoming Event: FSF Annual Charity Gala',
    'home.event_date': 'Date',
    'home.event_date_value': 'December 5, 2024',
    'home.event_description': 'Join us for an evening of inspiration and support as we celebrate our achievements and raise funds for future projects.',
    'home.event_details': 'Event Details',
    
    // About page
    'about.hero_description': 'Discover our mission, vision, and the dedicated team driving our efforts to create a better world through education and humanitarian support.',
    'about.our_purpose': 'Our Purpose',
    'about.purpose_description': 'The Frédéric Saba Foundation (FSF) is a globally-focused nonprofit organization committed to fostering positive change through robust educational and humanitarian initiatives. We dedicate our resources and efforts to supporting vulnerable populations, including children, the sick, families facing hardship, and individuals with disabilities. Our core belief is that everyone deserves the opportunity to lead a dignified and fulfilling life, and we work tirelessly to make this a reality.',
    'about.mission_description': 'To provide comprehensive support and create lasting opportunities for children, the sick, families in need, and people with disabilities through targeted educational programs and compassionate humanitarian aid. We aim to address immediate needs while fostering long-term empowerment and resilience within the communities we serve.',
    'about.vision_description': 'We envision a world where every individual, regardless of their circumstances, has access to quality education, healthcare, and the resources needed to thrive. A world where compassion and collective action overcome adversity, creating inclusive communities where everyone is valued and empowered to reach their full potential.',
    'about.our_journey': 'Our Journey',
    'about.journey_p1': 'Founded by Frédéric Saba, the Foundation was born from a deep-seated desire to address systemic inequalities and provide critical support where it\'s most needed. Witnessing firsthand the challenges faced by underprivileged children, individuals battling illness, families struggling with poverty, and people with disabilities, Mr. Saba was inspired to create an organization that could offer not just temporary relief, but also pathways to sustainable improvement and empowerment.',
    'about.journey_p2': 'Since our inception, we have remained steadfast in our commitment to these core groups, continuously adapting our strategies to meet evolving needs and expand our reach, driven by the belief that collective effort can bring about profound and positive global change.',
    'about.meet_team': 'Meet Our Team',
    'about.team_member_frederic_name': 'Frédéric Saba',
    'about.team_member_frederic_role': 'Founder & President',
    'about.team_member_frederic_bio': 'Dedicated to making a tangible difference in the lives of those in need through compassion and strategic action.',
    'about.team_member_jane_name': 'Jane Doe',
    'about.team_member_jane_role': 'Director of Operations',
    'about.team_member_jane_bio': 'Oversees the foundation\'s programs and ensures efficient delivery of aid and support.',
    'about.team_member_john_name': 'John Smith',
    'about.team_member_john_role': 'Head of Community Outreach',
    'about.team_member_john_bio': 'Connects with communities to understand their needs and foster collaborative solutions.',
    'about.team_footer': 'And many more dedicated volunteers and staff members who make our work possible.',
    'about.guiding_principles': 'Our Guiding Principles',
    'about.value_faith': 'Faith',
    'about.value_faith_desc': 'Guided by our faith, we serve with hope and dedication to uplift humanity.',
    'about.value_compassion': 'Compassion',
    'about.value_compassion_desc': 'We approach every individual and community with empathy and understanding.',
    'about.value_integrity': 'Integrity',
    'about.value_integrity_desc': 'We operate with transparency and accountability in all our endeavors.',
    'about.value_empowerment': 'Empowerment',
    'about.value_empowerment_desc': 'We strive to empower individuals and communities to build self-sufficient futures.',
    'about.value_collaboration': 'Collaboration',
    'about.value_collaboration_desc': 'We believe in the power of partnership to achieve greater impact.',
    'about.value_inclusivity': 'Inclusivity',
    'about.value_inclusivity_desc': 'We are committed to supporting all individuals without discrimination.',
    'about.join_us_title': 'Join Us in Making a Difference',
    'about.join_us_desc': 'Your support can help us expand our reach and deepen our impact. Consider donating or volunteering your time.',
    
    // Volunteer page
    'volunteer.hero_description': 'Your time and talent can make a real difference. Join our passionate team and help us create positive change.',
    'volunteer.join_team': 'Join Our Volunteer Team',
    'volunteer.intro_text': 'Volunteers are the backbone of the Frédéric Saba Foundation. By dedicating your time and skills, you directly contribute to our mission of supporting children, the sick, families in need, and people with disabilities. We have a variety of roles available, both remote and in-person, depending on current projects and needs.',
    'volunteer.phone_optional': 'Phone Number (Optional)',
    'volunteer.phone_placeholder': 'Your Phone Number',
    'volunteer.availability': 'Availability (Optional)',
    'volunteer.availability_placeholder': 'E.g., Weekends, weekday evenings, specific hours...',
    'volunteer.availability_hint': 'Let us know when you\'re generally available to volunteer.',
    'volunteer.skills': 'Skills & Interests (Optional)',
    'volunteer.skills_placeholder': 'E.g., Teaching, event planning, administrative support, graphic design, medical background...',
    'volunteer.skills_hint': 'Share any skills or areas you\'re particularly interested in.',
    'volunteer.motivation': 'Why You Want to Volunteer',
    'volunteer.motivation_placeholder': 'Tell us a bit about what motivates you to volunteer with FSF...',
    'volunteer.why_volunteer_title': 'Why Volunteer with FSF?',
    'volunteer.why_reason_1': 'Be part of a compassionate community dedicated to making a tangible impact.',
    'volunteer.why_reason_2': 'Gain valuable experience and develop new skills while supporting meaningful causes.',
    'volunteer.why_reason_3': 'Help us reach more children, sick individuals, families in need, and people with disabilities.',
    'volunteer.why_reason_4': 'Flexible opportunities available to fit various schedules and interests.',
    'volunteer.why_reason_5': 'Every hour you contribute helps us build a more equitable and supportive world.',
    'volunteer.testimonial_title': 'From Our Volunteers',
    'volunteer.testimonial_name': 'Sarah L.',
    'volunteer.testimonial_role': 'Event Volunteer',
    'volunteer.testimonial_quote': 'Volunteering with FSF has been an incredibly rewarding experience. Seeing the direct impact of our work on the community is truly inspiring. The team is wonderful and so dedicated!',
    'volunteer.application_submitted': 'Application Submitted!',
    'volunteer.thank_you': 'Thank you for your interest in volunteering. We\'ll be in touch soon.',
    
    // Footer
    'footer.tagline': 'Supporting educational & humanitarian initiatives for a better future.',
    'footer.contact_us': 'Contact Us',
    'footer.legal_mentions': 'Legal Mentions',
    'footer.privacy_policy': 'Privacy Policy',
    
    // Initiatives Data
    'initiative.education-for-all.title': 'Education for All',
    'initiative.education-for-all.category': 'Education',
    'initiative.education-for-all.summary': 'Providing access to quality education and learning resources for underprivileged children worldwide.',
    'initiative.education-for-all.description': 'Our "Education for All" initiative focuses on breaking down barriers to education for children in underserved communities. We build schools, provide learning materials, train teachers, and offer scholarships to ensure every child has the opportunity to learn and grow. We believe education is a fundamental right and a powerful tool for empowerment and societal change.',
    
    'initiative.health-and-wellbeing.title': 'Health & Wellbeing Support',
    'initiative.health-and-wellbeing.category': 'Humanitarian Aid',
    'initiative.health-and-wellbeing.summary': 'Offering medical assistance, healthcare access, and support to the sick and their families.',
    'initiative.health-and-wellbeing.description': 'This initiative aims to improve the health outcomes for vulnerable populations, particularly those without access to basic medical care. We organize medical camps in remote areas, provide essential medicines, support local clinics with equipment and supplies, and offer counseling services to individuals and families facing health crises. Our focus is on both preventative care and treatment.',
    
    'initiative.empowering-communities.title': 'Empowering Communities',
    'initiative.empowering-communities.category': 'Family Assistance',
    'initiative.empowering-communities.summary': 'Supporting families in need through programs fostering self-sufficiency and a better quality of life.',
    'initiative.empowering-communities.description': 'We work to empower families facing hardship by providing vocational training, financial literacy programs, and resources for sustainable livelihoods. Our goal is to help families build resilience, achieve economic stability, and improve their overall quality of life, creating a ripple effect of positive change within their communities.',
    
    'initiative.disability-inclusion-project.title': 'Disability Inclusion Project',
    'initiative.disability-inclusion-project.category': 'Disability Support',
    'initiative.disability-inclusion-project.summary': 'Promoting the rights and inclusion of people with disabilities through advocacy and support programs.',
    'initiative.disability-inclusion-project.description': 'Our Disability Inclusion Project champions the rights of individuals with disabilities. We advocate for inclusive policies, provide assistive technologies, run awareness campaigns to combat stigma, and support accessible infrastructure development. Our aim is to ensure people with disabilities can participate fully and equally in all aspects of society.',
    
    // News & Events Data
    'news.foundation-launch-announcement.title': 'Frédéric Saba Foundation Officially Launched',
    'news.foundation-launch-announcement.category': 'Foundation News',
    'news.foundation-launch-announcement.summary': 'We are thrilled to announce the official launch of the Frédéric Saba Foundation, dedicated to making a positive impact globally.',
    'news.foundation-launch-announcement.content': 'The Frédéric Saba Foundation (FSF) has officially commenced its operations, aiming to bring transformative change through dedicated educational and humanitarian initiatives. Founded on the principles of compassion, integrity, and empowerment, FSF will focus on supporting children, the sick, families in need, and people with disabilities. Our programs are designed to address immediate needs while fostering long-term self-sufficiency and community development.',
    
    'news.first-education-grant-awarded.title': 'First Educational Grant Awarded to Rural School',
    'news.first-education-grant-awarded.category': 'Education Program',
    'news.first-education-grant-awarded.summary': 'FSF awards its first educational grant to support the Bright Future Academy in enhancing its learning resources.',
    'news.first-education-grant-awarded.content': 'The Bright Future Academy, a school serving underprivileged children in a remote rural area, has been selected as the first recipient of an educational grant from the Frédéric Saba Foundation. This grant will enable the school to purchase new textbooks, install a small computer lab, and provide additional training for its teachers.',
    
    'news.faith-based-teaching-prayer.title': 'FSF Introduces Faith-Based Teachings and Prayer Sessions',
    'news.faith-based-teaching-prayer.category': 'Spiritual Support',
    'news.faith-based-teaching-prayer.summary': 'The foundation now offers faith-based teachings and communal prayer sessions to provide spiritual support and guidance.',
    'news.faith-based-teaching-prayer.content': 'Recognizing the importance of spiritual well-being, the Frédéric Saba Foundation has launched a new initiative offering faith-based teachings and regular prayer sessions. These gatherings aim to provide comfort, hope, and a sense of community for individuals seeking spiritual nourishment.',
    
    'news.disability-job-training.title': 'New Job Training Program Empowers Individuals with Disabilities',
    'news.disability-job-training.category': 'Disability Support',
    'news.disability-job-training.summary': 'FSF launches a vocational training program tailored to equip individuals with disabilities with valuable job skills for economic independence.',
    'news.disability-job-training.content': 'As part of our commitment to disability inclusion, the Frédéric Saba Foundation is excited to announce a new job training program specifically designed for individuals with disabilities. This program offers tailored vocational training in various fields, focusing on in-demand skills and creating pathways to sustainable employment.',
    
    'event.annual-charity-gala-2024.title': 'FSF Annual Charity Gala 2024',
    'event.annual-charity-gala-2024.category': 'Fundraiser',
    'event.annual-charity-gala-2024.location': 'Grand Ballroom, Hope City Plaza',
    'event.annual-charity-gala-2024.summary': 'Join us for an inspiring evening to celebrate our achievements and raise funds for future projects.',
    'event.annual-charity-gala-2024.content': 'The Frédéric Saba Foundation cordially invites you to our Annual Charity Gala. This special evening will be a celebration of our collective efforts and achievements throughout the year, and an opportunity to raise vital funds for our upcoming educational and humanitarian projects.',
    
    'event.community-health-workshop.title': 'Community Health & Wellbeing Workshop',
    'event.community-health-workshop.category': 'Workshop',
    'event.community-health-workshop.location': 'Online via Zoom',
    'event.community-health-workshop.summary': 'An interactive online workshop focusing on preventative healthcare and mental wellbeing for families.',
    'event.community-health-workshop.content': 'In line with our commitment to health and wellbeing, the Frédéric Saba Foundation is pleased to host a free online workshop. This interactive session will feature talks from healthcare professionals on topics such as nutrition, hygiene, early detection of common illnesses, and strategies for maintaining mental wellbeing during challenging times.',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.initiatives': 'Initiatives',
    'nav.news': 'Actualités',
    'nav.gallery': 'Galerie',
    'nav.volunteer': 'Bénévolat',
    'nav.contact': 'Contact',
    'nav.tracker': 'Suivi du projet',
    'nav.donate': 'Faire un Don',
    
    // Pages principales
    'home.hero.title': 'Bienvenue à la Fondation Frédéric Saba',
    'home.hero.subtitle': 'Soutenir les initiatives éducatives et humanitaires pour les enfants, les malades, les familles dans le besoin et les personnes handicapées.',
    'home.hero.cta': 'En Savoir Plus',
    
    // About page
    'about.title': 'À Propos',
    'about.mission': 'Notre Mission',
    'about.vision': 'Notre Vision',
    'about.values': 'Nos Valeurs',
    
    // Initiatives
    'initiatives.title': 'Nos Initiatives',
    'initiatives.education': 'Éducation',
    'initiatives.healthcare': 'Santé',
    'initiatives.family_support': 'Soutien Familial',
    'initiatives.disability_support': 'Soutien aux Handicapés',
    
    // News & Events
    'news.title': 'Actualités',
    'news.view_all': 'Voir Toutes les Actualités',
    
    // Gallery
    'gallery.title': 'Galerie',
    'gallery.activities': 'Activités',
    'gallery.donations': 'Dons',
    'gallery.team': 'Équipe',
    
    // Volunteer
    'volunteer.title': 'Bénévolat',
    'volunteer.subtitle': 'Rejoignez-nous pour faire la différence',
    'volunteer.form.name': 'Nom Complet',
    'volunteer.form.email': 'Email',
    'volunteer.form.phone': 'Téléphone',
    'volunteer.form.message': 'Message',
    'volunteer.form.submit': 'Soumettre la Candidature',
    
    // Contact
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Entrez en contact avec nous',
    'contact.form.name': 'Nom',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Sujet',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Envoyer le Message',
    
    // Footer
    'footer.about': 'À Propos FSF',
    'footer.initiatives': 'Initiatives',
    'footer.news': 'Actualités',
    'footer.contact': 'Contact',
    'footer.follow_us': 'Suivez-nous',
    'footer.copyright': '© 2024 Fondation Frédéric Saba. Tous droits réservés.',
    
    // Common
    'common.learn_more': 'En Savoir Plus',
    'common.read_more': 'Lire Plus',
    'common.view_all': 'Voir Tout',
    'common.submit': 'Soumettre',
    'common.cancel': 'Annuler',
    'common.close': 'Fermer',
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur s\'est produite',
    'common.success': 'Succès',
    'common.filter': 'Filtrer',
    'common.all': 'Tout',
    'common.no_results': 'Aucun résultat trouvé',
    'common.date': 'Date',
    'common.location': 'Lieu',
    'common.time': 'Heure',
    'common.author': 'Auteur',
    'common.category': 'Catégorie',
    'common.amount': 'Montant',
    'common.frequency': 'Fréquence',
    'common.one_time': 'Unique',
    'common.monthly': 'Mensuel',
    'common.optional': 'Optionnel',
    'common.required': 'Requis',
    
    // Initiatives page
    'initiatives.filter_by_category': 'Filtrer par Catégorie',
    'initiatives.all_initiatives': 'Toutes les Initiatives',
    'initiatives.no_initiatives_found': 'Aucune initiative trouvée pour la catégorie sélectionnée.',
    'initiatives.explore_projects': 'Explorez la gamme diversifiée de projets et programmes que nous entreprenons pour avoir un impact significatif sur la vie de ceux que nous servons.',
    'initiatives.category.Education': 'Éducation',
    'initiatives.category.Humanitarian Aid': 'Aide Humanitaire',
    'initiatives.category.Family Assistance': 'Assistance Familiale',
    'initiatives.category.Disability Support': 'Soutien aux Handicapés',
    
    // News & Events page
    'news.latest_news': 'Dernières Actualités',
    'news.upcoming_events': 'Événements à Venir et Récents',
    'news.no_news_available': 'Aucun article d\'actualité disponible pour le moment. Veuillez revenir bientôt.',
    'news.no_events_scheduled': 'Aucun événement programmé pour le moment. Veuillez revenir bientôt.',
    'news.stay_updated': 'Restez informé des dernières annonces, histoires et événements à venir de la Fondation Frédéric Saba.',
    'news.read_more': 'Lire Plus',
    'news.view_details': 'Voir les Détails',
    'news.category.Foundation News': 'Nouvelles de la Fondation',
    'news.category.Education Program': 'Programme Éducatif',
    'news.category.Spiritual Support': 'Soutien Spirituel',
    'news.category.Disability Support': 'Soutien aux Handicapés',
    'news.category.Fundraiser': 'Collecte de Fonds',
    'news.category.Workshop': 'Atelier',
    
    // Contact page
    'contact.get_in_touch': 'Entrer en Contact',
    'contact.we_love_to_hear': 'Nous aimerions avoir de vos nouvelles. Que vous ayez une question, une proposition ou que vous souhaitiez simplement dire bonjour, n\'hésitez pas à nous contacter.',
    'contact.send_message': 'Envoyez-nous un Message',
    'contact.full_name': 'Nom Complet',
    'contact.email_address': 'Adresse Email',
    'contact.subject': 'Sujet',
    'contact.message': 'Message',
    'contact.reason_for_message': 'Raison de votre message',
    'contact.your_message': 'Votre message...',
    'contact.send_message_button': 'Envoyer le Message',
    'contact.our_information': 'Nos Informations',
    'contact.follow_us': 'Suivez-nous',
    'contact.our_location': 'Notre Localisation',
    'contact.map_placeholder': 'La carte sera affichée ici.',
    'contact.message_sent': 'Message Envoyé !',
    'contact.thank_you_contact': 'Merci de nous avoir contactés. Nous vous répondrons bientôt.',
    
    // Donate page
    'donate.make_donation': 'Faire un Don',
    'donate.generosity_empowers': 'Votre générosité nous permet de poursuivre notre travail vital. Chaque contribution, grande ou petite, fait la différence.',
    'donate.support_mission': 'Soutenir Notre Mission',
    'donate.donation_amount': 'Montant du Don',
    'donate.enter_custom_amount': 'Entrez un montant personnalisé',
    'donate.enter_desired_amount': 'Entrez le montant de don souhaité.',
    'donate.donation_frequency': 'Fréquence du Don',
    'donate.message_optional': 'Message (Optionnel)',
    'donate.leave_message': 'Laissez un message pour la fondation...',
    'donate.secure_payment': 'Le traitement sécurisé des paiements sera géré par nos partenaires de confiance. (Intégration à venir)',
    'donate.donate_now': 'Faire un Don Maintenant',
    'donate.your_impact': 'Votre Impact',
    'donate.contributions_fuel': 'Vos contributions généreuses alimentent directement notre mission, nous permettant de :',
    'donate.education_support': 'Soutenir les ressources d\'apprentissage et les programmes scolaires pour les enfants.',
    'donate.healthcare_support': 'Fournir une aide médicale et des services de santé aux malades.',
    'donate.family_assistance': 'Aider les familles dans le besoin avec des fournitures essentielles et du soutien.',
    'donate.disability_support': 'Autonomiser les personnes handicapées grâce à des programmes ciblés.',
    'donate.every_donation_helps': 'Chaque don, peu importe sa taille, nous aide à créer un avenir plus radieux pour ceux que nous servons. Merci pour votre partenariat.',
    'donate.questions_about_donating': 'Des questions sur les dons ?',
    'donate.we_here_to_help': 'Nous sommes là pour vous aider. N\'hésitez pas à contacter notre équipe de support.',
    'donate.thank_you': 'Merci !',
    'donate.donation_received': 'Votre don généreux a été reçu. Nous apprécions votre soutien.',
    
    // Gallery page
    'gallery.discover_actions': 'Découvrez nos actions en images : activités, distributions et moments forts.',
    'gallery.mini_camp': 'Mini Camp',
    'gallery.school_kits_davie': 'Kits Scolaires - Davie',
    'gallery.school_kits_agogome': 'Kits Scolaires - Agogomé',
    'gallery.food_agogome': 'Vivres - Agogomé',
    'gallery.food_notse': 'Vivres - Notse',
    
    // Home page - About section
    'home.about_fsf': 'À Propos de la Fondation Frédéric Saba',
    'home.about_description_1': 'La Fondation Frédéric Saba (FSF) est une organisation à but non lucratif avec une mission mondiale de soutenir les initiatives éducatives et humanitaires.',
    'home.about_description_2': 'Nous nous concentrons sur la fourniture d\'aide et d\'opportunités aux enfants, aux malades, aux familles dans le besoin et aux personnes handicapées, leur permettant de construire un avenir meilleur et de favoriser une communauté mondiale de compassion et de soutien.',
    'home.featured_initiatives': 'Nos Initiatives Phares',
    'home.initiative_education_title': 'Éducation pour Tous',
    'home.initiative_education_desc': 'Fournir un accès à une éducation de qualité et à des ressources d\'apprentissage pour les enfants défavorisés du monde entier.',
    'home.initiative_health_title': 'Soutien Santé & Bien-être',
    'home.initiative_health_desc': 'Offrir une assistance médicale, un accès aux soins de santé et un soutien aux malades et à leurs familles.',
    'home.initiative_community_title': 'Autonomiser les Communautés',
    'home.initiative_community_desc': 'Soutenir les familles dans le besoin et les personnes handicapées grâce à divers programmes pour une meilleure qualité de vie.',
    'home.volunteer_cta_title': 'Devenez Bénévole',
    'home.volunteer_cta_desc': 'Faites la différence dans la vie de ceux que nous soutenons. Rejoignez notre équipe dévouée de bénévoles et apportez vos compétences et votre passion à notre cause.',
    'home.event_title': 'Événement à Venir : Gala de Charité Annuel FSF',
    'home.event_date': 'Date',
    'home.event_date_value': '5 décembre 2024',
    'home.event_description': 'Rejoignez-nous pour une soirée d\'inspiration et de soutien alors que nous célébrons nos réalisations et collectons des fonds pour de futurs projets.',
    'home.event_details': 'Détails de l\'Événement',
    
    // About page
    'about.hero_description': 'Découvrez notre mission, notre vision et l\'équipe dévouée qui mène nos efforts pour créer un monde meilleur grâce à l\'éducation et au soutien humanitaire.',
    'about.our_purpose': 'Notre Mission',
    'about.purpose_description': 'La Fondation Frédéric Saba (FSF) est une organisation à but non lucratif axée sur le monde entier, engagée à favoriser le changement positif par le biais d\'initiatives éducatives et humanitaires solides. Nous consacrons nos ressources et nos efforts au soutien des populations vulnérables, notamment les enfants, les malades, les familles confrontées à des difficultés et les personnes handicapées. Notre conviction fondamentale est que chacun mérite l\'opportunité de mener une vie digne et épanouissante, et nous travaillons sans relâche pour en faire une réalité.',
    'about.mission_description': 'Fournir un soutien complet et créer des opportunités durables pour les enfants, les malades, les familles dans le besoin et les personnes handicapées grâce à des programmes éducatifs ciblés et une aide humanitaire compatissante. Nous visons à répondre aux besoins immédiats tout en favorisant l\'autonomisation et la résilience à long terme au sein des communautés que nous servons.',
    'about.vision_description': 'Nous envisageons un monde où chaque individu, quelles que soient ses circonstances, a accès à une éducation de qualité, aux soins de santé et aux ressources nécessaires pour s\'épanouir. Un monde où la compassion et l\'action collective surmontent l\'adversité, créant des communautés inclusives où chacun est valorisé et habilité à atteindre son plein potentiel.',
    'about.our_journey': 'Notre Parcours',
    'about.journey_p1': 'Fondée par Frédéric Saba, la Fondation est née d\'un désir profond de lutter contre les inégalités systémiques et de fournir un soutien essentiel là où il est le plus nécessaire. Témoin direct des défis auxquels sont confrontés les enfants défavorisés, les personnes malades, les familles en difficulté et les personnes handicapées, M. Saba a été inspiré pour créer une organisation qui pourrait offrir non seulement un soulagement temporaire, mais aussi des voies vers une amélioration et une autonomisation durables.',
    'about.journey_p2': 'Depuis notre création, nous sommes restés inébranlables dans notre engagement envers ces groupes fondamentaux, adaptant continuellement nos stratégies pour répondre aux besoins en évolution et étendre notre portée, animés par la conviction que l\'effort collectif peut apporter un changement mondial profond et positif.',
    'about.meet_team': 'Rencontrez Notre Équipe',
    'about.team_member_frederic_name': 'Frédéric Saba',
    'about.team_member_frederic_role': 'Fondateur & Président',
    'about.team_member_frederic_bio': 'Dévoué à faire une différence tangible dans la vie de ceux qui en ont besoin grâce à la compassion et à l\'action stratégique.',
    'about.team_member_jane_name': 'Jane Doe',
    'about.team_member_jane_role': 'Directrice des Opérations',
    'about.team_member_jane_bio': 'Supervise les programmes de la fondation et assure une livraison efficace de l\'aide et du soutien.',
    'about.team_member_john_name': 'John Smith',
    'about.team_member_john_role': 'Chef de la Sensibilisation Communautaire',
    'about.team_member_john_bio': 'Se connecte avec les communautés pour comprendre leurs besoins et favoriser des solutions collaboratives.',
    'about.team_footer': 'Et bien d\'autres bénévoles et membres du personnel dévoués qui rendent notre travail possible.',
    'about.guiding_principles': 'Nos Principes Directeurs',
    'about.value_faith': 'Foi',
    'about.value_faith_desc': 'Guidés par notre foi, nous servons avec espoir et dévouement pour élever l\'humanité.',
    'about.value_compassion': 'Compassion',
    'about.value_compassion_desc': 'Nous abordons chaque individu et communauté avec empathie et compréhension.',
    'about.value_integrity': 'Intégrité',
    'about.value_integrity_desc': 'Nous opérons avec transparence et responsabilité dans toutes nos initiatives.',
    'about.value_empowerment': 'Autonomisation',
    'about.value_empowerment_desc': 'Nous nous efforçons d\'autonomiser les individus et les communautés pour construire des avenirs autosuffisants.',
    'about.value_collaboration': 'Collaboration',
    'about.value_collaboration_desc': 'Nous croyons au pouvoir du partenariat pour obtenir un impact plus important.',
    'about.value_inclusivity': 'Inclusivité',
    'about.value_inclusivity_desc': 'Nous nous engageons à soutenir tous les individus sans discrimination.',
    'about.join_us_title': 'Rejoignez-nous pour Faire la Différence',
    'about.join_us_desc': 'Votre soutien peut nous aider à étendre notre portée et à approfondir notre impact. Envisagez de faire un don ou de faire du bénévolat.',
    
    // Volunteer page
    'volunteer.hero_description': 'Votre temps et votre talent peuvent faire une réelle différence. Rejoignez notre équipe passionnée et aidez-nous à créer un changement positif.',
    'volunteer.join_team': 'Rejoignez Notre Équipe de Bénévoles',
    'volunteer.intro_text': 'Les bénévoles sont l\'épine dorsale de la Fondation Frédéric Saba. En consacrant votre temps et vos compétences, vous contribuez directement à notre mission de soutien aux enfants, aux malades, aux familles dans le besoin et aux personnes handicapées. Nous avons une variété de rôles disponibles, à distance et en personne, selon les projets et besoins actuels.',
    'volunteer.phone_optional': 'Numéro de Téléphone (Optionnel)',
    'volunteer.phone_placeholder': 'Votre Numéro de Téléphone',
    'volunteer.availability': 'Disponibilité (Optionnel)',
    'volunteer.availability_placeholder': 'Ex: Fins de semaine, soirées en semaine, heures spécifiques...',
    'volunteer.availability_hint': 'Faites-nous savoir quand vous êtes généralement disponible pour faire du bénévolat.',
    'volunteer.skills': 'Compétences & Intérêts (Optionnel)',
    'volunteer.skills_placeholder': 'Ex: Enseignement, planification d\'événements, soutien administratif, conception graphique, formation médicale...',
    'volunteer.skills_hint': 'Partagez toutes les compétences ou domaines qui vous intéressent particulièrement.',
    'volunteer.motivation': 'Pourquoi Vous Voulez Faire du Bénévolat',
    'volunteer.motivation_placeholder': 'Dites-nous un peu ce qui vous motive à faire du bénévolat avec FSF...',
    'volunteer.why_volunteer_title': 'Pourquoi Faire du Bénévolat avec FSF ?',
    'volunteer.why_reason_1': 'Faites partie d\'une communauté compatissante dédiée à avoir un impact tangible.',
    'volunteer.why_reason_2': 'Acquérez une expérience précieuse et développez de nouvelles compétences tout en soutenant des causes significatives.',
    'volunteer.why_reason_3': 'Aidez-nous à atteindre plus d\'enfants, de personnes malades, de familles dans le besoin et de personnes handicapées.',
    'volunteer.why_reason_4': 'Opportunités flexibles disponibles pour s\'adapter à divers horaires et intérêts.',
    'volunteer.why_reason_5': 'Chaque heure que vous contribuez nous aide à construire un monde plus équitable et solidaire.',
    'volunteer.testimonial_title': 'Témoignages de Nos Bénévoles',
    'volunteer.testimonial_name': 'Sarah L.',
    'volunteer.testimonial_role': 'Bénévole Événementiel',
    'volunteer.testimonial_quote': 'Faire du bénévolat avec FSF a été une expérience incroyablement enrichissante. Voir l\'impact direct de notre travail sur la communauté est vraiment inspirant. L\'équipe est merveilleuse et si dévouée !',
    'volunteer.application_submitted': 'Candidature Soumise !',
    'volunteer.thank_you': 'Merci pour votre intérêt à faire du bénévolat. Nous vous contacterons bientôt.',
    
    // Footer
    'footer.tagline': 'Soutenir les initiatives éducatives et humanitaires pour un avenir meilleur.',
    'footer.contact_us': 'Contactez-nous',
    'footer.legal_mentions': 'Mentions Légales',
    'footer.privacy_policy': 'Politique de Confidentialité',
    
    // Initiatives Data
    'initiative.education-for-all.title': 'Éducation pour Tous',
    'initiative.education-for-all.category': 'Éducation',
    'initiative.education-for-all.summary': 'Fournir un accès à une éducation de qualité et à des ressources d\'apprentissage pour les enfants défavorisés du monde entier.',
    'initiative.education-for-all.description': 'Notre initiative "Éducation pour Tous" se concentre sur l\'élimination des obstacles à l\éducation pour les enfants des communautés mal desservies. Nous construisons des écoles, fournissons du matériel d\'apprentissage, formons des enseignants et offrons des bourses pour garantir à chaque enfant la possibilité d\'apprendre et de grandir. Nous croyons que l\éducation est un droit fondamental et un outil puissant d\'autonomisation et de changement sociétal.',
    
    'initiative.health-and-wellbeing.title': 'Soutien Santé & Bien-être',
    'initiative.health-and-wellbeing.category': 'Aide Humanitaire',
    'initiative.health-and-wellbeing.summary': 'Offrir une assistance médicale, un accès aux soins de santé et un soutien aux malades et à leurs familles.',
    'initiative.health-and-wellbeing.description': 'Cette initiative vise à améliorer les résultats de santé des populations vulnérables, en particulier celles qui n\'ont pas accès aux soins médicaux de base. Nous organisons des camps médicaux dans les zones reculées, fournissons des médicaments essentiels, soutenons les cliniques locales avec des équipements et des fournitures, et offrons des services de conseil aux individus et aux familles confrontés à des crises sanitaires. Notre accent est mis sur les soins préventifs et le traitement.',
    
    'initiative.empowering-communities.title': 'Autonomiser les Communautés',
    'initiative.empowering-communities.category': 'Assistance Familiale',
    'initiative.empowering-communities.summary': 'Soutenir les familles dans le besoin grâce à des programmes favorisant l\'autosuffisance et une meilleure qualité de vie.',
    'initiative.empowering-communities.description': 'Nous travaillons à autonomiser les familles confrontées à des difficultés en fournissant une formation professionnelle, des programmes d\'éducation financière et des ressources pour des moyens de subsistance durables. Notre objectif est d\'aider les familles à renforcer leur résilience, à atteindre la stabilité économique et à améliorer leur qualité de vie globale, créant un effet d\'entraînement de changement positif au sein de leurs communautés.',
    
    'initiative.disability-inclusion-project.title': 'Projet d\'Inclusion des Handicapés',
    'initiative.disability-inclusion-project.category': 'Soutien aux Handicapés',
    'initiative.disability-inclusion-project.summary': 'Promouvoir les droits et l\'inclusion des personnes handicapées grâce à des programmes de plaidoyer et de soutien.',
    'initiative.disability-inclusion-project.description': 'Notre Projet d\'Inclusion des Handicapés défend les droits des personnes handicapées. Nous plaidons pour des politiques inclusives, fournissons des technologies d\'assistance, menons des campagnes de sensibilisation pour lutter contre la stigmatisation et soutenons le développement d\'infrastructures accessibles. Notre objectif est de garantir que les personnes handicapées puissent participer pleinement et également à tous les aspects de la société.',
    
    // News & Events Data
    'news.foundation-launch-announcement.title': 'Lancement Officiel de la Fondation Frédéric Saba',
    'news.foundation-launch-announcement.category': 'Nouvelles de la Fondation',
    'news.foundation-launch-announcement.summary': 'Nous sommes ravis d\'annoncer le lancement officiel de la Fondation Frédéric Saba, dédiée à avoir un impact positif à l\'échelle mondiale.',
    'news.foundation-launch-announcement.content': 'La Fondation Frédéric Saba (FSF) a officiellement commencé ses opérations, visant à apporter un changement transformateur grâce à des initiatives éducatives et humanitaires dédiées. Fondée sur les principes de compassion, d\'intégrité et d\'autonomisation, FSF se concentrera sur le soutien aux enfants, aux malades, aux familles dans le besoin et aux personnes handicapées. Nos programmes sont conçus pour répondre aux besoins immédiats tout en favorisant l\'autosuffisance et le développement communautaire à long terme.',
    
    'news.first-education-grant-awarded.title': 'Première Subvention Éducative Accordée à une École Rurale',
    'news.first-education-grant-awarded.category': 'Programme Éducatif',
    'news.first-education-grant-awarded.summary': 'FSF accorde sa première subvention éducative pour soutenir l\'Académie Bright Future dans l\'amélioration de ses ressources d\'apprentissage.',
    'news.first-education-grant-awarded.content': 'L\'Académie Bright Future, une école au service d\'enfants défavorisés dans une zone rurale reculée, a été sélectionnée comme première bénéficiaire d\'une subvention éducative de la Fondation Frédéric Saba. Cette subvention permettra à l\'école d\'acheter de nouveaux manuels scolaires, d\'installer un petit laboratoire informatique et de fournir une formation supplémentaire à ses enseignants.',
    
    'news.faith-based-teaching-prayer.title': 'FSF Introduit des Enseignements Basés sur la Foi et des Séances de Prière',
    'news.faith-based-teaching-prayer.category': 'Soutien Spirituel',
    'news.faith-based-teaching-prayer.summary': 'La fondation propose désormais des enseignements basés sur la foi et des séances de prière communautaires pour fournir un soutien et une guidance spirituels.',
    'news.faith-based-teaching-prayer.content': 'Reconnaissant l\'importance du bien-être spirituel, la Fondation Frédéric Saba a lancé une nouvelle initiative offrant des enseignements basés sur la foi et des séances de prière régulières. Ces rassemblements visent à fournir réconfort, espoir et un sentiment de communauté pour les personnes en quête de nourriture spirituelle.',
    
    'news.disability-job-training.title': 'Nouveau Programme de Formation Professionnelle pour les Personnes Handicapées',
    'news.disability-job-training.category': 'Soutien aux Handicapés',
    'news.disability-job-training.summary': 'FSF lance un programme de formation professionnelle sur mesure pour équiper les personnes handicapées de compétences professionnelles précieuses pour l\'indépendance économique.',
    'news.disability-job-training.content': 'Dans le cadre de notre engagement envers l\'inclusion des personnes handicapées, la Fondation Frédéric Saba est ravie d\'annoncer un nouveau programme de formation professionnelle spécifiquement conçu pour les personnes handicapées. Ce programme offre une formation professionnelle personnalisée dans divers domaines, en se concentrant sur les compétences demandées et en créant des voies vers un emploi durable.',
    
    'event.annual-charity-gala-2024.title': 'Gala de Charité Annuel FSF 2024',
    'event.annual-charity-gala-2024.category': 'Collecte de Fonds',
    'event.annual-charity-gala-2024.location': 'Grand Ballroom, Hope City Plaza',
    'event.annual-charity-gala-2024.summary': 'Rejoignez-nous pour une soirée inspirante pour célébrer nos réalisations et collecter des fonds pour de futurs projets.',
    'event.annual-charity-gala-2024.content': 'La Fondation Frédéric Saba vous invite cordialement à notre Gala de Charité Annuel. Cette soirée spéciale sera une célébration de nos efforts collectifs et réalisations tout au long de l\'année, et une opportunité de collecter des fonds essentiels pour nos futurs projets éducatifs et humanitaires.',
    
    'event.community-health-workshop.title': 'Atelier Santé & Bien-être Communautaire',
    'event.community-health-workshop.category': 'Atelier',
    'event.community-health-workshop.location': 'En ligne via Zoom',
    'event.community-health-workshop.summary': 'Un atelier en ligne interactif axé sur les soins de santé préventifs et le bien-être mental pour les familles.',
    'event.community-health-workshop.content': 'Conformément à notre engagement envers la santé et le bien-être, la Fondation Frédéric Saba est heureuse d\'organiser un atelier en ligne gratuit. Cette session interactive présentera des exposés de professionnels de la santé sur des sujets tels que la nutrition, l\'hygiène, la détection précoce des maladies courantes et les stratégies pour maintenir le bien-être mental pendant les périodes difficiles.',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Charger la langue sauvegardée au montage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('fsf-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Sauvegarder la langue quand elle change
  useEffect(() => {
    localStorage.setItem('fsf-language', language);
    // Mettre à jour l'attribut lang du document
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
