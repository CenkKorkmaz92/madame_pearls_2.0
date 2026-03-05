import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service for managing application translations and language switching.
 * Supports multiple languages with dynamic JSON file loading.
 * Provides observable streams for language change notifications.
 */
@Injectable({ providedIn: 'root' })
export class TranslationService {
  /** Current selected language code */
  private currentLang = 'en';
  
  /** Loaded translation key-value pairs */
  private translations: Record<string, any> = {};
  
  /** Subject for broadcasting language changes */
  private languageChangedSubject = new BehaviorSubject<string>('en');
  
  /** Observable stream of language changes that components can subscribe to */
  public languageChanged$: Observable<string> = this.languageChangedSubject.asObservable();

  /**
   * Sets the application language and loads corresponding translations.
   * Asynchronously imports the language JSON file.
   * @param lang - The language code to set (e.g., 'en', 'de', 'gr', 'hr')
   */
  public async setLanguage(lang: string): Promise<void> {
    this.currentLang = lang;
    const module = await import(`../i18n/${lang}.json`);
    this.translations = module.default || module;
    this.languageChangedSubject.next(lang);
  }

  /**
   * Translates a key to its localized string value.
   * Supports nested keys using dot notation (e.g., 'hero.title').
   * @param key - The translation key in dot notation
   * @returns The translated string, or the key itself if translation not found
   */
  public t(key: string): string {
    return key.split('.').reduce((o, i) => (o ? o[i] : null), this.translations) || key;
  }

  /**
   * Gets the current language code.
   * @returns The current language code
   */
  public getCurrentLang(): string {
    return this.currentLang;
  }
}
