import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CustomerService } from '../service/customer.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {

  messageclass = ''
  message = ''
  customerid: any;
  editdata: any;
  responsedata: any;

  constructor(private service: CustomerService, private route: ActivatedRoute) {

    this.customerid = this.route.snapshot.paramMap.get('id');
    if (this.customerid != null) {
      this.UpdateCustomer(this.customerid);
    }
  }

  ngOnInit(): void {
  }

  register = new FormGroup({
    id: new FormControl({ value: "", disabled: true }),
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
    phone: new FormControl("", Validators.required),
  });

  SaveCustomer() {
    if (this.register.valid) {
      console.log(this.register.value);
      this.service.SaveCustomer(this.register.value).subscribe(result => {
        if (result != null) {
          this.responsedata = result;
          if (this.responsedata.message == 'added') {
            this.message = "Customer saved successfully."
            this.messageclass = "sucess"
            this.clearCustomer();
          } else if (this.responsedata.message == 'updated') {
            this.message = "Customer saved successfully."
            this.messageclass = "sucess"
          } else {
            this.message = "Failed to Save"
            this.messageclass = "error"
          }

        }
      });
    } else {
      this.message = "Please Enter valid data"
      this.messageclass = "error"
    }
  }

  clearCustomer() {
    this.register = new FormGroup({
      id: new FormControl(""),
      name: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
    });
  }

  UpdateCustomer(Id: any) {
    this.service.LoadCustomerbycode(Id).subscribe(data => {
      this.editdata = data;
      this.register = new FormGroup({
        id: new FormControl(this.editdata.id),
        name: new FormControl(this.editdata.name),
        email: new FormControl(this.editdata.email),
        phone: new FormControl(this.editdata.phone),
      });
    });


  }

  get name(){
    return this.register.get("name");
  }
  get email(){
    return this.register.get("email");
  }

}
