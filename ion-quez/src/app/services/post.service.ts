import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { IPost } from '../interfaces/post.interface';

const POSTS_KEY = 'quez_posts';
const INIT_KEY = 'quez_initialized';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts$ = new BehaviorSubject<IPost[]>([]);

  constructor(private http: HttpClient) {}

  async initialize(): Promise<void> {
    const { value: initVal } = await Preferences.get({ key: INIT_KEY });
    if (initVal === 'true') {
      const { value } = await Preferences.get({ key: POSTS_KEY });
      this.posts$.next(value ? JSON.parse(value) : []);
    }
  }

  async isFirstRun(): Promise<boolean> {
    const { value } = await Preferences.get({ key: INIT_KEY });
    return value !== 'true';
  }

  getPosts(): Observable<IPost[]> {
    return this.posts$.asObservable().pipe(
      map(posts => [...posts].sort((a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ))
    );
  }

  getCurrentPosts(): IPost[] {
    return this.posts$.value;
  }

  async createPost(post: IPost): Promise<void> {
    await this.save([post, ...this.posts$.value]);
  }

  async updatePost(updated: IPost): Promise<void> {
    await this.save(this.posts$.value.map(p => p.id === updated.id ? updated : p));
  }

  async deletePost(id: string): Promise<void> {
    await this.save(this.posts$.value.filter(p => p.id !== id));
  }

  async incrementLikes(id: string): Promise<void> {
    await this.save(this.posts$.value.map(p =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    ));
  }

  async incrementReposts(id: string): Promise<void> {
    await this.save(this.posts$.value.map(p =>
      p.id === id ? { ...p, reposts: p.reposts + 1 } : p
    ));
  }

  async loadDefaultPosts(): Promise<void> {
    const posts = await firstValueFrom(
      this.http.get<IPost[]>('assets/default-posts.json')
    );
    await this.save(posts);
    await Preferences.set({ key: INIT_KEY, value: 'true' });
  }

  async startBlank(): Promise<void> {
    await this.save([]);
    await Preferences.set({ key: INIT_KEY, value: 'true' });
  }

  async importPosts(json: string): Promise<void> {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) throw new Error('Must be a JSON array of posts');
    await this.save(parsed as IPost[]);
  }

  exportJSON(): string {
    return JSON.stringify(this.posts$.value, null, 2);
  }

  async resetToDefaults(): Promise<void> {
    await this.loadDefaultPosts();
  }

  getPostsByHandle(handle: string): Observable<IPost[]> {
    return this.getPosts().pipe(
      map(posts => posts.filter(p => p.handle.toLowerCase() === handle.toLowerCase()))
    );
  }

  getPostsByHashtag(tag: string): Observable<IPost[]> {
    const clean = tag.replace(/^#/, '').toLowerCase();
    return this.getPosts().pipe(
      map(posts => posts.filter(p => p.content.toLowerCase().includes(`#${clean}`)))
    );
  }

  getAllHandles(): { handle: string; displayName: string; count: number }[] {
    const map = new Map<string, { displayName: string; count: number }>();
    for (const post of this.posts$.value) {
      const existing = map.get(post.handle);
      if (existing) {
        existing.count++;
      } else {
        map.set(post.handle, { displayName: post.displayName, count: 1 });
      }
    }
    return [...map.entries()]
      .map(([handle, { displayName, count }]) => ({ handle, displayName, count }))
      .sort((a, b) => b.count - a.count);
  }

  getAllHashtags(): { tag: string; count: number }[] {
    const counts = new Map<string, number>();
    for (const post of this.posts$.value) {
      const matches = post.content.match(/\B#([a-zA-Z0-9_]+)\b/g) || [];
      for (const m of matches) {
        const tag = m.slice(1).toLowerCase();
        counts.set(tag, (counts.get(tag) || 0) + 1);
      }
    }
    return [...counts.entries()]
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }

  generateId(): string {
    return `post_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }

  private async save(posts: IPost[]): Promise<void> {
    await Preferences.set({ key: POSTS_KEY, value: JSON.stringify(posts) });
    this.posts$.next(posts);
  }
}
