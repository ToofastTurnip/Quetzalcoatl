import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  darkMode = false;

  // ngOnInit() {
  //   // Use matchMedia to check the user preference
  //   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  //   // Initialize the dark palette based on the initial
  //   // value of the prefers-color-scheme media query
  //   this.initializeDarkPalette(prefersDark.matches);

  //   // Listen for changes to the prefers-color-scheme media query
  //   prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  // }

  // // Check/uncheck the toggle and update the palette based on isDark
  // initializeDarkPalette(isDark: boolean) {
  //   this.paletteToggle = isDark;
  //   this.toggleDarkPalette(isDark);
  // }

  // // Listen for the toggle check/uncheck to toggle the dark palette
  // toggleChange(ev: { detail: { checked: boolean | undefined; }; }) {
  //   this.toggleDarkPalette(ev.detail.checked);
  // }

  // // Add or remove the "ion-palette-dark" class on the html element
  // toggleDarkPalette(shouldAdd: boolean | undefined) {
  //   document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  // }

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
