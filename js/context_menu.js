// WORK IN PROGRESS

oncontextmenu = (e) => {
    e.preventDefault()
    let menu = document.createElement("div")
    menu.id = "ctxmenu"
    menu.style = `top:${e.pageY-10}px;left:${e.pageX-40}px`
    menu.onmouseleave = () => ctxmenu.outerHTML = ''
    menu.innerHTML = "<li>Option1</li><p>Option2</p><p>Option3</p><p>Option4</p><p onclick='alert(`Thank you!`)'>Upvote</p>"
    document.body.appendChild(menu)
}

'use strict';

class Menu {
    #onOpen;
    #onClose;
    #container;
    #containerCssClassName = 'menu';

    constructor({ target, onOpen, onClose }) {
        this.#onOpen = onOpen;
        this.#onClose = onClose;
        this.#createContainer();

        document.addEventListener('click', this.#hide.bind(this));
        document.addEventListener('contextmenu', this.#hide.bind(this));

        target.addEventListener('contextmenu', (e) => {
            if (!this.#onOpen(e)) {
                return;
            }

            const absTopPositionPx = e.pageY;
            const absLeftPositionPx = e.pageX;

            this.#show(absTopPositionPx, absLeftPositionPx);
            e.preventDefault();

            document.addEventListener('scroll', this.#hide.bind(this), { once: true });

            // Without this the menu will be immediately closed by the "contextmenu" event on the document
            e.stopPropagation();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.#hide();
            }
        });
    }
    createItem(label, action) {
        const item = document.createElement('li');
        item.classList.add('item');
        item.textContent = label;
        item.addEventListener('click', action.bind(this));

        this.#container.appendChild(item);
    }
    #show(absTopPositionPx, absLeftPositionPx) {
        this.#container.style.top = `${absTopPositionPx}px`;
        this.#container.style.left = `${absLeftPositionPx}px`;
        this.#container.hidden = false;
    }
    #hide() {
        if (this.#container.hidden) return;

        this.#onClose();
        this.#container.hidden = true;
        document.removeEventListener('scroll', this.#hide.bind(this));
    }
    #createContainer() {
        const container = document.createElement('ul');
        container.classList.add(this.#containerCssClassName);
        container.hidden = true;

        this.#container = container;
        document.body.appendChild(container);
    }
}

// Initialize and configure a new menu
const menu = new Menu({
    target: document.querySelector('.js-items-with-context-menu'),
    onOpen: function (_contextMenuEvent) {
        console.log('onOpen callback');
        return true; // A callback must return true.
    },
    onClose: function () {
        console.log('onClose callback');
    }
});
menu.createItem('Edit', function () {
    console.log('Editing...');
});
menu.createItem('Delete', function () {
    console.log('Deleting...');
});