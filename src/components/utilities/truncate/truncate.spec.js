import { shallowMount } from '@vue/test-utils';
import { POSITION } from './constants';
import Truncate from './truncate.vue';

const removeSpecialChar = (text) => {
  return text.replace(/&lrm;|\u200E/gi, '');
};

const positionOptions = Object.values(POSITION);

describe('Truncate component', () => {
  let wrapper;

  const defaultProps = {
    text: 'ee/app/assets/javascripts/vue_shared/src/utils_reports/components/utils/index.js',
  };

  const createComponent = (props) => {
    wrapper = shallowMount(Truncate, {
      propsData: { ...defaultProps, ...props },
    });
  };

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  describe('All', () => {
    beforeEach(() => {
      createComponent();
    });

    it.each(positionOptions)(
      '%s truncation: should have title, class, original text',
      (position) => {
        createComponent({ position });

        expect(wrapper.attributes('title')).toBe(defaultProps.text);
        expect(wrapper.attributes('class')).toBe('gl-truncate');
        expect(removeSpecialChar(wrapper.text())).toBe(defaultProps.text);
      }
    );

    it('should have the default position', () => {
      expect(wrapper.props('position')).toBe('end');
    });
  });

  describe('start truncation', () => {
    beforeEach(() => {
      createComponent({ position: 'start' });
    });

    it('should have the truncate-start class', () => {
      expect(wrapper.find('.gl-truncate-start').exists()).toBe(true);
    });

    it('should have the special char surrounded', () => {
      const spanTag = wrapper.findAll('.gl-truncate span').at(0).text();

      expect(spanTag.charAt(0)).toBe('\u200E');
      expect(spanTag.charAt(spanTag.length - 1)).toBe('\u200E');
    });
  });

  describe('middle truncation', () => {
    let firstSpan;
    let secondSpan;

    beforeEach(() => {
      createComponent({ position: 'middle' });
      firstSpan = wrapper.findAll('.gl-truncate span').at(0);
      secondSpan = wrapper.findAll('.gl-truncate span').at(1);
    });

    it('should have appropriate classes applied', () => {
      expect(firstSpan.classes('gl-truncate-end')).toBe(true);
      expect(secondSpan.classes('gl-truncate-start')).toBe(true);
    });

    it('should have the spans positioned correctly', () => {
      expect(firstSpan.text()).toBe('ee/app/assets/javascripts/vue_shared/src');
      expect(secondSpan.text()).toBe('‎/utils_reports/components/utils/index.js‎');
    });

    it('last part should have the special char surrounded', () => {
      const lastPart = secondSpan.text();

      expect(lastPart.charAt(0)).toBe('\u200E');
      expect(lastPart.charAt(lastPart.length - 1)).toBe('\u200E');
    });
  });

  describe('end truncation', () => {
    beforeEach(() => {
      createComponent();
    });

    it('should not have the special char', () => {
      expect(wrapper.text()).not.toContain('\u200E');
    });

    it('should have the truncate-end class', () => {
      expect(wrapper.find('.gl-truncate-end').exists()).toBe(true);
    });
  });
});
