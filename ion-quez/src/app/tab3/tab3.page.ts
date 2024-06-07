import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  darkMode = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if(this.darkMode) {
      Preferences.set({key: 'darkModeActivated', value: 'true'}); 
    } else {
      Preferences.set({key: 'darkModeActivated', value: 'false'});
    }
  }

}
