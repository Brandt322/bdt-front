import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError } from 'rxjs';
import { TalentService } from 'src/app/services/talent/talent.service';
import { FilterTalentResponse, TalentResponse, TalentSoftSkillRequest, TalentTechnicalSkillRequest } from 'src/app/shared/models/interfaces/talent.interface';

@Injectable({
  providedIn: 'root'
})
export class TalentDetailService {
  private talentSource = new BehaviorSubject<TalentResponse | null>(null);
  private currentTalentValue: TalentResponse | null = null;
  currentTalent = this.talentSource.asObservable();

  private talentListSubject = new BehaviorSubject<FilterTalentResponse[]>([]);
  talentList$ = this.talentListSubject.asObservable();

  constructor(private talentService: TalentService, private toast: ToastrService) { }

  changeTalent(talentId: number) { // Cambia el parámetro a un ID de talento
    if (this.currentTalentValue?.id === talentId) { // Comprueba si el ID del talento seleccionado es el mismo que el del talento actualmente seleccionado
      return;
    }

    this.talentService.getTalentById(talentId).subscribe(talent => { // Obtiene los detalles del talento del servidor
      if (this.currentTalentValue?.id !== talent.id) {
        this.currentTalentValue = talent;
        this.talentSource.next(talent);
      }
    });
  }

  updateTalentList(talents: FilterTalentResponse[]): void {
    this.talentListSubject.next(talents);
  }

  addTechnicalSkillToCurrentTalent(skillName: string, yearsOfExperience: number) {
    if (this.currentTalentValue) {
      const technicalSkillRequest: TalentTechnicalSkillRequest = {
        skill: skillName,
        years: yearsOfExperience
      };
      this.talentService.addTechnicalSkill(this.currentTalentValue.id, technicalSkillRequest).pipe(
        catchError(error => {
          this.toast.error('Hubo un error al agregar la habilidad técnica');
          throw error;
        })
      ).subscribe(() => {
        if (this.currentTalentValue) {
          this.currentTalentValue.technicalSkillsList.push(technicalSkillRequest);
          this.talentSource.next(this.currentTalentValue);

          this.toast.success('Se agregó una habilidad técnica');
        }
      });
    }
  }

  addSoftSkillToCurrentTalent(skillName: string) {
    if (this.currentTalentValue) {
      const softSkillRequest: TalentSoftSkillRequest = {
        skill: skillName
      };
      this.talentService.addSoftSkill(this.currentTalentValue.id, softSkillRequest).pipe(
        catchError(error => {
          this.toast.error('Hubo un error al agregar la habilidad blanda');
          throw error;
        })
      ).subscribe(() => {
        if (this.currentTalentValue) {
          this.currentTalentValue.softSkillsList.push(softSkillRequest);
          this.talentSource.next(this.currentTalentValue);

          this.toast.success('Se agregó una habilidad blanda');
        }
      });
    }
  }
}
