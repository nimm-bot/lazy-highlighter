<!DOCTYPE html>
<html>

<head>
    <title>Lazy highlighter demo</title>
    <script src="./src/js/lazy-highlighter.js" type="text/javascript"></script>
    <link href="./src/css/lazy-highlighter.css" rel="stylesheet">
    <link href="./src/css/demo.css" rel="stylesheet">
    <meta charset="utf-8">
</head>

<body>
    <div class="content">
        <h1>LazyHighlighter initialization and options</h1>
        <br />
        <div id="demo_initialization">
            <h2>Initialization</h2>
            <div class="w100">
                <p>
                    To start using Lazy Highlighter library, include files from src folder in Your HTML code:
                </p>
                <div class="html">
                    <pre>
&lt;script src="{directory_path}/lazy-highlighter.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;link href="{directory_path}/lazy-highlighter.css" rel="stylesheet"&gt;</pre>    
                    <div class="language">HTML</div>
                </div>
                <p>
                    Once necessary files are included, append script with this snippet:
                </p>
                <div class="js">
                    <pre>
window.addEventListener('load', function () {
    document.querySelectorAll('[data-lazy-highlighter-activator]').forEach(function (elem) {
        new LazyHighlighter(<span data-lazy-highlighter-id="arg1">elem</span>, <span data-lazy-highlighter-id="arg2">{}</span>);
    });
});</pre>
                    <div class="language">JS</div>
                </div>
                <p class="mb-15">The <b data-lazy-highlighter-activator="arg1">first argument</b> of constructor is element that, when hovered on, highlights related elements.</p>
                <p>The <b data-lazy-highlighter-activator="arg2">second argument</b> is a JSON object used for setting highlight options.</p>
            </div>
        </div> 
        <br/>
        <div id="demo_options">
            <h2>Options</h2>
            <div class="w100">
                <p>Upon calling the constructor, the following options can be assigned in <b data-lazy-highlighter-activator="arg2">options</b> argument:</p>
            </div>
            <ul>
                <li>
                    <p>
                        <b>template</b> (string) - HTML string to use as wrapper. Must contain {highlighted} substring as a placeholder to highlighted element.
                    </p>
                    <p>
                        Defaults to <br/><code>&lt;div class="lazy-highlighter-container"&gt;&lt;div data-lazy-highlighter-background&gt;&lt;/div&gt;{highlighted}&lt;/div&gt;</code>.
                    </p>
                </li>
                <li>
                    <p>
                        <b>preset</b> (string) - Sets highlight style to one of default presets: 
                        <code data-lazy-highlighter-activator="default" data-lazy-highlighter-id="default">DEFAULT</code>, 
                        <code data-lazy-highlighter-activator="border" data-lazy-highlighter-id="border">BORDER</code>, 
                        <code data-lazy-highlighter-activator="marker" data-lazy-highlighter-id="marker">MARKER</code>.
                    </p>
                </li>
                <li>
                    <p>
                        <b>events</b> (JSON object) - sets callbacks for the following events: <code>click</code>, <code>mouseover</code>, <code>mouseleave</code>.
                    </p>
                    <p>Object keys must match event names and values - callbacks for specific events.</p>
                </li>
            </ul>
        </div>
        <br/>
        <div id="demo_methods">
            <h2>Methods</h2>
            <div class="w100">
                <p>Calling the constructor assigns LazyHighlighter property to activator element. The following methods can be called for this property:</p>
            </div>
            <ul>
                <li>
                    <p>
                        <b>refresh ()</b> - Reloads list of affected elements and rebinds events..
                    </p>
                </li>
                <li>
                    <p>
                        <b>destroy ()</b> - Removes LazyHighlighter instance from activator element.
                    </p>
                </li>
                <li>
                    <p>
                        <b>highlight (isOn)</b> - Shortcut function to highlight all elements affected by activator. 
                    </p>
                    <p><i>isOn</i> (null | bool) - if <code>null</code>, toggles highlight on/off based on current state. If bool value is used, <code>true</code> turns highlight on, <code>false</code> - off.</p>
                </li>
                <li>
                    <p><b data-lazy-highlighter-id="event">setEvent (key, callback)</b> - Assigns event callback to event name, but doesn't bind it. Please call refresh() to update existing events.</p>
                    <p><i>key</i> (string) - event to bind a new callback to. Available values: <code>'click'</code>, <code>'mouseover'</code>, <code>'mouseleave'</code></p>  
                    <p><i>callback</i> (function) - callback function.</p>
                </li>
                <li>
                    <p><b>setOption (key, value)</b> - set <code>options</code> property, except events. For setting events please see <b data-lazy-highlighter-activator="event">setEvent()</b>.</p>
                </li>
            </ul>
        </div>
        <br /><br /><br /><br />
        <h1>Usage and structure</h1>
        <br />
        <h2>Highlight self</h2>
        <div class="example-wrapper">
            <div class="w40">
                <span data-lazy-highlighter-activator="demo_self" data-lazy-highlighter-id="demo_self">
                    Hover on this text to highlight it.
                </span>
            </div>
            <div class="w60">
                <div class="html">
                    <pre>
