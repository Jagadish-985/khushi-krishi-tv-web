/*
 * IMPORTANT: This file contains PLACEHOLDER/STATIC DATA.
 *
 * The backend does not yet have a Videos collection/API.
 * All video data below is hardcoded to match the Figma design.
 *
 * TODO: Replace with real API integration when backend Videos endpoints are available.
 */

export interface Video {
  slug: string;
  title: string;
  displayTitle?: string;
  category: string;
  duration: string;
  views: string;
  description?: string;
  subtitle?: string;
  totalDuration?: string;
  aboutText?: string;
}

export const videos: Video[] = [
  {
    slug: 'drone-technology-modern-farming',
    title: 'Drone Technology in Modern Farming',
    category: 'Agriculture',
    duration: '08:45',
    views: '2.1K',
    description: 'Explore how drone technology is transforming modern farming practices across Karnataka.',
    subtitle: 'Learn about the latest drone applications in agriculture.',
    totalDuration: '08:45',
    aboutText: 'Kushi Krishi TV brings field-first stories, practical demonstrations and expert voices from across Karnataka.'
  },
  {
    slug: 'organic-farming-success-story',
    title: 'Organic Farming Success Story',
    displayTitle: 'Organic Farming Success Story from Hassan',
    category: 'Agriculture',
    duration: '08:45',
    views: '2.1K',
    description: 'A detailed look at successful organic farming practices in Hassan district.',
    subtitle: 'A field report on practical organic farming methods used by a Hassan farmer.',
    totalDuration: '06:20',
    aboutText: 'Kushi Krishi TV brings field-first stories, practical demonstrations and expert voices from across Karnataka.'
  },
  {
    slug: 'sandalwood-cultivation-guide',
    title: 'Sandalwood Cultivation Guide',
    category: 'Sandalwood',
    duration: '08:45',
    views: '2.1K',
    description: 'Complete guide to sandalwood cultivation, from planting to harvest.',
    subtitle: 'Expert guidance on sandalwood plantation and care.',
    totalDuration: '08:45',
    aboutText: 'Kushi Krishi TV brings field-first stories, practical demonstrations and expert voices from across Karnataka.'
  },
  {
    slug: 'tomato-farming-tips',
    title: 'Tomato Farming Tips',
    category: 'Agriculture',
    duration: '08:45',
    views: '2.1K',
    description: 'Practical tips for successful tomato farming in Karnataka.',
    subtitle: 'Essential tips for growing healthy tomato crops.',
    totalDuration: '08:45',
    aboutText: 'Kushi Krishi TV brings field-first stories, practical demonstrations and expert voices from across Karnataka.'
  },
  {
    slug: 'todays-market-report',
    title: "Today's Market Report",
    category: 'Market',
    duration: '08:45',
    views: '2.1K',
    description: 'Daily market updates and price analysis for key agricultural commodities.',
    subtitle: 'Stay updated with the latest market trends and prices.',
    totalDuration: '08:45',
    aboutText: 'Kushi Krishi TV brings field-first stories, practical demonstrations and expert voices from across Karnataka.'
  },
  {
    slug: 'farmer-success-interview',
    title: 'Farmer Success Interview',
    category: 'Agriculture',
    duration: '08:45',
    views: '2.1K',
    description: 'Inspiring interview with a successful farmer sharing their journey.',
    subtitle: 'Hear success stories directly from Karnataka farmers.',
    totalDuration: '08:45',
    aboutText: 'Kushi Krishi TV brings field-first stories, practical demonstrations and expert voices from across Karnataka.'
  },
  {
    slug: 'rainwater-harvesting-explained',
    title: 'Rainwater Harvesting Explained',
    category: 'Agriculture',
    duration: '08:45',
    views: '2.1K',
    description: 'Learn effective rainwater harvesting techniques for your farm.',
    subtitle: 'Practical guide to implementing rainwater harvesting systems.',
    totalDuration: '08:45',
    aboutText: 'Kushi Krishi TV brings field-first stories, practical demonstrations and expert voices from across Karnataka.'
  },
  {
    slug: 'crop-insurance-explained',
    title: 'Crop Insurance Explained',
    category: 'Agriculture',
    duration: '08:45',
    views: '2.1K',
    description: 'Everything you need to know about crop insurance schemes.',
    subtitle: 'Understanding crop insurance benefits and enrollment.',
    totalDuration: '08:45',
    aboutText: 'Kushi Krishi TV brings field-first stories, practical demonstrations and expert voices from across Karnataka.'
  }
];

export function getVideoBySlug(slug: string): Video | undefined {
  return videos.find(video => video.slug === slug);
}

export function getVideosByCategory(category: string): Video[] {
  return videos.filter(video => video.category === category);
}

export function getOtherVideos(currentSlug: string, limit: number = 3): Video[] {
  return videos.filter(video => video.slug !== currentSlug).slice(0, limit);
}
