import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChallengesState } from '../../store/challenges/challenges.state';
import { LoadChallengesData } from '../../store/challenges/challenges.actions';

import { Challenge } from '../../shared/models/challenge';
import { Location } from '../../shared/models/location';

import { Categories } from '../../shared/enums/categories.enum';
import { LocationsState } from 'src/app/store/locations/locations.state';


interface ChallengeDialogData {
  challengeId: number;
}


/*
* Component for the list view dialog for more information
*/
@Component({
  selector: 'app-challenge-dialog',
  templateUrl: './challenge-dialog.component.html',
  styleUrls: ['./challenge-dialog.component.scss'],
})
export class ChallengeDialogComponent implements OnInit {

  Categories: any = Categories;

  constructor(
    private store: Store,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: ChallengeDialogData,
  ) { }

  ngOnInit()  {
    this.store.dispatch(new LoadChallengesData());
  }

  get challenge$(): Observable<Challenge> {
    return this.store.select(ChallengesState.challenge).pipe(
      map((fn) => fn(this.data.challengeId)),
    );
  }

  get category$(): Observable<Categories> {
    return this.challenge$.pipe(
      map((challenge) => challenge?.category),
    );
  }

  get location$(): Observable<Location> {
    return this.store.select(LocationsState.challengeLocation).pipe(
      map((fn) => fn(this.data.challengeId)),
    );
  }

  goToChallenge() {
    this.router.navigate(['challenge/' + this.data.challengeId]);
  }

}
