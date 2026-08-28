/*
 * IMPORTANT: This file contains PLACEHOLDER/STATIC DATA.
 *
 * The backend does not yet have a Programs/Episodes collection.
 * All program and episode data below is hardcoded to match the Figma design.
 * This represents where the client's actual TV show library will be uploaded later.
 *
 * TODO: Replace with real API integration when backend Programs endpoints are available.
 */

export interface Episode {
  number: number;
  title: string;
  meta: string;
}

export interface Program {
  slug: string;
  name: string;
  kannadaName?: string;
  schedule: string;
  colorTheme: 'green' | 'brown' | 'blue';
  episodes?: Episode[];
}

export const programs: Program[] = [
  {
    slug: 'krishi-darshana',
    name: 'Krishi Darshana',
    kannadaName: 'ಕೃಷಿ ದರ್ಶನ',
    schedule: 'Every Sunday, 7:30 PM',
    colorTheme: 'green',
    episodes: [
      {
        number: 1,
        title: 'Episode 1: Farming Stories from Karnataka',
        meta: 'Sunday • 7:30 PM • 28 min'
      },
      {
        number: 2,
        title: 'Episode 2: Farming Stories from Karnataka',
        meta: 'Sunday • 7:30 PM • 28 min'
      },
      {
        number: 3,
        title: 'Episode 3: Farming Stories from Karnataka',
        meta: 'Sunday • 7:30 PM • 28 min'
      }
    ]
  },
  {
    slug: 'chandana-loka',
    name: 'Chandana Loka',
    schedule: 'Every Tuesday, 8:00 PM',
    colorTheme: 'brown',
    episodes: [
      {
        number: 1,
        title: 'Episode 1: Farming Stories from Karnataka',
        meta: 'Tuesday • 8:00 PM • 28 min'
      },
      {
        number: 2,
        title: 'Episode 2: Farming Stories from Karnataka',
        meta: 'Tuesday • 8:00 PM • 28 min'
      },
      {
        number: 3,
        title: 'Episode 3: Farming Stories from Karnataka',
        meta: 'Tuesday • 8:00 PM • 28 min'
      }
    ]
  },
  {
    slug: 'market-report',
    name: 'Market Report',
    schedule: 'Mon to Sat, 6:30 PM',
    colorTheme: 'blue',
    episodes: [
      {
        number: 1,
        title: 'Episode 1: Farming Stories from Karnataka',
        meta: 'Mon to Sat • 6:30 PM • 28 min'
      },
      {
        number: 2,
        title: 'Episode 2: Farming Stories from Karnataka',
        meta: 'Mon to Sat • 6:30 PM • 28 min'
      },
      {
        number: 3,
        title: 'Episode 3: Farming Stories from Karnataka',
        meta: 'Mon to Sat • 6:30 PM • 28 min'
      }
    ]
  },
  {
    slug: 'raitara-mathu',
    name: 'Raitara Mathu',
    schedule: 'Every Friday, 7:00 PM',
    colorTheme: 'green',
    episodes: [
      {
        number: 1,
        title: 'Episode 1: Farming Stories from Karnataka',
        meta: 'Friday • 7:00 PM • 28 min'
      },
      {
        number: 2,
        title: 'Episode 2: Farming Stories from Karnataka',
        meta: 'Friday • 7:00 PM • 28 min'
      },
      {
        number: 3,
        title: 'Episode 3: Farming Stories from Karnataka',
        meta: 'Friday • 7:00 PM • 28 min'
      }
    ]
  },
  {
    slug: 'kisan-vani',
    name: 'Kisan Vani',
    schedule: 'Wed & Sat, 7:00 PM',
    colorTheme: 'blue',
    episodes: [
      {
        number: 1,
        title: 'Episode 1: Farming Stories from Karnataka',
        meta: 'Wed & Sat • 7:00 PM • 28 min'
      },
      {
        number: 2,
        title: 'Episode 2: Farming Stories from Karnataka',
        meta: 'Wed & Sat • 7:00 PM • 28 min'
      },
      {
        number: 3,
        title: 'Episode 3: Farming Stories from Karnataka',
        meta: 'Wed & Sat • 7:00 PM • 28 min'
      }
    ]
  },
  {
    slug: 'mandi-today',
    name: 'Mandi Today',
    schedule: 'Daily, 8:30 PM',
    colorTheme: 'brown',
    episodes: [
      {
        number: 1,
        title: 'Episode 1: Farming Stories from Karnataka',
        meta: 'Daily • 8:30 PM • 28 min'
      },
      {
        number: 2,
        title: 'Episode 2: Farming Stories from Karnataka',
        meta: 'Daily • 8:30 PM • 28 min'
      },
      {
        number: 3,
        title: 'Episode 3: Farming Stories from Karnataka',
        meta: 'Daily • 8:30 PM • 28 min'
      }
    ]
  }
];

// Helper function to get color theme CSS class
export function getColorThemeClass(theme: 'green' | 'brown' | 'blue'): string {
  const themes = {
    green: '#2F7A4D',
    brown: '#B08A52',
    blue: '#3B5FA8'
  };
  return themes[theme];
}

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find(program => program.slug === slug);
}
