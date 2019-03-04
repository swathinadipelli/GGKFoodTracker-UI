
  export class PlaceOrder {
    employee: Employee = new Employee()
    manager: Employee = new Employee()
    foodItem: FoodItem = new FoodItem()
    orderStatus: OrderStatus = new OrderStatus()
    orderLocation: OrderLocation = new OrderLocation()
    orderdate: string;
  }

  class Employee {
      employeeID: string;
  }

  class FoodItem {
    itemID: string;
  }

  class OrderStatus {
    statusID: string;
  }

  class OrderLocation {
    locationID: string
  }