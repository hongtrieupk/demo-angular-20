import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error5xxComponent } from './error-5xx.component';

describe('Error500Component', () => {
    let component: Error5xxComponent;
    let fixture: ComponentFixture<Error5xxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Error5xxComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(Error5xxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
