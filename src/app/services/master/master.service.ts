import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Master } from 'src/app/shared/models/entities';
import { Level } from 'src/app/shared/models/interfaces/level-interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private uri = environment.url
  constructor(private http: HttpClient) { }

  getLevel(descripcion: string): Observable<Level[]> {
    return this.http.get<Level[]>(`${this.uri}/${descripcion}`);
  }

}
