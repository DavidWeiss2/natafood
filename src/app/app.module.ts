import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AngularfireModule } from './core/firebase/angularfire/angularfire.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularfireModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
