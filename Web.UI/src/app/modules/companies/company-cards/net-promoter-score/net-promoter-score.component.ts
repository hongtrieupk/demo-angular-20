import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { getCompanyClassImageSrc } from '../constant';

@Component({
    selector: 'app-net-promoter-score',
    templateUrl: './net-promoter-score.component.html',
    styleUrl: './net-promoter-score.component.scss',
    imports: [FormsModule, DialogModule, ButtonModule, InputTextModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetPromoterScoreComponent {
    visible = model.required<boolean>();
    selectedScore = -1;

    close(): void {
        this.visible.set(false);
    }

    setScore(score: number): void {
        this.selectedScore = score;
    }

    getCompanyClassImageSrc(score: number): string {
        return getCompanyClassImageSrc(score);
    }
}
