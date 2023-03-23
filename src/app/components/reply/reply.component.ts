import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Coments, RequestComents} from "../../interfaces/global";
import {ForoService} from "../../services/foro.service";

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  frmReplyMessage!: FormGroup;
  @Input() idcomentario!: number;
  @Input() lstcomment!: RequestComents[];
  usuario: string = 'Huésped';
  avatar: string = '';

  constructor(private fb: FormBuilder, private foroS: ForoService) {
    this.frmReplyMessage = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]]
    }, {})
  }

  ngOnInit(): void {
    this.cargar_avatar_user();
    console.log(this.lstcomment);
  }

  get description(): FormControl {
    return this.frmReplyMessage.get('description') as FormControl;
  }

  get descriptionFieldInvalid() {
    return this.description.invalid && (this.description.touched || this.description.dirty);
  }

  cargar_avatar_user() {
    if (localStorage.getItem('avatar')) {
      // @ts-ignore
      this.avatar = localStorage.getItem('avatar');
    } else {
      this.avatar = '';
    }

    if (localStorage.getItem('usuario')) {
      // @ts-ignore
      this.usuario = localStorage.getItem('usuario');
    } else {
      this.usuario = 'Huésped';
    }

  }

  responder() {

    const id = this.idcomentario;
    console.log(this.idcomentario);
    if (this.frmReplyMessage.invalid) {
      this.frmReplyMessage.markAllAsTouched();
      return;
    }
    console.log(this.frmReplyMessage.value);


    const Datacomment: Coments = {
      nombre: this.usuario,
      comentario: this.frmReplyMessage.value.description,
      puntos: 1,
      cant_respuestas: 0,
      idcomentario: this.idcomentario,
      avatar: this.avatar
    }
    console.log(Datacomment);

    this.foroS.addComment(Datacomment)
      .subscribe(dataOperacion => {
        console.log(dataOperacion);

        this.lstcomment.map(function (dato) {
          if (dato.id == id) {
            // @ts-ignore
            dato.respuestas = dataOperacion;
          }
          return dato;
        });

        console.log(this.lstcomment);
      });

  }
}
