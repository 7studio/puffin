import { storiesOf } from '@storybook/html';

import IconsReadme from './icons.md';

import IconsDefaultHTML from './icons-default.pug';



storiesOf('Styles|Icons', module)
    .addDecorator(storyFn => {
        const wrapper = document.createElement('div');
            wrapper.style = 'background-color:#fff';
            wrapper.innerHTML = storyFn();
        
        return wrapper;
    })
    .add('default', () => IconsDefaultHTML, {notes: IconsReadme});