import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NgFor, NgIf],
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent {
  contacts: any[] = [];
  name = '';
  email = '';
  phone = '';

  constructor(private http: HttpClient) {
    this.fetchContacts();
  }

  fetchContacts() {
    this.http.get<any[]>('http://localhost:5000/api/contacts')
      .subscribe(data => this.contacts = data);
  }

  addContact() {
    const newContact = { name: this.name, email: this.email, phone: this.phone };
    this.http.post('http://localhost:5000/api/contacts', newContact)
      .subscribe(() => {
        this.name = this.email = this.phone = '';
        this.fetchContacts();
      });
  }

  deleteContact(id: string) {
    this.http.delete(`http://localhost:5000/api/contacts/${id}`)
      .subscribe(() => this.fetchContacts());
  }
}