import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TalentResponse } from 'src/app/shared/models/interfaces/talent.interface';

@Injectable({
  providedIn: 'root'
})
export class TalentDetailService {
  private talentSource = new BehaviorSubject<TalentResponse | null>(null);
  private currentTalentValue: TalentResponse | null = null;
  currentTalent = this.talentSource.asObservable();

  constructor() { }

  changeTalent(talent: TalentResponse) {
    if (this.currentTalentValue === talent) {
      // Si el talento seleccionado es el mismo que el talento actualmente seleccionado, no hagas nada
      return;
    }

    this.currentTalentValue = talent;
    this.talentSource.next(talent);
  }
}
