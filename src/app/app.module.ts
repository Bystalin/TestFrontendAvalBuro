import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ForoComponent} from './pages/foro/foro.component';
import {DiscussionsComponent} from './pages/discussions/discussions.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CommentComponent} from './components/comment/comment.component';
import {HttpClientModule} from "@angular/common/http";
import {NgFallimgModule} from "ng-fallimg";
import { ReplyComponent } from './components/reply/reply.component';

@NgModule({
  declarations: [
    AppComponent,
    ForoComponent,
    DiscussionsComponent,
    CommentComponent,
    ReplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgFallimgModule.forRoot({
      default: 'assets/img/default.webp',
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
