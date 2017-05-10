import { find, has, remove } from 'lodash'
import { Paper } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { style } from 'typestyle'
import { Action, MenuComponentModel } from './model'
import { TopLevelMenuItem } from './TopLevelMenuItem'

const menuContainerClassName = style({
  display: 'inline-block'
})

export class MenuComponent extends React.Component<{}, MenuComponentModel> {
  constructor() {
    super()
    this.state = {
      topLevelMenuItems: []
    }
  }

  static Create(element: HTMLElement) {
    return ReactDOM.render(<MenuComponent/>, element)
  }

  render() {
    const { topLevelMenuItems } = this.state
    return <MuiThemeProvider>
      <Paper className={ menuContainerClassName }>
        { topLevelMenuItems.map(({ description, action, menuItems }) =>
          <TopLevelMenuItem
            key={ description }
            description={ description }
            action={ action }
            menuItems={ menuItems }
          />
        ) }
      </Paper>
    </MuiThemeProvider>
  }

  /**
   * Will create a new top-level menu item. The action parameter is optional.
   */
  addTopLevelItem(description: string, action?: Action) {
    const [ ...topLevelMenuItems ] = this.state.topLevelMenuItems

    if (typeof description !== 'string') {
      throw new Error(`The description must be of type string`)
    }

    if (has(topLevelMenuItems, description)) {
      throw new Error(`A top level menu item with the description "${description}" already exists.`)
    }

    if (action != null && typeof action !== 'function') {
      throw new Error(`If an action is provided it must be a function`)
    }

    topLevelMenuItems.push({ action, description: description.toLowerCase() })

    this.setState({ topLevelMenuItems })
  }

  /**
   * Removes the top level option with the given description
   */
  removeTopLevelItem(description: string) {
    const [ ...topLevelMenuItems ] = this.state.topLevelMenuItems

    remove(topLevelMenuItems, item => item.description === description.toLowerCase())

    this.setState({ topLevelMenuItems })
  }

  /**
   * Creates a new MenuItem as a child of the TopLevelMenuItem.
   */
  addItem(parentDescription: string, description: string, action?: Action) {
    const [ ...topLevelMenuItems ] = this.state.topLevelMenuItems

    const topLevelMenuItem = find(
      topLevelMenuItems,
      item => item.description === parentDescription.toLowerCase()
    )

    if (topLevelMenuItem == null) {
      throw new Error(`No top level menu item exists with the description "${parentDescription}"`)
    }

    if (topLevelMenuItem.action != null) {
      throw new Error(`Top level menu items with actions may not have child items`)
    }

    if (topLevelMenuItem.menuItems == null) {
      topLevelMenuItem.menuItems = []
    }

    if (has(topLevelMenuItem.menuItems, description.toLowerCase())) {
      throw new Error(
        `An item with the parent description "${parentDescription}"
         and the description "${description}" already exists`
      )
    }

    topLevelMenuItem.menuItems.push({ description: description.toLowerCase(), action })

    this.setState({ topLevelMenuItems })
  }

  /**
   * Removes the MenuItem with the matching description and parentDescription.
   */
  removeItem(parentDescription: string, description: string) {
    const [ ...topLevelMenuItems ] = this.state.topLevelMenuItems

    const topLevelMenuItem = find(
      topLevelMenuItems,
      item => item.description === parentDescription.toLowerCase()
    )

    if (topLevelMenuItem != null && Array.isArray(topLevelMenuItem.menuItems)) {
      remove(
        topLevelMenuItem.menuItems,
        item => item.description === description.toLowerCase()
      )
    }

    this.setState({ topLevelMenuItems })
  }
}
