import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CharacterDetails } from 'src/app/models';
import { Store } from '@ngrx/store';
import {
  GET_CHARACTER_DETAILS_REQUEST,
  State,
  getCharacterDetails,
} from 'src/app/state';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule, RouterModule, LoaderComponent],
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnDestroy {
  private readonly starStore = inject(Store<State>);
  
  characterId: string = '';
  characterDetails: CharacterDetails | undefined;

  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.characterId = params['uid'] || '';
        if (!this.characterId) {
          return;
        }
      }),
      this.starStore.select(getCharacterDetails).subscribe((details) => {
        if (details && details.uid === this.characterId) {
          this.characterDetails = details;
        } else {
          this.getCharacterDetails();
        }
      })
    );
  }

  getCharacterDetails(): void {
    this.starStore.dispatch(GET_CHARACTER_DETAILS_REQUEST({ uId: this.characterId }));
  }

  handlePlanetDetails(): void {
    const planetId = (this.characterDetails?.properties?.homeworld || '').split(
      '/planets/'
    )[1];
    if (planetId) {
      this.router.navigate(['planet', planetId], { relativeTo: this.route });
    }
  }

  handleBack(): void {
    this._location.back();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}

