# Typography

## Sass

### Default variables
```scss
$cn-base-fontSize: 15px !default;
$cn-base-lineHeight: 22px !default;
$cn-base-fontFamily: Helvetica Neue, Roboto, sans-serif !default;
$cn-base-font: 1em/#{em($cn-base-lineHeight)} $cn-base-fontFamily !default;

/**
 * Headings
 */
$cn-headings: (
  'xlarge': (
    'font-family': $cn-base-fontFamily,
    'font-size': 34px,
    'font-weight': 500,
    'line-height': 44px
  ),
  'large': (
    'font-family': $cn-base-fontFamily,
    'font-size': 28px,
    'font-weight': 400,
    'line-height': 34px
  ),
  'medium': (
    'font-family': $cn-base-fontFamily,
    'font-size': 22px,
    'font-weight': 400,
    'line-height': 28px
  ),
  'small': (
    'font-family': $cn-base-fontFamily,
    'font-size': 19px,
    'font-weight': 500,
    'line-height': 25px
  )
) !default;
```

### Function
```scss
/// Retreive font properties
/// @param {String} $size - Name of the text size
/// @param {String} $property - CSS property name
/// @return {*} - Desired value
@function cn-heading($size, $property: '') {
  @if ($property != '') {
    @return map-deep-get($cn-headings, $size, $property);
  }

  @return map-get($cn-headings, $size);
}
```

### Mixins
```scss-css
@mixin cn-heading($size) {
  $font-map: cn-heading($size);
  $font-size: map-get($font-map, 'font-size');

  font-size: em($font-size);
  font-weight: map-get($font-map, 'font-weight');
  line-height: em(map-get($font-map, 'line-height'), $font-size);
}
```

**Use examples:**

```scss
.cn-test {
  $_font-map: cn-heading('medium');

  $font-size: map-get($_font-map, 'font-size');
  $line-height: em(map-get($_font-map, 'line-height'), $font-size);

  font-size: $font-size;
  font-weight: 400;
  line-height: $line-height;
  padding: ($line-height * .75) em(15px, $font-size);
}

.cn-test--1 {
  @include cn-heading('medium');
}
```

## HTML

```html
<strong class="cn-heading cn-heading--{{ variation }}">
    …
</strong>
```