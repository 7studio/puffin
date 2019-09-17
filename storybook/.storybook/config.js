import { configure, addParameters, addDecorator } from '@storybook/html';
//import { withA11y } from '@storybook/addon-a11y';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import './styles/app-custom-name.scss';



//addDecorator(withA11y);

addParameters({
  options: {
    hierarchySeparator: /\./,
    hierarchyRootSeparator: /\|/
  },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    }
  }
});

configure(require.context('../stories', true, /\.stories\.(js|mdx)$/), module);
