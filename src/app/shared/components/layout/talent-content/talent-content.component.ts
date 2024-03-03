import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { TalentResponse } from 'src/app/shared/models/interfaces/talent.interface';

@Component({
  selector: 'app-talent-content',
  templateUrl: './talent-content.component.html',
  styleUrls: ['./talent-content.component.css']
})
export class TalentContentComponent implements OnInit {

  talent: TalentResponse | null = null;

  constructor(private talentDetailService: TalentDetailService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.talentDetailService.currentTalent.subscribe(talent => {
      this.talent = talent;
      console.log(this.talent?.filesList);

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

  get workExperienceDescription() {
    return this.talent?.workExperiencesList?.map(experience => {
      const startDate = new Date(experience.startDate);
      const endDate = new Date(experience.endDate);
      const years = endDate.getFullYear() - startDate.getFullYear();

      if (years === 0) {
        return `${experience.position} ${startDate.getFullYear()} - Hasta la actualidad`;
      }

      if (years === 1) {
        return `${experience.position} ${startDate.getFullYear()}-${endDate.getFullYear()} 1 año`;
      }

      return `${experience.position} ${startDate.getFullYear()}-${endDate.getFullYear()} ${years} años`;
    }).join(' ') || '';
  }

  get educationaInstitute() {
    return this.talent?.educationalExperiencesList?.map(experience => experience.educationalInstitute).join(' ') || '';
  }

  get educationalExperienceDescription() {
    const currentYear = new Date().getFullYear();
    return this.talent?.educationalExperiencesList?.map(experience => {
      const startDate = new Date(experience.startDate);
      const endDate = new Date(experience.endDate);

      if (endDate.getFullYear() === currentYear) {
        return `${experience.degree} ${startDate.getFullYear()} - En curso`;
      }

      return `${experience.degree} ${startDate.getFullYear()}-${endDate.getFullYear()}`;
    }).join(' ') || '';
  }
}
