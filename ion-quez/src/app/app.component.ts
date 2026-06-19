import { Component, OnInit } from '@angular/core';
import { PostService } from './services/post.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private postService: PostService,
    private themeService: ThemeService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.themeService.initialize();
    await this.postService.initialize();
  }
}
