import { ContactService } from './contact.service';
import { Component, OnInit } from '@angular/core';
import {Contact} from '../contacts/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];
  contact: Contact;
  first_name: string;
  last_name: string;
  phone_no: string;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe((contacts) =>{
      console.log('success');
      this.contacts = contacts;
    },(error) =>{
      console.log('no contacts');
    });
  }

  addContact(){
    var newContact = {
      _id: null,
      first_name: this.first_name,
      last_name: this.last_name,
      phone_no: this.phone_no
    };
    console.log(newContact);
    this.contactService.addContact(newContact).subscribe(contact =>{
      this.contactService.getContacts().subscribe((contacts) =>{
        console.log('success');
        this.contacts = contacts;
      },(error) =>{
        console.log('no contacts');
      });
    });

  }

  deleteContact(id:any){
    this.contactService.deleteContact(id).subscribe(data =>{
      if(data.n === 1){
        for(var i =0; i< this.contacts.length;i++){
          if(this.contacts[i]._id == id)
          {
            this.contacts.splice(i,1);
          }
        }
      }
    },(error) =>{
      console.log('no contacts');
    });
  }

}
