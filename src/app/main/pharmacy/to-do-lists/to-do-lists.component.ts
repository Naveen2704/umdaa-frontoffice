import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-to-do-lists',
  templateUrl: './to-do-lists.component.html',
  styleUrls: ['./to-do-lists.component.scss'],
})
export class ToDoListsComponent implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modal.dismiss()
  }

}
