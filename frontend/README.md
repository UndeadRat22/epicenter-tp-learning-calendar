# frontend

## Install

> If you're having npm-related issues, try using node v12

`npm install`

## Usage
`npm start` 

localhost:8080 should open automatically. You can change the port in package.json 

## wix-style-react storybook
[here](https://wix-style-react.now.sh/?path=/story/introduction-getting-started--getting-started)

## Using css/scss
There are two ways. Note the difference between file names.
- Using css modules:
```
// react-component.js
import s from 'react-component.scss';
<div classname={s.center}></div>

// react-component.scss
.center {
    ...
}
```
- Not using css modules:
```
// react-component.js
import 'react-component.global.scss';
<div className="center"></div>

// react-component.global.scss
.center {
    ...
}
```

## Using feature toggles
FeatureToggles.isOn(string) returns true if feature is enabled, false otherwise
```
import React from 'react';
import FeatureToggles from '../utils/FeatureToggles';

const ExampleFeatureToggles = () => {
  return (
    <div>
        DEBUG_MODE = {FeatureToggles.isOn('debug-mode) ? 'ON' : 'OFF'}
    </div>
  );
};
```

## Caution
Please don't change anything besides src/