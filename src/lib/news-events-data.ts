
import { type StaticImageData } from 'next/image';

export interface NewsArticle {
  slug: string;
  type: 'news';
  title: string;
  date: string; // ISO String: "YYYY-MM-DD"
  category: string;
  shortSummary: string;
  fullContent: string;
  image: string;
  imageHint: string;
  author?: string;
}

export interface EventItem {
  slug: string;
  type: 'event';
  title: string;
  date: string; // ISO String: "YYYY-MM-DD"
  endDate?: string; // Optional
  time?: string; // "10:00 AM - 2:00 PM"
  location: string; // "Online" or "123 Main St, City"
  category: string;
  shortSummary: string;
  fullContent: string;
  image: string;
  imageHint: string;
  organizer?: string;
}

export type NewsOrEventItem = NewsArticle | EventItem;

export const newsAndEventsData: NewsOrEventItem[] = [
  {
    slug: 'foundation-launch-announcement',
    type: 'news',
    title: 'Frédéric Saba Foundation Officially Launched',
    date: '2024-07-15',
    category: 'Foundation News',
    shortSummary: 'We are thrilled to announce the official launch of the Frédéric Saba Foundation, dedicated to making a positive impact globally.',
    fullContent: 'The Frédéric Saba Foundation (FSF) has officially commenced its operations, aiming to bring transformative change through dedicated educational and humanitarian initiatives. Founded on the principles of compassion, integrity, and empowerment, FSF will focus on supporting children, the sick, families in need, and people with disabilities. Our programs are designed to address immediate needs while fostering long-term self-sufficiency and community development. We invite you to join us on this journey to create a brighter future for those who need it most. Explore our website to learn more about our mission, vision, and how you can get involved.',
    image: '/images/activities/mini_camp/activities_mini_camp (13).jpg',
    imageHint: 'group celebration launch',
    author: 'FSF Team',
  },
  {
    slug: 'first-education-grant-awarded',
    type: 'news',
    title: 'First Educational Grant Awarded to Rural School',
    date: '2024-08-01',
    category: 'Education Program',
    shortSummary: 'FSF awards its first educational grant to support the Bright Future Academy in enhancing its learning resources.',
    fullContent: 'The Bright Future Academy, a school serving underprivileged children in a remote rural area, has been selected as the first recipient of an educational grant from the Frédéric Saba Foundation. This grant will enable the school to purchase new textbooks, install a small computer lab, and provide additional training for its teachers. "This support from FSF is a game-changer for our students," said the school principal. "It opens up new possibilities for learning and development that we previously only dreamed of." This grant marks the beginning of our "Education for All" initiative, and we look forward to supporting many more such deserving institutions.',
    image: '/images/activities/mini_camp/activities_mini_camp (8).jpg',
    imageHint: 'children school books',
    author: 'Jane Doe, Program Director',
  },
  {
    slug: 'faith-based-teaching-prayer',
    type: 'news',
    title: 'FSF Introduces Faith-Based Teachings and Prayer Sessions',
    date: '2024-09-05',
    category: 'Spiritual Support',
    shortSummary: 'The foundation now offers faith-based teachings and communal prayer sessions to provide spiritual support and guidance.',
    fullContent: 'Recognizing the importance of spiritual well-being, the Frédéric Saba Foundation has launched a new initiative offering faith-based teachings and regular prayer sessions. These gatherings aim to provide comfort, hope, and a sense of community for individuals seeking spiritual nourishment. The sessions are inclusive and designed to foster an environment of peace and reflection, complementing our existing humanitarian and educational programs. We believe that nurturing the spirit is an integral part of holistic support.',
    image: '/images/activities/mini_camp/activities_mini_camp (11).jpg',
    imageHint: 'prayer group community',
    author: 'FSF Spiritual Outreach Team',
  },
  {
    slug: 'disability-job-training',
    type: 'news',
    title: 'New Job Training Program Empowers Individuals with Disabilities',
    date: '2024-08-20',
    category: 'Disability Support',
    shortSummary: 'FSF launches a vocational training program tailored to equip individuals with disabilities with valuable job skills for economic independence.',
    fullContent: 'As part of our commitment to disability inclusion, the Frédéric Saba Foundation is excited to announce a new job training program specifically designed for individuals with disabilities. This program offers tailored vocational training in various fields, focusing on in-demand skills and creating pathways to sustainable employment. We are partnering with local businesses to ensure job placement opportunities and provide ongoing support. Our goal is to empower participants, enhance their economic independence, and promote a more inclusive workforce.',
    image: '/images/activities/mini_camp/activities_mini_camp (7).jpg',
    imageHint: 'person wheelchair working',
    author: 'FSF Empowerment Team',
  },
  {
    slug: 'annual-charity-gala-2024',
    type: 'event',
    title: 'FSF Annual Charity Gala 2024',
    date: '2024-12-05',
    time: '7:00 PM - 11:00 PM',
    location: 'Grand Ballroom, Hope City Plaza',
    category: 'Fundraiser',
    shortSummary: 'Join us for an inspiring evening to celebrate our achievements and raise funds for future projects.',
    fullContent: 'The Frédéric Saba Foundation cordially invites you to our Annual Charity Gala. This special evening will be a celebration of our collective efforts and achievements throughout the year, and an opportunity to raise vital funds for our upcoming educational and humanitarian projects. Guests will enjoy a delightful dinner, live entertainment, and inspiring stories from beneficiaries of our programs. Your presence and support will directly contribute to empowering children, assisting the sick, supporting families in need, and championing individuals with disabilities. Dress code: Formal. Tickets are available now. We look forward to welcoming you to an unforgettable night dedicated to making a difference.',
    image: '/images/activities/mini_camp/activities_mini_camp (10).jpg',
    imageHint: 'gala event elegant',
    organizer: 'Frédéric Saba Foundation',
  },
  {
    slug: 'community-health-workshop',
    type: 'event',
    title: 'Community Health & Wellbeing Workshop',
    date: '2024-09-20',
    time: '10:00 AM - 03:00 PM',
    location: 'Online via Zoom',
    category: 'Workshop',
    shortSummary: 'An interactive online workshop focusing on preventative healthcare and mental wellbeing for families.',
    fullContent: 'In line with our commitment to health and wellbeing, the Frédéric Saba Foundation is pleased to host a free online workshop. This interactive session will feature talks from healthcare professionals on topics such as nutrition, hygiene, early detection of common illnesses, and strategies for maintaining mental wellbeing during challenging times. The workshop is open to all and aims to provide practical knowledge and resources to empower individuals and families to take proactive steps towards better health. Registration is required to receive the Zoom link. Join us to learn valuable insights for a healthier life.',
    image: '/images/activities/mini_camp/activities_mini_camp (7).jpg',
    imageHint: 'health workshop online',
    organizer: 'FSF Health Initiative Team',
  },
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsAndEventsData.find(item => item.type === 'news' && item.slug === slug) as NewsArticle | undefined;
}

export function getEventBySlug(slug: string): EventItem | undefined {
  return newsAndEventsData.find(item => item.type === 'event' && item.slug === slug) as EventItem | undefined;
}

