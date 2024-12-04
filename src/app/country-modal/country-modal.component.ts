import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Country } from '../shared/models/country.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.css'],
})
export class CountryModalComponent {
  @Input() country: Country | null = null;
  @Output() close = new EventEmitter<void>();

  currencies(): string {
    if (!this.country?.currencies) {
      return 'No currencies available';
    }
    return Object.values(this.country.currencies)
      .map((currency) => currency.name)
      .join(', ');
  }

  languages(): string {
    if (!this.country?.languages) {
      return 'No languages available';
    }
    return Object.values(this.country.languages).join(', ');
  }
}
