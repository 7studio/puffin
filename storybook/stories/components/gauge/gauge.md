# Gauge

Gauge has no default state. You need to apply a variation on it.


## Default HTML markup
```html
<div class="cn-Gauge cn-Gauge--{{ variation }}">
    <div class="cn-Gauge__value">
        <svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true" focusable="false">
            <circle stroke-width="7" stroke-dasharray="303,163691071435" stroke-linecap="round" fill="none" cx="100" cy="100" r="96.5"></circle>
            <circle stroke="currentColor" stroke-width="7" stroke-dasharray="227,37276830357624" stroke-linecap="round" fill="none" cx="100" cy="100" r="96.5"></circle>
        </svg>
    </div>
    <svg class="cn-Gauge__icon" width="1em" height="1em" aria-hidden="true" focusable="false">
        <use xlink:href="#smile-{{ look_id }}"></use>
    </svg>
    <div class="cn-Gauge__title">{{ title }}</div>
</div>
```

## Pug mixin
```pug
//-
    @param {String} title - …
    @param {String} look - …
    @param {Number} percent - …
    @param {String} type - …
+gauge(title = '', look = '', percent = 0, type = '')
```

## Math
Values into SVG (`stroke-dasharray` notably) to draw the gauge aren't magic ^^ 
<br>This is the formula that is used to calculate them:

```js
let fill_percentage = 75;

const gauge_width = 200;
const gauge_line_width = 7;

const gauge_center_point = gauge_width / 2;
const gauge_line_radius = (gauge_width / 2) - (gauge_line_width / 2);

const gauge_background_line = (((Math.PI * gauge_line_radius) / 100) * 100).toString().replace(/\./g, ',');
const gauge_fill_line = (((Math.PI * gauge_line_radius) / 100) * fill_percentage).toString().replace(/\./g, ',');

return `
    <svg viewbox="0 0 ${gauge_width} ${gauge_width}" width="${gauge_width}" height="${gauge_width}" aria-hidden="true" focusable="false">
        <circle stroke-width="${gauge_line_width}" stroke-dasharray="${gauge_background_line}" stroke-linecap="round" fill="none" cx="${gauge_center_point}" cy="${gauge_center_point}" r="${gauge_line_radius}"></circle>
        <circle stroke="currentColor" stroke-width="${gauge_line_width}" stroke-dasharray="${gauge_fill_line}" stroke-linecap="round" fill="none" cx="${gauge_center_point}" cy="${gauge_center_point}" r="${gauge_line_radius}"></circle>
    </svg>
`
```

## Variations
The gauge component has by default three variations: `success`, `warning` and `danger`.

**You are able to define/remove variation with the help of the `$gauge-colors` Sass variable** but don't forget to update Pug mixin for face icon.

### Success
```html
<div class="cn-Gauge cn-Gauge--success">
    <div class="cn-Gauge__value">
        <svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true" focusable="false">
            <circle stroke-width="7" stroke-dasharray="303,163691071435" stroke-linecap="round" fill="none" cx="100" cy="100" r="96.5"></circle>
            <circle stroke="currentColor" stroke-width="7" stroke-dasharray="303,163691071435" stroke-linecap="round" fill="none" cx="100" cy="100" r="96.5"></circle>
        </svg>
    </div>
    <svg class="cn-Gauge__icon" width="1em" height="1em" aria-hidden="true" focusable="false">
        <use xlink:href="#smile-happy"></use>
    </svg>
    <div class="cn-Gauge__title">Adhésion totale</div>
</div>
```

### Waning
```html
<div class="cn-Gauge cn-Gauge--warning">
    <div class="cn-Gauge__value">
        <svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true" focusable="false">
            <circle stroke-width="7" stroke-dasharray="303,163691071435" stroke-linecap="round" fill="none" cx="100" cy="100" r="96.5"></circle>
            <circle stroke="currentColor" stroke-width="7" stroke-dasharray="227,37276830357624" stroke-linecap="round" fill="none" cx="100" cy="100" r="96.5"></circle>
        </svg>
    </div>
    <svg class="cn-Gauge__icon" width="1em" height="1em" aria-hidden="true" focusable="false">
        <use xlink:href="#smile-impassive"></use>
    </svg>
    <div class="cn-Gauge__title">Adhésion partielle</div>
</div>
```

### Danger
```html
<div class="cn-Gauge cn-Gauge--warning">
    <div class="cn-Gauge__value">
        <svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true" focusable="false">
            <circle stroke-width="7" stroke-dasharray="303,163691071435" stroke-linecap="round" fill="none" cx="100" cy="100" r="96.5"></circle>
            <circle stroke="currentColor" stroke-width="7" stroke-dasharray="75,79092276785875" stroke-linecap="round" fill="none" cx="100" cy="100" r="96.5"></circle>
        </svg>
    </div>
    <svg class="cn-Gauge__icon" width="1em" height="1em" aria-hidden="true" focusable="false">
        <use xlink:href="#smile-sad"></use>
    </svg>
    <div class="cn-Gauge__title">Non-adhésion</div>
</div>
```

## Sass customization
<table valign="top" style="table-layout:fixed;width:100%">
<thead>
<tr>
<th style="width:25%">Name</th>
<th style="width:35%">Default</th>
<th style="width:40%">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td valign="top"><code>$gauge-colors</code></td>
<td valign="top">

```scss
(
  success: cn-color('secondary'),
  warning: cn-color('warning'),
  danger: cn-color('danger')
)
```
</td>
<td valign="top">
Colors map of the gauge variations.
<br>The map is defined with only one depth.
<ol>
<li>First depth defines the variation (or modifier) name which will be used into HTML (e.g.: <code>cn-Gauge--{{ variation }}</code>).</li>
</ol>
</td>
</tr>
<tr>
<td valign="top"><code>$gauge-fontFamily</code></td>
<td valign="top"><code>$cn-base-fontFamily</code></td>
<td valign="top">Font family names of the gauge.<br>By default, the gauge inherits of the global font family names: <code>Helvetica Neue, Roboto, sans-serif</code>.</td>
</tr>
<tr>
<td valign="top"><code>$gauge-fontSize</code></td>
<td valign="top"><code>$cn-base-fontSize</code></td>
<td valign="top">Size of the gauge font.<br>By default, the gauge inherits of the global font size: <code>15px</code>.</td>
</tr>
<tr>
<td valign="top"><code>$gauge-lineHeight</code></td>
<td valign="top"><code>$cn-base-lineHeight</code></td>
<td valign="top">Height of the gauge line box.<br>By default, the gauge inherits of the global one: <code>22px</code>.</td>
</tr>
</tbody>
</table>