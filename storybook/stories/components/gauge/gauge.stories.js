import { storiesOf } from '@storybook/html';
import { document, console } from 'global';
import {
  withKnobs,
  text,
  number,
  select,
  color,
} from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/html';

import GaugeReadme from './gauge.md';

import GaugeWarningHTML from './gauge-warning.pug';
import GaugeSuccessHTML from './gauge-success.pug';
import GaugeDangerHTML from './gauge-danger.pug';
import GaugeCustomHTML from './gauge-custom.pug';

/**
 * Parse HTML template with variables like (`${variable}`).
 *
 * @param {string} str
 * @param {object} obj
 * @return {string}
 */
function tmpl(str, obj) {
    const get = (obj, path) => {
        const hasOwnProp = Object.prototype.hasOwnProperty;
        const keys = Array.isArray(path) ? path : path.split('.');
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (!obj || !hasOwnProp.call(obj, key)) {
                obj = undefined;
                break;
            }
            obj = obj[key];
        }
        return obj;
    };
    const matches = str.match(/\$\{(.*?)\}/g);

    matches.forEach(elem => {
        const key = elem.slice(2, -1);

        str = str.replace(elem, get(obj, key));
    });

    return str;
}


storiesOf('Components|Gauge', module)
    .addDecorator(storyFn => `<div style="max-width:264px;width:100vw">${storyFn()}</div>`)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('success', () => GaugeSuccessHTML, {notes: GaugeReadme})
    .add('warning', () => GaugeWarningHTML, {notes: GaugeReadme})
    .add('danger',  () => GaugeDangerHTML, {notes: GaugeReadme})
    .add('_customize', () => {
        // knobs
        const title = text('Titre', 'Adhésion personnalisée');
        const percent = number('Pourcentage', 33, {
            range: true,
            min: 0,
            max: 100,
            step: 5,
        });
        const looks = {
            Heureux: 'happy',
            Neutre: 'impassive',
            Triste: 'sad',
        };
        const look = select('Émotion', looks, 'happy');
        const type = color('Couleur', '#5913FE');

        // Append template into node to get debug data
        const fragment = document.createElement('div');
              fragment.innerHTML = GaugeCustomHTML;
        const debug_data = JSON.parse(fragment.querySelector('[data-cn-debug]').dataset.cnDebug);

        // Calculate `stroke_dasharray` according user percentage and component radius
        const stroke_dasharray = (((3.14159265359 * debug_data.radius) / 100) * percent).toString().replace(/\./g, ',');
        
        return tmpl(fragment.innerHTML, {'title': title, 'look': look, 'type': type, 'stroke_dasharray': stroke_dasharray});
            
    }, {notes: GaugeReadme});