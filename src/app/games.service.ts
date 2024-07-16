import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  options:any = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '23118f1739msha545bd8ecb8c2c7p1edf81jsndd8cc3c8575b',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  constructor(private _HttpClient:HttpClient) { }
  getGames():Observable<any>{
    return this._HttpClient.get('https://free-to-play-games-database.p.rapidapi.com/api/games',this.options)
  }
  getGamesByID(id:string):Observable<any>{
    return this._HttpClient.get(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,this.options)
  }
  getGamesByPlatform(platform:string):Observable<any>{
    return this._HttpClient.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}`,this.options)
  }
  getGamesBySortBy(sortBy:string):Observable<any>{
    return this._HttpClient.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${sortBy}`,this.options)
  }
  getGamesBycategory(category:string):Observable<any>{
    return this._HttpClient.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,this.options)
  }

}
