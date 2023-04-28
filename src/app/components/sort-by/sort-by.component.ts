import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from 'src/app/games.service'; 

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.css']
})
export class SortByComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute ,private _Router:Router, private _GamesService:GamesService){}
  sortBy:any;
  isLoading:boolean = true
  allGames:any[]=[]
  subGames:any[]=[]
  subGamesLimit:number = 20
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params)=>{
      this.sortBy = params.get('sort-by')
      this.isLoading = true
      this._GamesService.getGamesBySortBy(this.sortBy).subscribe({
        next:(response)=>{
          this.isLoading = false
          this.allGames = response
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
