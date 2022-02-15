import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  userList: any = [];
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
    private usuarioService:UsuariosService, 
    public modal:NgbModal,
    private http:HttpClient
    ){ }

  ngOnInit(): void{
    this.usuarioService.getUsers()
      .subscribe((response :any ) => this.userList = response);  
      
  }

  incrementUser(){
    this.index==this.userList.length-1?this.index=0:this.index+=1
    console.log(this.userList)
  }
  decrementUser(){
    this.index==0?this.index=this.userList.length-1:this.index-=1
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
      this.IdCompany=this.userList[this.index].url;
      this.usuarioService.deleteCompanies(this.IdCompany).subscribe((result)=>{
      console.warn(this.IdCompany)
      window.location.reload();
      
      })
    }
    
  }

  //Function for insert additional companies in DB
  insertUser(userNew:string,passNew:string,IdenNew:string,nameNew:string,lastNameNew:string,ageNew:string,
    emailNew:string,cellPhoneNew:string,addressNew:string){
    this.datasToBD={
      "address":addressNew,
      "age":ageNew,
      "cellphone":cellPhoneNew,
      "email":emailNew,
      "identification":IdenNew,
      "lastname":lastNameNew,
      "name":nameNew,
      "password":passNew,
      "username":userNew,
    }
    console.log(this.datasToBD)

    this.usuarioService.addUsers(this.datasToBD).subscribe((result)=>{
      console.warn(result)
    })
    window.location.reload();
    //return this.datasToBD;
  }

  UpdateUsers(userNew:string,passNew:string,IdenNew:string,nameNew:string,lastNameNew:string,ageNew:string,
    emailNew:string,cellPhoneNew:string,addressNew:string){
    this.IdCompany=this.userList[this.index].url;
    this.datasToBD={
      "address":addressNew,
      "age":ageNew,
      "cellphone":cellPhoneNew,
      "email":emailNew,
      "identification":IdenNew,
      "lastname":lastNameNew,
      "name":nameNew,
      "password":passNew,
      "username":userNew,
    }
    console.log(this.IdCompany)

    this.usuarioService.setUsers(this.datasToBD,this.IdCompany).subscribe((result)=>{
      console.warn(this.IdCompany)
    })
    //window.location.reload();
    return this.datasToBD;
  }
}
