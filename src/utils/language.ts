import { Language } from '../types';

const STORAGE_KEY = 'covarai_preferred_lang';

/**
 * Detect client language based on:
 * 1. Saved localStorage preference
 * 2. Browser navigator.languages / navigator.language
 * 3. Default fallback to 'zh-CN'
 */
export function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'zh-CN';
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'zh-CN' || saved === 'zh-TW' || saved === 'en') {
      return saved as Language;
    }
  } catch (e) {
    // LocalStorage might be restricted in some sandboxes
  }

  // Detect from browser settings
  const browserLangs = navigator.languages || [navigator.language || ''];

  for (const rawLang of browserLangs) {
    if (!rawLang) continue;
    const l = rawLang.toLowerCase();

    // Traditional Chinese (Taiwan, Hong Kong, Macau, Hant)
    if (
      l === 'zh-tw' ||
      l === 'zh-hk' ||
      l === 'zh-mo' ||
      l.includes('hant') ||
      l.includes('traditional')
    ) {
      return 'zh-TW';
    }

    // Simplified Chinese (China Mainland, Singapore, Hans)
    if (
      l === 'zh-cn' ||
      l === 'zh-sg' ||
      l.includes('hans') ||
      l.includes('simplified') ||
      l.startsWith('zh')
    ) {
      return 'zh-CN';
    }

    // English
    if (l.startsWith('en')) {
      return 'en';
    }
  }

  return 'zh-CN';
}

export function persistLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    // Ignore storage write errors
  }
}
