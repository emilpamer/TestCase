import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from '../user/user';
import { Todo } from './todo';


let todos = [];

@Injectable()
export class TodoService {
    private todosURL = 'http://localhost:53103/api/todo/';
    private newTodo: Todo;


    constructor(
        private http: Http,
    ) {
        this.newTodo = {
            category: '',
            text:''
        }
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
    add(category: string, text: string): Observable<Todo> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.newTodo.category = category;
        this.newTodo.text = text;
        let encapsuled = "'" + JSON.stringify(this.newTodo) + "'";
        let selectedUser: User = JSON.parse(localStorage.getItem('selectedUser'));
        return this.http.post(this.todosURL + selectedUser.email + '/insert', encapsuled, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    get(): Observable<Todo[]> {
        let selectedUser: User = JSON.parse(localStorage.getItem('selectedUser'));
        return this.http.get(this.todosURL + selectedUser.email + '/get')
            .map(this.extractData)
            .catch(this.handleError);
    }

}