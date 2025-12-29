import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game';

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './journal.html',
})
export class JournalComponent implements OnInit {
  journal: any[] = [];

  constructor(private gameService: GameService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const id = localStorage.getItem('gameId');
    if (!id) return;

    this.gameService.loadGame(id).subscribe((game) => {
      this.journal = game.journal || [];
      this.cdr.detectChanges();
    });
  }
}
