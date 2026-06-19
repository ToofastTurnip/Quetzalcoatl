import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostService } from '../../services/post.service';
import { ThemeService } from '../../services/theme.service';
import { IBrandConfig } from '../../interfaces/post.interface';

@Component({
  selector: 'app-onboarding-modal',
  templateUrl: 'onboarding.modal.html',
  styleUrls: ['onboarding.modal.scss']
})
export class OnboardingModalComponent {
  loading = false;
  brand: IBrandConfig;

  constructor(
    private modalCtrl: ModalController,
    private postService: PostService,
    private themeService: ThemeService
  ) {
    this.brand = this.themeService.getSnapshot();
  }

  async loadDefaults(): Promise<void> {
    this.loading = true;
    try {
      await this.postService.loadDefaultPosts();
      this.modalCtrl.dismiss({ choice: 'defaults' });
    } finally {
      this.loading = false;
    }
  }

  async startBlank(): Promise<void> {
    this.loading = true;
    try {
      await this.postService.startBlank();
      this.modalCtrl.dismiss({ choice: 'blank' });
    } finally {
      this.loading = false;
    }
  }
}
