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
<div className={s.center}></div>

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

## Code style/guidelines
Let's adhere to these points (some of them will disappear once we setup eslint)
- Destructuring in props: `const Login = ({ onLogin }) => { ... };
- Arrow functions instead of function declarations for function components
- Only function components with hooks
- Prefer functional approach - avoid for/while loops, use built-in .map(), .filter(), etc. or lodash
- Use container pattern for large components (split 1 component into two - one for UI only, other for state)
- Don't bother with performance optimizations for now (React.memo, useCallback, etc.)
- Leave styling styling for later (unless it's absolutely necessary), focus on functionality of components
- Use components from wix-style-react as soon as you can
- Use css modules and nothing else for styling
- If you comment code out, make it super explicit why you're doing so or don't comment code at all
