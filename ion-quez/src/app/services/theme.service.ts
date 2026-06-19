import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { IBrandConfig } from '../interfaces/post.interface';

const BRAND_KEY = 'quez_brand';

export const DEFAULT_BRAND: IBrandConfig = {
  platformName: 'Quetzalcoatl',
  tagline: "What's happening?",
  primaryColor: '#3880ff',
  accentColor: '#3dc2ff',
  iconEmoji: '🐦‍🔥',
  showCounts: true
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private config$ = new BehaviorSubject<IBrandConfig>({ ...DEFAULT_BRAND });

  async initialize(): Promise<void> {
    const { value } = await Preferences.get({ key: BRAND_KEY });
    if (value) {
      const config: IBrandConfig = { ...DEFAULT_BRAND, ...JSON.parse(value) };
      this.config$.next(config);
      this.applyCssVars(config);
    } else {
      this.applyCssVars(DEFAULT_BRAND);
    }
  }

  getConfig(): Observable<IBrandConfig> {
    return this.config$.asObservable();
  }

  getSnapshot(): IBrandConfig {
    return this.config$.value;
  }

  async saveConfig(config: IBrandConfig): Promise<void> {
    await Preferences.set({ key: BRAND_KEY, value: JSON.stringify(config) });
    this.config$.next({ ...config });
    this.applyCssVars(config);
  }

  private applyCssVars(config: IBrandConfig): void {
    const root = document.documentElement;
    root.style.setProperty('--ion-color-primary', config.primaryColor);
    root.style.setProperty('--ion-color-primary-shade', this.adjust(config.primaryColor, -30));
    root.style.setProperty('--ion-color-primary-tint', this.adjust(config.primaryColor, 20));
    root.style.setProperty('--ion-color-secondary', config.accentColor);
    root.style.setProperty('--quez-link-color', config.primaryColor);
  }

  private adjust(hex: string, amt: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amt));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt));
    const b = Math.min(255, Math.max(0, (num & 0xff) + amt));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }
}
