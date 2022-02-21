import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  uri: String = "http://localhost:8000/"
  public user!: Observable<User>;

  constructor(private router: Router,
    private http: HttpClient) { }

  logIn(user: User): Observable<any> {
    let body;
    if (user != null) {
       body = {
        username : user.username,
        password : user.password,
      }
    }
    return this.http.post(this.uri + "api/user/login",body);
  }

  regesterUser(user: User): Observable<any> {
    // let params = new HttpParams();
    let body;
    if (user != null) {
       body = {
        username : user.username,
        password : user.password,
        fulladdress : user.completeAdreess
      }
    }
    return this.http.post(this.uri + "api/user/register", body);
  }

  postFile(name: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name)
    formData.append("data", name);
    return this.http.post(this.uri + "api/filedata/show", formData);
  }

  getData(name : string) : Observable<any>{
    let params = new HttpParams();
    params = params.append("username", name);
    return this.http.get(this.uri + "api/filedata/get", { observe: "response", params })
  }
}
