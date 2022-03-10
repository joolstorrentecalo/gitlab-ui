Skeleton loaders are to be used when pages or sections can be progressively populated with content,
such as text and images, as they become available. Generally speaking the first batch of content
will be the lightest to load and is followed by secondary and tertiary content batches. Each loading
step will add in more detail to the page until no skeleton loaders are present anymore. Content
should replace skeleton objects immediately when the data is available.

The skeleton loader component accepts shapes which in return will create a skeleton state with a
loading animation. Any skeleton state components should be created with
`<gl-skeleton-loader></gl-skeleton-loader>`. If no shape is passed via the slot the default skeleton
will be used. See "Default" and "Default With Custom Props" examples.

## Progressive Loading

Determine if progressive loading is available, if it is break apart the skeleton to load data as it
becomes readily available. If progessive loading is not available, replace the entire skeleton when
the data is available.

## Under the hood

Skeleton Loader is a port of [vue-content-loader](https://github.com/egoist/vue-content-loader).
Some changes have been made to the code to better suit our codebase, such as removing props and
refactoring into a SFC. Please take a look at their documentation and a useful [UI tool](http://danilowoz.com/create-vue-content-loader/)
for seeing the code output for `svg` shapes.
