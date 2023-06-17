import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { StarWarsService } from './star-wars.service';
import { mockCharacterResponse, mockPlanetResponse, mockResponse } from '../mock-data';

describe('StarWarsService', () => {
  let starWarsService: StarWarsService;
  let httpTestingController: HttpTestingController;

  const pageNo = 1,
    limit = 10,
    uId = '1',
    pId = '1';
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    starWarsService = TestBed.inject(StarWarsService);
  });

  it('should be created', () => {
    expect(starWarsService).toBeTruthy();
  });

  describe('getCharacters()', () => {
    it('getCharacters() should be called', (done) => {
      starWarsService.getCharacters(pageNo, limit).subscribe((data) => {
        expect(data).toEqual(mockResponse);
        done();
      });
      httpTestingController
        .expectOne({
          method: 'GET',
          url: 'api/people?page=2&limit=10',
        })
        .flush(mockResponse);
    });

    it('getCharacters() return an error when the server returns a 404 error', () => {
      starWarsService.getCharacters(pageNo, limit).subscribe(
        () => {},
        (error: any) => {
          expect(error).toEqual(error);
        }
      );
      httpTestingController
        .expectOne({
          method: 'GET',
        })
        .flush('', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getCharacterDetails()', () => {
    it('getCharacterDetails() should be called', (done) => {
      starWarsService.getCharacterDetails(uId).subscribe((data) => {
        expect(data).toEqual(mockCharacterResponse);
        done();
      });
      httpTestingController
        .expectOne({
          method: 'GET',
          url: 'api/people/1',
        })
        .flush(mockCharacterResponse);
    });

    it('getCharacterDetails() return an error when the server returns a 404 error', () => {
      starWarsService.getCharacterDetails(uId).subscribe(
        () => {},
        (error: any) => {
          expect(error).toEqual(error);
        }
      );
      httpTestingController
        .expectOne({
          method: 'GET',
        })
        .flush('', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getPlanetDetails()', () => {
    it('getPlanetDetails() should be called', (done) => {
      starWarsService.getPlanetDetails(pId).subscribe((data) => {
        expect(data).toEqual(mockPlanetResponse);
        done();
      });
      httpTestingController
        .expectOne({
          method: 'GET',
          url: 'api/planets/1',
        })
        .flush(mockPlanetResponse);
    });

    it('getPlanetDetails() return an error when the server returns a 404 error', () => {
      starWarsService.getPlanetDetails(pId).subscribe(
        () => {},
        (error: any) => {
          expect(error).toEqual(error);
        }
      );
      httpTestingController
        .expectOne({
          method: 'GET',
        })
        .flush('', { status: 404, statusText: 'Not Found' });
    });
  });
});
