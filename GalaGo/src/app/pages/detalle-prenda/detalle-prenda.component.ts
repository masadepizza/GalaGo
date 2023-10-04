import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Prenda } from 'src/app/models/prenda';
import { Router } from '@angular/router';
import {Location } from '@angular/common'
import { Respuesta } from 'src/app/models/respuesta';
import { DetalleprendaService } from 'src/app/shared/detalleprenda.service';
import { User } from 'src/app/models/user';
import { Propietarioprenda } from 'src/app/models/propietarioprenda';


@Component({
  selector: 'app-detalle-prenda',
  templateUrl: './detalle-prenda.component.html',
  styleUrls: ['./detalle-prenda.component.css']
})
export class DetallePrendaComponent implements OnInit {
 @Input() prendaData:any;
  prenda: Prenda
  idprenda:any;
  //iduser:User;
  firstname:User;
  photo:User
  propietario:any;
  propietarioprenda:Propietarioprenda
  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router, 
              private detalleService: DetalleprendaService){
              
    
          //  FORMA PARA PILLAR EL ID
      this.idprenda = this.route.snapshot.paramMap.get("idprenda");
      console.log("ID:", this.idprenda)



      //  FORMA PARA PILLAR EL PROPIETARIO
    this.propietario = this.route.snapshot.paramMap.get('propietario');
    console.log("Propietario:", this.propietario)






    // Llama al servicio para obtener los detalles de la prenda por su ID
    this.detalleService.obtenerDetalle(this.idprenda, this.propietario).subscribe(
      (data:Respuesta) => {
        // Maneja la respuesta y asigna los detalles de la prenda a 'prenda'
        this.prenda = data.dataPrenda[0];

        // this.images = [
        //   this.prenda.photo1,
        //   this.prenda.photo2,
        //   this.prenda.photo3,
        //   this.prenda.photo4
        // ];



        console.log("Detalle de la prenda",this.prenda)
      },
    );

  }
  // propietario: string;
  // currentImageIndex = 0;
  // images: string[] = [];
  // // router: any;
  // constructor(private route: ActivatedRoute,
  //   private location: Location,
  //   private router: Router, 
  //   private detalleService: DetalleprendaService){
  //      // console.log(this.prenda)
  //     //  FORMA PARA PILLAR EL ID
  //     this.idprenda = this.route.snapshot.paramMap.get("idprenda");
  //     console.log("ID:", this.idprenda)



  //     //  FORMA PARA PILLAR EL PROPIETARIO
  //   this.propietario = this.route.snapshot.paramMap.get('propietario');
  //   console.log("Propietario:", this.propietario)






  //   // Llama al servicio para obtener los detalles de la prenda por su ID
  //   this.detalleService.obtenerDetalle(this.idprenda, this.propietario).subscribe(
  //     (data:Respuesta) => {
  //       // Maneja la respuesta y asigna los detalles de la prenda a 'prenda'
  //       this.prenda = data.dataPrenda[0];

  //       this.images = [
  //         this.prenda.photo1,
  //         this.prenda.photo2,
  //         this.prenda.photo3,
  //         this.prenda.photo4
  //       ];



  //       console.log("Detalle de la prenda",this.prenda)
  //     },
  //   );

  // }


  ngOnInit(): void {}

  // navegarAdelante(): void {
  //   if (this.currentImageIndex > 0) {
  //     this.currentImageIndex--;
  //   }
  // }

  // cambiarImagenAtras(): void {
  //   if (this.currentImageIndex < this.images.length - 1) {
  //     this.currentImageIndex++;
  //   }
  // }








//para ir para atrás
  public navegarAtras():void {
          this.location.back();
  }
 
      
  public irChat(): void{

   
    /* TODO: Tenemos que mandar enla url la id
    de la prenda */
  console.log("IDPRENDA DEL PROPIETARIO:"+ this.idprenda)
    // this.router.navigate(["/conversacion-chat"], { queryParams: {idprenda: this.idprenda}});
    // this.router.navigate(["/conversacion-chat/:iduser2"], { queryParams: {idprenda: this.idprenda}});
    this.router.navigate(["conversacion-chat", this.prenda.iduser]);

  }

  

  public irEditar(): void{
    this.router.navigate(["/editar-prenda"])
  }





}
