import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { GameService } from '../../services/game';
import { AuthService } from '../../services/auth';
import { NationService } from '../../services/nation';

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

  constructor(
    private gameService: GameService,
    private auth: AuthService,
    private nation: NationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const nationId = this.nation.nationId();
    if (!nationId) return; // guard guarantees this won't happen

    this.gameService.loadGame(nationId).subscribe((game) => {
      this.game = game;
      this.fetchDecision();
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
