import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
})
export class SignComponent implements OnInit {
  public formAuth: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public msgError!: string;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  public submitForm() {
    if (this.formAuth.valid) {
      this.authService
        .sign({
          username: this.formAuth.value.username,
          password: this.formAuth.value.password,
        })
        .subscribe({
          next: (res) => res,
          error: (err) => (this.msgError = err.error.message),
        });
    }
  }
}
