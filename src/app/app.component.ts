import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public login:boolean=true
  userListLogin: any = [];

  constructor(
    private usuarioService:UsuariosService, 
    public modal:NgbModal,
    private http:HttpClient
    ){ }

  ngOnInit(): void{
    this.usuarioService.getUsers()
      .subscribe((response :any ) => this.userListLogin = response);  
  }
  async loginUser(mailValue:string,passValue:string){
    for (let i = 0; i < this.userListLogin.length; i++){
      console.warn(this.userListLogin[i].email)
      if(mailValue==this.userListLogin[i].email && passValue==this.userListLogin[i].password)
      {
        this.login=false;
        break;
      }
      else{
        const erroPass=window.confirm('Datos Inválidos');
        this.login=true;
      }
    }
  }
}
