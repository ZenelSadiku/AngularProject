import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'internship-project';
}
