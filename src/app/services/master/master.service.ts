import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/shared/models/interfaces/city.interface';
import { Country } from 'src/app/shared/models/interfaces/country.interface';
import { Currency } from 'src/app/shared/models/interfaces/currency.interface';
import { Language } from 'src/app/shared/models/interfaces/language.interface';
import { Level } from 'src/app/shared/models/interfaces/level-interface';
import { Profile } from 'src/app/shared/models/interfaces/profile.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private uri = environment.url;

  constructor(private http: HttpClient) { }

  getLevel(description: string): Observable<Level[]> {
    return this.http.post<Level[]>(`${this.uri}/${description}`, {});
  }

  getCountry(description: string): Observable<Country[]> {
    return this.http.post<Country[]>(`${this.uri}/${description}`, {});
  }

  getCurrency(description: string): Observable<Currency[]> {
    return this.http.post<Currency[]>(`${this.uri}/${description}`, {});
  }

  getLanguage(description: string): Observable<Language[]> {
    return this.http.post<Language[]>(`${this.uri}/${description}`, {});
  }

  getCity(description: string): Observable<City[]> {
    return this.http.post<City[]>(`${this.uri}/${description}`, {});
  }

  getProfile(description: string): Observable<Profile[]> {
    return this.http.post<Profile[]>(`${this.uri}/${description}`, {});
  }

  getCitiesByCountry(
    descriptionOne: string,
    countryId: string,
    descriptionTwo: string
  ): Observable<City[]> {
    return this.http.post<City[]>(
      `${this.uri}/${descriptionOne}/${countryId}/${descriptionTwo}`, {}
    );
  }

  getSkills(description: string): Observable<string[]> {
    return this.http.post<string[]>(`${this.uri}/${description}`, {});
  }
}
