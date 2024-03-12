import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { Language } from 'src/app/shared/models/interfaces/language.interface';
import { Level } from 'src/app/shared/models/interfaces/level-interface';
import { CustomValidators } from '../../Validations/CustomValidators';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
})
export class AddLanguageComponent implements OnInit {
  @Input() modal_id!: string;
  languageForm!: FormGroup;
  @Input() languages: Language[] = [];
  @Input() levels: Level[] = [];

  constructor(private fb: FormBuilder, private talentDetailService: TalentDetailService) { }

  ngOnInit(): void {
    this.formBuild();
  }

  cancelForm() {
    this.languageForm.reset();
  }

  formBuild() {
    this.languageForm = this.fb.group({
      languageId: [null, [CustomValidators.required, CustomValidators.notNullValidator]],
      levelId: [null, [CustomValidators.required, CustomValidators.notNullValidator]],
      numberOfStars: [null, [CustomValidators.required]],
    });
  }

  onSubmit() {
    if (this.languageForm.valid) {
      const { languageId, levelId, numberOfStars } = this.languageForm.value;

      const languageObj = this.languages.find(lang => lang.id === Number(languageId));
      const levelObj = this.levels.find(lvl => lvl.id === Number(levelId));

      const language = languageObj ? languageObj.language : '';
      const level = levelObj ? levelObj.level : '';

      console.log(languageId, levelId, numberOfStars, language, level);

      this.talentDetailService.addLanguageToCurrentTalent(
        languageId,
        levelId,
        numberOfStars,
        language,
        level
      );
      this.cancelForm();
    }
  }
}
