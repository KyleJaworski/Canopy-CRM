import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class EntityService<T> {
  private entitiesSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private addEntitySubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  entities$ = this.entitiesSubject.asObservable();
  addEntity$ = this.addEntitySubject.asObservable();

  constructor(
    private storageKey: string,
    private defaultEntities: T[],
    private idKey: keyof T
  ) {
    if (this.isBrowser()) {
      const storedEntities = sessionStorage.getItem(this.storageKey);
      const initialEntities = storedEntities
        ? JSON.parse(storedEntities, (key, value) =>
            key === 'createdDate' ? new Date(value) : value
          )
        : this.defaultEntities;

      if (!storedEntities) {
        this.saveToSessionStorage(initialEntities);
      }

      this.entitiesSubject.next(initialEntities);
    }
  }

  protected getEntities(): T[] {
    return this.entitiesSubject.getValue();
  }

  protected setEntities(entities: T[]): void {
    this.saveToSessionStorage(entities);
    this.entitiesSubject.next(entities);
  }

  protected setAddEntityState(state: boolean): void {
    this.addEntitySubject.next(state);
  }

  protected getAddEntityState(): boolean {
    return this.addEntitySubject.getValue();
  }

  protected getEntityById(entityId: number): T | undefined {
    return this.getEntities().find((entity) => entity[this.idKey] === entityId);
  }

  private saveToSessionStorage(entities: T[]): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(entities));
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
