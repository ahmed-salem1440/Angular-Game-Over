import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from 'src/app/games.service'; 

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css']
})
export class PlatformsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute , private _Router:Router , private _GamesService:GamesService){}
  gamePlatform:any;
  isLoading:boolean = true
  allGames:any[]=[]
  subGames:any[]=[]
  searchTerm:string = ''

  subGamesLimit:number = 20
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params)=>{
      this.isLoading = true
      this.gamePlatform = params.get('platform')
      this._GamesService.getGamesByPlatform(this.gamePlatform).subscribe({
        next:(response)=>{
          this.isLoading = false
          this.allGames = response
          console.log(this.allGames);
          this.subGames = this.allGames.slice(0,20)
        },
        error:()=>{
          this.isLoading = false
          this._Router.navigate(['/notfound'])
        }
      })
    })
    }
      loadMore():void{ 
        this.subGamesLimit += 20
        this.subGames = this.allGames.slice(0,this.subGamesLimit)
      
      }
  }

