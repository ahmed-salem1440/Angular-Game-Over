import { Component ,OnInit } from '@angular/core';
import { GamesService } from 'src/app/games.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  games:any[]=[]
  searchTerm:string = ''

 constructor(private _GamesService:GamesService){}
  ngOnInit(): void {
      this._GamesService.getGames().subscribe((response)=>{
        console.log(response);
        this.games = response.slice(0,3)
        console.log(this.games);
        
      })
  }
}
