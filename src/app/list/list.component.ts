import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list = [];
  data = '';
  date:any = '';
  priority = 'Medium';
  count = 0;

  reset(){
    this.list = [];
    this.count = 0;
    this.http.post('https://enigmatic-gorge-82863.herokuapp.com/read', {}).subscribe(
      (dd)=>{
        console.log(dd);
        for(let l of <any>dd){
          this.list.push(l);
          this.count++;
        }
      }
    );
  }

  add(){
    if(this.data != null && this.data != '')
    this.date = new Date();
    this.date = this.date.toLocaleDateString() + ' - ' + this.date.toLocaleTimeString();
    this.http.post('https://enigmatic-gorge-82863.herokuapp.com/store', {task: this.data, status: 'pending', priority: this.priority, date: this.date}).subscribe(
      (data)=>{
        console.log('data added');
        this.list.push({task: this.data, status: 'pending', priority: this.priority, date: this.date});
        this.data = '';
        this.count++;
      }
    );
  }

  remove(l, i){
    console.log(this.list[i]);
    this.http.post('https://enigmatic-gorge-82863.herokuapp.com/remove', this.list[i]).subscribe(
      (data)=>{
        console.log('data deleted'); 
        if(this.list[i].status=='pending') this.count--;
        this.list.splice(i, 1);
      }
    );
  }


  edit(l){
    let temp = prompt('Input new Entry:');
    let t = {old_data: {task: l.task}, new_data: {task: temp}};
    this.http.post('https://enigmatic-gorge-82863.herokuapp.com/update', t).subscribe(
      (data)=>{
        l.task = temp;
        console.log('data updated');
      }
    );
  }

  status(l){
    let temp;
    if(l.status == 'pending') {
      temp = 'completed';  this.count--; 
    }
    else { 
      temp = 'pending';  this.count++; 
    }
    let t = {old_data: {task: l.task ,status: l.status, priority: l.priority, date: l.date}, new_data: {task: l.task ,status: temp, priority: l.priority, date: l.date}};
    this.http.post('https://enigmatic-gorge-82863.herokuapp.com/update', t).subscribe(
      (data)=>{
        l.status = temp;
        console.log('data updated');
      }
    );
  }

  constructor(private http:HttpClient) {
    
  }

  ngOnInit() {
    this.http.post('https://enigmatic-gorge-82863.herokuapp.com/read', {}).subscribe(
      (dd)=>{
        console.log(dd);
        for(let l of <any>dd){
          this.list.push(l);
          if(l.status == 'pending') this.count++;
        }
      }
    );
  }

}
