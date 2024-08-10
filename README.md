## About the widget
Lazy highlighter is a vanilla JS library for highlighting HTML elements.

## Installation
Include `lazy-highlighter.js` and `lazy-highlighter.css` files from `src` directory in Your project.

```
<script src="{directory_path}/lazy-highlighter.js" type="text/javascript"></script>
<link href="{directory_path}/lazy-highlighter.css" rel="stylesheet">
```

## Usage
HTML:
__Activators__ (which fire the event) must have `data-lazy-highlighter-activator` attribute, matching the __affected__ elements' `data-lazy-highlighter-id`.


Activators can highlight the affected elements anywhere in the same document.

Single __activator__ can highlight multiple HTML elements, as well as single __highlighted__ element can be influenced by multiple activators.

HTML example:
```
<span data-lazy-highlighter-activator="demo">Hover on me to highlight a block below.</span>
<div data-lazy-highlighter-id="demo">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua...
</div>
```

JS:
The following snippet should be included at the bottom of HTML document. 
```
window.addEventListener('load', function () {
        document.querySelectorAll('[data-lazy-highlighter-activator]').forEach(function (elem) {
            new LazyHighlighter(elem);
        });
    });
```

More examples can be found at `demo.html`.
