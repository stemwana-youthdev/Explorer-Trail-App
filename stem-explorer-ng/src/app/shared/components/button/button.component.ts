import { Component, OnInit, Input } from '@angular/core';
import { createOfflineCompileUrlResolver } from '@angular/compiler';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() color: 'green'|'blue'|'orange'|'purple'|'pink';
  @Input() outlined: any;

  constructor() { }

  ngOnInit(): void {
  }

}
