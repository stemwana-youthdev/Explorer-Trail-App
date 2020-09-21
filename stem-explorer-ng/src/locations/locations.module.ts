import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { BottomNavComponent } from './components/bottom-navigation/bottom-navigation.component';
import { ChallengeDialogComponent } from './components/challenge-dialog/challenge-dialog.component';
import { ChallengeFilterComponent } from './components/challenge-filter/challenge-filter.component';
import { ChallengeProgressComponent } from './components/challenge-progress/challenge-progress.component';
import { ListComponent } from './components/list/list.component';
import { Map2Component } from './components/map/map2.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsState } from './store/locations.state';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LocationsRoutingModule,
    NgxsModule.forFeature([LocationsState])
  ],
  declarations: [
    Map2Component,
    ListComponent,
    ChallengeDialogComponent,
    ChallengeFilterComponent,
    ChallengeProgressComponent,
    BottomNavComponent,
  ]
})
export class LocationsModule {}
