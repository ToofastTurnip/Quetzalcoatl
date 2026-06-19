import { Component, Input, ViewChild } from '@angular/core';
import { IonTextarea, ModalController } from '@ionic/angular';
import { IPost } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';

interface MentionResult {
  handle: string;
  displayName: string;
  avatar: string;
}

@Component({
  selector: 'app-create-post-modal',
  templateUrl: 'create-post.modal.html',
  styleUrls: ['create-post.modal.scss']
})
export class CreatePostModalComponent {
  @Input() adminMode = false;
  @ViewChild('contentTextarea', { static: false }) private contentTextarea!: IonTextarea;

  handle = '';
  displayName = '';
  content = '';
  imageUrl = '';
  likes = 0;
  reposts = 0;
  replies = 0;
  submitting = false;

  mentionResults: MentionResult[] = [];
  showMentionDropdown = false;

  constructor(
    private modalCtrl: ModalController,
    private postService: PostService
  ) {}

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  onHandleChange(): void {
    if (!this.displayName) {
      this.displayName = this.handle;
    }
  }

  async onContentInput(): Promise<void> {
    if (!this.adminMode) return;
    const nativeEl = await this.contentTextarea.getInputElement();
    const cursor = nativeEl.selectionStart ?? this.content.length;
    const textUpToCursor = this.content.substring(0, cursor);

    // Trigger when @ is at start-of-string or after whitespace
    const match = textUpToCursor.match(/(^|[\s])@([a-zA-Z0-9_]*)$/);
    if (match) {
      const query = match[2].toLowerCase();
      const allHandles = this.postService.getAllHandles();
      const posts = this.postService.getCurrentPosts();
      this.mentionResults = allHandles
        .filter(h => !query || h.handle.toLowerCase().includes(query) || h.displayName.toLowerCase().includes(query))
        .slice(0, 8)
        .map(h => {
          const post = posts.find(p => p.handle === h.handle);
          return {
            handle: h.handle,
            displayName: h.displayName,
            avatar: post?.avatar || h.handle.slice(0, 2).toUpperCase()
          };
        });
      this.showMentionDropdown = this.mentionResults.length > 0;
    } else {
      this.showMentionDropdown = false;
      this.mentionResults = [];
    }
  }

  async selectMention(handle: string): Promise<void> {
    const nativeEl = await this.contentTextarea.getInputElement();
    const cursor = nativeEl.selectionStart ?? this.content.length;
    const before = this.content.substring(0, cursor);
    const after = this.content.substring(cursor);
    // Replace the partial @word being typed with the selected @handle
    const replaced = before.replace(/(^|[\s])@[a-zA-Z0-9_]*$/, (m, space) => `${space}@${handle} `);
    this.content = replaced + after;
    this.showMentionDropdown = false;
    this.mentionResults = [];
    setTimeout(() => this.contentTextarea.setFocus(), 50);
  }

  onImagePick(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  get canSubmit(): boolean {
    return !!this.handle.trim() && !!this.content.trim() && !this.submitting;
  }

  async submit(): Promise<void> {
    if (!this.canSubmit) return;
    this.submitting = true;
    try {
      const cleanHandle = this.handle.replace(/^@/, '').trim();
      const post: IPost = {
        id: this.postService.generateId(),
        handle: cleanHandle,
        displayName: this.displayName.trim() || cleanHandle,
        avatar: cleanHandle.slice(0, 2).toUpperCase(),
        avatarIsImage: false,
        content: this.content.trim(),
        timestamp: new Date().toISOString(),
        likes: Number(this.likes) || 0,
        reposts: Number(this.reposts) || 0,
        replies: Number(this.replies) || 0,
        imageUrl: this.imageUrl || undefined
      };
      await this.postService.createPost(post);
      this.modalCtrl.dismiss({ created: true });
    } finally {
      this.submitting = false;
    }
  }
}
