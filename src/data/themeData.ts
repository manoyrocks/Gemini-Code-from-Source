import { ThemeOption } from '../types/agent';

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark',
    name: 'Dark (Default)',
    description: 'Midnight obsidian & electric cyan',
    mode: 'dark',
    previewBg: '#070A11',
    previewAccent: '#06B6D4',
    previewBorder: '#1E293B',
    emoji: '🌙'
  },
  {
    id: 'bark',
    name: 'Bark',
    description: 'Warm cedar, roasted espresso & terracotta',
    mode: 'dark',
    previewBg: '#18120E',
    previewAccent: '#E07A5F',
    previewBorder: '#433227',
    emoji: '🪵'
  },
  {
    id: 'light',
    name: 'Light',
    description: 'Minimalist studio paper & sapphire',
    mode: 'light',
    previewBg: '#F8FAFC',
    previewAccent: '#2563EB',
    previewBorder: '#CBD5E1',
    emoji: '☀️'
  },
  {
    id: 'ambient',
    name: 'Ambient',
    description: 'Twilight indigo & soft lavender glow',
    mode: 'dark',
    previewBg: '#0E0F1E',
    previewAccent: '#818CF8',
    previewBorder: '#353966',
    emoji: '🔮'
  },
  {
    id: 'light-green',
    name: 'Light Green',
    description: 'Matcha mist, sage & forest emerald',
    mode: 'light',
    previewBg: '#F2F7F2',
    previewAccent: '#15803D',
    previewBorder: '#BCD4BC',
    emoji: '🌿'
  },
  {
    id: 'light-pink',
    name: 'Light Pink',
    description: 'Rosewater canvas & blossom raspberry',
    mode: 'light',
    previewBg: '#FDF5F6',
    previewAccent: '#D94680',
    previewBorder: '#E8BAC4',
    emoji: '🌸'
  }
];
