import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IPost, IBrandConfig } from '../interfaces/post.interface';
import { PostService } from '../services/post.service';
import { ThemeService } from '../services/theme.service';
import { CreatePostModalComponent } from '../modals/create-post/create-post.modal';
import { OnboardingModalComponent } from '../modals/onboarding/onboarding.modal';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  posts$!: Observable<IPost[]>;
  brand$!: Observable<IBrandConfig>;

  constructor(
    private postService: PostService,
    private themeService: ThemeService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit(): Promise<void> {
    this.posts$ = this.postService.getPosts();
    this.brand$ = this.themeService.getConfig();

    const firstRun = await this.postService.isFirstRun();
    if (firstRun) {
      await this.showOnboarding();
    }
  }

  trackById(_: number, post: IPost): string {
    return post.id;
  }

  async openCreatePost(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CreatePostModalComponent
    });
    await modal.present();
  }

  private async showOnboarding(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: OnboardingModalComponent,
      backdropDismiss: false
    });
    await modal.present();
    await modal.onDidDismiss();
  }
}
