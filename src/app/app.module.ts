import { inject,  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AngularfireModule } from './core/firebase/angularfire/angularfire.module';
import { AuthService } from './core/firebase/services/auth/auth.service';

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
export class AppModule {
  private _authService = inject(AuthService);
  private _ = this._authService.user.subscribe(user=>console.log('user: ',user))
}
