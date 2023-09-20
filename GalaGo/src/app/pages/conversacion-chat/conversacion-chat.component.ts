import { Component,OnInit } from '@angular/core';



@Component({
  selector: 'app-conversacion-chat',
  templateUrl: './conversacion-chat.component.html',
  styleUrls: ['./conversacion-chat.component.css']
})
export class ConversacionChatComponent implements OnInit {
public usuarioLogueado: any;
public nuevoMensaje: string="";
// mensajes:any=[
//   {
//     emisor:"id",
//     texto:"Hola que tal",
//   },
//   {
//     emisor:"id",
//     texto:"Buenos días si digame",
//   },
//   {
//     emisor:"id",
//     texto:"quiero alquilar el traje de boda",
//   },
//   {
//     emisor:"id",
//     texto:"¿para que fecha lo necesita?",
//   },
//   {
//     emisor:"id",
//     texto:"para el 14 de Octubre",
//   },
// ];

mensajesenviados:any=[
  {
    emisor:"id",
    texto:"Hola que tal",
  },
  
  {
    emisor:"id",
    texto:"quiero alquilar el traje de boda",
  },
  {
    emisor:"id",
    texto:"para el 14 de Octubre",
  },
  {
    emisor:"id",
    texto:"es en Madrid cierto?",
  },
];

mensajesrecibidos:any=[
 
  {
    emisor:"id",
    texto:"Buenos días si digame",
  },
  
  {
    emisor:"id",
    texto:"¿para que fecha lo necesita?",
  },
  {
    emisor:"id",
    texto:"De acuerdo podemos acordar un dia",
  },
  {
    emisor:"id",
    texto:"Si en Madrid, todo esta en la descripción",
  },
];
// constructor(private authService:AuthService){}
constructor(){}
ngOnInit(): void {

// this.authService.getUserLogged().suscribe(usuario=>{
//   this.usuarioLogueado = usuario;
// });

}

enviarMensaje(){
  console.log(this.nuevoMensaje);
  this.nuevoMensaje="";
}
}
