/**
 * Control class for Lazy Highlighter library
 */
class LazyHighlighter {
    /**
     * Control element. Must have [data-lazy-highlighter-activator] attribute.
     */
    elem = null;

    /**
     * Default options
     */
    #options = {
        // Available events to bind to activator.
        // Values correspond to specific event's callback. Leave null to use defaults.
        'events': {
            'mouseover': null,
            'mouseleave': null,
            'click': null
        },
        // HTML to wrap highlighted element. If provided, MUST contain a {highlighted} substring as substitute for highlighted element. 
        // Passing empty string or '{highlighted}' removes the wrapper.
        'highlightedTemplate': '<div class="lazy-highlighter-container"><div data-lazy-highlighter-background></div>{highlighted}</div>',

        // Sets highlight style to one of default presets.
        'preset': ''
    };

    /**
     * List of HTML nodes to highlight and wrap into contianers, if necessary.
     */
    #elementsToHighlight = [];

    /**
     * Preset templates. List can be extended.
     */
    #defaultPresets = {
        'MARKER': '<div class="lh-marker lazy-highlighter-container"><div data-lazy-highlighter-background></div>{highlighted}</div>',
        'BORDER': '<div class="lh-border lazy-highlighter-container"><div data-lazy-highlighter-background></div>{highlighted}</div>'
    }

    /**
     * Class constructor.
     * 
     * @param {*} elem (HTML node) - HTML element to which LazyHighlighter instance is attached.
     * @param {*} options (JSON object) - overwrites default options.
     */
    constructor(elem, options = {}) {
        if (elem.LazyHighlighter !== undefined) {
            console.warn('LazyHighlighter instance is already present.');
        } else {
            let highlighter = this;
            
            this.elem = elem;
            this.#elementsToHighlight = this.elem.closest('body').querySelectorAll(
                '[data-lazy-highlighter-id*="' + this.elem.getAttribute('data-lazy-highlighter-activator') + '"]'
            );

            Object.keys(options).forEach(function (key) {
                highlighter.#options[key] = options[key];
            });

            this.elem.LazyHighlighter = highlighter;
            this.elem.LazyHighlighter.initialize();
        }
    }

    /**
     * Binds events to the activator and styles highlighted items
     */
    initialize() {
        this.#wrapHighlighted();
        this.#bindEvents();
    }

    /**
     * Reloads list of affected elements and rebinds events.
     */
    refresh() {
        this.#removeWrap();
        this.#removeEvents();

        this.#elementsToHighlight = [];
        this.#elementsToHighlight = this.elem.closest('body').querySelectorAll(
            '[data-lazy-highlighter-id*="' + this.elem.getAttribute('data-lazy-highlighter-activator') + '"]'
        );

        this.initialize();
    }

    /**
     * Wraps affected elements into container based on ['options']['highlightedTemplate'] attribute
     */
    #wrapHighlighted() {
        if (this.#options.highlightedTemplate !== '' && this.#options.highlightedTemplate !== '{highlighted}') {
            let template = this.#options.highlightedTemplate;

            if (this.#options.preset !== '' && Object.keys(this.#defaultPresets).includes(this.#options.preset)) {
                template = this.#defaultPresets[this.#options.preset];
            }

            this.#elementsToHighlight.forEach(function (item) {
                if (item.parentNode.getAttribute('data-lazy-highlighter-container') === null) {
                    let temp = template.replace('{highlighted}', '<div class="dummy"></div>');
                    let wrapped = (new DOMParser()).parseFromString(temp, 'text/html').getRootNode().body.firstChild;

                    item.parentNode.insertBefore(wrapped, item);

                    let dummy = wrapped.querySelector('.dummy');
                    wrapped = item.previousSibling;
                    wrapped.setAttribute('data-lazy-highlighter-container', true)

                    if (['inline', 'inline-block'].includes(window.getComputedStyle(item).display)) {
                        wrapped.classList.add('lh-inline-container');
                    }

                    wrapped.insertBefore(item, dummy);
                    wrapped.removeChild(dummy);
                }
            });
        }
    }

    /**
     * Removes affected element's container and related elements.
     */
    #removeWrap() {
        this.#elementsToHighlight.forEach(function (item) {
            let container = item.closest('[data-lazy-highlighter-container]');

            if (container !== null) {
                container.parentNode.insertBefore(item, container);
                container.previousSibling.parentNode.removeChild(container);
            }
        });
    }

    /**
     * Binds all highlighter events to activator.
     */
    #bindEvents() {
        this.elem.addEventListener('mouseover', this.#lhMouseover);
        this.elem.addEventListener('mouseleave', this.#lhMouseleave);
        this.elem.addEventListener('click', this.#lhClick);
    }

    /**
     * Unbinds all highlighter events.
     */
    #removeEvents() {
        this.elem.removeEventListener('mouseover', this.#lhMouseover);
        this.elem.removeEventListener('mouseleave', this.#lhMouseleave);
        this.elem.removeEventListener('click', this.#lhClick);
    }

    /**
     * Shortcut function to highlight all elements affected by activator. 
     * 
     * @param {*} isOn - if true, turns highlight on; if false, removes highlight. Leave null to toggle depending on element's current state.
     */
    highlight(isOn = null) {
        this.#elementsToHighlight.forEach(function (item) {
            let highlihgtedItem = item;
            let container = item.closest('[data-lazy-highlighter-container]');

            if (container !== null) {
                highlihgtedItem = container;
            }

            let hasHighlightClass = highlihgtedItem.classList.contains('highlighted');

            if (isOn === null && hasHighlightClass || isOn === false) {
                highlihgtedItem.classList.remove('highlighted');
            } else if (isOn === null && !hasHighlightClass || isOn === true) {
                highlihgtedItem.classList.add('highlighted');
            }
        });
    }

    setEvent(eKey, callback) {
    }

    #lhClick(e = null, callback = null) {
        if (e !== null && callback !== null) {
            callback(e);
        }
    }
    #lhMouseover(e = null, callback = null) {
        if (e === null || callback === null) {
            e.target.LazyHighlighter.highlight(true);
        } else {
            callback(e);
        }
    }
    #lhMouseleave(e = null, callback = null) {
        if (e === null || callback === null) {
            e.target.LazyHighlighter.highlight(false);
        } else {
            callback(e);
        }
    }
}