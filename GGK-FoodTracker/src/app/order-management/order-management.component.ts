import { LoaderService } from './../loader/loader.service';
import { DatePipe } from '@angular/common';
import { FoodOrderService } from './../food-order/food-order.service';
import { Component, OnInit } from '@angular/core';
import { ManagementsConstants, CommomConstants } from '../constants/constants';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css'],
  providers: [MessageService]
})
export class OrderManagementComponent implements OnInit {
  managerId = 5;
  statusID = 1;
  orderDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')

  // employeesOrders: any[] = [
  //   { 'employeeName': 'Navneeth', 'location': 'Gachibowli', 'status': 'pending' },
  //   { 'employeeName': 'Swathi', 'location': 'Gachibowli', 'status': 'pending' },
  //   { 'employeeName': 'SaiRaj', 'location': 'Gachibowli', 'status': 'pending' },
  //   { 'employeeName': 'Amrutha', 'location': 'Gachibowli', 'status': 'pending' },
  //   { 'employeeName': 'SatyaNarayana', 'location': 'Gachibowli', 'status': 'pending' },
  // ];

  employeesOrders: any;

  // managerId = 6;
  // statusID = 1;
  // orderDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')

  mgntCols = ManagementsConstants.ManagementTableColumns;

  locations = CommomConstants.locations;

  constructor(private messageService: MessageService,
              private foodOrderService: FoodOrderService,
              private datePipe: DatePipe,
              private loaderService: LoaderService) { }

  ngOnInit() {
    let managerId = 5;
    let statusID = 1;
    let orderDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    this.foodOrderService.getOrdersByManager(managerId, statusID, orderDate).subscribe(data => {
      this.employeesOrders = data
    })
  }

  ngOnchanges() {
    this.employeesOrders
  }

  managerAck(orderId: number, statusId: number, employeeName: string){
    this.loaderService.showLoader();
    this.foodOrderService.orderAcknoledgment(orderId, statusId).subscribe(data =>{
      if(data){
        if(statusId == 2){
          this.loaderService.hideLoader();
          this.messageService.clear();
          this.messageService.add({severity:'success', summary:'Approved', detail:'you have approved ' + employeeName + "'s order"});
          this.foodOrderService.getOrdersByManager(this.managerId, this.statusID, this.orderDate).subscribe(data => {
            this.employeesOrders =data
          })
        }
        if(statusId == 3){
          this.loaderService.hideLoader();
          this.messageService.clear();
          this.messageService.add({severity:'error', summary:'Rejected', detail:'you have rejected ' + employeeName + "'s order"});
          this.foodOrderService.getOrdersByManager(this.managerId, this.statusID, this.orderDate).subscribe(data => {
            this.employeesOrders =data
          })
        }
      }
    })
  }

  // approved(employeeName: string) {
  //   console.log("Food will be provided for " + employeeName);
  //   let index = this.employeesOrders.indexOf(this.employeesOrders.find((x) => x.employeeName == employeeName));
  //   this.employeesOrders[index].status = 'approved';
  //   // this.employeesOrders.splice(index, 1);
  //   console.log(this.employeesOrders);
  //   this.messageService.clear();
  //   this.messageService.add({severity:'success', summary:'Approved', detail:'you have approved ' + employeeName + "'s order"});
  // }

  // rejected(employeeName: string) {
  //   console.log("Food will not be provided for " + employeeName);
  //   let index = this.employeesOrders.indexOf(this.employeesOrders.find((x) => x.employeeName === employeeName));
  //   this.employeesOrders[index].status = 'cancelled';
  //   // this.employeesOrders.splice(index, 1);
  //   console.log(this.employeesOrders);
  //   this.messageService.clear();
  //   this.messageService.add({severity:'error', summary:'Rejected', detail:'you have rejected ' + employeeName + "'s order"});
  // }
}
