import { Routes } from '@angular/router';
import { List } from './domains/products/pages/list/list'
import { About } from './domains/information/pages/about/about';

export const routes: Routes = [
    {
        path: '',
        component: List
    },
    {
        path:'about',
        component: About
    }
];
