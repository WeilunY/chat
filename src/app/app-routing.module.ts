/**
 * @author Weilun Yao
 * 
 * Description: 
 * This is the router setup for chat app.
 * You can use ./contact/:user_id to access the contact (user_room) page for different user
 * and ./chat/:user_id/:room_id to access the chat history for different user in different room
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {path: '', component: ContactComponent},
  {path: 'contact/:user_id', component: ContactComponent},
  {path: 'chat/:user_id/:room_id', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
