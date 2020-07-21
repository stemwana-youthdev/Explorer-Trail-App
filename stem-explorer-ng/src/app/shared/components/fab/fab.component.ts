import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FabComponent {

  @Input() matIcon?: string;
  @Input() position: 'right' | 'left' = 'left';

  constructor() { }

}
