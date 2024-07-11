import { booleanAttribute, Component, input, Input, numberAttribute, OnDestroy, OnInit, output, viewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { ExtraRoute } from 'limitng/api/models/ortak';
import { orderBy } from 'lodash';
import { AutoComplete, AutoCompleteCompleteEvent, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { Subscription } from 'rxjs';

import { GlobalState } from 'app/global.state';
import { BaMenuService } from 'app/theme/services/baMenu/baMenu.service';
import { User } from 'models/user';
import { UserService } from 'services/user.service';

@Component({
  selector: 'ba-menu',
  templateUrl: 'baMenu.component.html',
  styleUrl: 'baMenu.component.scss'
})

export class BaMenuComponent implements OnInit, OnDestroy {
  @Input({ transform: booleanAttribute }) sidebarCollapsed = false;
  menuHeight = input.required<number>();

  autoCompleteObject = viewChild<AutoComplete>('autoCompleteObject');

  expandMenu = output<any>();

  protected _menuItemsSub: Subscription;
  protected _onRouteChange: Subscription;

  searchText = '';
  allRoutes: ExtraRoute[] = [];
  filteredRoutes = [];
  menuItems: any[];
  showHoverElem: boolean;
  hoverElemHeight: number;
  hoverElemTop: number;
  outOfArea = -200;

  private currentUser: User;

  constructor(
    private _router: Router,
    private _service: BaMenuService,
    private _state: GlobalState,
    private userService: UserService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  updateMenu(newMenuItems) {
    this.menuItems = newMenuItems;
    this.selectMenuAndNotify();
    this.fillAllRoutes();
  }

  private fillAllRoutes() {
    this.userService.getUserMenuExtras(this.currentUser)
      .subscribe({
        next: (extraRoutes) => {
          this.allRoutes = extraRoutes.extraRoutes;
          this.menuItems.forEach(route => {
            if (typeof (route['children']) === 'undefined') {
              this.allRoutes.push({ title: route.title, route: route.route });
            } else {
              route.children.forEach(subRoute => {
                this.allRoutes.push({ title: subRoute.title, route: subRoute.route });
              });
            }
          });

          this.allRoutes = orderBy(this.allRoutes, 'title');
          this.allRoutes.forEach(route => {
            this.filteredRoutes.push(route.title);

          });

        }
      });
  }

  selectMenuAndNotify(): void {
    if (this.menuItems) {
      this.menuItems = this._service.selectMenuItem(this.menuItems);
      this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());
    }
  }

  ngOnInit(): void {
    this._onRouteChange = this._router.events
      .subscribe({
        next: (event) => {

          if (event instanceof NavigationEnd) {
            if (this.menuItems) {
              this.selectMenuAndNotify();
            } else {
              // on page load we have to wait as event is fired before menu elements are prepared
              setTimeout(() => this.selectMenuAndNotify());
            }
          }
        }
      });

    this._menuItemsSub = this._service.menuItems
      .subscribe(this.updateMenu.bind(this));
  }

  ngOnDestroy(): void {
    this._onRouteChange.unsubscribe();
    this._menuItemsSub.unsubscribe();
  }

  hoverItem($event): void {
    this.showHoverElem = true;
    this.hoverElemHeight = $event.currentTarget.clientHeight;
    // TODO: get rid of magic 66 constant
    this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 66;
  }

  aramaFocused() {
    this.sidebarCollapsed = true;
    this.expandMenu.emit(null);
  }

  aramaFocus() {
    this.aramaFocused();
    this.autoCompleteObject().inputEL.nativeElement.focus();
  }

  toggleSubMenu($event): boolean {
    const submenu = jQuery($event.currentTarget).next(null);

    if (this.sidebarCollapsed) {
      this.expandMenu.emit(null);
      if (!$event.item.expanded) {
        $event.item.expanded = true;
      }
    } else {
      $event.item.expanded = !$event.item.expanded;
      submenu.slideToggle();
    }

    return false;
  }

  selectRoute(event: AutoCompleteSelectEvent) {
    const routeName: string = event.value;

    const menu = this.allRoutes.filter(route => {
      return (route.title === routeName ? route.route : null);
    });

    if (menu) {
      this.selectMenuAndNotify();
      this._router.navigate(menu[0].route.paths);
      this.filteredRoutes = [];
      this.searchText = '';

    }
  }

  filterRoutes(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLocaleLowerCase('tr-TR');
    const temp = this.allRoutes.filter(route => {
      const tempVar = route.title.toLocaleLowerCase('tr-TR');
      return tempVar.includes(query);
    });

    this.filteredRoutes = temp.map(element => {
      return element.title;
    });
  }

}
