# Theme Switch

Follow the [Video](https://www.youtube.com/watch?v=kZiS1QStIWc&ab_channel=GoogleChromeDevelopers) / [Article](https://web.dev/building-a-theme-switch-component/) / [Source Code](https://github.com/argyleink/gui-challenges/tree/main/theme-switch) / [Demo](https://gui-challenges.web.app/theme-switch/dist/) from Adam Argyle to lean how to build a modern theme switch.

## What did I learn?

### Accessibility for "svg button"

> By default, a button's accessible name is the content between the opening and closing `<button>` tags.

Because the theme toggle button contains a `<svg>` which can't provide the `aria-label`. We need to set `aria-label` ourself. In this project, we set it by JavaScript.

And `aria-live="polite"` can notify the screen reader when the toggle button's `aria-label` is changed.

`aria-hidden` has been added to the SVG element so screen readers know to ignore it as it's marked presentational.

ref:

- [MDN - aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
- [MDN - aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live)

### Make a svg for SUN

I never make a svg myself before. But the `sun` and `moon` svg is so easy to understand.

Use `<mask>` to add the colors white and black and transform the `sun` into a `moon` by eclipsing it.

ref:

- [MDN - SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
- [Feather - Simply beautiful open source icons](https://feathericons.com/)

### Write mode

Use `block-size` and `inline-size` to replace `height` and `width`.

ref:

- [MDN - block-size](https://developer.mozilla.org/en-US/docs/Web/CSS/block-size)
- [MDN - inline-size](https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size)

### Touch action

Use `touch-action: manipulation;` to tell the browser don't waste 300ms for potential 2nd tap.

ref:

- [MDN - touch-action#manipulation](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action#manipulation)

### Safari default button style

Use `-webkit-tap-highlight-color: transparent;` remove the semi-transparent highlight iOS applies to buttons.

ref:

- [MDN - -webkit-tap-highlight-color](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-tap-highlight-color)

### CSS Nesting Module

Use the CSS `@nest` feature to allow authoring new styles without leaving a selectors context.

ref:

- [W3C - CSS Nesting Module](https://www.w3.org/TR/css-nesting-1/)
- [GitHub - postcss-plugins](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting)

### Selector list

Use `:is()` to take a selector list as its argument, and selects any element that can be selected by one of the selectors in that list. This is useful for writing large selectors in a more compact form.

ref:

- [MDN - :is() (:matches(), :any())](https://developer.mozilla.org/en-US/docs/Web/CSS/:is)

### Custom Media Queries

When designing documents that use media queries, the same media query may be used in multiple places, such as to qualify multiple @import statements. Repeating the same media query multiple times is an editing hazard; an author making a change must edit every copy in the same way, or suffer from difficult-to-find bugs in their CSS.

ref:

- [W3C - Media Queries Level 5#custom-mq](https://www.w3.org/TR/mediaqueries-5/#custom-mq)

### prefers-reduced-motion

The `prefers-reduced-motion` CSS media feature is used to detect if the user has requested that the system minimize the amount of non-essential motion it uses.

ref:

- [NDN - prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

## Reference

- [Inspect animations](https://developer.chrome.com/docs/devtools/css/animations/)
- [DOM change breakpoints](https://developer.chrome.com/docs/devtools/javascript/breakpoints/#dom)
- [CSS Nesting Module](https://www.w3.org/TR/css-nesting-1/)
- [touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)
- [-webkit-tap-highlight-color](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-tap-highlight-color)
- [stroke-linecap](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap)
