export function categoryValidator(category) {
  return Boolean(category && category.value && category.label && category.icon);
}

export function categoriesValidator(categories) {
  return Array.isArray(categories) && categories.every((category) => categoryValidator(category));
}

function disabledReasonsValidator(disabledReasons) {
  return (
    disabledReasons === undefined ||
    (Array.isArray(disabledReasons) &&
      disabledReasons.every((reason) => typeof reason === 'string'))
  );
}

export function contextItemValidator(item) {
  return Boolean(
    item &&
      item.id &&
      item.type &&
      typeof item.isEnabled === 'boolean' &&
      disabledReasonsValidator(item.disabledReasons)
  );
}

export function contextItemsValidator(items) {
  return Array.isArray(items) && items.every((item) => contextItemValidator(item));
}

export function formatIssueId(iid) {
  if (!iid) return '';

  return `#${iid}`;
}

export function formatMergeRequestId(iid) {
  if (!iid) return '';

  return `!${iid}`;
}
