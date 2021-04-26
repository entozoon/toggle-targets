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
  data-toggle-set="example"
  data-toggle="target-1"
>Toggle</button>
<div
  data-toggle-set="example"
  data-target="target-1"
  hidden>
  <p>Target element to be toggled</p>
  <button data-untoggle-set="example">Close</button
</div>
```

### Attributes for the toggle button

| Attribute       | Type | Description                                     |
| --------------- | ---- | ----------------------------------------------- |
| data-toggle-set | id   | Set of toggles, grouped together                |
| data-toggle     | id   | ID to toggle, matching the target's data-target |

### Attributes for the target element

| Attribute         | Type           | Description                                                  |
| ----------------- | -------------- | ------------------------------------------------------------ |
| data-toggle-set   | id             | Set of toggles, grouped together                             |
| data-target       | id             | ID for this element, matching the toggle's data-toggle       |
| data-toggle-blur  | boolean string | (optional: default "false") Hide when clicking anywhere else |
| data-toggle-focus | selector       | (optional) Focus on a selector within                        |

### Additional elements

```html
<button data-untoggle-set="example">Close</button
```

| Attribute         | Type     | Description            |
| ----------------- | -------- | ---------------------- |
| data-untoggle-set | selector | Set of toggles to hide |

## SCSS

```scss
@import "toggle-targets/src/index";
```

## JS

```js
import { initToggleTargets } from "toggle-targets";
initToggleTargets();
```
