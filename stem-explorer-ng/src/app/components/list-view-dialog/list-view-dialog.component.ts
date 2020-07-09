import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Categories } from '../../shared/enums/categories.enum';

/*
* Component for the list view dialog for more information
*/
@Component({
  selector: 'app-list-view-dialog',
  templateUrl: './list-view-dialog.component.html',
  styleUrls: ['./list-view-dialog.component.scss']
})
export class ListViewDialogComponent implements OnInit {

  Categories: any = Categories;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private router: Router) { }

  ngOnInit()  {
  }

  goToChallenge(id) {
    this.router.navigate(['challenge/' + id]);
  }

}
