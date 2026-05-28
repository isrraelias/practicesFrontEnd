import { Routes } from '@angular/router';
import { Labs} from './pages/labs/labs';
import { Home } from './pages/home/home';
import { ApiMichis } from './pages/api-michis/api-michis';

export const routes: Routes = [
    {
        //podemos dejar en blanco el path para que sea la ruta por defecto
        path: '',
        component: Home
    },
    {
        path: 'labs',
        component: Labs
    },
    {
        path: 'michis',
        component: ApiMichis
    }
];
