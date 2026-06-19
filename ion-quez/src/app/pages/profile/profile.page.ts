import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost, IBrandConfig } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {
  handle = '';
  displayName = '';
  avatar = '';
  avatarIsImage = false;
  brandConfig!: IBrandConfig;
  posts$!: Observable<IPost[]>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.brandConfig = this.themeService.getSnapshot();
    this.handle = this.route.snapshot.params['handle'];
    this.posts$ = this.postService.getPostsByHandle(this.handle);
    const match = this.postService.getCurrentPosts().find(
      p => p.handle.toLowerCase() === this.handle.toLowerCase()
    );
    if (match) {
      this.displayName = match.displayName;
      this.avatar = match.avatar;
      this.avatarIsImage = match.avatarIsImage;
    } else {
      this.displayName = this.handle;
      this.avatar = this.handle.slice(0, 2).toUpperCase();
    }
  }

  trackById(_: number, post: IPost): string {
    return post.id;
  }
}
