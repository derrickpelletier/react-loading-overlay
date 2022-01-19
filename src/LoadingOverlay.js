import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import { css, cx } from 'emotion'

import Spinner from './components/Spinner'
import STYLES from './styles'

class LoadingOverlayWrapper extends Component {
  constructor (props) {
    super(props)
    this.wrapper = React.createRef()
    this.state = { overflowCSS: {} }
  }

  componentDidMount () {
    const wrapperStyle = window.getComputedStyle(this.wrapper.current)
    const overflowCSS = ['overflow', 'overflowX', 'overflowY'].reduce((m, i) => {
      if (wrapperStyle[i] !== 'visible') m[i] = 'hidden'
      return m
    }, {})
    this.setState({ overflowCSS })
  }

  componentDidUpdate (prevProps) {
    const { active } = this.props
    if (active) this.wrapper.current.scrollTop = 0
  }

  /**
   * Return an emotion css object for a given element key
   * If a custom style was provided via props, run it with
   * the base css obj.
   */
  getStyles = (key, providedState) => {
    const base = STYLES[key](providedState, this.props)
    const custom = this.props.styles[key]
    if (!custom) return base
    return typeof custom === 'function'
      ? custom(base, this.props)
      : custom
  }

  /**
   * Convenience cx wrapper to add prefix classes to each of the child
   * elements for styling purposes.
   */
  cx = (names, ...args) => {
    const arr = Array.isArray(names) ? names : [names]
    return cx(
      ...arr.map(name => name ? `${this.props.classNamePrefix}${name}` : ''),
      ...args
    )
  }

  render () {
    const { overflowCSS } = this.state
    const {
      children,
      className,
      onClick,
      active,
      fadeSpeed,
      spinner,
      text
    } = this.props

    return (
      <div
        data-testid='wrapper'
        ref={this.wrapper}
        className={
          this.cx(
            ['wrapper', active && 'wrapper--active'],
            css(this.getStyles('wrapper', active ? overflowCSS : {})),
            className
          )
        }
      >
        <CSSTransition
          in={active}
          classNames='_loading-overlay-transition'
          timeout={fadeSpeed}
          unmountOnExit
        >
          {state => (
            <div
              data-testid='overlay'
              className={this.cx('overlay', css(this.getStyles('overlay', state)))}
              onClick={onClick}
            >
              <div className={this.cx('content', css(this.getStyles('content')))}>
                {spinner && (
                  typeof spinner === 'boolean'
                    ? <Spinner cx={this.cx} getStyles={this.getStyles} />
                    : spinner
                )}
                {text}
              </div>
            </div>
          )}
        </CSSTransition>
        {children}
      </div>
    )
  }
}

LoadingOverlayWrapper.propTypes = {
  active: PropTypes.bool,
  fadeSpeed: PropTypes.number,
  onClick: PropTypes.func,
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
  spinner: PropTypes.oneOfType([ PropTypes.bool, PropTypes.node ]),
  text: PropTypes.node,
  styles: PropTypes.shape({
    content: PropTypes.func,
    overlay: PropTypes.func,
    spinner: PropTypes.func,
    wrapper: PropTypes.func
  })
}

LoadingOverlayWrapper.defaultProps = {
  classNamePrefix: '_loading_overlay_',
  fadeSpeed: 500,
  styles: {}
}

export default LoadingOverlayWrapper
