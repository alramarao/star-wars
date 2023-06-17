import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharactersComponent } from './characters.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Store, provideStore } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GET_CHARACTERS_REQUEST, resetStateField } from 'src/app/state';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  const initialState = {};
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideStore(),
        Store,
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
    
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('component, methods & executions of characters list', () => {
    it('should check component creation', () => {
      expect(component).toBeTruthy();
    });

    it('should dispatch GET_CHARACTERS_REQUEST action in getCharactersList() with pageNo = 1, limit = 10', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      component.pageIndex = 1;
      component.pageSize = 10;
      component.getCharactersList();
      expect(dispatchSpy).toHaveBeenCalledWith(
        resetStateField('isLoadingData')
      );
      expect(component.loading).toBe(true);
      expect(dispatchSpy).toHaveBeenCalledWith(
        GET_CHARACTERS_REQUEST({
          pageNo: component.pageIndex,
          limit: component.pageSize,
        })
      );
    });

    it('should call handlePageEvent for changing table page event', () => {
      const getCharactersListSpy = jest.spyOn(component, 'getCharactersList');
      component.handlePageEvent({ pageIndex: 2, pageSize: 10, length: 10 });
      expect(component.pageIndex).toBe(2);
      expect(getCharactersListSpy).toBeCalled();
    });
  });
});
