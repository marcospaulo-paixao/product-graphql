import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  private sidenav: MatSidenav

  constructor() { }

  setSidenav(sidenav: MatSidenav): void {
    this.sidenav = sidenav
  }

  toggle() {
    return this.sidenav.toggle();
  }

  close() {
    return this.sidenav.close();
  }

  open() {
    return this.sidenav.open();
  }
}
