import { BehaviorSubject, Observable, of } from "rxjs";
import { Student } from "src/app/core/models/student";
import { loginFormValue } from "src/app/core/services/auth.service";


export const USER_ADMIN_MOCK: Student = {
  id: 1,
  lastName: 'testapellido',
  email: 'test@mail.com',
  name: 'testnombre',
  gender: "M",
  role: 'admin',
  token: 'asdkjsanfkdams3u2hjdasfadsuh',
  password: '12312312',
}

export class AuthServiceMock {

  private authUser$ = new BehaviorSubject<Student | null>(null);

  login(formValue: loginFormValue): void {
    this.authUser$.next(USER_ADMIN_MOCK);
  }

  verificarToken(): Observable<boolean> {
    return of(true);
  }
}