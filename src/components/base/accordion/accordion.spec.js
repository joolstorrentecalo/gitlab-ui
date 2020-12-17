import { shallowMount } from '@vue/test-utils';
import GlAccordion from './accordion.vue';

describe('GlAccordion', () => {
  let wrapper;

  afterEach(() => {
    wrapper.destroy();
  });

  const createComponent = (slots = {}) => {
    wrapper = shallowMount(GlAccordion, {
      slots,
    });
  };

  it('has role attribute', () => {
    createComponent();
    expect(wrapper.attributes('role')).toBe('tablist');
  });

  it('renders the slot content', () => {
    const slotText = 'hello';

    createComponent({
      default: slotText,
    });

    expect(wrapper.text()).toBe(slotText);
  });
});
