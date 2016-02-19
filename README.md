# Metalsmith Scoped Attributes
A Metalsmith plugin to scope local attributes to the document. Like Jekyll's `page` attribute scope.

## Installation
```sh
$ npm install metalsmith-scoped-attributes
```

## Usage
```js
var Metalsmith = require('metalsmith');
var scopedAttributes = require('metalsmith-scoped-attributes');

Metalsmith
    .use(scopedAttributes({
        // Optional: namespace the local scope (`page` by default):
        name: 'this'

        // Optional: exclude specific attributes like `layout`. Metalsmith internal attributes like `core` and `stat` are already excluded.
        exclude: ['layout'],
    }));
```

Now, if your attributes are set like so:
```yaml
---
title: My Document
layout: master.html
---
Contents here.
```

You would use them as:

```html
{{ this.title }}: My Document
{{ layout }}: master.html
{{ this.contents }}: Contents here.
```

Since this plugin changes the scope of a document's attributes, care should be taken in where it's placed in the flow of plugins. For example, if you place this plugin before metalsmith-layouts, you should be sure to exclude the `layout` attribute because metalsmith-layouts expects it to be at the top level.