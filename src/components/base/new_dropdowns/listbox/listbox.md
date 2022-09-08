A listbox dropdown is a button that toggles a panel containing a list of options.
Listbox supports single and multi-selection.

**Single-select:** By default, selecting an option will update the toggle label with the choice.
But the custom toggle text can be provided.
When option is selected, the dropdown will be closed and focus set on the toggle button.

**Multi-select:** Selecting an option will not update the toggle, but it can be customized
providing `toggleText` property. Also, selecting or deselecting an item won't close the dropdown.

### Icon-only listbox

Icon-only listboxes must have an accessible name.
You can provide this with the combination of `toggleText` and `textSrOnly` props.
For single-select listboxes `toggleText` will be set to the selected item's `text` property value
by default.

Optionally, you can use `no-caret` to remove the caret and `category="tertiary"` to remove the border.

```html
<gl-listbox
  icon="ellipsis_v"
  toggle-text="More options"
  text-sr-only
  category="tertiary"
  no-caret
>
```

### Opening the listbox

Listbox will open on toggle button click (if it was previously closed).
On open, `GlListbox` will emit the `shown` event.

### Closing the listbox

The listbox is closed by any of the following:

- pressing <kbd>Esc</kbd>
- clicking anywhere outside the component
- selecting an option in single-select mode

After closing, `GlListbox` emits a `hidden` event.

### Selecting items

Set the `v-model` on the listbox to have 2-way data binding for the selected items in the listbox.
Alternatively, you can set `selected` property to the array of selected items
`value` properties (for multi-select) or to the selected item `value` property for a single-select.
On selection the listbox will emit the `select` event with the selected values.

### Setting listbox options

Use the `items` prop to provide options to the listbox. Each item can be
either an option or a group. Below are the expected shapes of these
objects:

```typescript
type Option = {
  value: string
  text?: string
}

type Group = {
  text: string
  options: Array<Option>
}

type ItemsProp = Array<Option> | Array<Group>
```

#### Options

The `value` property of options must be unique across all options
provided to the listbox, as it's used as a primary key.

The optional `text` property is used to render the default listbox item
template. If you want to render a custom template for items, use the
`list-item` scoped slot:

```html
<gl-listbox :items="items">
  <template #list-item="{ item }">
    <span class="gl-display-flex gl-align-items-center">
      <gl-avatar :size="32" class-="gl-mr-3"/>
      <span class="gl-display-flex gl-flex-direction-column">
        <span class="gl-font-weight-bold gl-white-space-nowrap">{{ item.text }}</span>
        <span class="gl-text-gray-400"> {{ item.secondaryText }}</span>
      </span>
    </span>
  </template>
</gl-listbox>
```

#### Groups

Options can be contained within groups. A group has a required `text`
property, which must be unique across all groups within the listbox, as
it's used as a primary key. It also has a required property `items` that
must be an array of options.

Groups can be at most one level deep: a group can only contain options.
Options and groups _cannot_ be siblings. Either all items are options,
or they are all groups.

To render custom group labels, use the `group-label` scoped slot:

```html
<gl-listbox :items="groups">
  <template #group-label="{ group }">
    {{ group.text }} <gl-badge size="sm">{{ group.options.length }}</gl-badge>
  </template>
</gl-listbox>
```
