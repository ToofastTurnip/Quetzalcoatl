import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OnboardingModalComponent } from './onboarding.modal';

@NgModule({
  declarations: [OnboardingModalComponent],
  imports: [CommonModule, IonicModule],
  exports: [OnboardingModalComponent]
})
export class OnboardingModalModule {}
