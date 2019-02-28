import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
   
  selectedContact: Contact;
  contacts: Contact[];

  constructor(private historyService: HistoryService) { }

  getContact(): void {
    this.historyService.getContacts()
      .subscribe(contacts => this.contacts = contacts);
  }

  ngOnInit() {
    this.getContact();
  }

  select(contact: Contact){
    this.selectedContact = contact;
    console.log(this.selectedContact.id);
  }


}
