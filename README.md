# toggle-targets

Toggle another element by data attribute.

## Install

```bash
npm i toggle-targets
```

### HTML

Something along these lines.

```html
<a href="#" data-toggle-target="#target" data-toggle-set="1">Toggle</a>
<div id="target" class="toggle-targets">
  <input />
</div>
```

| Attribute          | Type           | Description                                                      |
| ------------------ | -------------- | ---------------------------------------------------------------- |
| data-toggle-target | selector       | Target element to toggle                                         |
| data-toggle-set    | id             | (optional) Set of toggles, all others of which will be untoggled |
| data-toggle-blur   | boolean string | (default "true") Untoggle when clicking anywhere else            |
| data-toggle-focus  | selector       | (optional) Focus on a selector within                            |

```scss
.toggle-targets {
  display: none;
  &.active {
    display: block;
  }
}
```

### JS

```js
import { toggleTargets, toggleCloseSet } from "toggle-targets";
toggleTargets({
  attribute: "data-toggle-target",
  toggleSetAttribute: "data-toggle-set",
  focusAttribute: "data-toggle-focus",
});
```
