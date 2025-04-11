import {Injectable} from '@angular/core';
import {mergeMap, Observable, of, timer} from 'rxjs';

import {PreloadingStrategy, Route} from '@angular/router';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root',
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
  constructor(private log: LogService) {
  }

  preload(route: Route, loadMe: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      const delay: number=route.data['delay'];
      this.log.info('preload called on '+route.path+' delay is '+delay);
      return timer(delay).pipe(
        mergeMap( (_) => {
          this.log.info('Loading now '+ route.path);
          return loadMe();
        }));
    } else {
      this.log.info('no preload for the path '+ route.path);
      return of(null);
    }
  }
}
