export interface MarketingPlan {
  id: string;
  platform: string;
  content: string;
  scheduledDate: string;
  status: 'draft' | 'scheduled' | 'published';
}

export interface Platform {
  id: string;
  name: string;
  frequency: string;
  icon: string;
}