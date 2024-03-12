import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { initModals } from 'flowbite';
import { TalentDetailService } from 'src/app/features/services/talent-detail.service';
import { MasterService } from 'src/app/services/master/master.service';
import { Language, LanguageRequest } from 'src/app/shared/models/interfaces/language.interface';
import { Level } from 'src/app/shared/models/interfaces/level-interface';
import { CustomValidators } from '../../Validations/CustomValidators';

@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
})
export class EditLanguageComponent implements OnInit {
  @Input() modal_id!: string;
  @Input() languageList!: LanguageRequest;
  @Input() id!: number;
  @Input() languageOptions: Language[] = [];
  @Input() levelOptions: Level[] = [];
  languageForm!: FormGroup;

  constructor(private fb: FormBuilder, private talentDetailService: TalentDetailService) { }

  ngOnInit(): void {
    this.formBuild();
    // setTimeout(() => initModals());
  }

  formBuild() {
    this.languageForm = this.fb.group({
      languageId: [this.languageList.languageId, [CustomValidators.required, CustomValidators.notNullValidator]],
      levelId: [this.languageList.levelId, [CustomValidators.required, CustomValidators.notNullValidator]],
      numberOfStars: [this.languageList.numberOfStars, CustomValidators.required],
    });
  }

  cancelForm() {
    this.languageForm.reset({
      languageId: this.languageList.languageId,
      levelId: this.languageList.levelId,
      numberOfStars: this.languageList.numberOfStars,
    });
  }

  onSubmit() {
    if (this.languageForm.valid) {
      console.log(this.languageForm.value);
      const { languageId, levelId, numberOfStars } = this.languageForm.value;
      const languageObj = this.languageOptions.find(lang => lang.id === Number(languageId));
      const levelObj = this.levelOptions.find(lvl => lvl.id === Number(levelId));
      const language = languageObj ? languageObj.language : '';
      const level = levelObj ? levelObj.level : '';
      this.talentDetailService.updateLanguageForCurrentTalent(
        this.id,
        languageId,
        levelId,
        numberOfStars,
        language,
        level
      );
    }
  }
}
