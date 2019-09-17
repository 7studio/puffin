import { storiesOf } from '@storybook/html';

import GridReadme from './grid.md';

import GridHTML from './grid.pug';


storiesOf('Layout|Grid', module)
    
    .addDecorator(storyFn => `<div style="box-sizing:border-box;margin:2.56667em auto;max-width:1146px;padding:0 30px;width:100vw">${storyFn()}</div>`)
    .addDecorator(storyFn => `<div style="background-color:#fff;overflow:hidden">${storyFn()}</div>`)
    .add('default', () => GridHTML, {notes: GridReadme});

