import { Component, OnInit, DestroyRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { NationService } from '../../services/nation';
import { GameService } from '../../services/game';

import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-nation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nation.html',
  styleUrls: ['./nation.css'],
})
export class NationComponent implements OnInit {
  game: any = null;
  currentDecision: any = null;
  error: string | null = null;

  constructor(
    public nation: NationService,
    private gameService: GameService,
    private router: Router,
    private destroyRef: DestroyRef
  ) {
    effect(() => {
      const nationId = this.nation.nationId();
      if (!nationId) return;

      // prevent duplicate loads
      if (this.game) return;

      this.gameService.loadGame(nationId).subscribe({
        next: (game) => {
          this.game = game;

          this.gameService.getActiveDecision(game._id).subscribe({
            next: (decision) => {
              this.currentDecision = decision;
            },
          });
        },
        error: (err) => console.error(err),
      });
    });
  }

  ngOnInit() {
    // kick off identity resolution
    this.nation.load();
  }

  choose(optionId: string) {
    if (!this.game?._id || !this.currentDecision?.id) return;

    this.gameService
      .decide(this.game._id, this.currentDecision.id, optionId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.game = res.game;
          // refresh decision after choosing
          this.gameService
            .getActiveDecision(this.game._id)
            .subscribe((d) => (this.currentDecision = d));
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to submit decision.';
        },
      });
  }
}
