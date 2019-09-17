import Switchcontrol from './partials/switchcontrol';

/**
 * `Element.closest()` polyfill.
 *
 * @see https://developer.mozilla.org/fr/docs/Web/API/Element/closest#Polyfill
 */
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType == 1);
        return null;
    };
}

(function () {
    if (typeof window.CustomEvent === 'function') {
        return false;
    }

    function CustomEvent (event, params) {
        params = params || { bubbles: false, cancelable: false, detail: null };

        var evt = document.createEvent( 'CustomEvent' );
            evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );

        return evt;
    }

    window.CustomEvent = CustomEvent;
})();

/**
 * Preventing body scroll for modals or others components
 * which popup over the site.
 *
 * @param {boolean} bool
 *
 * @see https://benfrain.com/preventing-body-scroll-for-modals-in-ios/
 */
function freezeDocumentScroll(bool) {
    if (bool === true) {
        document.body.addEventListener('touchmove', _freeze);
    } else {
        document.body.removeEventListener('touchmove', _freeze);
    }

    function _freeze(event) {
        event.preventDefault();
    }
}

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



/**
 * Manage switch controls.
 *
 * @see https://scottaohara.github.io/aria-switch-control/
 * @see https://inclusive-components.design/toggle-button/
 */
(function(){
    const elems = document.querySelectorAll('.cn-Switchcontrol');

    elems.forEach(scElem => new Switchcontrol(scElem));
})();
