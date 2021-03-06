import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

validations_form: FormGroup;
errorMessage: string = '';

  constructor(
    private navCtrl: NavController,
    private authSrv: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.'},
    ]
  };


  loginUser(value){
    this.authSrv.loginUser(value)
        .then(res => {
          console.log(res);
          this.errorMessage = '';
          this.validations_form.reset();
          this.navCtrl.navigateForward('/pages');
        }, err => {
          this.errorMessage = err.message;
        });
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register')
  }
}
