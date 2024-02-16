import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/shared/models/interfaces/city.interface';
import { Country } from 'src/app/shared/models/interfaces/country.interface';
import { Currency } from 'src/app/shared/models/interfaces/currency.interface';
import Language from 'src/app/shared/models/interfaces/language.interface';
import { Level } from 'src/app/shared/models/interfaces/level-interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private uri = environment.url;

  constructor(private http: HttpClient) {}

  getLevel(description: string): Observable<Level[]> {
    return this.http.get<Level[]>(`${this.uri}/${description}`);
  }

  getCountry(description: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.uri}/${description}`);
  }

  getCurrency(description: string): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.uri}/${description}`);
  }

  getLanguage(description: string): Observable<Language[]> {
    return this.http.get<Language[]>(`${this.uri}/${description}`);
  }

  getCity(description: string): Observable<City[]> {
    return this.http.get<City[]>(`${this.uri}/${description}`);
  }

  getCitiesByCountry(
    descriptionOne: string,
    countryId: string,
    descriptionTwo: string
  ): Observable<City[]> {
    return this.http.get<City[]>(
      `${this.uri}/${descriptionOne}/${countryId}/${descriptionTwo}`
    );
  }
}
