import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

    public sidebatItems = [
      { label: 'Listado', icon: 'label' , url:'./list'},
      { label: 'Añandir', icon: 'add' , url:'./new-hero'},
      { label: 'Buscador', icon: 'search' , url:'./search'},
    ]
  }
