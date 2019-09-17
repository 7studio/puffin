import { storiesOf } from '@storybook/html';

import ColorsReadme from './colors.md';

import ColorsDefaultHTML from './colors-default.pug';



storiesOf('Styles|Colors', module)
    .addDecorator(storyFn => {
        const wrapper = document.createElement('div');
            wrapper.style = 'background-color:#fff';
            wrapper.innerHTML = storyFn();
        
        return wrapper;
    })
    .add('defalut', () => ColorsDefaultHTML, {notes: ColorsReadme});

