import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../models/chat';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url:string = "http://localhost:3000";
  constructor(private http: HttpClient) { }


getAllChat(iduser:number):Observable<Object>{
  // const queryParams = `?iduser1=${iduser1}&iduser2=${iduser2}`;
  return this.http.get(this.url+"/chat?iduser="+iduser);
}
}