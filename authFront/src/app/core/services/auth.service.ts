import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:3000'

  constructor(private http: HttpClient, private router: Router) { }

  public singin(payLoad: {email: string, password: string}): Observable<any>{
    return this.http.post<{token: string}>(`${this.url}/sign`, payLoad).pipe(
      map((res) => {
        localStorage.removeItem('access_token')
        localStorage.setItem('access_token', JSON.stringify(res.token))
        return this.router.navigate(['admin'])
      }),
      catchError((err) => {
        if(err.error.message) return throwError(() => err.error.message)

        return throwError(() => "No momento não estamos conseguindo validar esses dados. Por favor, tente novamente mais tarde!")
      })
    )
  }

  public logOut(){
    localStorage.removeItem('access_token')
    return this.router.navigate([''])
  }

}
