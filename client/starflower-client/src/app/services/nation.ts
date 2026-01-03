import { Injectable, signal } from '@angular/core';
import { AuthService } from './auth';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class NationService {
  nationName = signal<string | null>(null);
  nationId = signal<string | null>(null);

  loading = signal(false);
  resolved = signal(false);

  resolved$ = toObservable(this.resolved);
  loading$ = toObservable(this.loading);

  constructor(private auth: AuthService) {}

  load(force = false) {
    if (this.loading()) return;
    if (this.resolved() && !force) return;

    this.resolved.set(false);
    this.loading.set(true);

    this.auth.me().subscribe({
      next: (res: { nationId: string; nationName: string }) => {
        this.nationName.set(res.nationName);
        this.nationId.set(res.nationId);
        this.resolved.set(true);
        this.loading.set(false);
      },
      error: () => {
        this.nationName.set(null);
        this.nationId.set(null);
        this.resolved.set(true);
        this.loading.set(false);
      },
    });
  }

  clear() {
    this.nationName.set(null);
    this.nationId.set(null);
    this.resolved.set(true);
  }
}
