import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CrudService} from "./crud.service";
import {Observable} from "rxjs";
import {Coments, RequestComents} from "../interfaces/global";
import {delay, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  constructor(private http: HttpClient, private crudService: CrudService) {
  }

  getlistComment(idcommet: number): Observable<RequestComents> {
    return this.crudService.get(`comments/idcomment/` + idcommet)
      .pipe(
        delay(1000),
        map((result) => {
          return result;
        })
      );
  }


  addComment(data: Coments) {
    return this.crudService.post(`savecomment`, data);
  }

  updateComment(idcomment: number, data: Coments) {
    return this.crudService.put(`update/${idcomment}`, data)
  }

}
