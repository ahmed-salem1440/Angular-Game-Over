import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from 'src/app/games.service'; 
Router
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
// category
export class CategoriesComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute ,private _Router:Router, private _GamesService:GamesService){}
  category:any;
  isLoading:boolean = true
  allGames:any[]=[]
  subGames:any[]=[]
  subGamesLimit:number = 20
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe((params)=>{
        this.isLoading = true
        this.category = params.get('category')
        this._GamesService.getGamesBycategory(this.category).subscribe({
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
