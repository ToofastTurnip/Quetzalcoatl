import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IPost } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: 'edit-post.modal.html',
  styleUrls: ['edit-post.modal.scss']
})
export class EditPostModalComponent implements OnInit {
  @Input() post!: IPost;

  handle = '';
  displayName = '';
  content = '';
  imageUrl = '';
  avatarInput = '';
  avatarIsImage = false;
  likes = 0;
  reposts = 0;
  replies = 0;
  timestamp = '';
  submitting = false;

  constructor(
    private modalCtrl: ModalController,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.handle = this.post.handle;
    this.displayName = this.post.displayName;
    this.content = this.post.content;
    this.imageUrl = this.post.imageUrl || '';
    this.avatarInput = this.post.avatar;
    this.avatarIsImage = this.post.avatarIsImage;
    this.likes = this.post.likes;
    this.reposts = this.post.reposts;
    this.replies = this.post.replies;
    this.timestamp = this.post.timestamp;
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  onHandleChange(): void {
    if (!this.avatarIsImage) {
      this.avatarInput = this.handle.slice(0, 2).toUpperCase();
    }
  }

  onAvatarImagePick(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarInput = reader.result as string;
      this.avatarIsImage = true;
    };
    reader.readAsDataURL(file);
  }

  onPostImagePick(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  clearAvatar(): void {
    this.avatarIsImage = false;
    this.avatarInput = this.handle.slice(0, 2).toUpperCase();
  }

  get canSubmit(): boolean {
    return !!this.handle.trim() && !!this.content.trim() && !this.submitting;
  }

  async save(): Promise<void> {
    if (!this.canSubmit) return;
    this.submitting = true;
    try {
      const cleanHandle = this.handle.replace(/^@/, '').trim();
      const updated: IPost = {
        ...this.post,
        handle: cleanHandle,
        displayName: this.displayName.trim() || cleanHandle,
        content: this.content.trim(),
        imageUrl: this.imageUrl || undefined,
        avatar: this.avatarIsImage ? this.avatarInput : cleanHandle.slice(0, 2).toUpperCase(),
        avatarIsImage: this.avatarIsImage,
        likes: Number(this.likes) || 0,
        reposts: Number(this.reposts) || 0,
        replies: Number(this.replies) || 0,
        timestamp: this.timestamp || new Date().toISOString()
      };
      await this.postService.updatePost(updated);
      this.modalCtrl.dismiss({ updated: true });
    } finally {
      this.submitting = false;
    }
  }
}
