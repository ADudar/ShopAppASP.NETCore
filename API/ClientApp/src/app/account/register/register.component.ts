import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../account.service';
import {Router} from '@angular/router';
import {of, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[];

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {

  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
        displayName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email], [this.validateEmailNotTaken()]],
        password: ['', [Validators.required]],
      }
    );
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value)
      .subscribe(r => {
        this.router.navigateByUrl('/shop');
      }, e => {
        console.error(e);
        this.errors = e.errors;
      });
  }

  validateEmailNotTaken() {
    return control => {
      return timer(500)
        .pipe(
          switchMap(() => {
            if (!control.value) {
              return of(null);
            }
            return this.accountService.checkEmailExists(control.value)
              .pipe(
                map(res => {
                  return res ? {emailExists: true} : null;
                })
              );
          })
        );
    };
  }
}
