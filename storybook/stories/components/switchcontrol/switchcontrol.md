# Switchcontrol

## Default HTML markup
```html
<button class="cn-Switchcontrol"
        type="button"
        aria-checked="false"
        id="{{ ID }}"
>
        <span class="cn-Switchcontrol__text">{{ text }}</span>
        <span class="cn-Switchcontrol__icon" aria-hidden="true"></span>
</button>
```

## Pug mixin
```pug
//-
    @param {String} text - …
    @param {String} checked - …
    @param {String} id - …
+switchcontrol(text = '', checked = 'false', id = '')
```

## JavaScript interactions

**ToDo**

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
<td valign="top"><code>$switchcontrol-colors</code></td>
<td valign="top">

```scss
(
  default: cn-color('secondary'),
  checked: cn-color('warning')
)
```
</td>
<td valign="top">
Colors map of the switchcontrol variations.
<br>The map is defined with one depth.
<ol>
<li>
First depth defines the state of the control.
<br><code>default</code> descibes <code>aria-checked="false"</code> state and <code>checked</code> describes <code>aria-checked="true"</code> state.
</li>
</ol>
</td>
</tr>
<tr>
<td valign="top"><code>$switchcontrol-fontFamily</code></td>
<td valign="top"><code>$cn-base-fontFamily</code></td>
<td valign="top">Font family names of the switchcontrol.<br>By default, the switchcontrol inherits of the global font family names: <code>Helvetica Neue, Roboto, sans-serif</code>.</td>
</tr>
<tr>
<td valign="top"><code>$switchcontrol-fontSize</code></td>
<td valign="top"><code>$cn-base-fontSize</code></td>
<td valign="top">Size of the switchcontrol font.<br>By default, the switchcontrol inherits of the global font size: <code>15px</code>.</td>
</tr>
<tr>
<td valign="top"><code>$switchcontrol-lineHeight</code></td>
<td valign="top"><code>$cn-base-lineHeight</code></td>
<td valign="top">Height of the switchcontrol line box.<br>By default, the switchcontrol inherits of the global one: <code>22px</code>.</td>
</tr>
</tbody>
</table>