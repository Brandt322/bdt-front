import { Country } from "./country.interface";

export interface City {
  id: number;
  city: string;
  countryId: Country;
}
