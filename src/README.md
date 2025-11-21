# 🚀 Fluiq - Creator Deal Maker

**Tagline:** "Il ne suffit pas d'avoir des milliers d'abonnés. Il faut avoir le Fluiq."

A free, serverless toolkit for West African micro-creators (5K-50K followers) to transform their influence into paid opportunities.

---

## 🧱 Tech Stack

- React 18 + Vite + TypeScript
- Tailwind CSS + shadcn/ui
- React Router v6
- Supabase (Auth only)
- jsPDF (PDF generation)
- localStorage (Deal Tracker)

---

## 📁 Required Folder Structure
```
src/
├── components/
│   ├── ui/                    # shadcn components (already created)
│   ├── layout/
│   │   ├── Navbar.tsx        # Logo, navigation, user menu
│   │   ├── Footer.tsx        # Footer with credits
│   │   └── Sidebar.tsx       # Mobile sidebar (optional)
│   ├── pitch/
│   │   ├── PitchForm.tsx     # Form to create pitch deck
│   │   └── PitchPreview.tsx  # Preview before PDF generation
│   ├── captions/
│   │   ├── CaptionGenerator.tsx  # Form with niche/city/tone selectors
│   │   └── CaptionDisplay.tsx    # Display generated caption with copy button
│   ├── calendar/
│   │   ├── CalendarGrid.tsx      # Month view calendar
│   │   └── EventList.tsx         # List of events for selected date
│   ├── deals/
│   │   ├── DealTable.tsx         # Table showing all deals
│   │   ├── DealForm.tsx          # Modal form to add/edit deal
│   │   └── DealStats.tsx         # Quick stats cards
│   └── templates/
│       └── TemplateGrid.tsx      # Grid of downloadable templates
├── pages/
│   ├── Home.tsx              # Landing page with hero
│   ├── Auth.tsx              # Login/Register with Supabase
│   ├── Dashboard.tsx         # Main dashboard with 6 cards
│   ├── Pitch.tsx             # Pitch deck generator page
│   ├── Captions.tsx          # Caption generator page
│   ├── Calendar.tsx          # Content calendar page
│   ├── Deals.tsx             # Deal tracker page
│   └── Templates.tsx         # Template library page
├── data/
│   ├── captions.json         # Caption templates by niche/city/tone
│   ├── hashtags.json         # Hashtag collections
│   ├── templates.json        # Template metadata
│   └── events.json           # West African events 2025
├── lib/
│   ├── supabase.ts           # Supabase client setup
│   ├── pdf.ts                # jsPDF pitch deck generation
│   ├── storage.ts            # localStorage helpers
│   └── utils.ts              # Utility functions (cn, etc.)
├── hooks/
│   ├── useCaptionGenerator.ts  # Caption generation logic
│   ├── useDeals.ts             # Deal CRUD operations
│   └── useAuth.ts              # Supabase auth hook
├── types/
│   └── index.ts              # All TypeScript interfaces
├── App.tsx                   # Router setup
└── main.tsx                  # Entry point
```

---

## 🎯 Core Features to Implement

### 1. Home Page (`pages/Home.tsx`)
- Hero section with H1: "Il ne suffit pas d'avoir des milliers d'abonnés. Il faut avoir le Fluiq."
- Subtitle: "La boîte à outils gratuite pour transformer ton influence en opportunités réelles."
- CTA button linking to `/auth`
- Features section with 4 cards
- Footer with "Made with ❤️ in Abidjan"

### 2. Authentication (`pages/Auth.tsx`)
- Tabs for Login/Register
- Email/password auth via Supabase
- Form validation
- Error handling
- Redirect to `/dashboard` on success

### 3. Dashboard (`pages/Dashboard.tsx`)
- Welcome message: "Bienvenue sur Fluiq!"
- 6 navigation cards:
  1. 📄 Créer un Pitch Deck → `/pitch`
  2. ✍️ Générer des Captions → `/captions`
  3. 📅 Calendrier Local → `/calendar`
  4. 🤝 Tracker mes Deals → `/deals`
  5. 🎨 Templates Gratuits → `/templates`
  6. 📚 Ressources (placeholder for future)

### 4. Pitch Deck Generator (`pages/Pitch.tsx`)
- Form with fields: name, niche, location, handle, followers, engagement, platforms, bio
- Profile picture upload (optional)
- Generate PDF button using jsPDF
- Download as `pitch-deck-[name].pdf`

### 5. Caption Generator (`pages/Captions.tsx`)
- Dropdowns: Niche, City, Tone
- Generate button
- Display caption with hashtags
- Copy to clipboard button
- Regenerate button
- Uses static JSON data (no AI API)

### 6. Content Calendar (`pages/Calendar.tsx`)
- Month selector
- Country filter (CI, SN, BF, TG)
- Display events from `events.json`
- Show content ideas for each event

### 7. Deal Tracker (`pages/Deals.tsx`)
- Table showing all deals from localStorage
- Add/Edit/Delete functionality
- Status badges (sent, waiting, negotiating, accepted, rejected)
- Filter by status
- Quick stats cards

### 8. Template Library (`pages/Templates.tsx`)
- Grid of template cards
- Filter by category
- Download button
- Uses `templates.json` for metadata

---

## 🎨 Design System

### Colors (Tailwind)
- Primary: `orange-500` (#F97316) - West African sunset
- Secondary: `violet-500` (#8B5CF6) - Creativity
- Accent: `cyan-500` (#06B6D4) - Fluidity

### Typography
- Font: Inter (system default)
- H1: Large, bold, gradient on key words
- Body: Regular weight, good line height

### Components Style
- Clean, minimal (Vercel/Linear aesthetic)
- Rounded corners (`rounded-lg`)
- Subtle shadows
- Smooth transitions
- Mobile-first responsive

---

## 🔧 TypeScript Interfaces Required (`types/index.ts`)
```typescript
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
```

---

## 📝 Implementation Notes

### Routing (`App.tsx`)
- Use React Router v6
- Protected routes for dashboard and tools (require auth)
- Public routes: `/` and `/auth`

### Supabase Setup (`lib/supabase.ts`)
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### localStorage Helpers (`lib/storage.ts`)
```typescript
export const storage = {
  get: <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  set: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string): void => {
    localStorage.removeItem(key);
  }
};

export const STORAGE_KEYS = {
  DEALS: 'fluiq-deals',
  FAVORITES: 'fluiq-caption-favorites'
};
```

### Caption Generator Logic (`hooks/useCaptionGenerator.ts`)
- Load captions from `data/captions.json`
- Filter by niche, city, tone
- Random selection
- Replace template variables like `{city}`, `{country}`

---

## 🚫 What NOT to do

- ❌ Do NOT use external AI APIs
- ❌ Do NOT create backend/server
- ❌ Do NOT use database for deals (use localStorage)
- ❌ Do NOT overcomplicate - keep it simple and functional

---

## ✅ Success Criteria

A successful implementation will have:
- ✅ All pages accessible and functional
- ✅ Auth working with Supabase
- ✅ Pitch deck generates and downloads PDF
- ✅ Caption generator returns captions from JSON
- ✅ Calendar shows events from JSON
- ✅ Deal tracker saves/loads from localStorage
- ✅ Templates display from JSON
- ✅ Responsive on mobile
- ✅ No console errors
- ✅ Clean, minimal UI

---

## 🎯 Next Steps After Base Implementation

1. Create JSON datasets (captions, events, templates, hashtags)
2. Polish UI and animations
3. Add loading states
4. Add error boundaries
5. Test on mobile
6. Deploy to Vercel

---

**This README should guide the implementation. Follow the structure exactly.**