&lt;span data-lazy-highlighter-activator="demo_self" data-lazy-highlighter-id="demo_self"&gt;
    Hover on this text to highlight it.
&lt;/span&gt;</pre>
                    <div class="language">HTML</div>
                </div>
            </div>
        </div>
        <br />
        <h2>Highlight another element</h2>
        <div class="example-wrapper">
            <div class="w40">
                <span data-lazy-highlighter-activator="demo_other">
                    Hover on this text to highlight a box below.
                </span>
                <br/>
                <br/>
                <div class="w90">
                    <div class="box" data-lazy-highlighter-id="demo_other">I am a box.</div>
                </div>
            </div>
            <div class="w60">
                <div class="html">
                    <pre>
&lt;span data-lazy-highlighter-activator="demo_other"&gt;
    Hover on this text to highlight a box below.
&lt;/span&gt;
&lt;div class="box" data-lazy-highlighter-id="demo_other"&gt;
    I am a box.
&lt;/div&gt;
</pre>
                    <div class="language">HTML</div>
                </div>
            </div>
        </div>
        <br />
        <h2>One activator for multiple elements</h2>
        <div class="example-wrapper">
            <div class="w40">
                <span data-lazy-highlighter-activator="demo_1-many">
                    Hover on this text to highlight all boxes below.
                </span>
                <br/>
                <br/>
                <div class="w90">
                    <div class="flex">
                        <div class="box" data-lazy-highlighter-id="demo_1-many">Box 1</div>
                        <div class="box" data-lazy-highlighter-id="demo_1-many">Box 2</div>
                        <div class="box" data-lazy-highlighter-id="demo_1-many">Box 3</div>
                    </div>
                </div>
            </div>
            <div class="w60">
                <div class="html">
                <pre>
&lt;span data-lazy-highlighter-activator="demo_1-many"&gt;
    Hover on this text to highlight all boxes below.
&lt;/span&gt;
&lt;div class="box" data-lazy-highlighter-id="demo_1-many"&gt;  Box 1  &lt;/div&gt;
&lt;div class="box" data-lazy-highlighter-id="demo_1-many"&gt;  Box 2  &lt;/div&gt;
&lt;div class="box" data-lazy-highlighter-id="demo_1-many"&gt;  Box 3  &lt;/div&gt;
                </pre>
                <div class="language">HTML</div>
            </div>
        </div>
    </div>
    <br/>
    <h2>Multiple activators for a single element</h2>
        <h4>Example 1:</h4>
        <div class="example-wrapper">
            <div class="w40">
                <div>
                    Hover <b data-lazy-highlighter-activator="demo_many-1">here</b>, 
                    <b data-lazy-highlighter-activator="demo_many-1">here</b>, or 
                    <b data-lazy-highlighter-activator="demo_many-1">here</b>, to highlight a box below.
                </div>
                <br/>
                <br/>
                <div class="w90">
                    <div class="box" data-lazy-highlighter-id="demo_many-1">Box to highlight</div>
                </div>
            </div>
            <div class="w60">
                <div class="html">
                    <pre>
&lt;div&gt;
    Hover 
    &lt;b data-lazy-highlighter-activator="demo_many-1"&gt;here</b>, 
    &lt;b data-lazy-highlighter-activator="demo_many-1"&gt;here&lt;/b&gt;, or 
    &lt;b data-lazy-highlighter-activator="demo_many-1"&gt;here&lt;/b&gt;, to highlight a box below.
