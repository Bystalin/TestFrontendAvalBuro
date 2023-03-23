import {Component, Input, OnInit} from '@angular/core';
import {Coments, RequestComents} from "../../interfaces/global";
import Swal from "sweetalert2";
import {ForoService} from "../../services/foro.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() lstcomment!: RequestComents[];
  mostrarrespuesta!: boolean;

  frmReplyMessage!: FormGroup;
  usuario: string = 'Huésped';
  avatar: string = '';


  constructor(private fb: FormBuilder, private foroS: ForoService) {
    this.frmReplyMessage = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]]
    }, {})
  }

  ngOnInit(): void {
    this.mostrarrespuesta = false;
    this.cargar_avatar_user();
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

  sumarpuntos(comment: RequestComents) {
    console.log(comment);
    comment.puntos = comment.puntos + 1;

    this.foroS.updateComment(comment.id, comment)
      .subscribe(dataOperacion => {
        console.log(dataOperacion);
      });
  }

  restarpuntos(comment: RequestComents) {
    comment.puntos = comment.puntos - 1;

    this.foroS.updateComment(comment.id, comment)
      .subscribe(dataOperacion => {
        console.log(dataOperacion);
      });
  }

  ver_respuestas(idcomentario: number) {
    console.log(idcomentario);
    this.foroS.getlistComment(idcomentario)
      .subscribe(list => {
        Swal.close();
        console.log(list);

        this.lstcomment.map(function (dato) {
          if (dato.id == idcomentario) {
            // @ts-ignore
            dato.respuestas = list;
          }
          return dato;
        });

        console.log(this.lstcomment);

      })


  }


  responder(idcomentario: number) {
    this.mostrarrespuesta = true;
    this.lstcomment.map(function (dato) {
      if (dato.id == idcomentario) {
        // @ts-ignore
        dato.templaterespuesta = true;
      }
      return dato;
    });

  }

  enviar_respuesta(comment: RequestComents, idcomentario: number) {
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
      idcomentario: idcomentario,
      avatar: this.avatar
    }
    console.log(Datacomment);


    this.foroS.addComment(Datacomment)
      .subscribe(dataOperacion => {
        console.log(dataOperacion);

        this.lstcomment.map(function (dato) {
          if (dato.id == idcomentario) {
            // @ts-ignore
            dato.respuestas?.push(dataOperacion);
            // @ts-ignore
            dato.templaterespuesta = false;
          }
          return dato;
        });
        console.log(this.lstcomment);
      });


    this.actualizar_cant_respuesta(comment);


  }

  private actualizar_cant_respuesta(comment: RequestComents) {

    comment.cant_respuestas = comment.cant_respuestas + 1;

    this.foroS.updateComment(comment.id, comment)
      .subscribe(dataOperacion => {
        console.log(dataOperacion);
      });
  }
}
