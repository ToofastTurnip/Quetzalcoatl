import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PostCardComponent } from './post-card.component';

@NgModule({
  declarations: [PostCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [PostCardComponent]
})
export class PostCardModule {}
