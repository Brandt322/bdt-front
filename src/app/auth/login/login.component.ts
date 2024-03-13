import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/shared/components/utils/Validations/CustomValidators';
import { LoginService } from '../services/login.service';
import { LoginRequest } from 'src/app/shared/models/interfaces/login.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService, private toast: ToastrService) { }

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
      // console.log(this.loginForm.value);
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (data) => {
          console.log('data: ', data);
          this.toast.success('Bienvenido');
          this.router.navigate(['/main']);
          this.loginForm.reset();
        },
        error: (error) => {
          console.log('error: ', error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
