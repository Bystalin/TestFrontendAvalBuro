import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ForoComponent} from "./pages/foro/foro.component";
import {DiscussionsComponent} from "./pages/discussions/discussions.component";

const routes: Routes = [
  {
    path: 'foro',
    component: ForoComponent,
  },
  {
    path:'discussions',
    component: DiscussionsComponent
  },
  {
    path: '',
    redirectTo: 'foro',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
