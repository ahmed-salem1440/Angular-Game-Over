import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from 'src/app/games.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
HTMLVideoElement
@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  isLoading:boolean = true
  constructor(private _GamesService:GamesService , private _Router:Router, private _ActivatedRoute:ActivatedRoute){}
  gameDetails:any ;
  gameId:any;
  screenshots:any[] = []
  videoUrl:any;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params)=>{
      this.gameId =  params.get('id')
      this.videoUrl =  `https://www.freetogame.com/g/${params.get('id')}/videoplayback.webm`
      console.log(this.videoUrl);
      
    })
    this._GamesService.getGamesByID(this.gameId).subscribe({
      next:(response)=>{
        this.isLoading = false
        console.log(response);
        this.gameDetails = response
        this.screenshots = response.screenshots
      },
      error:()=>{
        this.isLoading = false
        this._Router.navigate(['/notfound'])
      }
    })
  }
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  playVideo() {
    this.videoPlayer.nativeElement.play();
  }

  stopVideo() {
    this.videoPlayer.nativeElement.pause();
    this.videoPlayer.nativeElement.currentTime = 0;
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplaySpeed:700,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }
  
}
