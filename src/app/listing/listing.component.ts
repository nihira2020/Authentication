import { Component, OnInit } from '@angular/core';
import { CustomerService} from '../service/customer.service'

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  constructor(private service:CustomerService) { 
    this.LoadCustomer();
  }
customerdata:any;
  ngOnInit(): void {
  }

  LoadCustomer(){
    this.service.LoadCustomer().subscribe(data=>{
      this.customerdata=data;
    });
  }

  delete(ID:any){
    if(confirm("Do you want to remove?")){
    this.service.RemoveCustomer(ID).subscribe(data=>{
      this.LoadCustomer();
    });
  }
  }

}