&lt;/div&gt;
&lt;div class="box" data-lazy-highlighter-id="demo_many-1"&gt;  Box to highlight  &lt;/div&gt;</pre>
                    <div class="language">HTML</div>
                </div>
            </div>
        </div>
        <h4>Example 2:</h4>
        <div class="example-wrapper">
            <div class="w40">
                <div class="mb-15">
                    Hover <b data-lazy-highlighter-activator="demo_a_b">here</b> to highlight boxes A and B. 
                </div>
                <div class="mb-15">
                    Hover <b data-lazy-highlighter-activator="demo_b_c">here</b> to highlight boxes B and C. 
                </div>
                <div>
                    Hover <b data-lazy-highlighter-activator="demo_a_c">here</b> to highlight boxes A and C. 
                </div>
                <br/>
                <br/>
                <div class="w90">
                    <div class="flex">
                        <div class="box" data-lazy-highlighter-id="demo_a_b demo_a_c">&nbsp;A&nbsp;</div>
                        <div class="box" data-lazy-highlighter-id="demo_b_c demo_a_b">&nbsp;B&nbsp;</div>
                        <div class="box" data-lazy-highlighter-id="demo_b_c demo_a_c">&nbsp;C&nbsp;</div>
                    </div>
                </div>
            </div>
            <div class="w60">
                <div class="html">
                    <pre>
&lt;div&gt;
    Hover &lt;b data-lazy-highlighter-activator="demo_a_b"&gt;here&lt;/b&gt; to highlight boxes A and B. 
&lt;/div&gt;
&lt;div&gt;
    Hover &lt;b data-lazy-highlighter-activator="demo_b_c"&gt;here&lt;/b&gt; to highlight boxes B and C. 
&lt;/div&gt;
&lt;div&gt;
    Hover &lt;b data-lazy-highlighter-activator="demo_a_c"&gt;here&lt;/b&gt; to highlight boxes A and C. 
&lt;/div&gt;

&lt;div class="box" data-lazy-highlighter-id="demo_a_b demo_a_c"&gt;&nbsp;A&nbsp;&lt;/div&gt;
&lt;div class="box" data-lazy-highlighter-id="demo_b_c demo_a_b"&gt;&nbsp;B&nbsp;&lt;/div&gt;
&lt;div class="box" data-lazy-highlighter-id="demo_b_c demo_a_c"&gt;&nbsp;C&nbsp;&lt;/div&gt;</pre>
                    <div class="language">HTML</div>
                </div>
            </div>
        </div>
        <br /><br />
        <br /><br />
        <h1>Presets and styling</h1>
        <br />
        <h2>Default</h2>
        <div class="w100 mb-15">
            <span data-lazy-highlighter-activator="marker-self" data-lazy-highlighter-id="marker-self">Hover on this text to
                highlight it.</span>
        </div>
        <div class="example-wrapper">
            <div class="w40">
                <div class="mb-15" data-lazy-highlighter-activator="marker-box">Hover on this text to highlight a box.</div>
                <div class="w90">
                    <div class="box left" data-lazy-highlighter-id="marker-box">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua...
                    </div>
                </div>
            </div>
            <div class="w60">
                <div class="js">
                    <pre>
document.querySelectorAll('[data-lazy-highlighter-activator]').forEach(function (elem) {
    new LazyHighlighter(elem, {});
});</pre>
                    <div class="language">JS</div>
                </div>
            </div>
        </div>
        <br />
        <h2>Marker</h2>
        <div class="w100 mb-15">
            <span data-lazy-highlighter-activator="marker-self" data-lazy-highlighter-id="marker-self">Hover on this text to
                highlight it.</span>
        </div>
        <div class="example-wrapper">
            <div class="w40">
                <div class="mb-15" data-lazy-highlighter-activator="marker-box">Hover on this text to highlight a box.</div>
                <div class="w90">
                    <div class="box left" data-lazy-highlighter-id="marker-box">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua...
                    </div>
                </div>
            </div>
            <div class="w60">
                <div class="js">
                    <pre>
document.querySelectorAll('[data-lazy-highlighter-activator]').forEach(function (elem) {
    new LazyHighlighter(elem, {'preset': 'MARKER'});
});</pre>
                    <div class="language">JS</div>
                </div>
            </div>
        </div>
        <br />
        <h2>Border</h2>
        <div class="w100 mb-15">
            <span data-lazy-highlighter-activator="marker-self" data-lazy-highlighter-id="marker-self">Hover on this text to highlight it.</span>
        </div>
        <div class="example-wrapper">
            <div class="w40">
                <div class="mb-15" data-lazy-highlighter-activator="marker-box">Hover on this text to highlight a box.</div>
                <div class="w90">
                    <div class="box left" data-lazy-highlighter-id="marker-box">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua...
                    </div>
                </div>
            </div>
            <div class="w60">
                <div class="js">
                    <pre>
document.querySelectorAll('[data-lazy-highlighter-activator]').forEach(function (elem) {
    new LazyHighlighter(elem, {'preset': 'BORDER'});
});</pre>
                    <div class="language">JS</div>
                </div>
            </div>
        <div>
    </div>
</body>

</html>