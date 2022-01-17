import { Component, OnInit } from '@angular/core';
import { CompaniesService } from './services/companies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

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
  datasToBD:object={}

  //insert company variables
  nameCompanyNew:string='';
  nitCompanyNew:string='';
  bussinessNameCompanyNew:string='';
  applicationDateNew:string='';
  statusNew:boolean=false;
  attendantNew:string='';

  //update compaby variables
  IdCompany:string='';

  constructor(
    private companyService:CompaniesService, 
    public modal:NgbModal,
    private http:HttpClient
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
    this.statusNew=true;
  }
  statusDeclineButton(){
    this.validateButton='Decline!'
    this.btnStyle=`${"btn btn-outline-danger"}`
    this.statusNew=false;
  }
  deleteAlert() {
    const confirmed=window.confirm('Are you Sure delete this Company?');
    if(confirmed){
      this.IdCompany=this.companyList[this.index].url;
      this.companyService.deleteCompanies(this.IdCompany).subscribe((result)=>{
      console.warn(this.IdCompany)
      window.location.reload();
      
      })
    }
    
  }

  //Function for insert additional companies in DB
  insertCompany(nameNew:string,nitNew:string,bussinessNew:string,dateNew:string,attendantNew:string){
    this.datasToBD={
      "Name":nameNew,
      "NIT":nitNew,
      "businessName":bussinessNew,
      "applicationDate":dateNew,
      "status":this.statusNew,
      "attendant":attendantNew
    }
    console.log(this.datasToBD)

    this.companyService.addCompanies(this.datasToBD).subscribe((result)=>{
      console.warn(result)
    })

    //window.location.reload();
    return this.datasToBD;
  }

  UpdateCompany(nameNew:string,nitNew:string,bussinessNew:string,dateNew:string,attendantNew:string){
    this.IdCompany=this.companyList[this.index].url;
    this.datasToBD={
      "Name":nameNew,
      "NIT":nitNew,
      "businessName":bussinessNew,
      "applicationDate":dateNew,
      "status":this.statusNew,
      "attendant":attendantNew
    }
    console.log(this.IdCompany)

    this.companyService.setCompanies(this.datasToBD,this.IdCompany).subscribe((result)=>{
      console.warn(this.IdCompany)
    })
    //window.location.reload();
    return this.datasToBD;
  }
}
