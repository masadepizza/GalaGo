import { AfterViewInit, Component } from '@angular/core';
import { Prenda } from 'src/app/models/prenda';
import { CommonModule } from '@angular/common';
import { ElementRef, Renderer2, ViewChild } from '@angular/core';
import { PrendaService } from 'src/app/shared/prenda.service';
import { Router } from '@angular/router';
import { Respuesta } from 'src/app/models/respuesta';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  public filtrado = false;
  public mujerActive = false;
  public hombreActive = false;
  public accesorioActive = false;
  public precioActive = false;
  public eventoActive = false;
  public ubicacionActive = false;
  
  public prendas: Prenda[];
  public arrTipo: string[];
  public arrTalla: string[];
  public arrEvento: string[]; 
  public arrEstado: string[];
  public arrUbicacion: string[];
  
  public selectedTallaMujer: string = "";
  public selectedTallaHombre: string = "";
  public selectedEstado: string = "";
  public selectedEvento: string = "";
  public selectedUbicacion: string = "";
  public valorRango: number;

  public idsFavoritasParaEsteUsuario: number[] = []; //CAMBIO AQUI DE ANY A NUMBER[]=[] y el error includes se quita
  
  @ViewChild('sliderValue') sliderValue: ElementRef; // Referencia al elemento <span> para el rango de precio html
  // @ViewChild('sliderInput') sliderInput: ElementRef; // Referencia al elemento <input>
  // @ViewChild('estado') estadoSelect: ElementRef; // Agregar referencia al select


  constructor(public router: Router,
     public prendaService: PrendaService,
      public userService: UserService, 
      public prendasService: PrendaService){

      this.prendas = [];
      this.valorRango = 250;
      this.filtros2();

      //salen las prendas favs del 1 solamente en home!!!!!!!!!!!!!(por esto lo del corazon marcado en home)
      const iduser = this.userService.user.iduser;
      this.prendasService.getMisFavs(iduser).subscribe((resp:any) => {
        /* console.log(resp); */
        this.idsFavoritasParaEsteUsuario = resp.data.map(item => item.idprenda)
      });

      //-------- ENUM DE LA API PARA SELECTORES --------//

      //Opciones de tipo de prendaService desde la api
      this.arrTipo = [];
      this.prendaService.enumType().subscribe((data:Respuesta)=>{
        this.arrTipo = data.dataEnum;
      });

      //Opciones de talla de prendaService desde la api
      this.arrTalla = [];
      this.prendaService.enumSize().subscribe((data:Respuesta)=>{
        this.arrTalla = data.dataEnum;
      });

      //Opciones de estado del articulo de prendaService
      this.arrEstado = [];
      this.prendaService.enumState().subscribe((data:Respuesta) =>{
        this.arrEstado = data.dataEnum;
      });

      //Optios de evento de prendaService desde la api
      this.arrEvento = [];
      this.prendaService.enumEvent().subscribe((data:Respuesta)=>{
        this.arrEvento = data.dataEnum;
      });

      //Optios de estado de prendaService desde la api
      this.arrEstado = [];
      this.prendaService.enumState().subscribe((data:Respuesta)=>{
        this.arrEstado = data.dataEnum;
      });

      //Optios de ubicacion de userService desde la api
      this.arrUbicacion = [];
      this.userService.enumLocation().subscribe((data:Respuesta)=>{
        this.arrUbicacion = data.dataEnum;
      });
  }

  ngOnInit():void{}

  isFavorito(id:number){
    /* console.log(this.idsFavoritasParaEsteUsuario.includes(id)) */
    return this.idsFavoritasParaEsteUsuario.includes(id);
  }
  //-------- ACTIVAN O DESACTIVAN EL FILTRO (ICONO REDONDO CAMBIA DE COLOR A ROSA) --------//
  
  // ----- TIPO MUJER ------ //
  // Cambia el filtro de color (activa o desactiva) y aparece el input de TALLA
  filterMujer():void{
    this.mujerActive = !this.mujerActive;

    //Si se desactiva mujer se borra la seleccion de talla y estado
    if(!this.mujerActive) this.selectedTallaMujer = "";
    if(!this.mujerActive) this.selectedEstado = "";
      
    //si se activa mujer, hombre y accesorio se desactiva 
    if(this.hombreActive || this.accesorioActive) {
      this.hombreActive = false;
      this.accesorioActive = false;
      this.selectedEstado = "";
      this.selectedTallaMujer = "";
    }

    this.filtros2();
  }
  // Recoge el valor del selector de la talla 
  /* Por referencia se pasa el valor elegido en el desplegable, en el html se 
  recoge como (change)="tallaMujer(talla.value)" y se asigna al atributo public*/
  tallaMujer(tallaValue:string):void{
    this.selectedTallaMujer = tallaValue;
    this.filtros2();
  }

  // ----- TIPO HOMBRE ------ //
  // Cambia el filtro de color (activa o desactiva) y aparece el input de TALLA
  filterHombre():void{
    this.hombreActive = !this.hombreActive;

    //Si se desactiva hombre se borra la seleccion de talla y estado
    if(!this.hombreActive) this.selectedTallaHombre = "";
    
    //si se activa hombre, mujer y accesorio se desactiva 
    if(this.mujerActive || this.accesorioActive) {
      this.mujerActive = false;
      this.accesorioActive = false;
      this.selectedEstado = "";
      this.selectedTallaHombre = "";
    }    

    this.filtros2();    
  }
  // Recoge el valor del selector de la talla 
  tallaHombre(tallaValue:string):void{
    this.selectedTallaHombre = tallaValue;
    this.filtros2();
  }

  // ----- TIPO ACCESPRIO ------ //
  // Cambia el filtro de color (activa o desactiva) y en este caso no aparece ningún filtro
  filterAccesorio():void{
    this.accesorioActive = !this.accesorioActive;
    
    //si se activa mujer, hombre y accesorio se desactiva 
    if(this.hombreActive || this.mujerActive) {
      this.hombreActive = false;
      this.mujerActive = false;
      this.selectedEstado = "";
    }

    
    this.filtros2();
  }

  //Selección del estado del artículo
  estadoPrenda(estado:string){
    this.selectedEstado = estado;
    this.filtros2();
  }

  // ----- SELECCIONA EL PRECIO MÁXIMO ------ //
  // Cambia el filtro de color (activa o desactiva) y aparece el input de PRECIO, no neceista otra función para recoger el valor, lo hace con [(ngModel)]
  filterPrecio():void{
    this.precioActive = !this.precioActive;
    this.filtros2();
  }

  // ----- SELECCIONA EL PRECIO MÁXIMO ------ //
  // Cambia el filtro de color (activa o desactiva) y aparece el input de EVENTO
  filterEvento():void{
    this.eventoActive = !this.eventoActive;
    this.filtros2();
  } 
  // Recoge el valor del selector del evento 
  eventoInfo(evento:string):void{
    this.selectedEvento = evento;
    this.filtros2();
  }

  // ----- SELECCIONA EL PRECIO MÁXIMO ------ //
  // Cambia el filtro de color (activa o desactiva) y aparece el input de UBICACIÓN
  filterUbicacion():void{
    this.ubicacionActive = !this.ubicacionActive;
    if(!this.ubicacionActive) this.selectedUbicacion = "";
    this.filtros2();
  }
  // Recoge el valor del selector de la ubicacioón 
  ubicacionInfo(ubicacion:string):void{
    this.selectedUbicacion = ubicacion;
    this.filtros2();
  }


  // ------- FILTROS ------ // 
  filtros2(){
    let tipo = undefined;
    let size = undefined; 
    let price = undefined;
    let event = undefined;
    let state = undefined;
    let location = undefined;

    //Asignar el tipo y la talla MUJER
    if(this.mujerActive){
      tipo = "Mujer";              
      if(this.selectedTallaMujer) size = `${this.selectedTallaMujer}`;
      if(this.selectedEstado) state = `${this.selectedEstado}`;

    //Asignar el tipo y la talla HOMBRE
    }else if(this.hombreActive){
      tipo = "Hombre";        
      if(this.selectedTallaHombre) size = `${this.selectedTallaHombre}`;
      if(this.selectedEstado) state = `${this.selectedEstado}`;

    //Asignar el tipo y la talla ACCESORIO
    }else if(this.accesorioActive){
      tipo = "Accesorio";
      if(this.selectedEstado) state = `${this.selectedEstado}`;

    //Si ninguno está activo es undefined
    }else{
      tipo = undefined;
    }
    
    //Asignar el precio 
    if(this.precioActive){
      price = this.valorRango;
      console.log(price);
    }else{
      price = undefined;
    }

    //Asignar evento
    if(this.eventoActive){
      if(this.selectedEvento){
        event = `${this.selectedEvento}`;        
      }
      console.log(event);
    }else{
      event = undefined;
    }

    //Asignar ubicación
    if(this.ubicacionActive && this.selectedUbicacion !== ""){
      location = `${this.selectedUbicacion}`;
      console.log(location);
    }else{
      location = undefined;
    }
    console.log(tipo,size,price,event,state);
    

    //  Acceso al servicio de filtro para que sólo aparezcan tarjetas tipo = "Mujer" 
    console.log("datos por parametro home: ", tipo, size, price, event, state);    
    this.prendaService.filtroTipo(tipo,size,price,event,state,location).subscribe((data2:Respuesta)=>{
      this.prendas = data2.data;

      console.log("desde api en angular this.prendas: ");
      console.log(data2.data);

      console.log("solo data");
      console.log(data2);
      
      
      
    })

  }

  // -------- FIN -------- // 








  // Para poner el globo encima del input de la barra del precio 
  actualizarValor() {

    console.log(this.valorRango);
    
      // Establece la propiedad 'left' del elemento <span>
// -------------------------------------------------------------------------- //
    //   const inputElement = this.sliderInput.nativeElement as HTMLInputElement;
    //   const spanElement = this.sliderValue.nativeElement as HTMLSpanElement;  
    //   const rangeValue = parseInt(inputElement.value);
    //   const minValue = parseInt(inputElement.min);
    //   const maxValue = parseInt(inputElement.max);
      
    //   inputElement.addEventListener('input', () => {

    //     const leftValue = ((this.valorRango)/5) + '%';

    //     const leftValue = ((rangeValue - minValue) / (maxValue - minValue)) * 100 + '%';
    //     spanElement.style.left = leftValue;
    // });
    
  }

  onBlur() {
    this.sliderValue.nativeElement.classList.remove("show");
  }
  
}