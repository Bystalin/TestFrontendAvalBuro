import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Coments, RequestComents} from "../../interfaces/global";
import Swal from "sweetalert2";
import {ForoService} from "../../services/foro.service";

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  frmMessage!: FormGroup;
  usuario: string = 'Huésped';
  avatar: string = '';
  // comments!: RequestComents;
  comments: RequestComents[] = [];

  constructor(private fb: FormBuilder, private foroS: ForoService) {
    this.frmMessage = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]]
    }, {})
  }

  ngOnInit(): void {

    this.cargar_avatar();
    if (localStorage.getItem('usuario')) {
      // @ts-ignore
      this.usuario = localStorage.getItem('usuario');
    } else {
      this.usuario = 'Huésped';
    }


    this.cargar_comentarios();


  }

  cargar_comentarios() {
    this.frmMessage.value.description = "";

    this.foroS.getlistComment(0)
      .subscribe(list => {
        Swal.close();
        console.log(list);
        // @ts-ignore
        this.comments = list;
      })
  }

  cargar_avatar() {
    if (localStorage.getItem('avatar')) {
      // @ts-ignore
      this.avatar = localStorage.getItem('avatar');
    } else {
      this.avatar = '';
    }
  }

  enviar() {
    if (this.frmMessage.invalid) {
      this.frmMessage.markAllAsTouched();
      return;
    }
    console.log(this.frmMessage.value);


    const Datacomment: Coments = {
      nombre: this.usuario,
      comentario: this.frmMessage.value.description,
      puntos: 1,
      cant_respuestas: 0,
      idcomentario: 0,
      avatar: this.avatar
    }
    console.log(Datacomment);

    this.foroS.addComment(Datacomment)
      .subscribe(dataOperacion => {
        console.log(dataOperacion);
        this.comments.unshift(dataOperacion);
      });


  }

  get description(): FormControl {
    return this.frmMessage.get('description') as FormControl;
  }

  get descriptionFieldInvalid() {
    return this.description.invalid && (this.description.touched || this.description.dirty);
  }
}
