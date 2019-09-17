# Grid

## Default HTML markup
```html
<ul class="cn-grid">
    <li class="cn-grid__item">…</li>
    <li class="cn-grid__item">…</li>
    <li class="cn-grid__item">…</li>
</ul>
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
<td valign="top"><code>$cn-grid-columns</code></td>
<td valign="top"><code>12</code></td>
<td valign="top">Number of grid columns.</td>
</tr>
<tr>
<td valign="top"><code>$cn-grid-columnGap</code></td>
<td valign="top"><code>30px</code></td>
<td valign="top">Size of the gap (gutter) between an element's columns.</td>
</tr>
<tr>
<td valign="top"><code>$cn-grid-rowGap</code></td>
<td valign="top"><code>em($cn-base-lineHeight)</code></td>
<td valign="top">Size of the gap (gutter) between an element's grid rows.<br>By default, the gap is egal to the global line box: <code>22px</code>.</td>
</tr>
</tbody>
<tbody>
<tr>
<td valign="top"><code>$cn-grid-small-columnGap</code></td>
<td valign="top"><code>($cn-grid-columnGap / 2)</code></td>
<td valign="top">Size of the gap (gutter) between an element's columns when screen is too small.</td>
</tr>
<tr>
<td valign="top"><code>$cn-grid-small-rowGap</code></td>
<td valign="top"><code>($cn-grid-rowGap * .75)</code></td>
<td valign="top">Size of the gap (gutter) between an element's grid rows when screen is too small.</td>
</tr>
</tbody>
</table>