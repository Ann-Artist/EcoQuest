# EcoQuest — Gamified Personal Carbon Footprint AI

EcoQuest is an AI-powered, gamified sustainability platform built for Pune citizens that converts real-world daily lifestyle choices into a personalized sustainability game.

## 🌿 Core Features

1. **Deterministic Python-Equivalent Carbon Footprint Engine**:
   - Calculates baseline emissions across 5 categories: Transportation, Electricity, Food, Shopping, and Waste.
2. **AI Personalization & Immediate Green Persona**:
   - Classifies Green Persona (`Eco Beginner` → `Green Explorer` → `Eco Guardian` → `Eco Warrior` → `Planet Champion`) immediately post-onboarding.
   - Identifies primary & secondary emission hotspots.
3. **Verification System & EcoGuard Anti-Cheat**:
   - Level 1: Self-Reported quick actions.
   - Level 2: Smart GPS route tracker simulator with location, distance, and duration validation.
   - Level 3: Photo Proof scanner with simulated AI Computer Vision object detection.
   - EcoGuard detects rapid submissions, duplicate image hashes, and flags submissions for Admin Review.
4. **Pune Regional Wall of Champions**:
   - Leaderboard filters by Pune City, Regional Ward (Kothrud, Baner, Viman Nagar, Hinjewadi, PCMC), and Friends.
   - Shareable Instagram-style Social Achievement Card generator.
5. **CO₂ Impact Dashboard & AI Weekly Report**:
   - Before/After footprint comparison and AI weekly report cards.
6. **Reward Campaign Simulation**:
   - Pune municipal and green partner campaign eligibility checker and reward voucher claim simulator.
7. **Operational Admin Console**:
   - Quest CRUD authoring & EcoGuard verification queue review.

## 📁 Project Structure

```
EcoQuest/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/page.tsx
│   ├── onboarding/page.tsx
│   ├── dashboard/page.tsx
│   ├── quests/page.tsx
│   ├── leaderboard/page.tsx
│   ├── impact/page.tsx
│   ├── rewards/page.tsx
│   ├── profile/page.tsx
│   └── admin/page.tsx
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── quests/
│   ├── gamification/
│   ├── leaderboard/
│   └── charts/
├── lib/
│   ├── carbon/
│   ├── ai/
│   ├── verification/
│   ├── gamification/
│   ├── storage/
│   ├── supabase/
│   └── utils/
├── types/
├── data/
│   ├── emission-factors.json
│   ├── quests.json
│   └── badges.json
├── index.html
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Running the Application

### Option 1: Browser Direct Preview
Simply open `index.html` in any web browser!

### Option 2: Next.js Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in Next.js.
