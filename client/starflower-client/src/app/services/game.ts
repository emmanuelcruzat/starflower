import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  startGame() {
    return this.http.post<any>(`${this.baseUrl}/game/start`, {});
  }

  loadGame(id: string) {
    return this.http.get<any>(`${this.baseUrl}/game/${id}`);
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
