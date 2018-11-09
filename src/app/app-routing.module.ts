import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditcardComponent } from './creditcard/creditcard.component';
import { AppComponent } from './app.component';
import { InputsComponent } from './inputs/inputs.component';

const routes: Routes = [
  {
    path: '',
    component: CreditcardComponent
  },

  {
    path: '',
    component: AppComponent
  },
  {
  path: '',
  component: InputsComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
