import { Component, Inject } from '@angular/core';
import { SITE_URL } from './domain/tokens';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shop';
  constructor(@Inject(SITE_URL) private siteUrl: string,
              private router: Router) {
  }

  public onCatalogueClick() {
    this.router.navigateByUrl("");
  }
}
