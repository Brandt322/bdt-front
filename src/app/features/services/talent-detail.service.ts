import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TalentResponse } from 'src/app/shared/models/interfaces/talent.interface';

@Injectable({
  providedIn: 'root'
})
export class TalentDetailService {
  private talentSource = new BehaviorSubject<TalentResponse | null>(null);
  currentTalent = this.talentSource.asObservable();

  constructor() { }

  changeTalent(talent: TalentResponse) {
    this.talentSource.next(talent);
  }
}
