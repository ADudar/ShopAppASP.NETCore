import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {

  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
        displayName: ['', [Validators.required]],
        email: ['', [Validators.required]],
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
      });
  }
}
