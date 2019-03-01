import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private http: HttpClient,
    ) { }

  
  private api_url = "http://localhost:3000/api/user_rooms/user/";

  getUserRooms(user_id: String){
    return this.http.get(this.api_url + user_id);
  }

}
