import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MediaServerComponent} from "./components/media-server/media-server.component";

const routes: Routes = [
  {path : 'media-server' , component : MediaServerComponent},
  {path : '' , pathMatch : 'full', redirectTo : 'media-server'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
