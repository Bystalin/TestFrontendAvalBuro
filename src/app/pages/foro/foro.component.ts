import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationsService} from "../../services/notifications.service";
import {TYPE} from "../../interfaces/global";
import {Router} from "@angular/router";

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss']
})
export class ForoComponent implements OnInit {

  frmLogin!: FormGroup;

  constructor(private fb: FormBuilder, private Snotification: NotificationsService,
              private router: Router) {

    this.frmLogin = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-z A-Z0-9._%+-]+$')]],
      urlavatar: ['']

    }, {})

  }

  ngOnInit(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('avatar');
    localStorage.clear();
  }

  ingresar() {
    if (this.frmLogin.invalid) {
      this.frmLogin.markAllAsTouched();
      this.Snotification.showNotificationSwal(
        TYPE.WARNING,
        'Atención',
        'Por favor ingrese todos los datos requeridos');
      return;
    }
    console.log(this.frmLogin.value)

    localStorage.setItem('usuario', this.frmLogin.value.name);
    localStorage.setItem('avatar', this.frmLogin.value.urlavatar);

    this.router.navigate(['/discussions']);
  }

  get name(): FormControl {
    return this.frmLogin.get('name') as FormControl;
  }

  get nameFieldInvalid() {
    return this.name.invalid && (this.name.touched || this.name.dirty);
  }


}
