import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { CharacterDetailsComponent } from './character-details.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { Store, provideStore } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GET_CHARACTER_DETAILS_REQUEST } from 'src/app/state';
import { mockCharacterResponse } from 'src/app/mock-data';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;
  const initialState = {};
  let store: MockStore;
  let location: SpyLocation;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  const mockRoute = [{ path: '**', redirectTo: '' }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CharacterDetailsComponent,
        RouterTestingModule.withRoutes(mockRoute),
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideStore(),
        Store,
        provideMockStore({ initialState }),
        { provide: Location, useClass: SpyLocation },
        RouterTestingModule,
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    router.initialNavigation();
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  describe('component, methods & executions of characters list', () => {
    it('should check component creation', () => {
      expect(component).toBeTruthy();
    });

    it('should dispatch GET_CHARACTER_DETAILS_REQUEST action in getCharacterDetails() with cId = 1', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      component.characterId = '1';
      component.getCharacterDetails();
      expect(dispatchSpy).toHaveBeenCalledWith(
        GET_CHARACTER_DETAILS_REQUEST({
          uId: component.characterId,
        })
      );
    });

    it('should not call getCharacterDetails when selector returns same character details', () => {
      const getCharactersListSpy = jest.spyOn(component, 'getCharacterDetails');
      component.characterDetails = mockCharacterResponse.result;
      fixture = TestBed.createComponent(CharacterDetailsComponent);
      expect(getCharactersListSpy).not.toBeCalled();
    });

    it('handlePlanetDetails() should navigate to planet details', () => {
      const navigateSpy = jest.spyOn(router, 'navigate');
      component.characterDetails = mockCharacterResponse.result;
      component.handlePlanetDetails();
      const planetId = '1';
      expect(navigateSpy).toHaveBeenCalledWith(['planet', planetId], {
        relativeTo: activatedRoute,
      });
    });

    it('should go back to previous page on back button click', () => {
      jest.spyOn(location, 'back');
      component.handleBack();
      expect(location.back).toHaveBeenCalled();
    });
  });
});
