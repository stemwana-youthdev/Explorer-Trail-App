import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Challenge } from '../../shared/models/challenge';
import { ActivatedRoute } from '@angular/router';
import { Categories } from '../../shared/enums/categories.enum';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { ChallengeLevels } from 'src/app/shared/models/challenge-levels';

@Component({
  selector: 'app-challenge-view',
  templateUrl: './challenge-view.component.html',
  styleUrls: ['./challenge-view.component.scss']
})
export class ChallengeViewComponent implements OnInit {

  challenge = {} as Challenge;
  id: number;
  Categories: any = Categories;
  Levels: any = Levels;
  challengeLevel: ChallengeLevels[] = [];
  levels: number[];
  selectedLevel: number;
  currentChallenge = {} as ChallengeLevels;

  constructor(private service: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getChallenge();
    this.getChallengeLevels();

    // Gets the id from the current route
    this.route.params.subscribe(params => {
      this.id = +params.id;
   });
  }


  /*
  * Gets one challenge based on the uid
  */
 getChallenge() {
  this.service.getChallenges().subscribe((res) => {
    // tslint:disable-next-line: no-string-literal
    this.challenge = res['challenges'].find(item => item.uid === this.id);
    });
}

  /*
  * Uses ApiService to get challengeLevels information and stores all challenge information
  * for the current challenge in challengeLevel. Then it stores an array of the level numbers into
  * another property, levels. It also sets the default level to be the lowest in the level array.
  */
  getChallengeLevels() {
    this.service.getChallengeLevels().subscribe((res) => {
      // tslint:disable-next-line: no-string-literal
      this.challengeLevel = res['challengeLevels'].filter(item => item.challengeId === this.id);
      this.levels = this.challengeLevel.map(level => level.difficulty);
      this.selectedLevel = Math.min(...this.levels);
      this.getCurrentChallenge(this.selectedLevel);
      });
  }

  // Gets the current challenge information based on the level selected
  getCurrentChallenge(value) {
    this.currentChallenge = this.challengeLevel.find(challenge => challenge.difficulty === value);
  }

}
