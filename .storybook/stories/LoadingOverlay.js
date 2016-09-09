import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import LoadingOverlay from '../../src/LoadingOverlay.js';
import '../../src/css/spinner.css';


const wrapped = (<div style={{padding: '20px', background: '#FFF'}}>
    <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Nulla vitae elit libero, a pharetra augue.</p>
    <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec sed odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui.</p>
    <p>Nullam quis risus eget urna mollis ornare vel eu leo. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
  </div>);


const FadeWrapper = React.createClass({
  getInitialState: function () {
    return {
      active: true
    }
  },

  waitAndToggle: function () {
    this.looper = setTimeout(() => {
      this.setState({
        active: !this.state.active
      });
      this.waitAndToggle();
    }, 2000);
  },

  componentWillUnmount: function () {
    clearTimeout(this.looper);
  },

  componentDidMount: function () {
    this.waitAndToggle();
  },

  render: function () {
    return (
      <div>
        <LoadingOverlay
          {...this.props}
          active={this.state.active}
          >{wrapped}</LoadingOverlay>
      </div>
    );
  }
});

storiesOf('LoadingOverlay', module)
  .add('no props', () => (
    <LoadingOverlay>{wrapped}</LoadingOverlay>
  ))
  .add('active with text', () => (
    <LoadingOverlay
      active={true}
      text='Loading your fake content...'
      >{wrapped}</LoadingOverlay>
  ))
  .add('with spinner', () => (
    <LoadingOverlay
      active={true}
      spinner={true}
      >{wrapped}</LoadingOverlay>
  ))
  .add('fading', () => (
    <FadeWrapper
      animate={true}
      text='Loading stuff...'
      />
  ))
  .add('with spinner and text', () => (
    <LoadingOverlay
      active={true}
      spinner={true}
      text='Loading stuff...'
      >{wrapped}</LoadingOverlay>
  ))
  .add('custom colors', () => (
    <LoadingOverlay
      active={true}
      spinner={true}
      text='Look at this background!'
      background='rgba(57,204,204,.5)'
      color='rgb(0,0,0)'
      >{wrapped}</LoadingOverlay>
  ))
  .add('custom size', () => (
    <LoadingOverlay
      active={true}
      spinner={true}
      spinnerSize='100px'
      >{wrapped}</LoadingOverlay>
  ))
