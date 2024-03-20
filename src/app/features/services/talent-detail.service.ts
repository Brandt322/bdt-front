import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject, catchError } from 'rxjs';
import { TalentService } from 'src/app/services/talent/talent.service';
import { EducationalExperience } from 'src/app/shared/models/interfaces/educationalExperience.interface';
import { FeedbackRequest } from 'src/app/shared/models/interfaces/feedback.interface';
import { File } from 'src/app/shared/models/interfaces/file.interface';
import { FilterTalentResponse, TalentResponse, TalentSalaryRequest, TalentSocialRequest, TalentSoftSkillRequest, TalentTechnicalSkillRequest } from 'src/app/shared/models/interfaces/talent.interface';
import { UserBasic } from 'src/app/shared/models/interfaces/user.interface';
import { WorkExperience, WorkExperienceRequest } from 'src/app/shared/models/interfaces/workExperience.interface';

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

  changeTalent(talentId: number) {
    console.log('changeTalent called with talentId:', talentId);
    if (this.currentTalentValue?.id === talentId) {
      console.log('currentTalentValue.id is equal to talentId');
      // console.log(this.currentTalentValue.workExperiencesList)
      // console.log(this.currentTalentValue.educationalExperiencesList)
      console.log(this.currentTalentValue.averageRating)
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
    if (talents.length === 0) {
      this.currentTalentValue = null; // Actualizamos el talento seleccionado a null
      this.talentSource.next(null);
    }
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
          this.currentTalentValue.workExperiencesList.push({ id: 0, company: workExperience.company, position: workExperience.position, startDate: workExperience.startDate, endDate: workExperience.endDate });
          this.talentSource.next(this.currentTalentValue);
          this.changeTalent(this.currentTalentValue.id);
          this.toast.success('Se agregó una experiencia laboral');
        }
      });
    }
  }

  addEducationalExperienceToCurrentTalent(id: number, educationalInstitute: string, career: string, degree: string, startDate: Date, endDate: Date) {
    if (this.currentTalentValue) {
      const educationalExperience: EducationalExperience = {
        id: id,
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

  addLanguageToCurrentTalent(languageId: number, levelId: number, numberOfStars: number, language: string, level: string) {
    if (this.currentTalentValue) {
      this.talentService.addLanguage(this.currentTalentValue.id, { languageId, levelId, numberOfStars }).pipe(
        catchError(error => {
          this.toast.error('Hubo un error al agregar el idioma');
          throw error;
        })
      ).subscribe(() => {
        if (this.currentTalentValue) {
          this.currentTalentValue.languagesList.push({ id: 0, languageId: languageId, levelId: levelId, numberOfStars: numberOfStars, language: language, level: level });
          this.talentSource.next(this.currentTalentValue);
          this.changeTalent(this.currentTalentValue.id);
          this.toast.success('Se agregó un idioma');
        }
      });
    }
  }

  addFileToCurrentTalent(fileData: File) {
    if (this.currentTalentValue) {
      this.talentService.addFile(this.currentTalentValue.id, fileData).pipe(
        catchError(error => {
          this.toast.error('Hubo un error al agregar el archivo');
          throw error;
        })
      ).subscribe(() => {
        if (this.currentTalentValue) {
          this.currentTalentValue.filesList.push(fileData);
          this.talentSource.next(this.currentTalentValue);
          this.changeTalent(this.currentTalentValue.id);
          this.toast.success('Se agregó un archivo');
        }
      });
    }
  }

  addFeedbackToCurrentTalent(starsRating: number, description: string, userId: number, userImage: UserBasic) {
    if (this.currentTalentValue) {
      const newWorkExperience: FeedbackRequest = {
        talentId: this.currentTalentValue.id,
        starsRating: starsRating,
        description: description,
        userId: userId,
      };
      this.talentService.addFeedback(newWorkExperience).pipe(
        catchError(error => {
          this.toast.error('Hubo un error al agregar el feedback');
          throw error;
        })
      ).subscribe(() => {
        if (this.currentTalentValue) {
          this.currentTalentValue.feedbacksList.push({
            id: 0,
            starsNumber: starsRating,
            description: description,
            user: userImage
          });
          this.talentService.getBasicTalent().subscribe((talents: FilterTalentResponse[]) => {
            this.updateTalentList(talents);
          });
          // this.toast.success('Se agregó el feedback');
          this.talentService.getTalentById(this.currentTalentValue.id).subscribe(updatedTalent => {
            // Actualiza el talento actual con los datos actualizados
            this.currentTalentValue = updatedTalent;
            this.talentSource.next(this.currentTalentValue);
            // this.changeTalent(this.currentTalentValue.id);
          });
          this.toast.success('Se agregó el feedback');
        }
      });
    }
  }

  updateLanguageForCurrentTalent(id: number, languageId: number, levelId: number, numberOfStars: number, language: string, level: string) {
    if (this.currentTalentValue) {
      this.talentService.updateLanguage(this.currentTalentValue.id, id, { languageId, levelId, numberOfStars }).pipe(
        catchError(error => {
          this.toast.error('Hubo un error al actualizar el idioma');
          throw error;
        })
      ).subscribe(() => {
        if (this.currentTalentValue) {
          const index = this.currentTalentValue.languagesList.findIndex(l => l.id === id);
          if (index !== -1) {
            this.currentTalentValue.languagesList[index] = { id: id, languageId: languageId, levelId: levelId, numberOfStars: numberOfStars, language: language, level: level };
            this.talentSource.next(this.currentTalentValue);
            this.changeTalent(this.currentTalentValue.id);
            this.toast.success('Se actualizó el idioma');
          }
        }
      });
    }
  }

  updateWorkExperienceForCurrentTalent(workExpId: number, id: number, company: string, position: string, startDate: Date, endDate: Date) {
    if (this.currentTalentValue) {
      const newWorkExperience: WorkExperience = {
        id: id,
        company: company,
        position: position,
        startDate: startDate,
        endDate: endDate
      };
      this.talentService.updateWorkExperience(this.currentTalentValue.id, workExpId, newWorkExperience).pipe(
        catchError(error => {
          this.toast.error('Hubo un error al actualizar la experiencia laboral');
          throw error;
        })
      ).subscribe(() => {
        if (this.currentTalentValue) {
          const index = this.currentTalentValue.workExperiencesList.findIndex(we => we.id === workExpId);
          if (index !== -1) {
            this.currentTalentValue.workExperiencesList[index] = newWorkExperience;
            this.talentSource.next(this.currentTalentValue);
            // this.updatedTalent.next(this.currentTalentValue);
            this.changeTalent(this.currentTalentValue.id);
            this.toast.success('Se actualizó la experiencia laboral');
          }
        }
      });
    }
  }

  updateEducationalExperienceForCurrentTalent(eduExpId: number, id: number, educationalInstitute: string, career: string, degree: string, startDate: Date, endDate: Date) {
    if (this.currentTalentValue) {
      const newEducationalExperience: EducationalExperience = {
        id: id,
        educationalInstitute: educationalInstitute,
        career: career,
        degree: degree,
        startDate: startDate,
        endDate: endDate
      };
      this.talentService.updateEducationalExperience(this.currentTalentValue.id, eduExpId, newEducationalExperience).pipe(
        catchError(error => {
          this.toast.error('Hubo un error al actualizar la experiencia educativa');
          throw error;
        })
      ).subscribe(() => {
        if (this.currentTalentValue) {
          const index = this.currentTalentValue.educationalExperiencesList.findIndex(ee => ee.id === eduExpId);
          if (index !== -1) {
            this.currentTalentValue.educationalExperiencesList[index] = newEducationalExperience;
            this.talentSource.next(this.currentTalentValue);
            // this.updatedTalent.next(this.currentTalentValue);
            this.changeTalent(this.currentTalentValue.id);
            this.toast.success('Se actualizó la experiencia educativa');
          }
        }
      });
    }
  }

  updateImageForCurrentTalent(image: string) {
    if (this.currentTalentValue) {
      this.talentService.updateImage(this.currentTalentValue.id, image).pipe(
        catchError(error => {
          this.toast.error('Hubo un error al actualizar la imagen');
          throw error;
        })
      ).subscribe(() => {
        if (this.currentTalentValue) {
          this.currentTalentValue.image = image;
          this.talentSource.next(this.currentTalentValue);
          this.changeTalent(this.currentTalentValue.id);
          this.toast.success('Se actualizó la imagen');
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
