import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NationService } from '../../services/nation';
import { GameService } from '../../services/game';

@Component({
  standalone: true,
  selector: 'app-journal',
  imports: [CommonModule],
  templateUrl: './journal.html',
})
export class JournalComponent {
  constructor(public nation: NationService, public gameService: GameService) {
    effect(() => {
      const nationId = this.nation.nationId();
      if (!nationId) return;

      this.gameService.loadGame(nationId);
    });
  }
}
