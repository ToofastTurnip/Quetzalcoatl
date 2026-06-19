import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPost } from '../interfaces/post.interface';
import { PostService } from '../services/post.service';

interface UserSummary {
  handle: string;
  displayName: string;
  avatar: string;
  avatarIsImage: boolean;
  count: number;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  searchQuery = '';
  searchResults: IPost[] = [];
  isSearching = false;
  trending: { tag: string; count: number }[] = [];
  users: UserSummary[] = [];

  private postsSub?: Subscription;

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postsSub = this.postService.getPosts().subscribe(() => {
      this.loadTrending();
    });
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
  }

  onSearch(): void {
    const q = this.searchQuery.trim();
    this.isSearching = !!q;
    if (!q) {
      this.searchResults = [];
      return;
    }
    const ql = q.toLowerCase();
    this.searchResults = this.postService.getCurrentPosts()
      .filter(p =>
        p.handle.toLowerCase().includes(ql) ||
        p.displayName.toLowerCase().includes(ql) ||
        p.content.toLowerCase().includes(ql)
      )
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  navigateToHashtag(tag: string): void {
    this.router.navigate(['/hashtag', tag]);
  }

  navigateToProfile(handle: string): void {
    this.router.navigate(['/profile', handle]);
  }

  trackByTag(_: number, item: { tag: string }): string {
    return item.tag;
  }

  trackByHandle(_: number, item: UserSummary): string {
    return item.handle;
  }

  trackById(_: number, post: IPost): string {
    return post.id;
  }

  private loadTrending(): void {
    this.trending = this.postService.getAllHashtags().slice(0, 20);
    const handles = this.postService.getAllHandles();
    const posts = this.postService.getCurrentPosts();
    this.users = handles.slice(0, 15).map(h => {
      const post = posts.find(p => p.handle === h.handle);
      return {
        handle: h.handle,
        displayName: h.displayName,
        avatar: post?.avatar || h.handle.slice(0, 2).toUpperCase(),
        avatarIsImage: post?.avatarIsImage || false,
        count: h.count
      };
    });
  }
}
