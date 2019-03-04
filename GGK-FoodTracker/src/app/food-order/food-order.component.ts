import { LoaderService } from './../loader/loader.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PreviousOrder } from '../Models/previous-orders';
import { DatePipe } from '@angular/common';
import { orderConstants } from '../constants/constants';
import { MessageService } from 'primeng/api';
import { FoodOrderService } from './food-order.service';
import {PlaceOrder}  from '../Models/place-order';

@Component({
  selector: 'app-food-order',
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.css'],
  providers: [MessageService]
})
export class FoodOrderComponent implements OnInit {

  constructor(private datePipe: DatePipe,
    private messageService: MessageService,
    private foodOrderService: FoodOrderService,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  // previousOrders: PreviousOrder[] =   [{"orderID":4,"itemName":"Chapathi","status":"Pending","orderDate":"2019-02-26","employeeID":5},{"orderID":5,"itemName":"Meals","status":"Pending","orderDate":"2019-02-26","employeeID":5},{"orderID":6,"itemName":"Meals","status":"Pending","orderDate":"2019-02-26","employeeID":5},{"orderID":7,"itemName":"Meals","status":"Pending","orderDate":"2012-06-18","employeeID":5},{"orderID":8,"itemName":"Meals","status":"Pending","orderDate":"2019-06-18","employeeID":5}];

  previousOrders: any;
  value: Date = new Date();
  minDate = this.value;
  correctTime: boolean = true;
  viewOrder: boolean = false;
  employeeDetails: any;
  date: string;
  disableDate: Date[] = [];
  itemsList = orderConstants.ItemsList;

  employeeScreen: boolean = true;
  managerScreen: boolean = false;
  AdminScreen: boolean = false;

  selectedItem: any = {};
  navigationSubscription;

  cols = orderConstants.ItemTableColumns;
  managerName: string;
  email: string;
  items: any[];

  ngOnInit() {
    
    this.email = localStorage.getItem('email');
    console.log(new Date())
    this.getEmployeeDetails(this.email);
    // this.items = this.previousOrders.map(x => this.mapName(x.itemName));
    this.orderClick(0);
    this.value = new Date();
    if (this.value.getHours() >= 18 ) {
      // this.correctTime = false;
      // this.disableDate.push(this.value)
      this.value =  new Date(this.value.setDate(this.value.getDate() + 1));
      let d = new Date()
      this.disableDate.push(d);
    }
    
    this.selectedItem.code = "1";
  }

  getEmployeeDetails(email: string) {
    this.loaderService.showLoader();
    this.foodOrderService.getEmployeeDetailsByMailID(email).subscribe(
      details => {
        this.loaderService.hideLoader();
        console.log(details)
        this.employeeDetails = details;
        let employeeDetailsString = JSON.stringify(details);
        localStorage.setItem('EmployeeDetails', employeeDetailsString);
        this.setScreen();
      }
    );
  }

  getPreviousDetails() {
    let id: number = JSON.parse(localStorage.getItem('EmployeeDetails')).employeeID;
    this.loaderService.showLoader();
    this.foodOrderService.getPreviousOrdersByEmpID(this.employeeDetails.employeeID).subscribe(data => {
      this.loaderService.hideLoader();
      console.log(data);
      this.previousOrders = data;
      this.previousOrders = this.previousOrders.reverse();
      this.managerName = JSON.parse(localStorage.getItem('EmployeeDetails')).managerName;
    });
  }

  setScreen() {
    let role = JSON.parse(localStorage.getItem('EmployeeDetails')).roleID;
    // debugger;
    switch (role) {
      case 1: {
        this.employeeScreen = true
        this.managerScreen = false;
        this.AdminScreen = false;
        break;
      }
      case 2: {
        this.employeeScreen = false
        this.managerScreen = true;
        this.AdminScreen = false;
        break;
      }
      case 3: {
        this.employeeScreen = false
        this.managerScreen = false;
        this.AdminScreen = true;
        break;
      }
      default: {
        this.employeeScreen = true
        this.managerScreen = false;
        this.AdminScreen = false;
        break;
      }
    }

    this.getPreviousDetails();
  }

  ngOnChanges() {
    this.previousOrders;
  }

  mapName(name) {
    var item = new dropdownMenu();
    item.name = name;
    return item;
  }

  orderClick(state) {
    var containerElement = document.getElementById('orders_list');
    var overlayEle = document.getElementById('order');
    var managementTable = document.getElementById('management_list');
    var trackingTable = document.getElementById('tracking_list');

    if (state) {
      overlayEle.style.display = 'block';
      containerElement.setAttribute('class', 'blur');
      if (this.managerScreen) {
        managementTable.setAttribute('class', 'blur');
      }
      if (this.AdminScreen) {
        trackingTable.setAttribute('class', 'blur');
      }
    } else {
      overlayEle.style.display = 'none';
      containerElement.setAttribute('class', null);
      if (this.managerScreen) {
        managementTable.setAttribute('class', null);
      }
      if (this.AdminScreen) {
        trackingTable.setAttribute('class', null);
      }
      this.value = new Date();
      this.viewOrder = false
    }
  }

  nextClicked() {
    let date = new Date();
    if (date.getHours() >= 18 && this.value.getDate() <= date.getDate() && (this.value.getMonth() < date.getMonth() || this.value.getFullYear || date.getFullYear())) {
      this.correctTime = false;
    }
    else {
      this.correctTime = true;
      this.date = this.datePipe.transform(this.value, 'dd-MM-yyyy');
      this.viewOrder = true;
    }
  }

  placeOrder() {
    let date = new Date();
    if (date.getHours() >= 18 && this.value.getDate() <= date.getDate() && (this.value.getMonth() < date.getMonth() || this.value.getFullYear || date.getFullYear())) {
      this.correctTime = false;
      this.value = null
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: 'Error!!', detail: "you can't order at this time" });
    }
    else {
      this.correctTime = true;
      this.date = this.datePipe.transform(this.value, 'dd-MM-yyyy');
      this.viewOrder = true;
    }
    let order: PlaceOrder = new PlaceOrder();
    order.employee.employeeID = this.employeeDetails.employeeID;
    order.manager.employeeID = '5';
    order.orderLocation.locationID = this.employeeDetails.locationID;
    order.orderStatus.statusID = '1';
    order.orderdate = this.datePipe.transform(this.value, 'yyyy-MM-dd');
    if (this.selectedItem.code == "1") {
      order.foodItem.itemID = '1'
    } else {
      order.foodItem.itemID = '2'
    }
    debugger;
    if(this.correctTime){
      this.orderClick(0);
      this.loaderService.showLoader();
      this.foodOrderService.placeOrder(order).subscribe(data =>{
        console.log(data);
        this.loaderService.hideLoader();
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: 'Order Placed', detail: 'Sent for Managers Approval' });
        this.previousOrders();
      })
      // this.loaderService.showLoader();
      this.foodOrderService.getPreviousOrdersByEmpID(this.employeeDetails.employeeID).subscribe(data => {
        // this.loaderService.hideLoader();
        console.log(data);
        this.previousOrders = data;
        this.previousOrders = this.previousOrders.reverse();
  
      });
    }

  }

  sendApprovalRequest() {
    this.viewOrder = false;
    let order: PreviousOrder = new PreviousOrder();
    order.orderDate = this.datePipe.transform(this.value, 'dd-MM-yyyy');
    console.log(order.orderDate);
    if (this.selectedItem.code == "1") {
      order.itemName = 'Chapati'
    } else {
      order.itemName = 'Meals'
    }
    order.status = "pending";
    this.previousOrders.splice(0, 0, order);
    console.log(this.previousOrders);
    this.orderClick(0);
    this.messageService.clear();
    this.messageService.add({ severity: 'success', summary: 'Order Placed', detail: 'Sent for Managers Approval' });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}

class dropdownMenu {
  name: string;
}


