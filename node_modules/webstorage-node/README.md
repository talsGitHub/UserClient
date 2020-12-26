
# webstorage-node
![Repository Size](https://img.shields.io/github/repo-size/Tyncture/webstorage-node.svg?t&style=flat-square)
![License](https://img.shields.io/github/license/Tyncture/webstorage-node.svg?&style=flat-square)
![Top Language](https://img.shields.io/github/languages/top/Tyncture/webstorage-node.svg?&style=flat-square)
[![npm version](https://badge.fury.io/js/webstorage-node.svg)](https://www.npmjs.com/package/webstorage-node)

A drop-in localStorage and sessionStorage implementation for browserless 
Node.js environments. 

It is suited for browserless testing environments and use cases with
basic session-scoped and persistent storage requirements.


## Usage

### Getting Started
Install the package using either npm or yarn, saving it to your project.
```sh
npm install webstorage-node --save
```

And then import the module into your project like so.
```js
// With ES2015/ES6
import {localStorage, sessionStorage} from "webstorage-node";

// With CommonJS
const localStorage = require("webstorage-node").localStorage;
const sessionStorage = require("webstorage-node").sessionStorage;
```

### Interacting with the Web Storage API
This library aims to stay as close as possible to the
Web Storage API specification, as defined in the HTML Living Standard.
You can read more about this specification on the 
[WHATWG](https://html.spec.whatwg.org/multipage/webstorage.html) website.

All storage interaction methods supported by 
[`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
and [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
in browser implementations should also work with this
library. The only exception is the 
[`StorageEvent`](https://html.spec.whatwg.org/multipage/webstorage.html#the-storageevent-interface) interface, as this library
is not intended to fully replace browser implementations.

Here is an example of some trivial CRUD operations using `localStorage`.
```js
// Setting
localStorage.setItem("mykey", "myvalue");
localStorage["mykey] = "myvalue;

// Getting
const x = localStorage.getItem("mykey");
const y = localStorage["mykey"];

// Deletion
localStorage.deleteItem("mykey");
delete localStorage["mykey"];

// Clearing
localStorage.clear();
```

See the following MDN links for further usage guidance.
- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

### Supporting both browser and Node.js environments
You should not need to manually check for the existence of a `window`
object and its properties. A browser implementation of Web Storage API 
will be returned in place of the library's own if a browser implementation
is detected.

## License
```
MIT License

Copyright (c) 2019 John Su

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
