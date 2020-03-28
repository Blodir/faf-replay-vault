import { Injectable } from '@angular/core';

interface LocalSettings {
  showResult: boolean
}

@Injectable({
  providedIn: 'root'
})
export class LocalSettingsService {
  constructor() {
    if (!localStorage.getItem("showResult")) localStorage.setItem("showResult", "true");
  }
  set<T extends keyof LocalSettings>(key: T, value: LocalSettings[T]) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  get<T extends keyof LocalSettings>(key: T): LocalSettings[T] {
    return JSON.parse(localStorage.getItem(key));
  }
}
