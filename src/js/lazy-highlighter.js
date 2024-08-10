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
    options = {
        // Available events to bind to activator.
        // Values correspond to specific event's callback. Leave null to use defaults.
        'events': {
            'mouseover': null,
            'mouseleave': null,
            'click': null
        },
        // HTML to wrap highlighted element. If provided, MUST contain a {highlighted} substring as substitute for highlighted element. 
        // Passing empty string or '{highlighted}' removes the wrapper.
        'template': '<div class="lazy-highlighter-container"><div data-lazy-highlighter-background></div>{highlighted}</div>',

        // Sets highlight style to one of default presets.
        'preset': ''
    };

    /**
     * Maps event names to wrapping functions. If necessary, additional events and methods can be added. 
     */
    #eventMap = {
        'mouseover': this.#lhMouseover,
        'mouseleave': this.#lhMouseleave,
        'click': this.#lhClick
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
                highlighter.options[key] = options[key];
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
     * Removes LazyHighlighter instance from activator element.
     */
    destroy() {
        this.#removeWrap();
        this.#removeEvents();

        delete this.elem.LazyHighlighter;
    }

    /**
     * Wraps affected elements into container based on ['options']['template'] attribute
     */
    #wrapHighlighted() {
        if (this.options.template !== '' && this.options.template !== '{highlighted}') {
            let template = this.options.template;

            if (this.options.preset !== '' && Object.keys(this.#defaultPresets).includes(this.options.preset)) {
                template = this.#defaultPresets[this.options.preset];
            }

            this.#elementsToHighlight.forEach(function (item) {
                if (item.parentNode.getAttribute('data-lazy-highlighter-container') === null) {
                    let temp = template.replace('{highlighted}', '<div class="dummy"></div>');
                    let wrapper = null;

                    // Parse HTML template as DOM and append root element, if necessary.
                    let parsedTemplate = (new DOMParser()).parseFromString(temp, 'text/html').getRootNode().body;

                    if (parsedTemplate.childElementCount > 1) {
                        let container = document.createElement('div');

                        parsedTemplate.children.forEach(function (child) {
                            container.append(child);
                        })

                        wrapper = container;
                    } else {
                        wrapper = parsedTemplate.firstChild;
                    }

                    // Insert wrapper into document to set necessary attributes and classes.
                    item.parentNode.insertBefore(wrapper, item);
                    wrapper = item.previousSibling;
                    wrapper.setAttribute('data-lazy-highlighter-container', true)

                    if (['inline', 'inline-block'].includes(window.getComputedStyle(item).display)) {
                        wrapper.classList.add('lh-inline-container');
                    }

                    // Replace placeholder with element to be highlighted.
                    let dummy = wrapper.querySelector('.dummy');
                    wrapper.insertBefore(item, dummy);
                    wrapper.removeChild(dummy);
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
        let eventMap = this.#eventMap;
        let elem = this.elem;

        Object.keys(eventMap).forEach(function (key) {
            elem.addEventListener(key, eventMap[key]);
        });
    }

    /**
     * Unbinds all highlighter events.
     */
    #removeEvents() {
        let eventMap = this.#eventMap;
        let elem = this.elem;

        Object.keys(eventMap).forEach(function (key) {
            elem.removeEventListener(key, eventMap[key]);
        });
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

    /**
     * Assigns event callback to event name, but doesn't bind it. Please call refresh() to update existing events.
     * 
     * @param {*} key 
     * @param {*} callback 
     */
    setEvent(key, callback) {
        this.options.events[key] = callback;
    }

    /**
     * Assigns options properties, such as templates.
     * 
     * @param {*} key 
     * @param {*} value 
     */
    setOption(key, value) {
        if (key === 'options') {
            console.warn("setOption() method cannot be used for assigning events! Please use setEvent() instead. Don't forget to refresh() afterwards!");
        } else {
            this.options[key] = value;
        }
    }

    /**
     * Wrapper function for click event.
     * @param {*} e 
     */
    #lhClick(e) {
        let _this = e.target.LazyHighlighter;

        if (_this.options.events.click !== null) {
            _this.options.events.click(e);
        }
    }

    /**
     * Wrapper function for mouseover event.
     * @param {*} e 
     */
    #lhMouseover(e) {
        let _this = e.target.LazyHighlighter;

        if (_this.options.events.mouseover === null) {
            _this.highlight(true);
        } else {
            _this.options.events.mouseover(e);
        }
    }
    
    /**
     * Wrapper function for mouseleave event.
     * @param {*} e 
     */
    #lhMouseleave(e) {
        let _this = e.target.LazyHighlighter;

        if (_this.options.events.mouseleave === null) {
            _this.highlight(false);
        } else {
            _this.options.events.mouseleave(e);
        }
    }
}
