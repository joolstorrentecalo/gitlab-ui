import {
  categoriesValidator,
  categoryValidator,
  contextItemsValidator,
  contextItemValidator,
} from './utils';
import {
  MOCK_CATEGORIES,
  MOCK_CONTEXT_ITEM_FILE,
  MOCK_CONTEXT_ITEM_FILE_DISABLED,
  MOCK_CONTEXT_ITEM_MERGE_REQUEST,
} from './mock_context_data';

describe('duo_chat_context utils', () => {
  describe('categoryValidator', () => {
    it.each(MOCK_CATEGORIES)('returns true for a valid category', (category) => {
      expect(categoryValidator(category)).toBe(true);
    });

    it.each([
      { value: { value: 'test', label: 'Test' }, description: 'missing icon' },
      { value: { value: 'test', icon: 'icon' }, description: 'missing label' },
      { value: { label: 'Test', icon: 'icon' }, description: 'missing value' },
      { value: {}, description: 'empty object' },
      { value: null, description: 'null' },
      { value: undefined, description: 'undefined' },
    ])('returns false for "$description"', ({ value }) => {
      expect(categoryValidator(value)).toBe(false);
    });
  });

  describe('categoriesValidator', () => {
    it('returns true for valid categories', () => {
      expect(categoriesValidator(MOCK_CATEGORIES)).toBe(true);
    });

    it.each([
      { value: null, description: 'null' },
      { value: undefined, description: 'undefined' },
      { value: {}, description: 'object instead of array' },
      { value: 'not an array', description: 'string instead of array' },
      { value: 42, description: 'number instead of array' },
      {
        value: [{ value: 'test', label: 'Test' }],
        description: 'array with invalid category (missing icon)',
      },
      {
        value: [{ value: 'test', icon: 'icon' }],
        description: 'array with invalid category (missing label)',
      },
      {
        value: [{ label: 'Test', icon: 'icon' }],
        description: 'array with invalid category (missing value)',
      },
      {
        value: [MOCK_CATEGORIES.at(0), MOCK_CATEGORIES.at(1), { label: 'Test' }],
        description: 'array with mix of valid and invalid categories',
      },
    ])('returns false for "$description', ({ value }) => {
      expect(categoriesValidator(value)).toBe(false);
    });
  });

  describe('contextItemValidator', () => {
    describe('with a valid item', () => {
      it('returns true for a valid file item', () => {
        expect(contextItemValidator(MOCK_CONTEXT_ITEM_FILE)).toBe(true);
      });

      it('returns true for a valid merge request item', () => {
        expect(contextItemValidator(MOCK_CONTEXT_ITEM_MERGE_REQUEST)).toBe(true);
      });

      it('returns true for a valid disabled item', () => {
        expect(contextItemValidator(MOCK_CONTEXT_ITEM_FILE_DISABLED)).toBe(true);
      });
    });

    describe.each([
      { value: null, description: 'null' },
      { value: undefined, description: 'undefined' },
      { value: {}, description: 'empty object' },
      { value: 'not an item', description: 'string instead of object' },
      { value: 42, description: 'number instead of object' },
      {
        value: { ...MOCK_CONTEXT_ITEM_FILE, id: undefined },
        description: 'missing id',
      },
      {
        value: { ...MOCK_CONTEXT_ITEM_FILE, type: undefined },
        description: 'missing type',
      },
      {
        value: {
          ...MOCK_CONTEXT_ITEM_FILE,
          isEnabled: undefined,
        },
        description: 'missing enabled',
      },
      {
        value: {
          ...MOCK_CONTEXT_ITEM_FILE,
          isEnabled: 'true',
        },
        description: 'non-boolean enabled',
      },
      {
        value: {
          ...MOCK_CONTEXT_ITEM_FILE,
          disabledReasons: 'not an array',
        },
        description: 'non-array disabledReasons',
      },
      {
        value: {
          ...MOCK_CONTEXT_ITEM_FILE,
          disabledReasons: [42],
        },
        description: 'non-string items in disabledReasons array',
      },
    ])('with "$description"', ({ value }) => {
      it('returns false', () => {
        expect(contextItemValidator(value)).toBe(false);
      });
    });
  });

  describe('contextItemsValidator', () => {
    describe.each([
      { value: [], description: 'empty array' },
      {
        value: [MOCK_CONTEXT_ITEM_FILE],
        description: 'one valid item',
      },
      {
        value: [MOCK_CONTEXT_ITEM_FILE, MOCK_CONTEXT_ITEM_MERGE_REQUEST],
        description: 'multiple valid items',
      },
    ])('with "$description"', ({ value }) => {
      it('returns true', () => {
        expect(contextItemsValidator(value)).toBe(true);
      });
    });

    describe.each([
      { value: null, description: 'null' },
      { value: undefined, description: 'undefined' },
      { value: {}, description: 'object instead of array' },
      { value: 'not an array', description: 'string instead of array' },
      { value: 42, description: 'number instead of array' },
      {
        value: [{ id: '1', metadata: { name: 'Item 1' } }],
        description: 'array with item missing isEnabled',
      },
      {
        value: [{ metadata: { name: 'Item 1' }, isEnabled: true }],
        description: 'array with item missing id',
      },
      {
        value: [{ id: '1', metadata: { name: 'Item 1' }, isEnabled: 'true' }],
        description: 'array with item having non-boolean isEnabled',
      },
      {
        value: [MOCK_CONTEXT_ITEM_FILE, { metadata: { name: 'Item 2' }, isEnabled: false }],
        description: 'array with one valid and one invalid item',
      },
    ])('with "$description"', ({ value }) => {
      it('returns false', () => {
        expect(contextItemsValidator(value)).toBe(false);
      });
    });
  });
});
