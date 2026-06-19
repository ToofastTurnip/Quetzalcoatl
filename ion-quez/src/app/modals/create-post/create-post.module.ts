import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreatePostModalComponent } from './create-post.modal';

@NgModule({
  declarations: [CreatePostModalComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [CreatePostModalComponent]
})
export class CreatePostModalModule {}
