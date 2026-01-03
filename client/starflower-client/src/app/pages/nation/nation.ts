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
  currentDecision: any = null;

  constructor(private gameService: GameService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const id = localStorage.getItem('gameId');

    if (id) {
      this.loadExistingGame(id);
    } else {
      this.startFreshGame();
    }
  }

  private loadExistingGame(id: string) {
    this.gameService.loadGame(id).subscribe({
      next: (game) => {
        this.game = game;
        this.fetchDecision();
        this.cdr.detectChanges();
      },
      error: () => {
        localStorage.removeItem('gameId');
        this.startFreshGame();
      },
    });
  }

  private startFreshGame() {
    this.gameService.startGame().subscribe({
      next: (game) => {
        this.game = game;
        localStorage.setItem('gameId', game._id);
        this.fetchDecision();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to start game', err);
      },
    });
  }

  private fetchDecision() {
    if (!this.game?._id) return;

    this.gameService.getActiveDecision(this.game._id).subscribe((decision) => {
      this.currentDecision = decision;
      this.cdr.detectChanges();
    });
  }

  choose(optionId: string) {
    if (!this.game || !this.currentDecision) return;

    this.gameService.decide(this.game._id, this.currentDecision.id, optionId).subscribe((res) => {
      this.game = res.game;
      this.currentDecision = null;
      this.fetchDecision();
      this.cdr.detectChanges();
    });
  }
}
