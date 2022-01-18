import { toggleClass, createElement } from 'utils/dom';
import { itemButtonTemplate, itemTemplate } from 'view/controls/templates/menu/menu-item';
import { addClickAction } from 'view/utils/add-click-action';
export class MenuItem {
    constructor(_content, _action, _template = itemTemplate) {
        this.el = createElement(_template(_content));
        this.ui = addClickAction(this.el, _action, this);
    }
    destroy() {
        if (this.el.parentNode) {
            this.el.parentNode.removeChild(this.el);
        }
        this.ui.destroy();
    }
}

export class ButtonMenuItem extends MenuItem {
    constructor(_content, _action, _template = itemButtonTemplate) {
        super(_content, _action, _template);
    }
    activate() {
        if (this.active) {
            return;
        }
        toggleClass(this.el, 'jw-settings-item-active', true);
        this.el.setAttribute('aria-checked', 'true');
        this.active = true;
    }
    deactivate() {
        if (!this.active) {
            return;
        }
        toggleClass(this.el, 'jw-settings-item-active', false);
        this.el.setAttribute('aria-checked', 'false');
        this.active = false;
    }
}

export class ResetMenuItem extends MenuItem {
    constructor(_content, _action, _template = itemButtonTemplate) {
        super(_content, _action, _template);
        this.statusEl = document.createElement('span');
        this.statusEl.id = 'reset-status-message';
        this.statusEl.style = 'font-size: 0;';
        this.statusEl.setAttribute('role', 'status');
        this.el.appendChild(this.statusEl);
        this.el.setAttribute('aria-controls', 'reset-status-message');
        console.trace(this.statusEl);
    }
}
