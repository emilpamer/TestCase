import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { TodoComponent } from '../components/todo/todo.component';
import { UserComponent } from '../components/user/user.component';  

const routes: Routes = [
    {
        path: '',
        redirectTo: '/user',
        pathMatch: 'full'
    },
    {
        path: 'user',
        component: UserComponent
    }, 
    {
        path: 'todo',
        component: TodoComponent
    }

]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash:true })],
    providers: [],
    exports: [RouterModule]
})

export class RoutesModule { }
