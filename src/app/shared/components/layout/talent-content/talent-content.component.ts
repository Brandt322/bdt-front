import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { TalentService } from 'src/app/services/talent/talent.service';
import { TalentResponse } from 'src/app/shared/models/interfaces/talent.interface';
import { SharedDataService } from '../../services/shared-data-service.service';
import { ProcesseEducationalExperiences, ProcessedWorkExperiences } from 'src/app/shared/models/types';



@Component({
  selector: 'app-talent-content',
  templateUrl: './talent-content.component.html',
  styleUrls: ['./talent-content.component.css']
})
export class TalentContentComponent implements OnInit {

  talent: TalentResponse | null = null;
  processedWorkExperiences: ProcessedWorkExperiences[] = [];
  processeEducationalExperiences: ProcesseEducationalExperiences[] = [];
  constructor(private talentDetailService: TalentDetailService, private sanitizer: DomSanitizer, private talentService: TalentService, private data: SharedDataService) { }

  ngOnInit() {
    this.talentDetailService.currentTalent.subscribe(talent => {
      this.talent = talent;
      // console.log(this.talent?.filesList);
      this.processedWorkExperiences = this.workExperiences;
      this.processeEducationalExperiences = this.educationalExperiences;
    });
    this.talentDetailService.updatedTalent.subscribe(updatedTalent => {
      this.talent = updatedTalent;
      this.processedWorkExperiences = this.workExperiences;
      this.processeEducationalExperiences = this.educationalExperiences;
    });
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  get technicalSkills() {
    return this.talent?.technicalSkillsList?.map(skill => ({ skill: skill.skill, years: skill.years })) || [];
  }

  get softSkills() {
    return this.talent?.softSkillsList?.map(skill => ({ skill: skill.skill })) || [];
  }

  get description() {
    return this.talent?.description ? (this.talent.description.charAt(0).toUpperCase() + this.talent.description.slice(1).toLowerCase()) : '';
  }

  get companyWork() {
    return this.talent?.workExperiencesList?.map(experience => experience.company).join(' ') || '';
  }


  get workExperiences() {
    return this.talent?.workExperiencesList?.map(experience => {
      const startDate = new Date(experience.startDate);
      const endDate = new Date(experience.endDate);
      const years = endDate.getFullYear() - startDate.getFullYear();
      let description;

      if (years === 0) {
        description = `${experience.position} ${startDate.getFullYear()} - Hasta la actualidad`;
      } else if (years === 1) {
        description = `${experience.position} ${startDate.getFullYear()}-${endDate.getFullYear()} 1 año`;
      } else {
        description = `${experience.position} ${startDate.getFullYear()}-${endDate.getFullYear()} ${years} años`;
      }

      return {
        id: experience.id,
        company: experience.company,
        position: experience.position,
        startDate: experience.startDate,
        endDate: experience.endDate,
        description: description
      };
    }) || [];
  }

  get educationaInstitute() {
    return this.talent?.educationalExperiencesList?.map(experience => experience.educationalInstitute).join(' ') || '';
  }

  get educationalExperiences() {
    const currentYear = new Date().getFullYear();
    return this.talent?.educationalExperiencesList?.map(experience => {
      const startDate = new Date(experience.startDate);
      const endDate = new Date(experience.endDate);
      let description;

      if (endDate.getFullYear() === currentYear) {
        description = `${experience.degree} ${startDate.getFullYear()} - En curso`;
      } else {
        description = `${experience.degree} ${startDate.getFullYear()}-${endDate.getFullYear()}`;
      }

      return {
        id: experience.id,
        educationalInstitute: experience.educationalInstitute,
        career: experience.career,
        degree: experience.degree,
        startDate: experience.startDate,
        endDate: experience.endDate,
        description: description
      };
    }) || [];
  }

  editDescription() {
    this.data.changeDescription(this.description);
  }
}
