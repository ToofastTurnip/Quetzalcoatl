import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HashtagPage } from './hashtag.page';
import { HashtagPageRoutingModule } from './hashtag-routing.module';
import { PostCardModule } from '../../components/post-card/post-card.module';

@NgModule({
  imports: [CommonModule, IonicModule, HashtagPageRoutingModule, PostCardModule],
  declarations: [HashtagPage]
})
export class HashtagPageModule {}
