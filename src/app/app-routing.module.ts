import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {path: '', component: ContactComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'chat/:user_id/:room_id', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
