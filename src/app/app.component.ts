import { Component, OnInit } from '@angular/core';
import { CompaniesService } from './services/companies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  companyList: any = [];
  index:number=0;
  closeResult:string='';
  validateButton:string='Status';
  btnStyle:string=`${"btn btn-outline-info"}`

  constructor(
    private companyService:CompaniesService, 
    public modal:NgbModal
    ){ }

  ngOnInit(): void{
    console.log('component initialize');
    this.companyService.getCompanies()
      .subscribe((response :any ) => this.companyList = response);
  }

  incrementCompany(){
    this.index==this.companyList.length-1?this.index=0:this.index+=1
  }
  decrementCompany(){
    this.index==0?this.index=this.companyList.length-1:this.index-=1
  }
  statusValidateButton(){
    this.validateButton='Validate!'
    this.btnStyle=`${"btn btn-outline-success"}`
  }
  statusDeclineButton(){
    this.validateButton='Decline!'
    this.btnStyle=`${"btn btn-outline-danger"}`
  }
  deleteAlert() {
    alert('You going to Delete this Company, Sure?');
  }
}
