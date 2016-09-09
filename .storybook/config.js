import { configure } from '@kadira/storybook';

function loadStories() {
  require('./stories/LoadingOverlay');
}

configure(loadStories, module);
