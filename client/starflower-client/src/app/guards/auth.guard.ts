import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { NationService } from '../services/nation';
import { combineLatest } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const nation = inject(NationService);
  const router = inject(Router);

  return combineLatest([nation.resolved$, nation.loading$]).pipe(
    // wait until identity check finished and no request in flight
    filter(([resolved, loading]) => resolved === true && loading === false),
    take(1),
    map(() => (nation.nationId() ? true : router.createUrlTree(['/login'])))
  );
};
