import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { LimitMenuItem } from 'limitng/api/models/ortak';
import { cloneDeep } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class BaMenuService {
  menuItems = new BehaviorSubject<any[]>([]);

  protected _currentMenuItem = {};
  private routeList: RouteItem[] = [];

  constructor(private _router: Router) {
    this.routeList.push(new RouteItem('logbook/logbook-inceleme', 'logbook-inceleme'));
  }

  /**
   * Updates the routes in the menu
   *
   * @param {Routes} routes Type compatible with app.menu.ts
   */
  updateMenuByRoutes(routes: Routes) {
    const convertedRoutes = this.convertRoutesToMenus(cloneDeep(routes));
    this.menuItems.next(convertedRoutes);
  }

  convertRoutesToMenus(routes: Routes): any[] {
    const items = this._convertArrayToItems(routes);
    return this._skipEmpty(items);
  }

  getCurrentItem(): any {
    return this._currentMenuItem;
  }

  selectMenuItem(menuItems: LimitMenuItem[]): LimitMenuItem[] {
    const items: any[] = [];
    menuItems.forEach((item) => {
      this._selectItem(item);

      if (item.selected) {
        this._currentMenuItem = item;
        this.expandMenu(this._currentMenuItem);
      }

      if (item.children && item.children.length > 0) {
        item.children = this.selectMenuItem(item.children);
      }
      items.push(item);
    });
    return items;
  }

  protected expandMenu(item: any) {
    if (this.menuItems.value) {
      this.menuItems.value.forEach(element => {
        if (element.children) {
          const child = element.children;
          child.forEach(subElement => {
            if (subElement === item) {
              element.expanded = true;
            }
          });
        }
      });
    }
  }

  protected _skipEmpty(items: any[]): any[] {
    const menu = [];
    items.forEach((item) => {
      let menuItem: LimitMenuItem;
      if (item.skip) {
        if (item.children && item.children.length > 0) {
          menuItem = item.children;
        }
      } else {
        menuItem = item;
      }

      if (menuItem) {
        menu.push(menuItem);
      }
    });

    return [].concat(...menu);
  }

  protected _convertArrayToItems(routes: any[], parent?: any): any[] {
    const items = [];
    routes.forEach((route) => {
      items.push(this._convertObjectToItem(route, parent));
    });
    return items;
  }

  protected _convertObjectToItem(object, parent?: any): any {
    let item: any = {};
    if (object.data && object.data.menu) {
      // this is a menu object
      item = object.data.menu;
      item.route = object;
      delete item.route.data.menu;
    } else {
      item.route = object;
      item.skip = true;
    }

    // we have to collect all paths to correctly build the url then
    if (Array.isArray(item.route.path)) {
      item.route.paths = item.route.path;
    } else {
      item.route.paths = parent && parent.route && parent.route.paths ? parent.route.paths.slice(0) : ['/'];
      if (item.route.path) {
        item.route.paths.push(item.route.path);
      }
    }

    if (object.children && object.children.length > 0) {
      item.children = this._convertArrayToItems(object.children, item);
    }

    const prepared = this._prepareItem(item);

    // if current item is selected or expanded - then parent is expanded too
    if ((prepared.selected || prepared.expanded) && parent) {
      parent.expanded = true;
    }

    return prepared;
  }

  protected _prepareItem(object: any): any {
    if (!object.skip) {
      object.target = object.target || '';
      object.pathMatch = object.pathMatch || 'full';
      return this._selectItem(object);
    }

    return object;
  }

  protected unselectAll() {
    if (this.menuItems) {
      if (this.menuItems.value) {
        this.menuItems.value.forEach(element => {
          element.selected = false;
          if (element.children) {
            const child = element.children;
            child.selected = false;
            child.forEach(subElement => {
              subElement.selected = false;
            });
          }
        });
      }
    }
  }

  protected _selectItem(object: any): any {

    let selected = false;
    for (const element of this.routeList) {
      if ((this._router.url.endsWith(element.URL)) && (object.route.path === element.path)) {
        this.unselectAll();
        object.selected = true;
        selected = true
        break;
      }

    }

    if (!selected) {
      object.selected = this._router.isActive(this._router.createUrlTree(object.route.paths), object.pathMatch === 'full');
    }

    return object;
  }


}

class RouteItem {
  URL = '';
  path = '';

  constructor(URL: string, path: string) {
    this.URL = URL;
    this.path = path;
  }
}
