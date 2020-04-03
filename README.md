# React Slot and Fill [![npm version](https://badge.fury.io/js/%40blackbox-vision%2Freact-slot-fill.svg)](https://badge.fury.io/js/%40blackbox-vision%2Freact-slot-fill) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) [![Known Vulnerabilities](https://snyk.io/test/github/blackboxvision/react-slot-fill/badge.svg)](https://snyk.io/test/github/blackboxvision/react-slot-fill)

:rocket: React Slot and Fill pattern implementation made with React.createContext API. Check out the [demo](https://blackboxvision.github.io/react-slot-fill/).

## Install

You can install this library via NPM or YARN.

### NPM

```bash
npm i @blackbox-vision/react-slot-fill
```

### YARN

```bash
yarn add @blackbox-vision/react-slot-fill
```

## Use case

If you need to render a component from somepart of the DOM tree, but it needs to be visible in another part of the tree, this library solves it.

This library is very similar to [`react-slot-fill`](https://github.com/camwest/react-slot-fill), but we solve two particular issues:

- Support for `React.createContext`, this library is intended to use with React >= 16.3.1.
- If a `Fill` is declared after a `Slot`, it can render properly, which [`react-slot-fill`](https://github.com/camwest/react-slot-fill) doesn't support.

## Usage

The usage is really simple:

```javascript
// Toolbar.js
import React from 'react';
import { Slot, Fill } from '@blackbox-vision/react-slot-fill';

const Toolbar = (props) => (
  <div>
    <Slot name="Toolbar.Item" />
  </div>
);

export default Toolbar;

Toolbar.Item = (props) => (
  <Fill name="Toolbar.Item">
    <button>{props.label}</button>
  </Fill>
);
```

```javascript
// Feature.js
import React from 'react';
import Toolbar from './Toolbar';

const Feature = () => <Toolbar.Item label="My Feature!" />;
```

```javascript
// App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from '@blackbox-vision/react-slot-fill';

import Toolbar from './Toolbar';
import Feature from './Feature';

const App = () => (
  <Provider debug={true || false}>
    <Toolbar />
    <Feature />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

## Props

`Slot` and `Fill` components use the same props, which are the following ones:

| Properties | Types   | Default Value | Description                                     |
| ---------- | ------- | ------------- | ----------------------------------------------- |
| name       | string  | none          | Determines the name of the Slot/Fill.           |
| debug      | boolean | false         | Enable logging to detect issues with Slot/Fill. |

## TODO

- [x] Support for passing props from Fill to Slot.
- [ ] Support for multiple Fill for one Slot.

## Issues

Please, open an [issue](https://github.com/BlackBoxVision/react-slot-fill/issues) following one of the issues templates. We will do our best to fix them.

## Contributing

If you want to contribute to this project see [contributing](https://github.com/BlackBoxVision/react-slot-fill/blob/master/CONTRIBUTING.md) for more information.

## License

Distributed under the **MIT license**. See [LICENSE](https://github.com/BlackBoxVision/react-slot-fill/blob/master/LICENSE) for more information.
