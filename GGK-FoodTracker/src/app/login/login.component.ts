import { LoaderService } from './../loader/loader.service';
import { FoodOrderService } from './../food-order/food-order.service';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Login } from '../Models/login-model';
import {} from '../loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, 
              private fb: FormBuilder, 
              private messageService: MessageService,
              private loginService: FoodOrderService,
              private loaderService: LoaderService ) { }

  loginForm: FormGroup;
  users = [];
  validUser: boolean = false;
  loginModel: Login = new Login();
  login: boolean = false;
  loading: boolean = false;
  wrongPass: boolean = false;

  ngOnInit() {
    localStorage.clear();
    this.login = true;
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }
  Login() {
    this.login = false;
    if (this.loginForm.valid) {
      let userName = this.loginForm.get('userName').value;
      let password = this.loginForm.get('password').value;

      this.loginModel.mailID = userName;
      this.loginModel.password = window.btoa(password);
      console.log(this.loginModel.password)
      this.loaderService.showLoader();
      this.loginService.login(this.loginModel).subscribe(data =>{
        if(data){
          localStorage.setItem('email', userName);
          this.login = true;
          localStorage.setItem('login', 'true');
          this.loaderService.hideLoader();
          this.router.navigate(['/fo']);
        }
        else {
          this.loaderService.hideLoader();
          this.login = false;
        }
      })
     
    //   users.forEach(element => {
    //     if (userName == element.userName) {
    //       if (password == element.password) {
    //         this.login = true;
    //         localStorage.setItem('email', userName);
    //         console.log("logged in");
    //         localStorage.setItem('login', 'true');
    //         // debugger;
    //         this.router.navigate(['/fo']);
    //       }
    //       else {
    //         this.wrongPass = true;
    //         console.log("oops")
    //       }
    //     }
    //   });
    }

  }

}
