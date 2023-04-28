import { AfterViewInit, Component,ElementRef, ViewChild} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'game Over';
  @ViewChild('navbar') navbar!: ElementRef ;
  ngAfterViewInit(): void {
    this.setMarginTop();
  }
  onResize() {
    this.setMarginTop();
  }

  setMarginTop() {
    let navbarHeight = this.navbar.nativeElement.offsetHeight;
    console.log("navbarHeight", navbarHeight );
    
    let content = document.querySelector('.content') as HTMLElement;
    content.style.paddingTop = navbarHeight + 'px';
  }
  
}
