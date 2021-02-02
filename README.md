# toggle-targets

Toggle another element by data attribute.

## Install

```bash
npm i @thetechdept/shopify-bones-parse-video-src
```

### HTML

Something along these lines.

```html
<a href="#" data-toggle-target="#target" data-toggle-focus="#target input"></a>
<div id="target" class="targets">
  <input />
</div>
```

```scss
.targets {
  display: none;
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
