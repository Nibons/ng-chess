import { Component } from '@angular/core';
import { CombinedStore } from 'src/app/chess-service/state/combined.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-chess';
  constructor(private combinedStore: CombinedStore) { }
}
