# toggle-targets

Toggle another element by data attribute.

## Install

```bash
npm i toggle-targets
```

### HTML

Something along these lines.

```html
<a
  href="#"
  data-toggle-target="#target"
  data-toggle-focus="#target input"
  data-toggle-set
  >Toggle</a
>
<div id="target" class="toggle-targets">
  <input />
</div>
```

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
