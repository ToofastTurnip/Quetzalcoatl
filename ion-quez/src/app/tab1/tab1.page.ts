import { Component } from '@angular/core';
import { GlyphService } from '../service/glyphService';
// import { IGlyph } from '../interface/glyph.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [GlyphService]
})
export class Tab1Page {

  items: any[] = [];

  constructor(
    public glyphService: GlyphService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.glyphService.getAllGlyphs().subscribe(
      result => {
        this.items = result;
        // sort by rune id so list is newest to oldest
        this.items.sort((a, b) => Number(b.rune) - Number(a.rune));
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].glyph_content = this.sanitizer.bypassSecurityTrustHtml(
            this.replaceIt(this.items[i].glyph_content)
          );
        }
        console.log(this.items)
      }
    );
  }

  replaceIt = (str: string) => {
    const regex = /\B([\#\@][a-zA-Z]+\b)(?!;)/g;
    const subst = `<span style="color:blue">$1</span>`;
    const result = str.replace(regex, subst);
    return result;
 }

}
