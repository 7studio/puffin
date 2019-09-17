/**
 * Manage switch controls.
 *
 * @see https://scottaohara.github.io/aria-switch-control/
 * @see https://inclusive-components.design/toggle-button/
 */
export default class Switchcontrol {
    constructor(elem) {
        this.elemElem = elem;

        this.checked = this.isChecked();

        this.elemElem.addEventListener('click', this.toggle.bind(this), false);
    }

    isChecked() {
        return this.elemElem.getAttribute('aria-checked') === 'true';
    }

    toggle() {
        this.checked = !this.checked;

        this.elemElem.setAttribute('aria-checked', this.checked.toString());
    }
}
