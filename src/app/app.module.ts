import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoModule } from './todo/todo.module';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { TodoState } from './todo/todo.state';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TodoModule, NgxsModule.forRoot([TodoState], {
    developmentMode: !environment.production
  }
  )],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
