import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { environment } from '../../environments/environment';

import { ChallengesState } from './challenges/challenges.state';
import { LocationsState } from './locations/locations.state';
import { ChallengeLevelsState } from './challenge-levels/challenge-levels.state';
import { LocationDistancesState } from './location-distances/location-distances.state';
import { LastHomepageState } from './last-homepage/last-homepage.state';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot(
      [
        ChallengesState,
        LocationsState,
        ChallengeLevelsState,
        LocationDistancesState,
        LastHomepageState,
      ],
      { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  exports: [
    NgxsModule,
    NgxsReduxDevtoolsPluginModule,
    NgxsLoggerPluginModule,
  ],
})
export class StoreModule { }
