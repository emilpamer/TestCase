import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [UserService]
})
export class UserComponent implements OnInit {
    errorMessage: string;
    users: User[];
    newUser: User;
    selectedUser: User;

    constructor(
        private userService: UserService,
        private router: Router
    ) {
        this.newUser = {
            name: '',
            email: '',
        }
    }

    getUsers() {
        this.userService.get()
            .subscribe(
            users => this.users = users,
            error => this.errorMessage = <any>error);
        }

    ngOnInit() {
        this.getUsers();
    }


    addUser() {
        if (this.newUser.name == '' || this.newUser.email == '') { return; }
        this.userService.add(this.newUser.name, this.newUser.email)
            .subscribe(
            user => this.users.push(user),
            error => this.errorMessage = <any>error);
        this.newUser.name = '';
        this.newUser.email = '';
    }

    navigateAndSetActive(user: User) {
        this.selectedUser = user;
        localStorage.setItem('selectedUser', JSON.stringify(user));
        this.router.navigate(["todo"]);
    }

}
