import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { FeedbackResponse, TalentResponse } from 'src/app/shared/models/interfaces/talent.interface';
import { SharedDataService } from '../../services/shared-data-service.service';
import { ProcesseEducationalExperiences, ProcesseLanguages, ProcessedWorkExperiences } from 'src/app/shared/models/types';
import { MASTER_API_ENDPOINTS } from 'src/app/core/global/constants/api-endpoints';
import { LoaderService } from 'src/app/core/global/loader/loader.service';
import { MasterService } from 'src/app/services/master/master.service';
import { catchError, finalize, forkJoin, throwError } from 'rxjs';
import { Language } from 'src/app/shared/models/interfaces/language.interface';
import { Level } from 'src/app/shared/models/interfaces/level-interface';
import { ICarouselItem } from '../../utils/carousel/ICarousel-metadata';
import { CarouselComponent } from '../../utils/carousel/carousel.component';
import { UserPrincipal } from 'src/app/shared/models/interfaces/user.interface';
import { initModals } from 'flowbite';
import { TalentService } from 'src/app/services/talent/talent.service';


@Component({
  selector: 'app-talent-content',
  templateUrl: './talent-content.component.html',
  styleUrls: ['./talent-content.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TalentContentComponent implements OnInit, AfterViewInit {

  talent: TalentResponse | null = null;
  processedWorkExperiences: ProcessedWorkExperiences[] = [];
  processeEducationalExperiences: ProcesseEducationalExperiences[] = [];
  processeLanguages: ProcesseLanguages[] = [];
  processeFeedback: FeedbackResponse[] = [];
  languageOptions: Language[] = [];
  levelOptions: Level[] = [];
  talentFileList: ICarouselItem[] = [];
  userDetails!: UserPrincipal;

  @ViewChild(CarouselComponent) carouselComponent!: CarouselComponent;

  constructor(
    private cdr: ChangeDetectorRef,
    private talentDetailService: TalentDetailService,
    private sanitizer: DomSanitizer,
    private data: SharedDataService,
    private loader: LoaderService,
    private masterService: MasterService,
    private talentService: TalentService
  ) { }

  ngAfterViewInit(): void {
    this.talentDetailService.currentTalent.subscribe(talent => {
      this.talent = talent;
      // console.log(this.talent?.filesList);

      this.talentFileList = this.talent?.filesList?.map((file, index) => {
        return {
          id: index,
          fileName: file.fileName,
          fileType: file.fileType,
          file: file.file
        };
      }) || [];

      this.processedWorkExperiences = this.workExperiences;
      this.processeEducationalExperiences = this.educationalExperiences;
      this.processeLanguages = this.languagesList;
      this.processeFeedback = this.feedbackList;

      // console.log(this.talentFileList)
      // Reset Carousel state
      // this.carouselComponent.resetCarousel();

      // this.cdr.detectChanges();
    });
    this.talentDetailService.updatedTalent.subscribe(updatedTalent => {
      this.talent = updatedTalent;

      this.talentFileList = this.talent?.filesList?.map((file, index) => {
        return {
          id: index,
          fileName: file.fileName,
          fileType: file.fileType,
          file: file.file
        };
      }) || [];

      this.processedWorkExperiences = this.workExperiences;
      this.processeEducationalExperiences = this.educationalExperiences;
      this.processeLanguages = this.languagesList;
      this.processeFeedback = this.feedbackList;
      // console.log(this.processeLanguages)
      // console.log(this.talentFileList)
      // Reset Carousel state
      this.carouselComponent.resetCarousel();

      // this.cdr.detectChanges();
    });
    this.requestOptions();
    this.cdr.detectChanges();
  }

  ngOnInit() {
    if (sessionStorage.getItem('user_data')) {
      const userData = sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data') || '{}') : {};
      console.log(userData)
      this.userDetails = userData.userPrincipal;
    }
  }

  requestOptions() {
    this.loader.showLoader();

    const languageRequest = this.masterService.getLanguage(
      MASTER_API_ENDPOINTS.LANGUAGES
    );
    const levelRequest = this.masterService.getLevel(
      MASTER_API_ENDPOINTS.LEVELS
    );

    forkJoin([
      languageRequest,
      levelRequest,
    ])
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
        finalize(() => this.loader.hideLoader())
      )
      .subscribe(([languages, levels]) => {
        this.languageOptions = languages;
        this.levelOptions = levels;
      });
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  sanitizePdfUrl(base64Data: string) {
    const base64Url = base64Data.split(",")[1];
    const byteCharacters = atob(base64Url);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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

  get languagesList() {
    return this.talent?.languagesList?.map(language => {
      return {
        id: language.id,
        language: language.language,
        languageId: language.languageId,
        level: language.level,
        levelId: language.levelId,
        numberOfStars: language.numberOfStars
      };
    }) || [];
  }

  private handleImage(image: string): string {
    let imagePrefix = 'data:image/jpeg;base64,';
    if (image.startsWith('iVBOR')) {
      imagePrefix = 'data:image/png;base64,';
    } else if (image.startsWith('UklGR')) {
      imagePrefix = 'data:image/webp;base64,';
    }
    return imagePrefix + image;
  }

  get feedbackList() {
    return this.talent?.feedbacksList?.map(feed => {
      feed.user.image = this.handleImage(feed.user.image);
      return {
        id: feed.id,
        starsNumber: feed.starsNumber,
        description: feed.description,
        user: feed.user
      };
    }) || [];
  }

  get educationaInstitute() {
    return this.talent?.educationalExperiencesList?.map(experience => experience.educationalInstitute).join(' ') || '';
  }

  editDescription() {
    this.data.changeDescription(this.description);
  }

  get currentRating() {
    return this.talent?.averageRating || 0;
  }
}
