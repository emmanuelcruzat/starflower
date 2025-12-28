import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game';

@Component({
  selector: 'app-nation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nation.html',
  styleUrls: ['./nation.css'],
})
export class NationComponent implements OnInit {
  game: any = null;

  constructor(private gameService: GameService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const id = localStorage.getItem('gameId');

    if (id) {
      this.gameService.loadGame(id).subscribe({
        next: (game) => {
          this.game = game;
          this.cdr.detectChanges();
        },
        error: () => {
          localStorage.removeItem('gameId');
          this.startFreshGame();
        },
      });
    } else {
      this.startFreshGame();
    }
  }

  private startFreshGame() {
    this.gameService.startGame().subscribe({
      next: (game) => {
        this.game = game;
        localStorage.setItem('gameId', game._id);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load game', err);

        if (err.status === 400 || err.status === 404) {
          localStorage.removeItem('gameId');
          this.startFreshGame();
        }
      },
    });
  }

  advance() {
    if (!this.game?._id) return;

    this.gameService.advanceTurn(this.game._id).subscribe((game) => {
      this.game = game;
      this.cdr.detectChanges();
    });
  }
}
