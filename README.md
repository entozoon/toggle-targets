# Toggle Targets

Toggle another element by data attribute.

## [Demo Examples](https://entozoon.github.io/toggle-targets)

## Install

```bash
npm i toggle-targets
```

## HTML

See [examples](https://entozoon.github.io/toggle-targets) for .. well, examples. But here's the gist of it, and parameters:

```html
<button
  data-tt-set="example"
  data-tt-toggle="target-1"
>Toggle</button>
<div
  data-tt-set="example"
  data-tt-target="target-1"
  hidden
>
  <p>Target element to be toggled</p>
  <button data-untoggle-set="example">Close</button
</div>
```

### Attributes for the toggle button

| Attribute      | Type            | Description                                        |
| -------------- | --------------- | -------------------------------------------------- |
| data-tt-set    | id (unique)     | Set of toggles, grouped together                   |
| data-tt-toggle | id (not unique) | ID to toggle, matching the target's data-tt-target |

### Attributes for the target element

| Attribute      | Type            | Description                                                |
| -------------- | --------------- | ---------------------------------------------------------- |
| data-tt-set    | id (unique)     | Set of toggles, grouped together                           |
| data-tt-target | id (not unique) | ID for this element, matching the toggle's data-tt-toggle  |
| data-tt-blur   | empty           | (optional: default false) Hide when clicking anywhere else |

### Optional additional elements

```html
<button data-tt-untoggle>Close</button
<input data-tt-focus />
```

| Attribute        | Type     | Description                                  |
| ---------------- | -------- | -------------------------------------------- |
| data-tt-untoggle | empty    | Close the target element which contains this |
| data-tt-focus    | selector | Focus on a selector within                   |

## SCSS

```scss
@import "toggle-targets/src/index";
```

## JS

```js
import { initToggleTargets } from "toggle-targets";
const toggleSets = initToggleTargets();
```
