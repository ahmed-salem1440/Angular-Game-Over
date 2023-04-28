import { Component,OnInit  } from '@angular/core';
import { GamesService } from 'src/app/games.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit{
isLoading:boolean = true
allGames:any[]=[]
subGames:any[]=[]
subGamesLimit:number = 20

constructor(private _GamesService:GamesService){}
ngOnInit(): void {
  this._GamesService.getGames().subscribe({
    next:(response)=>{
      this.allGames = response
      console.log(response);
      this.subGames = this.allGames.slice(0,20)
      this.isLoading = false
    }
  })
}
loadMore():void{ 
  this.subGamesLimit += 20
  this.subGames = this.allGames.slice(0,this.subGamesLimit)

}
}
