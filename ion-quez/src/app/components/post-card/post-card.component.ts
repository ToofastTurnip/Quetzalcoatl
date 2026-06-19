import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPost, IBrandConfig } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { ThemeService } from '../../services/theme.service';

export interface TextSegment {
  type: 'text' | 'hashtag' | 'mention';
  value: string;
}

@Component({
  selector: 'app-post-card',
  templateUrl: 'post-card.component.html',
  styleUrls: ['post-card.component.scss']
})
export class PostCardComponent implements OnInit, OnDestroy {
  @Input() post!: IPost;

  segments: TextSegment[] = [];
  brandConfig!: IBrandConfig;
  liked = false;
  reposted = false;
  currentLikes = 0;
  currentReposts = 0;

  private brandSub?: Subscription;

  constructor(
    private router: Router,
    private postService: PostService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.brandConfig = this.themeService.getSnapshot();
    this.segments = this.parseContent(this.post.content);
    this.currentLikes = this.post.likes;
    this.currentReposts = this.post.reposts;
    this.brandSub = this.themeService.getConfig().subscribe(cfg => {
      this.brandConfig = cfg;
    });
  }

  ngOnDestroy(): void {
    this.brandSub?.unsubscribe();
  }

  navigateToProfile(mention: string): void {
    const handle = mention.replace(/^@/, '');
    this.router.navigate(['/profile', handle]);
  }

  navigateToHashtag(hashtag: string): void {
    const tag = hashtag.replace(/^#/, '');
    this.router.navigate(['/hashtag', tag]);
  }

  async onLike(): Promise<void> {
    if (this.liked) return;
    this.liked = true;
    this.currentLikes++;
    await this.postService.incrementLikes(this.post.id);
  }

  async onRepost(): Promise<void> {
    if (this.reposted) return;
    this.reposted = true;
    this.currentReposts++;
    await this.postService.incrementReposts(this.post.id);
  }

  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  formatCount(n: number): string {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  }

  private parseContent(content: string): TextSegment[] {
    const segments: TextSegment[] = [];
    const regex = /(\B#[a-zA-Z0-9_]+\b|\B@[a-zA-Z0-9_]+\b)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ type: 'text', value: content.slice(lastIndex, match.index) });
      }
      const val = match[0];
      segments.push({ type: val.startsWith('#') ? 'hashtag' : 'mention', value: val });
      lastIndex = match.index + val.length;
    }
    if (lastIndex < content.length) {
      segments.push({ type: 'text', value: content.slice(lastIndex) });
    }
    return segments;
  }
}
