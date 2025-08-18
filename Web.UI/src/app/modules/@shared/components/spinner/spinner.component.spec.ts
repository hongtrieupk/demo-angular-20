import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingSpinnerComponent } from './spinner.component';

describe('ProcessingSpinnerComponent', () => {
    let component: ProcessingSpinnerComponent;
    let fixture: ComponentFixture<ProcessingSpinnerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProcessingSpinnerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProcessingSpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
