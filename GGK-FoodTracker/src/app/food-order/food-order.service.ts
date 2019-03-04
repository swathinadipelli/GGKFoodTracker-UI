import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable()
export class FoodOrderService {

    constructor(private http: HttpClient) { }

    getEmployeeDetailsByMailID(email: string): Observable<object> {
        return this.http.get(environment.baseApiUrl + "employee/getEmployeeDetailsByMailID/" + email);
    }

    getPreviousOrdersByEmpID(id: number): Observable<object> {
        return this.http.get(environment.baseApiUrl + "foodorder/getOrdersByEmployeeID/" + id)
    }

    getOrdersByDate(date: string): Observable<object> {
        return this.http.get(environment.baseApiUrl + "foodorder/getApprovedOrdersByDate/" + date);
    }

    getOrdersByManager(managerId, statusId, date): Observable<object> {
        return this.http.get(environment.baseApiUrl + "foodorder/getEmployeeOrdersByManagerID/" + managerId + "/" + statusId + "/" + date);
    }

    placeOrder(orderData): Observable<object> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let options = {
            headers: headers
         }
        return this.http.post(environment.baseApiUrl + 'foodorder/saveOrUpdateFoodOrder', orderData, options);
    }

    orderAcknoledgment(orderId, statusId): Observable<object> {
        return this.http.get(environment.baseApiUrl + 'foodorder/updateFoodOrderStatus/' + orderId + '/' + statusId);
    }

    login(logindata){
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let options = {
            headers: headers
         }
        return this.http.post(environment.baseApiUrl + 'employee/login',logindata,options);
    }
}