import {Component, Input, OnInit} from '@angular/core';
import {RequestComents} from "../../interfaces/global";
import Swal from "sweetalert2";
import {ForoService} from "../../services/foro.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() lstcomment!: RequestComents[];

  constructor(private foroS: ForoService) {
  }

  ngOnInit(): void {
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
}
