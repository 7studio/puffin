# Colors

## Sass

### Default variables
```scss
$cn-base-bgColor: #f4f8fa !default;
$cn-base-color: #353535 !default;

$cn-colors: (
  'text': $cn-base-color,
  'link': #4a90e2,
  'danger': (
    'default': #e60b00,
    'light': #ffdedd,
    'dark': #b20901
  ),
  'warning': (
    'default': #ff9500,
    'light': #ffeed6,
    'dark': #c37200
  ),
  'success': (
    'default': #4cd964,
    'light': #e5ffe9,
    'dark': #369f48
  ),
  'gray': (
    10: #f8fafb,
    20: #f0f4f6,
    30: #dee5e9,
    40: #c0ccd2,
    50: #a4b2b9,
    60: #798b95,
    70: #526873,
    80: #2d424c,
    90: #18262d,
    100: #0c161a
  ),
  'primary': (
    'default': #00bce8,
    30: #f9fdfe,
    40: #edfafd,
    50: #d2f3fa,
    60: #a6e7f6,
    70: #6bd7f1,
    80: #47ceee,
    90: #1ac2ea,
    110: #00a8d0,
    120: #0086a6,
    130: #005d73,
    140: #003745
  ),
  'secondary': (
    'default': #1edbcf,
    50: #effcfb,
    60: #d9f8f6,
    70: #b3f2ee,
    80: #81eae3,
    90: #4be2d8,
    110: #1ac4b9,
    120: #149c94,
    130: #0d6c67,
    140: #07403d
  ),
  'purple': (
    'default': #5913fe,
    20: #ece5fe,
    30: #cdb8fe,
    40: #bca0fe,
    50: #ac89fe,
    60: #9b71fe,
    70: #8b5afe,
    80: #7a42fe,
    90: #692bfe,
    110: #4f11e4,
    120: #470fcb,
    130: #3e0db1,
    140: #350b98
  ),
  'black': #000,
  'white': #fff
) !default;
```

### Function
```scss
/// Retreive color
/// @param {String} $color - Name of the color
/// @param {String} $tone - 10 to 140
/// @return {String} Hexadecimal code color
@function cn-color($name, $tone: '') {
  @if ($tone != '') {
    @return map-deep-get($cn-colors, $name, $tone);
  }

  @if (type-of(map-get($cn-colors, $name)) == 'map') {
    @return map-deep-get($cn-colors, $name, 'default');
  }

  @return map-get($cn-colors, $name);
}
```

### Mixins
```scss-css
@mixin cn-color($name, $tone: '') {
  color: cn-color($name, $tone);
}

@mixin cn-bgcolor($name, $tone: '') {
  background-color: cn-color($name, $tone);
}
```

**Use examples:**

```scss
.cn-test {
  background-color: cn-color('danger', 'light');
  border-color: cn-color('gray', 60);
  color: cn-color('primary');
}

.cn-test--1 {
  @include cn-bgcolor('danger', 'light');
  border-color: cn-color('gray', 60);
  @include cn-color('primary');
}
```

## HTML

### Utility classes
```html
<div class="cn-test cn-u-color-primary">
    …
</div>
```
