import { inject, Injectable } from '@angular/core';
import { Auth, authState, signInAnonymously, signOut, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { filter, share, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = inject(Auth)
  public user = authState(this.auth).pipe(
    filter(user => {
      if (!user) signInAnonymously(this.auth);
      return !!user
    }),
    traceUntilFirst('auth'),
    share({ resetOnRefCountZero: false }),
    shareReplay(1));

  public login = () => signInWithPopup(this.auth, new GoogleAuthProvider());
  public logout = () => signOut(this.auth);
}
