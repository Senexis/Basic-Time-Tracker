import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { CreateComponent as ClientCreateComponent } from './clients/create/create.component';
import { CreateComponent as TagCreateComponent } from './tags/create/create.component';
import { CreateComponent as TimeEntryCreateComponent } from './time-entries/create/create.component';
import { CreateComponent as UserCreateComponent } from './users/create/create.component';
import { DetailComponent as ClientDetailComponent } from './clients/detail/detail.component';
import { DetailComponent as TagDetailComponent } from './tags/detail/detail.component';
import { DetailComponent as TimeEntryDetailComponent } from './time-entries/detail/detail.component';
import { DetailComponent as UserDetailComponent } from './users/detail/detail.component';
import { EditComponent as ClientEditComponent } from './clients/edit/edit.component';
import { EditComponent as TagEditComponent } from './tags/edit/edit.component';
import { EditComponent as TimeEntryEditComponent } from './time-entries/edit/edit.component';
import { EditComponent as UserEditComponent } from './users/edit/edit.component';
import { IndexComponent as ClientIndexComponent } from './clients/index/index.component';
import { IndexComponent as TagIndexComponent } from './tags/index/index.component';
import { IndexComponent as TimeEntryIndexComponent } from './time-entries/index/index.component';
import { IndexComponent as UserIndexComponent } from './users/index/index.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        ClientCreateComponent,
        ClientDetailComponent,
        ClientEditComponent,
        ClientIndexComponent,
        TagCreateComponent,
        TagDetailComponent,
        TagEditComponent,
        TagIndexComponent,
        TimeEntryCreateComponent,
        TimeEntryDetailComponent,
        TimeEntryEditComponent,
        TimeEntryIndexComponent,
        UserCreateComponent,
        UserDetailComponent,
        UserEditComponent,
        UserIndexComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
