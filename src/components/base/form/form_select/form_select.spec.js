import { mount } from '@vue/test-utils';
import { formStateOptions, formInputSizes } from '../../../../utils/constants';
import { formSelectOptions } from './constants';
import GlFormSelect from './form_select.vue';

const DEFAULT_SELECT_CLASSES = ['gl-form-select', 'custom-select'];
const excludeDefaultNull = (values) => Object.values(values).filter((value) => value !== null);

describe('GlFormSelect', () => {
  let wrapper;

  const createComponent = (propsData = {}, mountFn = mount) => {
    wrapper = mountFn(GlFormSelect, {
      propsData,
    });
  };

  describe('state prop', () => {
    it.each`
      state                       | expectedClasses
      ${formStateOptions.valid}   | ${['is-valid']}
      ${formStateOptions.invalid} | ${['is-invalid']}
      ${formStateOptions.default} | ${[]}
      ${undefined}                | ${[]}
    `('adds $expectedClass class for state $state', ({ state, expectedClasses }) => {
      createComponent({ state });

      expect(wrapper.classes().sort()).toEqual(
        [...DEFAULT_SELECT_CLASSES, ...expectedClasses].sort()
      );
    });
  });

  describe('size prop', () => {
    // Exclude the default null value
    const nonNullSizes = excludeDefaultNull(formInputSizes);

    it.each(nonNullSizes)('adds correct class for size %s', (size) => {
      createComponent({ size });

      expect(wrapper.classes().sort()).toEqual(
        [...DEFAULT_SELECT_CLASSES, `gl-form-select-${size}`].sort()
      );
    });

    it('does not add a size class if not given the size prop', () => {
      createComponent();

      expect(wrapper.classes().sort()).toEqual([...DEFAULT_SELECT_CLASSES].sort());
    });

    it('does not add a size class if passed null', () => {
      createComponent({ size: null });

      expect(wrapper.classes().sort()).toEqual([...DEFAULT_SELECT_CLASSES].sort());
    });
  });

  describe('v-model', () => {
    it('should select an option element and update the v-model bound data', async () => {
      createComponent({ options: formSelectOptions });
      const options = wrapper.findAll('option');

      await options.at(1).setSelected();

      expect(wrapper.find('option:checked').element.value).toBe(formSelectOptions[1].value);
    });
  });
});
