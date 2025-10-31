import { Tutorial } from "@/types/api/tutorials/tutorials.type";

export const TUTORIALS: Tutorial[] = [
  {
    id: "fs-1",
    slug: "how-to-learn-nextjs-in-7-minutes",
    title: "Learn Next.js in 7 Minutes",
    description: "A rapid overview of Next.js fundamentals and the modern app router, A rapid overview of Next.js fundamentals and the modern app router., A rapid overview of Next.js fundamentals and the modern app router.,A rapid overview of Next.js fundamentals and the modern app router.",
    thumbnail: "https://i.ytimg.com/vi/Sklc_fQBmcs/hqdefault.jpg",
    duration: "7:00",
    views: "2.1M views",
    publishedAt: "2 years ago",
    category: "Next.js",
    author: "Fireship",
    videoId: "Sklc_fQBmcs",
  },
  {
    id: "fs-2",
    slug: "tailwind-css-in-100-seconds",
    title: "Tailwind CSS in 100 Seconds",
    description: "What Tailwind is and why utility-first CSS is popular.",
    thumbnail: "https://i.ytimg.com/vi/Oe421EPjeBE/hqdefault.jpg",
    duration: "2:23",
    views: "1.8M views",
    publishedAt: "3 years ago",
    category: "CSS",
    author: "Fireship",
    videoId: "Oe421EPjeBE",
  },
  {
    id: "fs-3",
    slug: "react-18-in-100-seconds",
    title: "React 18 in 100 Seconds",
    description: "The most important changes in React 18 explained fast.",
    thumbnail: "https://i.ytimg.com/vi/Tn6-PIqc4UM/hqdefault.jpg",
    duration: "2:06",
    views: "1.5M views",
    publishedAt: "2 years ago",
    category: "React",
    author: "Fireship",
    videoId: "Tn6-PIqc4UM",
  },
  {
    id: "fs-4",
    slug: "typescript-in-100-seconds",
    title: "TypeScript in 100 Seconds",
    description: "A whirlwind tour of TypeScript and why you should use it.",
    thumbnail: "https://i.ytimg.com/vi/zQnBQ4tB3ZA/hqdefault.jpg",
    duration: "2:04",
    views: "3.2M views",
    publishedAt: "3 years ago",
    category: "TypeScript",
    author: "Fireship",
    videoId: "zQnBQ4tB3ZA",
  },
  {
    id: "fs-5",
    slug: "ai-agents-in-100-seconds",
    title: "AI Agents in 100 Seconds",
    description: "What are AI agents and why they matter.",
    thumbnail: "https://i.ytimg.com/vi/wr7F6BprFRU/hqdefault.jpg",
    duration: "1:46",
    views: "980K views",
    publishedAt: "11 months ago",
    category: "AI",
    author: "Fireship",
    videoId: "wr7F6BprFRU",
  },
  {
    id: "fs-6",
    slug: "node-js-in-100-seconds",
    title: "Node.js in 100 Seconds",
    description: "A quick explanation of Node.js and its runtime.",
    thumbnail: "https://i.ytimg.com/vi/TlB_eWDSMt4/hqdefault.jpg",
    duration: "2:13",
    views: "2.8M views",
    publishedAt: "4 years ago",
    category: "Node.js",
    author: "Fireship",
    videoId: "TlB_eWDSMt4",
  },
  {
    id: "fs-7",
    slug: "docker-in-100-seconds",
    title: "Docker in 100 Seconds",
    description: "Understand Docker and containers quickly.",
    thumbnail: "https://i.ytimg.com/vi/Gjnup-PuquQ/hqdefault.jpg",
    duration: "2:27",
    views: "2.4M views",
    publishedAt: "4 years ago",
    category: "DevOps",
    author: "Fireship",
    videoId: "Gjnup-PuquQ",
  },
  {
    id: "fs-8",
    slug: "kubernetes-in-100-seconds",
    title: "Kubernetes in 100 Seconds",
    description: "Kubernetes explained with the basics in 100 seconds.",
    thumbnail: "https://i.ytimg.com/vi/PziYflu8cB8/hqdefault.jpg",
    duration: "2:10",
    views: "1.9M views",
    publishedAt: "3 years ago",
    category: "DevOps",
    author: "Fireship",
    videoId: "PziYflu8cB8",
  },
];

export function getAllTutorials() {
  return TUTORIALS;
}
export function getTutorialBySlug(slug: string) {
  return TUTORIALS.find((t) => t.slug === slug) || null;
}
export function getLatest(limit = 6) {
  return [...TUTORIALS].slice(0, limit);
}
export function getByCategory(category: string, limit = 6) {
  return TUTORIALS.filter((t) => t.category === category).slice(0, limit);
}