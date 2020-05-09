import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact : any = {};
  @ViewChild('f') form: any;
  

  constructor(private db: AngularFireDatabase, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }

  sendMessage() {
    this.db.list('/messages').push(this.contact);
    this.dialog.open(ContactModalComponent)
    .afterClosed().subscribe(result => {
      if (result=="yes") this.router.navigate(['']);
      else this.form.reset();
    } ) ;
  }  


}
