import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { User } from './../../components/user/user';
import { Todo } from './todo';
import { UserService } from './../../components/user/user.service';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    providers: [TodoService]
})
export class TodoComponent implements OnInit {
    public selectedUser: User = null;
    private todos: Todo[];
    private newTodo;
    private errorMessage: string;

    constructor(
        private todoService: TodoService,
        private userService: UserService,
    ) { this.newTodo = {
        category: '',
        text: '',
    }}


    ngOnInit(): void {
        let user = localStorage.getItem('selectedUser');
        let decoded = JSON.parse(user);
        this.selectedUser = decoded;
        this.getTodos();
    }

    getTodos() {
        this.todoService.get()
            .subscribe(
            todos => this.todos = todos,
            error => this.errorMessage = <any>error);
    }

    addTodo() {
        if (this.newTodo.category == '' || this.newTodo.text == '') { return; }
        this.todoService.add(this.newTodo.category, this.newTodo.text)
            .subscribe(
            todo => this.todos.push(todo),
            error => this.errorMessage = <any>error);
        this.newTodo.category = '';
        this.newTodo.text = '';
    }
}