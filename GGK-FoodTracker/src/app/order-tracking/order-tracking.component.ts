import { LoaderService } from './../loader/loader.service';
import { DatePipe } from '@angular/common';
import { FoodOrderService } from './../food-order/food-order.service';
import { Component, OnInit } from '@angular/core';
import { TrackingConstants, CommomConstants } from '../constants/constants';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {

  // allEmployeeOrders: any[] = [
  //   { 'employeeId': 709, 'employeeName': 'Navneeth', 'managerName': 'Abhishek', 'location': 'Gachibowli', 'itemName': 'Chapati' },
  //   { 'employeeId': 1156, 'employeeName': 'Swathi', 'managerName': 'Abhishek', 'location': 'Gachibowli', 'itemName': 'Meals' },
  //   { 'employeeId': 1865, 'employeeName': 'SaiRaj', 'managerName': 'Abhishek', 'location': 'Gachibowli', 'itemName': 'Meals' },
  //   { 'employeeId': 1765, 'employeeName': 'SatyaNarayana', 'managerName': 'Abhishek', 'location': 'Gachibowli', 'itemName': 'Chapati' },
  //   { 'employeeId': 1955, 'employeeName': 'Amrutha', 'managerName': 'Abhishek', 'location': 'Waverock', 'itemName': 'Meals' },
  //   { 'employeeId': 1765, 'employeeName': 'SatyaNarayana', 'managerName': 'Abhishek', 'location': 'Uppal', 'itemName': 'Chapati' },
  //   { 'employeeId': 1955, 'employeeName': 'Amrutha', 'managerName': 'Abhishek', 'location': 'Gachibowli', 'itemName': 'Meals' },
  //   { 'employeeId': 1765, 'employeeName': 'SatyaNarayana', 'managerName': 'Abhishek', 'location': 'Uppal', 'itemName': 'Chapati' },
  //   { 'employeeId': 1955, 'employeeName': 'Amrutha', 'managerName': 'Abhishek', 'location': 'Waverock', 'itemName': 'Meals' },
  // ];

  allEmployeeOrders: any;
  fileName: string = "GGK_dinner_orders";
  pieData : any;
  locationVal: number = 0;
  countTable: ItemsCount[] = [];
  gachibowli_pie: any;
  waverock_pie: any;
  val2 = 'Option 2';
  uppal_pie: any;
  locationSelected: string = 'Gachibowli';
  locations: string[] = ['Gachibowli', 'Waverock', 'Uppal'];
  items: string[] = ['Chapathi', 'Meals']
  locationsSeach = CommomConstants.locations;
  tableColumns = TrackingConstants.TrackingTableColumns;

  countTableColumns = TrackingConstants.CountTableColumns;

  constructor(private fooOrderService: FoodOrderService,
              private datePipe: DatePipe,
              private loaderService: LoaderService) { }

  ngOnInit() {
    this.getEmployeesOrdersForToday();
  }

  ngOnChanges(){
    // this.countTable;
  }

  getEmployeesOrdersForToday(){
    let date = new Date();
    let latest_date = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log(latest_date);
    this.loaderService.showLoader();
    this.fooOrderService.getOrdersByDate(latest_date).subscribe(data =>{
      
      this.allEmployeeOrders = data;
      this.getCounts();
    })
    console.log(this.allEmployeeOrders);
  }

  getCounts() {
    this.locations.forEach(location => {
      let itemCount = new ItemsCount();
      itemCount.locationName = location;
      // itemCount.Meals = 0;
      // itemCount.Chapathi = 0;
      this.items.forEach(item => {
        itemCount[item] = this.allEmployeeOrders.filter((x) => x.locationName === location && x.itemName === item).length;
      })
      this.countTable.push(itemCount)
      
    });
    this.getPieCharts();
    console.log(this.countTable)
  }

  getPieCharts() {
    this.gachibowli_pie = {
      labels: ['Chapathi', 'Meals'],
      datasets: [
        {
          data: [this.countTable[0].Chapathi, this.countTable[0].Meals],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
          ]
        }]
    };
    this.waverock_pie = {
      labels: ['Chapathi', 'Meals'],
      datasets: [
        {
          data: [this.countTable[1].Chapathi, this.countTable[1].Meals],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
          ]
        }]
    };
    this.uppal_pie = {
      labels: ['Chapathi', 'Meals'],
      datasets: [
        {
          data: [this.countTable[2].Chapathi, this.countTable[2].Meals],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
          ]
        }]
    };
    this.pieData = this.gachibowli_pie;
    this.locationVal = 0;
    this.loaderService.hideLoader();
  }

  onLocationChange(location) {
    switch(location){
      case 1 :{
        this.pieData = this.gachibowli_pie;
        this.locationVal = 0;
        break;
      }
      case 2: {
        this.pieData = this.waverock_pie;
        this.locationVal = 1;
        break;
      }
      case 3: {
        this.pieData = this.uppal_pie;
        this.locationVal = 2;
        break;
      }
    }
  }

}

class ItemsCount {
  locationName: string;
  Chapathi: number;
  Meals: number;
}
