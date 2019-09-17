# Breakpoints

## Sass

### Default variables
```scss
$cn-breakpoints: (
  'XXL': ('min': 1602px),
   'XL': ('min': 1289px, 'max': 1601px), // gap: 312px
    'L': ('min':  991px, 'max': 1288px), // gap: 296px
    'M': ('min':  615px, 'max':  990px), // gap: 375px
    'S': ('min':  320px, 'max':  614px), // gap: 294px
    '0': ('max':  319px)
) !default;

$cn-custom-breakpoints: (
  'foldMenu': ('max': 1601px),
  'burgerMenu': ('max': 795px)
) !default;
```

**Use examples:**

```scss
@media screen and (max-width: #{map-deep-get($cn-breakpoints, "S", "max")}) {

  …

}
```