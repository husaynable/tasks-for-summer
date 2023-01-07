import { Injectable } from '@angular/core';
import { filter, fromEvent, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentEventsService {
  private observers: Record<string, Observable<Event>> = {};

  public subscribeToEvent<E extends Event>(eventName: string): Observable<E> {
    if (this.observers[eventName]) {
      return this.observers[eventName] as Observable<E>;
    }

    this.observers[eventName] = fromEvent(document, eventName);
    return this.observers[eventName] as Observable<E>;
  }
}
