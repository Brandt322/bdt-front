import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/shared/components/utils/Validations/CustomValidators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginFormBuild();
  }

  loginFormBuild() {
    this.loginForm = this.fb.group({
      username: ['', [CustomValidators.required, CustomValidators.emailValidator()]],
      password: ['', [CustomValidators.required, CustomValidators.minLength(1)]],
    });
  }

  onButtonClick() {
    this.router.navigate(['/main']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.router.navigate(['/main']);
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
