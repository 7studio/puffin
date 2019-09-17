import { storiesOf } from '@storybook/html';
import { useEffect } from "@storybook/client-api";
import { document, console } from 'global';

import centered from '@storybook/addon-centered/html';

import SwitchcontrolReadme from './switchcontrol.md';

import Switchcontrol from '../../../../www/src/assets/scripts/partials/switchcontrol';
import SwitchcontrolHTML from './switchcontrol.pug';



storiesOf('Components|Switchcontrol', module)
    .addDecorator(storyFn => `<div style="max-width:264px;width:100vw">${storyFn()}</div>`)
    .addDecorator(centered)
    .addDecorator((storyFn) => {
        useEffect(() => {
            const switchcontrolElem = document.querySelector('.cn-Switchcontrol');

            if (switchcontrolElem) {
                new Switchcontrol(switchcontrolElem);
            }
        });
        return storyFn();
    })
    .add('default', () => SwitchcontrolHTML, {notes: SwitchcontrolReadme});

