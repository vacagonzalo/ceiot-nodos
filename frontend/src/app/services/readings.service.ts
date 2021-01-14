import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReadingsService {

  public url = "http://localhost:8080/readings/"

  constructor(private http: HttpClient) { }

  getReadings() {
    
  }
}
