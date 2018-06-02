import { Component } from '@angular/core';
import { Guid } from '@chess/guid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  guid = Guid.newGuid().toString();
}
