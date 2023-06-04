import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule,HttpTestingController,} from '@angular/common/http/testing';
import { AuthService, loginFormValue } from './auth.service';
import { Router } from '@angular/router';
import { skip } from 'rxjs';
import { User } from '../models/user';

describe('Testing of AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('Login should work', (done) => {
    const loginFake: loginFormValue = {
      email: 'sebastian@mail.com',
      password: '12345',
    };
    const MOCK_REQUEST_RESULT: User[] = [
      {
        id: 1,
        lastName: 'pallero',
        email: loginFake.email,
        name: 'sebastian',
        password: loginFake.password,
        role: 'admin',
        gender: 'M',
        token: 12345,
      },
    ];
    spyOn(TestBed.inject(Router), 'navigate');
    service
      .getVerifiedStudent()
      .pipe(skip(1))
      .subscribe((user) => {
        expect(user).toEqual(MOCK_REQUEST_RESULT[0]);
        done();
      });
    service.login(loginFake);
    httpController
      .expectOne({
        url: `http://localhost:3000/users?email=${loginFake.email}&password=${loginFake.password}`,
        method: 'GET',
      })
      .flush(MOCK_REQUEST_RESULT);
  });

  it('Logout should emit an authUser null, remove the token from LocalStorage and redirect user',
  () => {
    const spyOnNavigate = spyOn(TestBed.inject(Router), 'navigate');
    const loginFake: loginFormValue = {
      email: 'sebastian@mail.com',
      password: '12345',
    };
    const MOCK_REQUEST_RESULT: User[] = [
      {
        id: 1,
        lastName: 'pallero',
        email: loginFake.email,
        name: 'sebastian',
        gender: 'M',
        password: loginFake.password,
        role: 'admin',
        token: 12345,
      },
    ];

    service.login(loginFake);
    httpController
      .expectOne({
        url: `http://localhost:3000/users?email=${loginFake.email}&password=${loginFake.password}`,
        method: 'GET',
      })
      .flush(MOCK_REQUEST_RESULT);


    service.logOut();

    const tokenLs = localStorage.getItem('token');

    expect(tokenLs).toBeNull();
    expect(spyOnNavigate).toHaveBeenCalled();
  });
});