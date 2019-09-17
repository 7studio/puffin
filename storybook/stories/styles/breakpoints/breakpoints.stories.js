import { storiesOf } from '@storybook/html';

import BreakpointsReadme from './breakpoints.md';

import BreakpointsHTML from './breakpoints.pug';



storiesOf('Styles|Breakpoints', module)
    .addDecorator(storyFn => {
        const wrapper = document.createElement('div');
            wrapper.style = 'background-color:#fff';
            wrapper.innerHTML = storyFn();
        
        return wrapper;
    })
    .add('defalut', () => BreakpointsHTML, {notes: BreakpointsReadme});