import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StemColours } from 'src/app/shared/enums/stem-colours.enum';

@Component({
  selector: 'app-hint-dialog',
  template: `
    <app-dialog [category]="data.category">
      <h3>{{data.title}}</h3>
      <p>Level {{data.level.difficulty}}</p>
      <p>{{data.level.hint}}</p>
    </app-dialog>
  `
})
export class HintDialogComponent {
  Colour = StemColours;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
