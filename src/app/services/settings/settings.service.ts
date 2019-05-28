import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    let ajustes = localStorage.getItem('ajustes');

    if(ajustes) {
      this.ajustes = JSON.parse(ajustes);
    }

    this.aplicarTema(this.ajustes.tema, false);
  }

  aplicarTema(tema, guardar = true) {
    let url = `assets/css/colors/${tema}.css`;
    
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    if(guardar) {
      this.guardarAjustes();
    }
  }

}


interface Ajustes {
  temaUrl: string,
  tema: string
}