# Daily Report System - Frontend

A lightweight daily reporting system designed for an Israeli army platoon (~40 soldiers). This is the soldier-facing frontend application that allows soldiers to quickly report their equipment serial numbers and medical supplies.

## Features

- **Quick Reporting**: Under 5 seconds to complete
- **No Authentication**: Trust-based system by design
- **Hebrew Support**: Full RTL support for Hebrew interface
- **Mobile-First**: Optimized for mobile devices with large tap targets
- **Flexible**: All fields except name are optional
- **Real-time Feedback**: Immediate confirmation upon submission

## Form Structure

### 1. שם (Name) - Required

- Soldier selection from dropdown list

### 2. ארמו״ן (Equipment) - Optional

- **מס׳ נשק אישי** (Personal weapon number)
- **מס׳ כוונות אישית** (Personal sights number)
- **מס׳ אמר״ל** (AMREL number)
- **מס׳ משקפת** (Binoculars number)
- **מצפן** (Compass - checkbox for presence)

### 3. סמים (Medical Supplies) - Optional

Enter quantities if available:

- **אקטיק** (Actiq)
- **מורפין** (Morphine)
- **מידזולם** (Midazolam)
- **קטאמין 50 מ״ג** (Ketamine 50mg)
- **קטאמין 10 מ״ג** (Ketamine 10mg)

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Hook Form** with **shadcn Form** components
- **TanStack Query** for data fetching
- **Zod** for validation
- **Radix UI** components for accessibility

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Usage

### For Soldiers

1. **Select Your Name**: Choose from the dropdown list (required)
2. **Equipment Numbers**: Enter serial numbers for assigned equipment (optional)
3. **Compass**: Check if you have a compass (optional)
4. **Medical Supplies**: Enter quantities of medical supplies if available (optional)
5. **Submit**: Click "שלח דיווח" to submit your report

## Mock Data

For development and testing, the app uses mock data including:

- 40 sample soldier names with Hebrew names and ranks
- Simulated API responses with 800ms delay

## API Integration

The app is structured to easily integrate with a real backend:

- **GET** `/api/soldiers` - Fetch soldier list
- **POST** `/api/reports` - Submit daily report

### Report Data Structure

```typescript
{
  soldierName: string;
  equipment: {
    personalWeaponNumber?: string;
    personalSightsNumber?: string;
    amrelNumber?: string;
    binocularsNumber?: string;
    hasCompass?: boolean;
  };
  medicalSupplies: {
    actiq?: number;
    morphine?: number;
    midazolam?: number;
    ketamine50mg?: number;
    ketamine10mg?: number;
  };
}
```

## Design Principles

- **Frictionless**: No barriers to form submission
- **Trust-based**: No authentication required
- **Accessible**: Large touch targets, proper focus states
- **Responsive**: Works on all screen sizes
- **Hebrew-first**: RTL support throughout
- **Optional Fields**: Only name is required, everything else is optional

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   └── daily-report-form.tsx  # Main form component
├── lib/
│   ├── types.ts      # TypeScript types and Zod schemas
│   ├── api.ts        # API service functions
│   ├── mock-data.ts  # Mock data for development
│   └── utils.ts      # Utility functions
└── pages/            # Future page components
```

## Customization

### Adding New Soldiers

Update `mockSoldiers` in `src/lib/mock-data.ts`:

```typescript
{
  id: "41",
  name: "שם חדש",
  rank: "דרגה"
}
```

### Modifying Form Fields

Update the schemas in `src/lib/types.ts`:

```typescript
export const EquipmentSchema = z.object({
  // Add or modify equipment fields
});

export const MedicalSuppliesSchema = z.object({
  // Add or modify medical supply fields
});
```

## Production Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your web server

3. Update API endpoints in `src/lib/api-client.ts` to point to your backend

## License

Internal military use only.
