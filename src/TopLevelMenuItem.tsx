import { autobind } from 'core-decorators'
import { FlatButton, Menu, MenuItem, Popover } from 'material-ui'
import * as React from 'react'
import { TopLevelMenuItemModel } from './model'

interface State {
  open: boolean
  anchorElement?: HTMLSpanElement
}

@autobind
export class TopLevelMenuItem extends React.Component<TopLevelMenuItemModel, State> {
  constructor(props: TopLevelMenuItemModel) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    const { description, menuItems } = this.props
    const { anchorElement } = this.state
    return <span
      ref={ this.setAnchorElement }
    >
      <FlatButton
        onTouchTap={ this.handleTouchTap }
        label={ description }
      />
      { menuItems && menuItems.length > 0 && this.renderDropDownMenu() }
    </span>
  }

  renderDropDownMenu() {
    const { menuItems } = this.props
    const { anchorElement } = this.state
    return <Popover
      open={ this.state.open }
      anchorEl={ anchorElement }
      anchorOrigin={ { horizontal: 'left', vertical: 'bottom' } }
      targetOrigin={ { horizontal: 'left', vertical: 'top' } }
      onRequestClose={ this.handleRequestClose }
    >
      <Menu>
        { menuItems && menuItems.map(item =>
          <MenuItem
            key={ item.description }
            primaryText={ item.description.toUpperCase() }
            onTouchTap={ () => {
              item.action && item.action()
              this.setState({ open: false })
            } }
          />
        ) }
      </Menu>
    </Popover>
  }

  handleTouchTap() {
    if (typeof this.props.action === 'function') {
      this.props.action()
    } else {
      this.setState({ open: !this.state.open })
    }
  }

  handleRequestClose() {
    this.setState({ open: false })
  }

  setAnchorElement(anchorElement: HTMLSpanElement) {
    this.setState({ anchorElement })
  }
}
