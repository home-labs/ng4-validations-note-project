import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.sass']
})
export class DirectivesComponent implements OnInit {

  ifDirective: Boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
