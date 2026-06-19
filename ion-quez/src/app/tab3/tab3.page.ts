import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { IPost, IBrandConfig } from '../interfaces/post.interface';
import { PostService } from '../services/post.service';
import { ThemeService } from '../services/theme.service';
import { EditPostModalComponent } from '../modals/edit-post/edit-post.modal';
import { CreatePostModalComponent } from '../modals/create-post/create-post.modal';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
  allPosts: IPost[] = [];
  filteredPosts: IPost[] = [];
  searchQuery = '';
  brandForm!: IBrandConfig;
  darkMode = false;

  private postsSub?: Subscription;

  constructor(
    private postService: PostService,
    private themeService: ThemeService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.brandForm = { ...this.themeService.getSnapshot() };
    this.darkMode = document.body.classList.contains('dark');
    this.postsSub = this.postService.getPosts().subscribe(posts => {
      this.allPosts = posts;
      this.applyFilter();
    });
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
  }

  onSearch(): void {
    this.applyFilter();
  }

  trackById(_: number, post: IPost): string {
    return post.id;
  }

  async saveBranding(): Promise<void> {
    await this.themeService.saveConfig({ ...this.brandForm });
    await this.showToast('Branding saved!');
  }

  async openCreatePost(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CreatePostModalComponent,
      componentProps: { adminMode: true }
    });
    await modal.present();
  }

  async openEditPost(post: IPost): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditPostModalComponent,
      componentProps: { post }
    });
    await modal.present();
  }

  async deletePost(post: IPost): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Delete Post',
      message: `Delete @${post.handle}'s post?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => this.postService.deletePost(post.id)
        }
      ]
    });
    await alert.present();
  }

  exportJSON(): void {
    const json = this.postService.exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.brandForm.platformName.toLowerCase().replace(/\s+/g, '-')}-posts.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  onImportFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.zone.run(async () => {
        try {
          await this.postService.importPosts(reader.result as string);
          await this.showToast(`Posts imported successfully!`);
        } catch {
          await this.showToast('Invalid JSON file, must be an array of posts.');
        }
      });
    };
    reader.readAsText(file);
    (event.target as HTMLInputElement).value = '';
  }

  async resetToDefaults(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Reset to Example Posts',
      message: 'This will replace ALL posts with the built-in example posts. This cannot be undone.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Reset',
          role: 'destructive',
          handler: async () => {
            await this.postService.resetToDefaults();
            await this.showToast('Posts reset to examples');
          }
        }
      ]
    });
    await alert.present();
  }

  async startFresh(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Clear All Posts',
      message: 'This will permanently delete ALL posts. This cannot be undone.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Clear All',
          role: 'destructive',
          handler: async () => {
            await this.postService.startBlank();
            await this.showToast('All posts cleared');
          }
        }
      ]
    });
    await alert.present();
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    Preferences.set({ key: 'darkModeActivated', value: this.darkMode ? 'true' : 'false' });
  }

  private applyFilter(): void {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) {
      this.filteredPosts = [...this.allPosts];
      return;
    }
    this.filteredPosts = this.allPosts.filter(p =>
      p.handle.toLowerCase().includes(q) ||
      p.displayName.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
    );
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
