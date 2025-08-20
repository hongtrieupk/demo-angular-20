import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
    selector: 'app-menu',
    imports: [CommonModule, MenuItemComponent, RouterModule],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
})
export class MenuComponent {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Menu bar',
                items: [
                    {
                        label: 'Companies',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/companies'],
                    },
                    {
                        label: 'R&D Department',
                        icon: 'pi pi-fw pi-building',
                        routerLink: [
                            '/demo-components',
                        ],
                    },
                ],
            },
        ];
    }
}
