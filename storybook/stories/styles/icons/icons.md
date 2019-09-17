# Icons

By default, the app uses **&lt;svg&gt;** HTML elements for all of its icons and [Feather](https://feathericons.com/) as library. As far as possible, the icons must be downloaded from Feather website and not export from Sketch or other tools.

Some icons were specificly handmaded (or chosen from elsewhere) for the app by the webdesigner. All of them are listed into "Custom icons" section.

## Usage

All chosen icons are available as symbols from an SVG sprite which is inlined at the top of document. 

### Pug

In .pug files, all icons must be included with the `icon_loader` function to maintain the right behaviour between Gulp (static app version) and Webpack (documentation) which share and use the same pug mixins.

```pug
svg(width="1em" height="1em" class="cn-button__icon" aria-hidden="true" focusable="false")
    use(xlink:href=icon_loader('svgs/spr-icons.svg', 'plus-circle'))
```

### HTML

```html
<svg width="1em" height="1em" class="cn-button__icon" aria-hidden="true" focusable="false">
    <use xlink:href="#plus-circle">
</svg>

<!-- angular -->
<svg width="1em" height="1em" class="cn-button__icon" aria-hidden="true" focusable="false">
    <use xlink:href="#{{ icon_id }}">
</svg>
```

## If needed
This method should be easily transform to external sprite request if developpers ask for to enhance maintenability :D
<br>You have just to update the function `icon_loader` into `www/.gulp-tasks/_helpers/views-pug.js` like below and rebuild static version:

```js
icon_loader: (file_path, fragment) => `assets/media/${file_path}#${fragment}`,
```
<br>

All HTML like above will be transform into:

```html
<svg width="1em" height="1em" class="cn-button__icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/media/svgs/spr-sprite.svg#plus-circle">
</svg>

<!-- angular -->
<svg width="1em" height="1em" class="cn-button__icon" aria-hidden="true" focusable="false">
    <use xlink:href="{{ svg_sprite_filepath }}#{{ icon_id }}">
</svg>
```

## Gulp

SVG sprites are auto-generated with the help of a Gulp task `process:media:svgs`. All you need to do is to create a directory with the `spr-` prefix in `src/assets/media/svgs` and put all needed icons for your sprite.
<br>Of course, your are able to create sprites as mush as you want.

The important thing that you need to think about is the name of your icon file because they will be use as symbol ID (no accent, no space, etc).

**Example:**

```
src/assets/media/svgs/
    spr-icons/
        plus-circle.svg
        alert-circle.svg
        info.svg
```

will be transform into `dist/assets/media/svgs/spr-icons.svg`:

```html
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <symbol id="plus-circle" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
        </g>
    </symbol>
    <symbol id="alert-circle" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12" y2="16"/>
        </g>
    </symbol>
    <symbol id="info" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12" y2="8"/>
        </g>
    </symbol>
</svg>
```

**Warning:**

By default, the Gulp task `process:media:svgs` doesn't optimise SVGs. If you need optimisations, you should run an other task `build:media` which will use [imagemin](https://github.com/imagemin/imagemin) to achieve your objective **but** be careful because this task will optimise all your images into `dist/assets/media` directory.