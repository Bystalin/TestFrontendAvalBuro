import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  frmReplyMessage!: FormGroup;
  @Input() idcomentario!: number;

  constructor(private fb: FormBuilder) {
    this.frmReplyMessage = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]]
    }, {})
  }

  ngOnInit(): void {
  }

  get description(): FormControl {
    return this.frmReplyMessage.get('description') as FormControl;
  }

  get descriptionFieldInvalid() {
    return this.description.invalid && (this.description.touched || this.description.dirty);
  }

  responder() {
    console.log(this.idcomentario);
  }
}
