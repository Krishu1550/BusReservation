import { Routes } from '@angular/router';
import { SearchBus } from './pages/search-bus/search-bus';
import { SearchResult } from './pages/search-result/search-result';
import { BookTicket } from './pages/book-ticket/book-ticket';
import { MyBooking } from './pages/my-booking/my-booking';

export const routes: Routes = [

{
    path:"",
    redirectTo:"search",
    pathMatch:"full"
},

{
    path:"search",
    component:SearchBus
},
{
    path: "search-result",
    component: SearchResult
},
{
    path:"book-ticket",
    component: BookTicket
},

{
    path:"my-booking",

    component:MyBooking
}



];
