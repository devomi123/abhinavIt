import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  p:any = "";
  id:string = "";
  formdata: any;
  products: any;
  name:any = "";
  sku: any = "";
  email:any = "";
  description:any = "";
  price:any = "";
  stock_level = "";

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    
  // this.edit(this.id)
  this.listdata();
    this.getdata();
  }

  listdata(){
    this.formdata = new FormGroup({
      id: new FormControl(this.id == "0" ? "" : this.id),
      name: new FormControl(this.name, Validators.compose([Validators.required])),
      sku: new FormControl(this.sku, Validators.compose([Validators.required])),
      description: new FormControl(this.description, Validators.compose([Validators.required])),
      email: new FormControl(this.email, Validators.compose([Validators.required])),
      price: new FormControl(this.price, Validators.compose([Validators.required])),
      stock_level: new FormControl(this.stock_level, Validators.compose([Validators.required])),

    })
  }

  submit(data: any) {
    console.log({ data: data });
    this.api.saveProduct("save", { data: data }).subscribe((res: any) => {
      alert("Data SuccessFully Insert")
      console.log(res);
      // this.getdata();

      this.formdata = new FormGroup({
        name: new FormControl("",),
        sku: new FormControl("",),
        description: new FormControl("",),
        email: new FormControl("",),
        price: new FormControl("",),
        stock_level: new FormControl("",),

      })

    })
  }

  getdata() {
    this.api.protectList("list").subscribe((result: any) => {
      console.log(result.data);
      this.products = result.data;
      console.log(this.products[0].name)

    })
  }

  delete(id: string) {
    if (confirm("Sure to Delete?")) {
      let data = { id: id };
      this.api.post("delete", { data: data }).subscribe((result) => {
        this.getdata();
      })
    }
  }

  edit(id:string){
    let data = { id: id };
      this.api.post("get", { data: data }).subscribe((result:any) => {
       console.log(result.data._id);
      this.id = result.data._id;
      this.name = result.data.name;
      this.sku = result.data.sku;
      this.email = result.data.email;
      this.description = result.data.description;
      this.price = result.data.price;
      this.stock_level = result.data.stock_level;

// localStorage.setItem("id",JSON.stringify(updateid))
       this.listdata();
    
      })
  }



}
