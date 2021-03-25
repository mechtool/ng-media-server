import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-content"><router-outlet></router-outlet>
    </div>`,
  host : {

  }
})
export class AppComponent {

}
