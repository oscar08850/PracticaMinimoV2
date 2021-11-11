import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GrupoInvestigacion } from '../models/grupoinvestigacion';
import { User } from '../models/user';

import { GrupoinvestigacionService } from '../services/grupoinvestigacion.service';
import { UserService } from '../services/user.service';

//import { debug } from 'console';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  grupoinvestigacionForm: FormGroup;
  userForm: FormGroup;
  grupo: GrupoInvestigacion;
  user: User;
  id: String;
  constructor(private formBuilder: FormBuilder,private userService: UserService, private grupoService: GrupoinvestigacionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.grupoService.getGrupo(this.id).subscribe(data =>{
      this.grupo = data;
      this.grupoinvestigacionForm = this.formBuilder.group({
        nombregrupo: [this.grupo.nombregrupo, [Validators.required, Validators.nullValidator]],
        id: [this.grupo.id, [Validators.required, Validators.nullValidator]],
        descripcion: [this.grupo.descripcion, [Validators.required, Validators.nullValidator]],
        responsable: [this.grupo.responsable, [Validators.required, Validators.nullValidator]],
        url: [this.grupo.url, [Validators.required, Validators.nullValidator]],
        nombre: ["dfasdf", [Validators.required, Validators.nullValidator]],
        direccion: ["hola", [Validators.required, Validators.nullValidator]],
        dni: ["fasfsa", [Validators.required, Validators.nullValidator]],
        
        //users: [this.grupo.users, [Validators.required, Validators.nullValidator]]

      });
    })
  }

  get formControls(){
    return this.grupoinvestigacionForm.controls;
  }

  atras(){
    console.log("Hello");

    this.router.navigateByUrl('/principal');
  }  

  modificargrupo(){
    if(this.grupoinvestigacionForm.invalid){
      return;
    }
    
    const nombregrupo = this.grupoinvestigacionForm.value.nombregrupo;
    const id = this.grupoinvestigacionForm.value.id;
    const descripcion = this.grupoinvestigacionForm.value.descripcion;
    const responsable = this.grupoinvestigacionForm.value.responsable;
    const url = this.grupoinvestigacionForm.value.url;
    const users = this.grupoinvestigacionForm.value.users;


    const grupomodificado = {'nombregrupo': nombregrupo, 'id': id, 'descripcion': descripcion, 'responsable': responsable, 'url': url, 'users': users};
    this.grupoService.modificarGrupo(grupomodificado, this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.router.navigateByUrl('/principal');
    })
  }

  delete(){
    const id = this.grupoinvestigacionForm.value.id;
    console.log(id);
    this.grupoService.eliminarGrupo(id).subscribe(data =>{
      this.router.navigateByUrl('/principal');
    });
  }


  
  
  mostrar(){

    this.grupoService.getGrupo(this.id).subscribe(data =>{
    this.grupo = data;
    const id = this.grupo.users.id;
    //const id = users.id.;
    //const id = "123";
    console.log(id);


    this.userService.getUser(id).subscribe(data =>{
    this.router.navigateByUrl('/principal'); 
        
      });

    });
  }

}