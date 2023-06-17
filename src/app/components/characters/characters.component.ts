import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from 'src/app/models';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import {
  GET_CHARACTERS_REQUEST,
  State,
  getNumberOfCharacters,
  getPageNo,
  getCharactersList,
  getTotalPages,
  resetStateField,
} from 'src/app/state';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, RouterModule, LoaderComponent],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnDestroy {
  private readonly starStore = inject(Store<State>);
  tableData: Character[] = [];
  loading = true;
  
  totalItems: number | undefined;
  totalPages: number | undefined;
  pageSize: number = 10;
  pageIndex: number = 0;

  private subscriptions: Subscription[] = [];

  constructor() {
    this.subscriptions.push(
      this.starStore.select(getPageNo).subscribe((pageNo: number) => {
        if (this.pageIndex !== pageNo) {
          this.pageIndex = pageNo < 0 ? 0 : pageNo;
          this.getCharactersList();
        }
      }),
      this.starStore.select(getCharactersList).subscribe((response) => {
        if (response && response.length > 0) {
          this.tableData = response;
          this.loading = false;
        }
      }),
      this.starStore.select(getNumberOfCharacters).subscribe((response: number) => {
        response === 0
          ? (this.totalItems = undefined)
          : (this.totalItems = response);
      }),
      this.starStore.select(getTotalPages).subscribe((response: number) => {
        response === 0
          ? (this.totalPages = undefined)
          : (this.totalPages = response);
      }),
    );
  }

  getCharactersList(): void {
    this.starStore.dispatch(resetStateField('isLoadingData'));
    this.loading = true;
    this.starStore.dispatch(
      GET_CHARACTERS_REQUEST({
        pageNo: this.pageIndex,
        limit: this.pageSize,
      })
    );
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageIndex = e.pageIndex;
    this.getCharactersList();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
