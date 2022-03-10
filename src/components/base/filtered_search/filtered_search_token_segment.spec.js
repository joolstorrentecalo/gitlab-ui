import { shallowMount } from '@vue/test-utils';
import GlFilteredSearchTokenSegment from './filtered_search_token_segment.vue';

const OPTIONS = [{ value: '=' }, { value: '!=' }];

describe('Filtered search token segment', () => {
  let wrapper;

  const searchInputAttributes = { 'data-qa-selector': 'foo-bar' };

  beforeAll(() => {
    if (!HTMLElement.prototype.scrollIntoView) {
      HTMLElement.prototype.scrollIntoView = jest.fn();
    }
  });

  afterAll(() => {
    if (HTMLElement.prototype.scrollIntoView.mock) {
      delete HTMLElement.prototype.scrollIntoView;
    }
  });

  let alignSuggestionsMock;
  let suggestionsMock;

  const createComponent = (props) => {
    alignSuggestionsMock = jest.fn();
    suggestionsMock = {
      methods: {
        nextItem: jest.fn(),
        prevItem: jest.fn(),
        getValue: () => 'notnull',
      },
      template: `<div class="ololosha"><slot></slot></div>`,
    };

    wrapper = shallowMount(GlFilteredSearchTokenSegment, {
      propsData: props,
      provide: {
        portalName: 'fakePortal',
        alignSuggestions: alignSuggestionsMock,
      },
      stubs: {
        Portal: { template: '<div><slot></slot></div>' },
        GlFilteredSearchSuggestionList: suggestionsMock,
      },
    });
  };

  const createWrappedComponent = ({ value, ...otherProps } = {}) => {
    // We need to create fake parent due to https://github.com/vuejs/vue-test-utils/issues/1140
    const fakeParent = {
      inheritAttrs: false,
      data: () => ({ value }),
      components: {
        GlFilteredSearchTokenSegment,
      },
      provide: {
        portalName: 'fakePortal',
        alignSuggestions: () => {},
      },
      template:
        '<gl-filtered-search-token-segment v-bind="$attrs" v-model="value" v-on="$listeners" />',
    };

    wrapper = shallowMount(fakeParent, {
      propsData: otherProps,
      stubs: { GlFilteredSearchTokenSegment },
    });
  };

  it('emits activate on left button click if inactive', () => {
    createComponent({ value: '' });

    wrapper.trigger('mousedown.left');

    expect(wrapper.emitted().activate).toHaveLength(1);
  });

  it('ignores mousedown if active', () => {
    createComponent({ value: '', active: true });

    wrapper.trigger('mousedown');

    expect(wrapper.emitted().mousedown).toBeUndefined();
  });

  it('selects next suggestion if down arrow is pressed', () => {
    createComponent({ active: true, options: OPTIONS, value: false });
    wrapper.find('input').trigger('keydown', { key: 'ArrowDown' });

    expect(suggestionsMock.methods.nextItem).toHaveBeenCalled();
  });

  it('selects previous suggestion if down arrow is pressed', () => {
    createComponent({ active: true, options: OPTIONS, value: false });
    wrapper.find('input').trigger('keydown', { key: 'ArrowUp' });

    expect(suggestionsMock.methods.prevItem).toHaveBeenCalled();
  });

  it('emits submit if Enter is pressed', () => {
    createComponent({ active: true, value: false });
    wrapper.find('input').trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted().submit).toHaveLength(1);
  });

  it('emits complete if Escape is pressed', () => {
    createComponent({ active: true, value: false });

    wrapper.find('input').trigger('keydown', { key: 'Escape' });

    expect(wrapper.emitted('complete')).toEqual([[]]);
  });

  it('emits backspace event if value is empty and Backspace is pressed', () => {
    createComponent({ active: true, value: '' });
    wrapper.find('input').trigger('keydown', { key: 'Backspace' });

    expect(wrapper.emitted().backspace).toHaveLength(1);
  });

  it('does not emit backspace event if value is not empty and Backspace is pressed', () => {
    createComponent({ active: true, value: 'something' });
    wrapper.find('input').trigger('keydown', { key: 'Backspace' });

    expect(wrapper.emitted().backspace).toBeUndefined();
  });

  it('invokes custom input handler if provided', () => {
    const customInputKeydownHandler = jest.fn();
    createComponent({
      active: true,
      value: 'something',
      customInputKeydownHandler,
    });
    wrapper.find('input').trigger('keydown', { key: 's' });

    expect(customInputKeydownHandler).toHaveBeenCalledWith(
      expect.any(Event),
      expect.objectContaining({
        applySuggestion: expect.any(Function),
        inputValue: 'something',
        suggestedValue: undefined,
      })
    );
  });

  it('deactivates when input is blurred', () => {
    createComponent({ active: true, value: 'something' });

    wrapper.find('input').trigger('blur');

    expect(wrapper.emitted().deactivate).toHaveLength(1);
    expect(wrapper.emitted('complete')).toBeUndefined();
  });

  it('resets value to previously selected if options are provided and input is invalid', async () => {
    const originalValue = '!=';
    createWrappedComponent({
      value: originalValue,
      title: 'Test',
      options: OPTIONS,
      active: true,
    });

    await wrapper.setData({ value: 'invalid' });
    await wrapper.setProps({ active: false });

    expect(wrapper.findComponent(GlFilteredSearchTokenSegment).emitted().input[0][0]).toBe(
      originalValue
    );
  });

  describe('applySuggestion', () => {
    it('emits original token when no spaces are present', () => {
      createComponent({ value: '' });

      const token = 'token';

      wrapper.vm.applySuggestion(token);

      expect(wrapper.emitted().input[0][0]).toBe(token);
      expect(wrapper.emitted().complete[0][0]).toBe(token);
    });

    it('emits wrapped token when spaces are present', () => {
      createComponent({ value: '' });

      const token = 'token with spaces';
      const formattedToken = `"${token}"`;

      wrapper.vm.applySuggestion(token);

      expect(wrapper.emitted().input[0][0]).toBe(formattedToken);
      expect(wrapper.emitted().select[0][0]).toBe(formattedToken);
      expect(wrapper.emitted().complete[0][0]).toBe(formattedToken);
    });

    it('selects suggestion on press Enter', () => {
      createComponent({ active: true, options: OPTIONS, value: false });
      wrapper.find('input').trigger('keydown', { key: 'ArrowDown' });

      wrapper.find('input').trigger('keydown', { key: 'Enter' });
      expect(wrapper.emitted('select')).toHaveLength(1);
    });

    it('selects suggestion on press Colon', () => {
      createComponent({ active: true, options: OPTIONS, value: false });
      wrapper.find('input').trigger('keydown', { key: 'ArrowDown' });

      wrapper.find('input').trigger('keydown', { key: ':' });
      expect(wrapper.emitted('select')).toHaveLength(1);
    });
  });

  describe('when multi select', () => {
    beforeEach(() => {
      createComponent({
        active: true,
        multiSelect: true,
        value: 'beta',
      });
    });

    describe('when blurring the input field', () => {
      it('completes selection', () => {
        wrapper.find('input').trigger('blur');

        expect(wrapper.emitted('complete')).toEqual([[]]);
        expect(wrapper.emitted('deactivate')).toBeUndefined();
      });
    });

    describe('when selecting suggestion from suggestions list', () => {
      const token = 'gamma';

      beforeEach(() => {
        wrapper.vm.applySuggestion(token);
      });

      it('emits "select" event', () => {
        expect(wrapper.emitted('select')).toEqual([[token]]);
      });

      it('does not emit "input" event, to prevent list from filtering', () => {
        expect(wrapper.emitted('input')).toBeUndefined();
      });

      it('does not emit "complete" event, to keep the list open', () => {
        expect(wrapper.emitted('complete')).toBeUndefined();
      });
    });
  });

  describe('when input is active', () => {
    it('adds `searchInputAttributes` prop to search token segment input', () => {
      createComponent({ active: true, value: 'something', searchInputAttributes });

      expect(wrapper.find('input').attributes('data-qa-selector')).toBe(
        searchInputAttributes['data-qa-selector']
      );
    });

    it('does not add `searchInputAttributes` prop to search token segment', () => {
      createComponent({
        active: true,
        value: 'something',
        searchInputAttributes,
        isLastToken: true,
      });

      expect(wrapper.attributes('data-qa-selector')).toBe(undefined);
    });
  });

  describe('when input is not active', () => {
    describe('when `isLastToken` prop is `true`', () => {
      it('adds `searchInputAttributes` prop to search token segment', () => {
        createComponent({
          active: false,
          value: 'something',
          searchInputAttributes,
          isLastToken: true,
        });

        expect(wrapper.attributes('data-qa-selector')).toBe(
          searchInputAttributes['data-qa-selector']
        );
      });
    });

    describe('when `isLastToken` prop is `false`', () => {
      it('does not add `searchInputAttributes` prop to search token segment', () => {
        createComponent({
          active: false,
          value: 'something',
          searchInputAttributes,
          isLastToken: false,
        });

        expect(wrapper.attributes('data-qa-selector')).toBe(undefined);
      });
    });
  });
});
