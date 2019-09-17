import { storiesOf } from '@storybook/html';

import TypographyReadme from './typography.md';

import TypographyDefaultHTML from './typography-default.pug';



storiesOf('Styles|Typography', module)
    .addDecorator(storyFn => {
        const wrapper = document.createElement('div');
            wrapper.style = 'background-color:#fff';
            wrapper.innerHTML = storyFn();
        
        return wrapper;
    })
    .add('defalut', () => TypographyDefaultHTML, {notes: TypographyReadme});