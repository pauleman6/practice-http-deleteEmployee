import { Component, OnInit} from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
 
  constructor(private empService: EmployeeService) {
      this.empService.getEmployees()
      .subscribe(data  => {
        this.employees = data
     }
    )
   }

  ngOnInit() {
      this.empService.getEmployees()
      .subscribe(data  => {
        isFetching: true;
        this.employees = data
     }
    )
  }

  // ngOnChanges(s: SimpleChanges){
  //    this.empService.getEmployees()
  //     .subscribe(data  => {
  //       this.employees = data
  //   }
  //  )

  // }


  // ngAfterViewChecked(){
  //   this.empService.getEmployees()
  //     .subscribe(data  => {
  //       this.employees = data 
  //    }
  //   )
  // }

  deleteEmp(id: number){
    
    console.log("delete in emp-list " + id);
    this.empService.deleteEmployee(id);
  }






  


}