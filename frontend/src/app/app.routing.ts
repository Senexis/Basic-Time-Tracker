import { Routes, RouterModule } from '@angular/router';

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

import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    // general
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // clients
    {
        path: 'clients',
        component: ClientIndexComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'clients/create',
        component: ClientCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'clients/:id',
        component: ClientDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'clients/:id/edit',
        component: ClientEditComponent,
        canActivate: [AuthGuard]
    },

    // tags
    {
        path: 'tags',
        component: TagIndexComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tags/create',
        component: TagCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tags/:id',
        component: TagDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'tags/:id/edit',
        component: TagEditComponent,
        canActivate: [AuthGuard]
    },

    // time-entries
    {
        path: 'time-entries',
        component: TimeEntryIndexComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'time-entries/create',
        component: TimeEntryCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'time-entries/:id',
        component: TimeEntryDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'time-entries/:id/edit',
        component: TimeEntryEditComponent,
        canActivate: [AuthGuard]
    },

    // users
    {
        path: 'users',
        component: UserIndexComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users/create',
        component: UserCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users/:id',
        component: UserDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users/:id/edit',
        component: UserEditComponent,
        canActivate: [AuthGuard]
    },

    // lazy fallback
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
