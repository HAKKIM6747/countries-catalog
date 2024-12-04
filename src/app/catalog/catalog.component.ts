import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CountriesService } from '../services/countries.service';
import { Country } from '../shared/models/country.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CountryModalComponent } from '../country-modal/country-modal.component';

import * as _ from 'lodash';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginatorModule, CountryModalComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 25;
  searchTerm: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  selectedCountry: Country | null = null;
  displayedColumns: string[] = ['flags', 'name', 'cca2', 'cca3', 'nativeName', 'altSpellings', 'idd'];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe((data) => {
      this.countries = data.map((country) => ({
        ...country,
        nativeName: this.getNativeName(country.name.nativeName) || 'N/A',
      }));
      this.filteredCountries = this.countries;
    });
  }

  private getNativeName(nativeNameObject: any): string {
    if (!nativeNameObject) return 'Unknown';
    const nativeNameKeys = Object.keys(nativeNameObject);
    return nativeNameKeys.length ? nativeNameObject[nativeNameKeys[0]].official : 'Unknown';
  }

  openModal(country: Country): void {
    this.selectedCountry = country;
  }

  closeModal(): void {
    this.selectedCountry = null;
  }

  searchCountries(): void {
    if (this.searchTerm) {
      this.filteredCountries = this.countries.filter((country) =>
        country.name.official.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCountries = [...this.countries];
    }
    this.sortCountries();
    this.currentPage = 1;
  }

  sortCountries(): void {
    this.filteredCountries = _.orderBy(this.filteredCountries, ['name.official'], [this.sortOrder]);
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortCountries();
  }

  paginate(pageIndex: number): void {
    this.currentPage = pageIndex;
  }

  getPaginatedCountries(): Country[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCountries.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
