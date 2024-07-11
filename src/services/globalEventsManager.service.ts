import { EventEmitter, Injectable } from '@angular/core';

import { User } from 'models/user';

@Injectable({ providedIn: 'root' })

export class GlobalEventsManager {
  setCurrentUser: EventEmitter<User> = new EventEmitter();
}
