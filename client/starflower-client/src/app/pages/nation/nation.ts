import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NationService } from '../../services/nation';
import { GameService } from '../../services/game';

@Component({
  selector: 'app-nation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nation.html',
  styleUrls: ['./nation.css'],
})
export class NationComponent {
  currentDecision: any = null;
  error: string | null = null;

  constructor(public nation: NationService, public gameService: GameService) {
    //load game when nation identity resolves
    effect(() => {
      const nationId = this.nation.nationId();
      if (!nationId) return;

      this.gameService.loadGame(nationId);
    });

    //load decision when game becomes available
    effect(() => {
      const game = this.gameService.game();
      if (!game) return;

      // prevent duplicate fetches
      if (this.currentDecision) return;

      this.gameService.getActiveDecision(game._id).subscribe({
        next: (decision) => {
          this.currentDecision = decision;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load decision.';
        },
      });
    });
  }

  choose(optionId: string) {
    const game = this.gameService.game();

    if (!game || !this.currentDecision?.id) {
      console.warn('Choose aborted — missing game or decision');
      return;
    }

    this.gameService.decide(game._id, this.currentDecision.id, optionId).subscribe({
      next: (res) => {
        // update cached game state
        this.gameService.game.set(res.game);

        // allow next decision to be fetched
        this.currentDecision = null;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to submit decision.';
      },
    });
  }
}
