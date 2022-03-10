# GitLab UI CSS

GitLab UI provides component styles, a utility-class library and SCSS utilities.

## Quick Start

To include GitLab UI base styles in your project, simple import the `@gitlab/ui` main css file:

```css
@import '@gitlab/ui/dist/index.css';
```

This provides component styles and utility classes.

## Usage with a SCSS preprocessor

If you use a SCSS preprocessor, you may include the base SCSS file instead of `index.css`:

```scss
@import '@gitlab/ui/src/scss/gitlab_ui';
```

In addition to component styling and utility classes, this provides various functions, variables
and mixins.

### Overriding variables

Variables are imported as part of the [base SCSS file](#Usage-with-a-SCSS-preprocessor).

To use a variable without including GitLab UI components’ styles, import the variable file and its
functions directly:

```scss
@import '@gitlab/ui/src/scss/functions';
@import '@gitlab/ui/src/scss/variables';

.my-class {
  color: $theme-indigo-200;
}
```

To view a complete list of variables, see [variables.scss](/src/scss/variables.scss).

## Utilities

GitLab utility classes and mixins are based on GitLab's
[design system guidelines](https://design.gitlab.com/).

## Utility class specifity

GitLab UI utility classes are not marked as `!important` by default. If you have to use
a utility class to overwrite CSS with high specificity, we provide `!important` versions
of every utility class. Those alternatives are suffixed with `!`, for example:
 `gl-display-flex` vs `gl-display-flex!`.

### Utility classes CSS bundle

To include all utility classes without including GitLab UI components’ styles, import the base
`utilities.scss` file and its dependencies:

```scss
@import '@gitlab/ui/src/scss/functions';
@import '@gitlab/ui/src/scss/variables';
@import '@gitlab/ui/src/scss/utility-mixins/index';
@import '@gitlab/ui/src/scss/utilities';
```

Note: This is a generated file that includes all utility mixins as classes. To see this file in a
local copy of GitLab UI, first generate it with the `yarn generate-utilities` script.

### Utility mixins

Utility mixins are included as part of the [base SCSS file](#usage-with-a-scss-preprocessor).

To use a utility mixin without including GitLab UI components’ styles, import the mixin file and its
dependencies directly:

```scss
@import '@gitlab/ui/src/scss/functions';
@import '@gitlab/ui/src/scss/variables';
@import '@gitlab/ui/src/scss/utility-mixins/border'

.border {
  @include gl-border-solid;
  @include gl-border-gray-200;
  @include gl-border-1;
  @include gl-border-rounded-base;
}
```

See [utility-mixins/index.scss](/src/scss/utility-mixins/index.scss) for a complete list of utility
mixins available.

You may include all mixins by using the following imports:

```scss
@import '@gitlab/ui/src/scss/functions';
@import '@gitlab/ui/src/scss/variables';
@import '@gitlab/ui/src/scss/utility-mixins/index'
```

### Theming

Some components' styles can be adjusted to match the current theme. This is
best done using CSS custom properties. Creating an explicit `theme` prop is
deprecated.

For now, `--gl-theme-accent` is the only theme-related CSS custom property in
use (see `GlTabs`). See [this epic](https://gitlab.com/groups/gitlab-org/-/epics/7401)
for more details.
