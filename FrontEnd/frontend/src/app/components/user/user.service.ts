import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from './user';


@Injectable()
export class UserService {
    private usersURL = 'http://localhost:53103/api/user/';
    newUser: User = {
        name: '',
        email: '',
    }

    constructor(
        private http: Http,
    ) { }

    //FROM SERVER

    get(): Observable<User[]> {
        return this.http.get(this.usersURL + 'get')
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log(body);
        return body || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    //TO SERVER
    add(name: string, email: string): Observable<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.newUser.name = name;
        this.newUser.email = email;
        let encapsuled = "'" + JSON.stringify(this.newUser) + "'";

        return this.http.post(this.usersURL + 'insert', encapsuled, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

}