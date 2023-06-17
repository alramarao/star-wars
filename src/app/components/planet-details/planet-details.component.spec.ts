import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { PlanetDetailsComponent } from './planet-details.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Store, provideStore } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GET_PLANET_DETAILS_REQUEST } from 'src/app/state';
import { mockPlanetResponse } from 'src/app/mock-data';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';

describe('PlanetDetailsComponent', () => {
  let component: PlanetDetailsComponent;
  let fixture: ComponentFixture<PlanetDetailsComponent>;
  const initialState = {};
  let store: MockStore;
  let location: SpyLocation;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetDetailsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideStore(),
        Store,
        provideMockStore({ initialState }),
        { provide: Location, useClass: SpyLocation },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PlanetDetailsComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  describe('component, methods & executions of characters list', () => {
    it('should check component creation', () => {
      expect(component).toBeTruthy();
    });

    it('should dispatch GET_PLANET_DETAILS_REQUEST action in getPlanetDetails() with pId = 1', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      component.planetId = '1';
      component.getPlanetDetails();
      expect(dispatchSpy).toHaveBeenCalledWith(
        GET_PLANET_DETAILS_REQUEST({
          pId: component.planetId,
        })
      );
    });

    it('should not call getPlanetDetails when selector returns same character details', () => {
      const getCharactersListSpy = jest.spyOn(component, 'getPlanetDetails');
      component.planetDetails = mockPlanetResponse.result;
      fixture = TestBed.createComponent(PlanetDetailsComponent);
      expect(getCharactersListSpy).not.toBeCalled();
    });

    it('should go back to previous page on back button click', () => {
      jest.spyOn(location, 'back');
      component.handleBack();
      expect(location.back).toHaveBeenCalled();
    });
  });
});
