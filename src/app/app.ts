import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';


type Product={
  id:number,
  name:string,
  price:number,
  quantity:number,
  img:string
}
@Component({
  imports: [CommonModule],
  selector: 'app-root',
  styleUrl: './app.scss', 
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('project');


  products= signal<Product[]>([
    {id:1 ,name :'Xbox' ,price:1000 ,quantity:0 ,img :'xbox.jpg'},
    {id:2 ,name :'Headphone' ,price:100 ,quantity:0 ,img :'headphone.jpg'},
    {id:3 ,name :'Keyboard' ,price:50 ,quantity:0 ,img :'keyboard.jpg'},
    {id:4 ,name :'Mouse' ,price:25 ,quantity:0 ,img :'mouse.jpg'}
  ]);

  totalItems= computed(()=>{
    return this.products().reduce((total ,item)=>{
      return total +item.quantity
    },0);
  });

  totalPrice=computed(()=>{
    return this.products().reduce((total ,item)=>{
      return total + (item.price*item.quantity)
    },0);
  });

  addItem(id:number){
    this.products.update((val)=>{
      return val.map((item)=>{
        if(item.id==id){
          item.quantity++
          return item;
        }else{
          return item;
        }
      })
    })
  };

  removeItem(id:number){
    this.products.update((val)=>{
      return val.map((item)=>{
        if(item.id==id && item.quantity>0){
          item.quantity--
          return item;
        }else{
          return item;
        }
      })
    })
  };
}