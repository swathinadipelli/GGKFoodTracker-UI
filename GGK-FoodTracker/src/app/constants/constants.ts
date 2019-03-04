
export const orderConstants = {
    ItemsList: [
        {name: 'Chapati', code: '1'},
        {name: 'Meals', code: '2'},
      ],
    ItemTableColumns: [
        // { header: 'S.No', field: 'serialNumber ', sortField: '' },
        { header: 'Item Name', field: 'itemName', sortField: '' },
        { header: 'Status', field: 'status', sortField: ''  },
        { header: 'Date', field: 'orderDate', sortField: 'orderDate'  }
    ]
}

export const ManagementsConstants = {
    ManagementTableColumns: [
        { header: 'Employee Name', field: 'employeeName', sortField: '' },
        { header: 'Location', field: 'locationName', sortField: ''  },
        { header: 'Approve', field: 'approve', sortField: ''  },
        { header: 'Reject', field: 'reject', sortField: ''  },
        { header: 'Date', field: 'orderDate', sortField: 'orderDate'  }
    ]
}

export const TrackingConstants = {
    TrackingTableColumns: [
        { header: 'Employee ID', field: 'employeeID', sortField: '' },
        { header: 'Employee Name', field: 'employeeName', sortField: ''  },
        { header: 'Manager name', field: 'managerName', sortField: ''  },
        { header: 'Location', field: 'locationName', sortField: ''  },
        { header: 'Item Name', field: 'itemName', sortField: ''  }, 
    ],
     CountTableColumns: [
        { header: 'Location', field: 'locationName', sortField: ''  },
        { header: 'Chapati', field: 'Chapathi', sortField: ''  },
        { header: 'Meals', field: 'Meals', sortField: ''  }, 
     ]
}

export const CommomConstants = {
    locations: [
        { label: 'All Branches', value: null },
        { label: 'Gachibowli', value: 'Gachibowli' },
        { label: 'Waverock', value: 'Waverock' },
        { label: 'Uppal', value: 'Uppal' }
    ]
}

// export const LoginDetails = {
//     userDetails: [
//         { userName: 'abhishek.pathak@ggktech.com', password: 'abhishek@ggk'},
//         { userName: 'navneeth.battula@ggktech.com', password: 'navneeth@ggk'},
//         { userName: 'swathi.nadipelli@ggktech.com', password: 'swathi@ggk'},
//         { userName: 'amrutha.chenna@ggktech.com', password: 'amrutha@ggk'},
//         { userName: 'sairaj.munigala@ggktech.com', password: 'sairaj@ggk'},
//         { userName: 'satyanarayana.yerramsetti@ggktech.com', password: 'satya@ggk'},
//         { userName: 'vikram.mayank@ggktech.com', password: 'mayank@ggk'},
//         { userName: 'raghav.kandanelly@ggktech.com', password: 'raghav@ggk'},
//     ]
// }
