/**
 * LoadingOverlay
 *
 * Wrap your component in this and set active={true/false}.
 * react transition group will handle the fade of the overlay portion.
 * apply any classnames you need as normal with className prop.

  <LoadingOverlay active={true} text='Saving...'>my children</LoadingOverlay>
 */
import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

const LoadingOverlayWrapper = React.createClass({

  propTypes: {
    active: React.PropTypes.bool,
    text: React.PropTypes.string,
    spinner: React.PropTypes.bool,
    spinnerSize: React.PropTypes.string,
    className: React.PropTypes.string,
    background: React.PropTypes.string,
    color: React.PropTypes.string,
    zIndex: React.PropTypes.number,
    animate: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      active: false,
      className: '_loading-overlay',
      background: 'rgba(0,0,0,.7)',
      spinnerSize: '50px',
      color: '#FFF',
      zIndex: 800,
      animate: false
    }
  },

  render: function () {

    const loadNode = this.props.active ? (<LoadingOverlay key='the_dimmer' {...this.props} />) : null;
    let wrapNode = loadNode;
    if(this.props.animate || this.props.spinner) {
      wrapNode = (
        <ReactCSSTransitionGroup
          transitionName="_loading-overlay-transition"
          transitionAppear={true}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppearTimeout={500}>
          {loadNode}
        </ReactCSSTransitionGroup>
      );
    }
    return (
      <div
        style={{position:'relative'}}
        className={this.props.className}>
        {this.props.children}
        {wrapNode}
      </div>
    )
  }
});

const LoadingOverlay = React.createClass({
  displayName: 'LoadingOverlay',

  getDefaultProps: function () {
    return {
      text: null,
      spinner: false
    };
  },

  render: function () {

    const styles = {
      overlay: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        background: this.props.background,
        color: this.props.color,
        top: '0px',
        left: '0px',
        transition: `opacity ${this.props.speed}ms ease-out`,
        display: 'flex',
        textAlign: 'center',
        fontSize: '1.2em',
        zIndex: this.props.zIndex
      },
      content: {
        margin: 'auto'
      },
      spinner: {
        width: this.props.spinnerSize,
        maxHeight: '100%',
        position: 'relative'
      },
      circle: {
        stroke: this.props.color
      }
    };

    let spinnerNode = null;
    if(this.props.spinner) spinnerNode = (
      <div className="spinner" style={styles.spinner}>
        <svg viewBox="25 25 50 50">
          <circle style={styles.circle} cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
        </svg>
      </div>
    );

    let textNode = null;
    if(!!this.props.text) textNode = <div>{this.props.text}</div>

    let contentNode = null;
    if(this.props.text ||  this.props.spinner) {
      contentNode = (
        <div style={ styles.content }>
          {spinnerNode}
          {textNode}
        </div>
      );
    }

    return <div style={ styles.overlay } key="dimmer">{contentNode}</div>
  }
});

export default LoadingOverlayWrapper;
