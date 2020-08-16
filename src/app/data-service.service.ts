import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _mapData$: Subject<any> = new Subject<any>();

  constructor() { }

  get mapData$(): Observable<any> {
    return this._mapData$.asObservable();
  }

  emitValueForRootLoader(value: any): void {
    this._mapData$.next(value);
  }
}
