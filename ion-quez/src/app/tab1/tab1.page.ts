import { Component } from '@angular/core';
import { GlyphService } from '../service/glyphService';
import { IGlyph } from '../interface/glyph.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [GlyphService]
})
export class Tab1Page {

  public items: Array<IGlyph> = [];

  constructor(
    public glyphService: GlyphService
  ) { }

  ngOnInit(): void {
    this.glyphService.getAllGlyphs().subscribe(
      result => {
        this.items = result;
        // sort by rune id so list is newest to oldest
        this.items.sort((a, b) => Number(b.rune) - Number(a.rune))
      }
    );
  }

}
