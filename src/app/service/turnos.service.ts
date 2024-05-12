import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  constructor(private http: HttpClient) { }

  getTurnData(): Observable<any[]> {
    return this.http.get<any[]>(environment.CONNECTION_URL);
  }

  getTurnsByDayAndMonth(): Observable<any[]> {
    return this.getTurnData().pipe(
      map(data => {
        const turnCounts: { [key: string]: number } = {}; // Definir tipo de interfaz
        data.forEach(turn => {
          const date = new Date(turn.fecha);
          const month = date.getMonth() + 1; // Months are zero-based
          const day = date.getDate();
          const key = `${month}/${day}`;
          turnCounts[key] = turnCounts[key] ? turnCounts[key] + 1 : 1;
        });
        return Object.entries(turnCounts).map(([date, count]) => ({ date, count }));
      })
    );
  }
}
