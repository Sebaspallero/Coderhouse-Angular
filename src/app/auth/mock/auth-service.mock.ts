import { BehaviorSubject, Observable, of } from "rxjs";
import { User } from "src/app/core/models/user";
import { loginFormValue } from "src/app/core/services/auth.service";


export const USER_ADMIN_MOCK: User = {
  id: 1,
  lastName: 'testapellido',
  email: 'test@mail.com',
  name: 'testnombre',
  gender: "M",
  role: 'admin',
  token: 12345,
  password: '12312312',
}

export class AuthServiceMock {

  private authUser$ = new BehaviorSubject<User | null>(null);

  login(formValue: loginFormValue): void {
    this.authUser$.next(USER_ADMIN_MOCK);
  }

  verificarToken(): Observable<boolean> {
    return of(true);
  }
}