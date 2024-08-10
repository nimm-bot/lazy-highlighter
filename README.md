## About the widget
Lazy highlighter is a lightweight widget for highlighting HTML elements.

Widget's uses include, but are not limited to:
* Basic highlight effects;
* Tooltips;
* Page tours;
* Etc.

## Installation
Include `lazy-highlighter.js` and `lazy-highlighter.css` files from `src` directory in Your project.

```
<script src="path_to_file/lazy-highlighter.js" type="text/javascript"></script>
<link rel="path_to_file/lazy-highlighter.css"/>
```

## Usage
All related activator and activated elements must have a matching `data-lazy-highlighter-id` attribute.
__Activators__ (which fire the event), must also have a `data-lazy-highlighter-activator` attribute. Its value is irrelevant.

Single __activator__ can highlight multiple HTML elements, as well as single __highlighted__ element can be influenced by multiple activators.

HTML example:
```
<script src="lazy-highlighter.js" type="text/javascript"></script>
<link rel="lazy-highlighter.css"/>

<div>
    <span data-lazy-highlighter-activator data-lazy-highlighter-id="demo">
        Hover on me!
    </span>
</div>
<div data-lazy-highlighter-id="demo">
    <span>Lorem ipsum</span>
</div>
```

JS example:
```
window.addEventListener('load', function () {
    LazyHighlighter.initialize();
});
```

More examples can be found at `demo.html`.