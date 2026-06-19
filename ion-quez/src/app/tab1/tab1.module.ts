import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { PostCardModule } from '../components/post-card/post-card.module';
import { CreatePostModalModule } from '../modals/create-post/create-post.module';
import { OnboardingModalModule } from '../modals/onboarding/onboarding.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    PostCardModule,
    CreatePostModalModule,
    OnboardingModalModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
