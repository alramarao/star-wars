import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
	let component: LoaderComponent;
	let fixture: ComponentFixture<LoaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LoaderComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LoaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe('check for methods of LoaderComponent', () => {
		it('should create component', () => {
			expect(component).toBeTruthy();
		});
	});
});
