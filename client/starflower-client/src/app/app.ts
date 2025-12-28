import { Component, signal, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('starflower-client');

  localTime = '';
  galacticTime = '';

  private clockInterval: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const update = () => {
      const now = new Date();

      this.localTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      this.galacticTime = now.toLocaleTimeString('en-GB', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      this.cdr.detectChanges();
    };

    update();
    this.clockInterval = setInterval(update, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.clockInterval);
  }
}
