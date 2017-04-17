import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutesModule } from './routes/routes.module'; 
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';

import { TodoComponent } from './components/todo/todo.component';
import { UserComponent } from './components/user/user.component';

import { UserService } from './components/user/user.service';

@NgModule({
    declarations: [
        AppComponent,
        TodoComponent,
        UserComponent
    ],
    imports: [
        RoutesModule, 
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
    ],
    providers: [
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
