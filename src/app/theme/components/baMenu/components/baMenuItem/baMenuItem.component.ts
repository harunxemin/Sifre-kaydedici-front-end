import { booleanAttribute, Component, input, output } from '@angular/core';

import { LimitMenuMenu } from 'limitng/api/models/ortak';

import { GlobalVars } from 'app/globalVars';

@Component({
  selector: 'ba-menu-item',
  templateUrl: 'baMenuItem.component.html',
  styleUrl: 'baMenuItem.component.scss'
})

export class BaMenuItemComponent {
  menuItem = input<LimitMenuMenu>();
  child = input(false, { transform: booleanAttribute });

  itemHover = output<any>();
  toggleSubMenu = output<any>();

  getMenuIconURL = GlobalVars.getMenuIconURL;

  onHoverItem($event: MouseEvent): void {
    this.itemHover.emit($event);
  }

  onToggleSubMenu($event, item): boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }
}
