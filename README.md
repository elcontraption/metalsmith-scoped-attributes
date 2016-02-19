# Metalsmith Scoped Attributes
A Metalsmith plugin to scope local attributes to the document. Like Jekyll's `page` attribute scope.

## TODO
- Add tests

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
        // Optional: exclude specific attributes like `layout`.
        exclude: ['layout'],

        // Optional: name the local scope (`page` by default):
        name: 'this'
    }));
```

Now, if your attributes are set like so:
```yaml
---
title: My Document
layout: master.html
---
```

You would call them as:

```html
Title: {{ this.title }}
Layout: {{ layout }}
```