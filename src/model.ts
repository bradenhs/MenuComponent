export type Action = (...args: any[]) => any

export interface MenuItemModel {
  description: string
  action?: Action
}

export interface TopLevelMenuItemModel {
  description: string
  action?: Action
  menuItems?: MenuItemModel[]
}

export interface MenuComponentModel {
  topLevelMenuItems: TopLevelMenuItemModel[]
}
