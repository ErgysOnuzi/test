// Server-side Instagram post selection utility

const IG_URLS = [
  "https://www.instagram.com/p/DAvXTRFidcu/",
  "https://www.instagram.com/p/C_vwvupNoNR/",
  "https://www.instagram.com/p/C8HwJgmt8aL/",
  "https://www.instagram.com/p/C6gz8uSiGlb/",
  "https://www.instagram.com/p/C6Mg0uGLdNH/",
  "https://www.instagram.com/p/C4lqzQMrscT/",
  "https://www.instagram.com/p/C4kriK-NmpI/",
  "https://www.instagram.com/p/C0e_9IcLnk-/",
  "https://www.instagram.com/p/Cztz53rN1km/",
  "https://www.instagram.com/p/CroTpxftUqg/",
  "https://www.instagram.com/p/C3xB9KuNmPR/",
  "https://www.instagram.com/p/C2pL7VuoTqX/",
];

// Seeded random function to ensure consistent results
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

// Server-side function to select daily posts using Berlin timezone
export const selectDailyInstagramPosts = (count: number = 2): string[] => {
  // Use Berlin timezone for consistent daily rotation
  const berlinTime = new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' });
  const berlinDate = new Date(berlinTime);
  
  // Get days since epoch based on Berlin midnight
  const today = Math.floor(berlinDate.getTime() / (1000 * 60 * 60 * 24));
  
  const shuffled = [...IG_URLS];
  
  // Fisher-Yates shuffle with seeded random
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(today + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
};