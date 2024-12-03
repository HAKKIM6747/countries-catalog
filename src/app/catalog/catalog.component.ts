import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

}
