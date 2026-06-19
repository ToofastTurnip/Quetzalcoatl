import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditPostModalComponent } from './edit-post.modal';

@NgModule({
  declarations: [EditPostModalComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [EditPostModalComponent]
})
export class EditPostModalModule {}
