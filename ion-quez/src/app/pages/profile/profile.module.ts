import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProfilePage } from './profile.page';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { PostCardModule } from '../../components/post-card/post-card.module';

@NgModule({
  imports: [CommonModule, IonicModule, ProfilePageRoutingModule, PostCardModule],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
