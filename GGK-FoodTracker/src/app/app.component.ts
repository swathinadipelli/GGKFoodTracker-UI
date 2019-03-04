import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  employeeName: any ;
  title = 'FoodTracker';
  login: boolean = false;
  constructor(private router: Router) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        debugger;
        if (event['url'] == '/login') {
          this.login = false;
        } else {
          // console.log("NU")
          this.login = true;
        }
      }
      
    });    
  }
  ngOnInit() {
    // if(JSON.parse(localStorage.getItem('EmployeeDetails')).employeeName === null){
    //   this.employeeName = "EmployeeName"
    // }
    // else{
    //   this.employeeName=JSON.parse(localStorage.getItem('EmployeeDetails')).employeeName;
    // }
    // try{
    //   this.employeeName=JSON.parse(localStorage.getItem('EmployeeDetails')).employeeName;
    // }
    // catch(error){
    //   this.employeeName = "EmployeeName"
    // }
  }

  logOut() {
    localStorage.clear();
    this.login = false;
    this.router.navigate(['/login']);
  }
}
