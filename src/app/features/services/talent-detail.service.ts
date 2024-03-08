import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject, catchError } from 'rxjs';
import { TalentService } from 'src/app/services/talent/talent.service';
import { FilterTalentResponse, TalentResponse, TalentSalaryRequest, TalentSocialRequest, TalentSoftSkillRequest, TalentTechnicalSkillRequest } from 'src/app/shared/models/interfaces/talent.interface';
import { WorkExperienceRequest } from 'src/app/shared/models/interfaces/workExperience.interface';

@Injectable({
  providedIn: 'root'
})
export class TalentDetailService {
  private talentSource = new BehaviorSubject<TalentResponse | null>(null);
  private currentTalentValue: TalentResponse | null = null;
  currentTalent = this.talentSource.asObservable();

  private talentListSubject = new BehaviorSubject<FilterTalentResponse[]>([]);
  talentList$ = this.talentListSubject.asObservable();

  // En TalentDetailService
  updatedTalent = new Subject<TalentResponse>();

  constructor(private talentService: TalentService, private toast: ToastrService) { }

  changeTalent(talentId: number) { // Cambia el parámetro a un ID de talento
    console.log('changeTalent called with talentId:', talentId);
    if (this.currentTalentValue?.id === talentId) {
      console.log('currentTalentValue.id is equal to talentId');
      return;
    }

    this.talentService.getTalentById(talentId).subscribe(talent => { // Obtiene los detalles del talento del servidor
      if (this.currentTalentValue?.id !== talent.id) {
        this.currentTalentValue = talent;
        this.talentSource.next(talent);
        this.updatedTalent.next(talent);
        // console.log(`Talent updated: ${JSON.stringify(talent.currencyId)}`);
        // console.log(`Talent updated: ${JSON.stringify(talent.currency)}`);
        // console.log(`Talent updated: ${JSON.stringify(talent.initialAmount)}`);
        // console.log(`Talent updated: ${JSON.stringify(talent.finalAmount)}`);
      }
    });
  }

  updateTalentList(talents: FilterTalentResponse[]): void {
    this.talentListSubject.next(talents);
  }

  addTechnicalSkillToCurrentTalent(id: number | null, skillName: string, yearsOfExperience: number) {
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
          this.currentTalentValue.technicalSkillsList.push({ id: 0, skill: technicalSkillRequest.skill, years: technicalSkillRequest.years });
          this.talentSource.next(this.currentTalentValue);

          this.toast.success('Se agregó una habilidad técnica');
        }
      });
    }
  }

  addSoftSkillToCurrentTalent(id: number | null, skillName: string) {
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
          this.currentTalentValue.softSkillsList.push({ id: 0, skill: softSkillRequest.skill });
          this.talentSource.next(this.currentTalentValue);

          this.toast.success('Se agregó una habilidad blanda');
        }
      });
    }
  }

  addWorkExperienceToCurrentTalent(company: string, position: string, startDate: Date, endDate: Date) {
    if (this.currentTalentValue) {
      const workExperience: WorkExperienceRequest = {
        company: company,
        position: position,
        startDate: startDate,
        endDate: endDate
      };
      this.talentService.addWorkExperience(this.currentTalentValue.id, workExperience).pipe(
        catchError(error => {
          this.toast.error('Hubo un error al agregar la experiencia laboral');
          throw error;
        })
      ).subscribe(() => {
        if (this.currentTalentValue) {
          this.currentTalentValue.workExperiencesList.push(workExperience);
          this.talentSource.next(this.currentTalentValue);
          this.changeTalent(this.currentTalentValue.id);
          this.toast.success('Se agregó una experiencia laboral');
        }
      });
    }
  }

  addEducationalExperienceToCurrentTalent(educationalInstitute: string, career: string, degree: string, startDate: Date, endDate: Date) {
    if (this.currentTalentValue) {
      const educationalExperience = {
        educationalInstitute: educationalInstitute,
        career: career,
        degree: degree,
        startDate: startDate,
        endDate: endDate
      };
      this.talentService.addEducationalExperience(this.currentTalentValue.id, educationalExperience).pipe(
        catchError(error => {
          this.toast.error('Hubo un error al agregar la experiencia educativa');
          throw error;
        })
      ).subscribe(() => {
        if (this.currentTalentValue) {
          this.currentTalentValue.educationalExperiencesList.push(educationalExperience);
          this.talentSource.next(this.currentTalentValue);
          this.changeTalent(this.currentTalentValue.id);
          this.toast.success('Se agregó una experiencia educativa');
        }
      });
    }
  }

  updateSalaryBandForCurrentTalent(salaryRequest: TalentSalaryRequest) {
    // console.log('updateSalaryBandForCurrentTalent called');
    if (this.currentTalentValue) {
      // console.log('currentTalentValue is not null');
      this.talentService.updateSalaryBand(this.currentTalentValue.id, salaryRequest).pipe(
        catchError(error => {
          this.toast.error('Hubo un error al actualizar la banda salarial');
          throw error;
        })
      ).subscribe(() => {
        if (this.currentTalentValue) {
          // console.log('currentTalentValue is not null after subscribe');
          this.currentTalentValue.initialAmount = salaryRequest.initialAmount;
          this.currentTalentValue.finalAmount = salaryRequest.finalAmount;
          this.currentTalentValue.currencyId = salaryRequest.currencyId;
          this.talentSource.next(this.currentTalentValue);
          // console.log('Calling changeTalent');
          this.changeTalent(this.currentTalentValue.id);
          this.toast.success('Se actualizó la banda salarial');
        }
      });
    }
  }

  updateSocialsForCurrentTalent(socialRequest: TalentSocialRequest) {
    if (this.currentTalentValue) {
      this.talentService.updateSocials(this.currentTalentValue.id, socialRequest).pipe(
        catchError(error => {
          this.toast.error('Hubo un error al actualizar los enlaces sociales');
          throw error;
        })
      ).subscribe(() => {
        if (this.currentTalentValue) {
          this.currentTalentValue.githubLink = socialRequest.githubLink;
          this.currentTalentValue.linkedinLink = socialRequest.linkedinLink;
          this.talentSource.next(this.currentTalentValue);
          this.toast.success('Se actualizaron los enlaces sociales');
        }
      });
    }
  }

  updateDescriptionForCurrentTalent(description: string) {
    if (this.currentTalentValue) {
      this.talentService.updateDescription(this.currentTalentValue.id, description).pipe(
        catchError(error => {
          this.toast.error('Hubo un error al actualizar la descripción');
          throw error;
        })
      ).subscribe(() => {
        if (this.currentTalentValue) {
          this.currentTalentValue.description = description;
          this.talentSource.next(this.currentTalentValue);
          this.toast.success('Se actualizó la descripción');
        }
      });
    }
  }


}
