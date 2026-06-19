export interface IPost {
  id: string;
  handle: string;
  displayName: string;
  avatar: string;
  avatarIsImage: boolean;
  content: string;
  timestamp: string;
  likes: number;
  reposts: number;
  replies: number;
  imageUrl?: string;
}

export interface IBrandConfig {
  platformName: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  iconEmoji: string;
  showCounts: boolean;
}
