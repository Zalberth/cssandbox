cssandbox
=========

A kind of a CSS Sandboxer. It appends a class before each selector of a CSS file.

Input:
```css
p, div {
  color: white;
}
```

Command: `node sandbox.js input.css --class=sanboxed > output.css`

Ouputs:
```css
.sandboxed p, .sandboxed div {
  color: white;
}
```

Useful to avoid conflicting with another close-looking CSS (e.g. embedding two different Bootstrap themes).

todo
----

Make a proper CLI to be able to call `cssanbox input.css --class=sanboxed > output.css`
