import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl = 'http://localhost:5000/api';

  game = signal<any | null>(null);
  loading = signal(false);

  constructor(private http: HttpClient) {}

  loadGame(id: string) {
    if (this.game()) return; // 👈 cache hit
    if (this.loading()) return;

    this.loading.set(true);

    this.http.get<any>(`${this.baseUrl}/game/${id}`).subscribe({
      next: (game) => {
        this.game.set(game);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  refreshGame(id: string) {
    this.game.set(null);
    this.loadGame(id);
  }

  advanceTurn(id: string) {
    return this.http.post<any>(`${this.baseUrl}/game/${id}/advance`, {});
  }

  //code for sending the player's decision to the backend
  decide(gameId: string, decisionId: string, optionId: string) {
    return this.http.post<any>(`${this.baseUrl}/game/${gameId}/decide`, { decisionId, optionId });
  }

  getActiveDecision(gameId: string) {
    return this.http.get<any>(`${this.baseUrl}/game/${gameId}/decision`);
  }
}
