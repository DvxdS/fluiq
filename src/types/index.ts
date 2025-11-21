export interface PitchData {
  name: string;
  niche: string;
  location: string;
  handle: string;
  followers: number;
  engagement: number;
  platforms: string[];
  bio: string;
  profilePic?: string;
  email: string;
}

export interface Caption {
  id: number;
  niche: string;
  city: string;
  template: string;
  tone: 'fun' | 'professional' | 'inspirational' | 'sales';
  hashtags: string[];
}

export interface Event {
  id: number;
  country: string;
  date: string;
  name: string;
  type: 'holiday' | 'religious' | 'national' | 'cultural' | 'international';
  content_ideas?: string[];
}

export interface Deal {
  id: string;
  brand_name: string;
  contact_email: string;
  date_sent: string;
  status: 'sent' | 'waiting' | 'negotiating' | 'accepted' | 'rejected';
  deal_type: 'sponsorship' | 'affiliate' | 'collaboration' | 'ugc';
  proposed_amount?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Template {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  downloadUrl: string;
}

export interface User {
  id: string;
  email: string;
}
