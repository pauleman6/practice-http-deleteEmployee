import { Injectable, OnInit, OnChanges, AfterContentChecked } from '@angular/core';
import { Employee } from './employee';
import {Observable} from 'rxjs';
import {HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class EmployeeService {


  employees: Observable<Employee[]>;
  objectId: string[] = [];//array to store the firebase object id
  count: number = 0; //count to keep index of the objectId array
  
  constructor( private http: HttpClient){
  }

 
  getEmployees(): Observable<Employee[]>{
    this.employees =  this.http.get<Employee[]>('https://httpemployee-bc50e.firebaseio.com/posts.json')  
        .pipe( //transform the data to parse employee objects
          map(responseData => { 
          const postsArray: Employee[] = []; //array to store employee objects
          for(const key in responseData){
            postsArray.push(responseData[key]); //pushing next employee object into array
            this.objectId[this.count++] = key;//store the object key information for delete
            console.log("current object's id is : " + key);
          }
          return postsArray;
        })
        );
     return this.employees;
    }

  addEmployees(emp: Employee){
    this.http.post('https://httpemployee-bc50e.firebaseio.com/posts.json', emp)
    .subscribe(data => {
      console.log(data);
    })
  }

  deleteEmployee(id: number){
   
   let empId: string = this.objectId[id];
    console.log("empId is " + empId)
   
    this.http.delete('https://httpemployee-bc50e.firebaseio.com/posts/'+ empId + '.json')
      .subscribe(data => {
        console.log('delete request successful');
      })
   

  }
}
