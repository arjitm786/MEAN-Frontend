import { Contact } from './contact';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, ) { }

  //retrieving contacts
  getContacts(): Observable<Contact[]>{
    return this.http.get<Contact[]>('http://localhost:3000/api/contacts');
  }

  //add contact
  addContact(newContact: Contact){
    return this.http.post('http://localhost:3000/api/contact/',newContact,{
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  });
  }

  //delte contact
  deleteContact(id: string): Observable<any>{
    var headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.delete<any>('http://localhost:3000/api/contact/'+id,{
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  },);
  }

}
