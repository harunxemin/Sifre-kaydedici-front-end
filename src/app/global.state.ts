import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class GlobalState {
  private _data = new Subject<Object>();
  private _dataStream$ = this._data.asObservable();
  private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

  constructor() {
    this._dataStream$
      .subscribe({
        next: (data) => this._onEvent(data)
      });
  }

  notifyDataChanged(event: any, value: any) {

    const current = this._data[event];
    if (current !== value) {
      this._data[event] = value;

      this._data.next({
        event,
        data: this._data[event]
      });
    }
  }

  subscribe(event: string, callback: Function) {
    const subscribers = this._subscriptions.get(event) || [];
    subscribers.push(callback);

    this._subscriptions.set(event, subscribers);
  }

  _onEvent(data: any) {
    const subscribers = this._subscriptions.get(data['event']) || [];

    subscribers.forEach((callback) => {
      callback.call(null, data['data']);
    });
  }
}
