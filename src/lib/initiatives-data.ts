
export interface Initiative {
  slug: string;
  title: string;
  category: string;
  shortSummary: string;
  fullDescription: string;
  image: string;
  imageHint: string;
  impactAchievements: string[];
}

export const initiativesData: Initiative[] = [
  {
    slug: 'education-for-all',
    title: 'Education for All',
    category: 'Education',
    shortSummary: 'Providing access to quality education and learning resources for underprivileged children worldwide.',
    fullDescription: 'Our "Education for All" initiative focuses on breaking down barriers to education for children in underserved communities. We build schools, provide learning materials, train teachers, and offer scholarships to ensure every child has the opportunity to learn and grow. We believe education is a fundamental right and a powerful tool for empowerment and societal change.',
    image: '/images/activities/mini_camp/activities_mini_camp (9).jpg',
    imageHint: 'children learning classroom',
    impactAchievements: [
      'Built 10 new schools in rural areas, providing safe learning environments.',
      'Provided scholarships to over 500 students, enabling continued education.',
      'Distributed 10,000 textbooks and learning kits to students and teachers.',
      'Trained 100+ teachers in modern pedagogical techniques.',
    ],
  },
  {
    slug: 'health-and-wellbeing',
    title: 'Health & Wellbeing Support',
    category: 'Humanitarian Aid',
    shortSummary: 'Offering medical assistance, healthcare access, and support to the sick and their families.',
    fullDescription: 'This initiative aims to improve the health outcomes for vulnerable populations, particularly those without access to basic medical care. We organize medical camps in remote areas, provide essential medicines, support local clinics with equipment and supplies, and offer counseling services to individuals and families facing health crises. Our focus is on both preventative care and treatment.',
    image: '/images/activities/mini_camp/activities_mini_camp (5).jpg',
    imageHint: 'doctor patient care',
    impactAchievements: [
      'Conducted 50 free medical camps, serving over 5,000 patients.',
      'Supplied essential medicines and medical equipment to 20 community clinics.',
      'Provided nutritional support and education to 1,000 malnourished children and their families.',
      'Offered mental health support to 300+ individuals.',
    ],
  },
  {
    slug: 'empowering-communities',
    title: 'Empowering Communities',
    category: 'Family Assistance',
    shortSummary: 'Supporting families in need through programs fostering self-sufficiency and a better quality of life.',
    fullDescription: 'We work to empower families facing hardship by providing vocational training, financial literacy programs, and resources for sustainable livelihoods. Our goal is to help families build resilience, achieve economic stability, and improve their overall quality of life, creating a ripple effect of positive change within their communities.',
    image: '/images/activities/mini_camp/activities_mini_camp (1).jpg',
    imageHint: 'community working together',
    impactAchievements: [
      'Provided vocational training to 200 individuals, leading to employment opportunities.',
      'Supported 150 families in starting small businesses through micro-grants.',
      'Established 5 community centers offering support services and resources.',
      'Improved access to clean water for 3 communities.',
    ],
  },
  {
    slug: 'disability-inclusion-project',
    title: 'Disability Inclusion Project',
    category: 'Disability Support',
    shortSummary: 'Promoting the rights and inclusion of people with disabilities through advocacy and support programs.',
    fullDescription: 'Our Disability Inclusion Project champions the rights of individuals with disabilities. We advocate for inclusive policies, provide assistive technologies, run awareness campaigns to combat stigma, and support accessible infrastructure development. Our aim is to ensure people with disabilities can participate fully and equally in all aspects of society.',
    image: '/images/activities/mini_camp/activities_mini_camp (12).jpg',
    imageHint: 'person wheelchair accessibility',
    impactAchievements: [
      'Successfully advocated for 3 new local accessibility policies.',
      'Provided assistive devices (wheelchairs, hearing aids) to 300 individuals.',
      'Reached 50,000 people through awareness campaigns promoting disability rights.',
      'Partnered with 10 organizations to improve accessibility in public spaces.',
    ],
  },
];

export const initiativeCategories: string[] = Array.from(new Set(initiativesData.map(i => i.category)));
