import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlanetDetails } from 'src/app/models';
import { Store } from '@ngrx/store';
import {
  GET_PLANET_DETAILS_REQUEST,
  State,
  getPlanetDetails,
} from 'src/app/state';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-planet-details',
  standalone: true,
  imports: [CommonModule, RouterModule, LoaderComponent],
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.scss']
})
export class PlanetDetailsComponent implements OnDestroy {
  private readonly starStore = inject(Store<State>);
  planetId: string = '';
  planetDetails: PlanetDetails | undefined;

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private _location: Location
  ) {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.planetId = params['pid'] || '';
        if (!this.planetId) {
          return;
        }
      }),
      this.starStore.select(getPlanetDetails).subscribe((details) => {
        if (details && details.uid === this.planetId) {
          this.planetDetails = details;
        } else {
          this.getPlanetDetails();
        }
      })
    );
  }

  getPlanetDetails(): void {
    this.starStore.dispatch(GET_PLANET_DETAILS_REQUEST({ pId: this.planetId }));
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
