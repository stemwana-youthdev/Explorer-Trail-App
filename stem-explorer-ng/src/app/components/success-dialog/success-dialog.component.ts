import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Levels } from 'src/app/shared/enums/levels.enum';
import { ChallengeLevel } from 'src/app/shared/models/challenge-level';
import { Challenge } from 'src/app/shared/models/challenge';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

export interface SuccessDialogData {
  level: ChallengeLevel;
  challenge: Challenge;
}

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent {

  Levels: any = Levels;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SuccessDialogData,
    public auth: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<SuccessDialogComponent>,
  ) { }

  navigateToHomepage() {
    this.router.navigateByUrl('/');
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  nextLevel() {
    this.dialogRef.close('next-level');
  }

}