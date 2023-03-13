import {Injectable} from '@angular/core';
import {TYPE} from "../interfaces/global";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() {
  }

  showNotificationSwal(icon: TYPE, title: string, text: string) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }

}
