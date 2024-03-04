import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TalentService } from 'src/app/services/talent/talent.service';
import { TalentResponse } from 'src/app/shared/models/interfaces/talent.interface';

@Injectable({
  providedIn: 'root'
})
export class TalentDetailService {
  private talentSource = new BehaviorSubject<TalentResponse | null>(null);
  private currentTalentValue: TalentResponse | null = null;
  currentTalent = this.talentSource.asObservable();

  private talentListSubject = new BehaviorSubject<TalentResponse[]>([]);
  talentList$ = this.talentListSubject.asObservable();

  constructor(private talentService: TalentService) { }

  changeTalent(talentId: number) { // Cambia el parámetro a un ID de talento
    if (this.currentTalentValue?.id === talentId) { // Comprueba si el ID del talento seleccionado es el mismo que el del talento actualmente seleccionado
      return;
    }

    this.talentService.getTalentById(talentId).subscribe(talent => { // Obtiene los detalles del talento del servidor
      this.currentTalentValue = talent;
      this.talentSource.next(talent);
    });
  }

  updateTalentList(talents: TalentResponse[]): void {
    this.talentListSubject.next(talents);
  }
}
