import InstagramFeed from './InstagramFeed';
import { selectDailyInstagramPosts } from '@/lib/instagram';

interface ServerInstagramFeedProps {
  showHeader?: boolean;
  maxPosts?: number;
}

export default function ServerInstagramFeed({
  showHeader = true,
  maxPosts = 3,
}: ServerInstagramFeedProps) {
  // Server-side post selection using Berlin timezone for deterministic results
  const selectedPosts = selectDailyInstagramPosts(maxPosts);

  return (
    <InstagramFeed showHeader={showHeader} selectedPosts={selectedPosts} />
  );
}
