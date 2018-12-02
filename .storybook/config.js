import { configure } from '@storybook/react';

function loadStories() {
  require('./stories/LoadingOverlay');
}

configure(loadStories, module);
