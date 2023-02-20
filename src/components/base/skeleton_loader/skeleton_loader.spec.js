import { shallowMount } from '@vue/test-utils';
import GlSkeletonLoader from './skeleton_loader.vue';

describe('GlSkeletonLoader', () => {
  let wrapper;

  const findDefaultLines = () => wrapper.element.querySelectorAll('defs rect');
  const findSvg = () => wrapper.find('svg');

  const createComponent = (options = {}) => {
    wrapper = shallowMount(GlSkeletonLoader, options);
  };

  describe('when default skeleton is used', () => {
    it('adds `gl-w-full` and `gl-h-full` CSS classes', () => {
      createComponent();

      const svgClasses = findSvg().classes();

      expect(svgClasses).toContain('gl-w-full');
      expect(svgClasses).toContain('gl-h-full');
    });

    it('renders 3 lines by default', () => {
      createComponent();

      expect(findDefaultLines()).toHaveLength(3);
    });

    it('renders the number of lines passed', () => {
      createComponent({
        propsData: {
          lines: 5,
        },
      });

      expect(findDefaultLines()).toHaveLength(5);
    });

    it('spaces the lines out evenly', () => {
      createComponent();

      const lines = findDefaultLines();

      expect(lines[0].getAttribute('y')).toBe('0');
      expect(lines[1].getAttribute('y')).toBe('14');
      expect(lines[2].getAttribute('y')).toBe('28');
    });

    it('sets svg viewBox to the combined size of the lines', () => {
      createComponent({
        propsData: {
          lines: 5,
        },
      });

      expect(findSvg().attributes('viewBox')).toBe('0 0 235 66');
    });

    describe('when equal-width-lines is `true`', () => {
      it('renders all the lines with 100% width', () => {
        createComponent({
          propsData: {
            equalWidthLines: true,
          },
        });

        findDefaultLines().forEach((defaultLine) => {
          expect(defaultLine.getAttribute('width')).toBe('100%');
        });
      });
    });

    describe('when `width` and `height` props are set', () => {
      it('overrides the calculated container size and svg viewBox', () => {
        createComponent({
          propsData: {
            width: 500,
            height: 400,
          },
        });

        expect(wrapper.element.style.width).toBe('500px');
        expect(wrapper.element.style.height).toBe('400px');
        expect(findSvg().attributes('viewBox')).toBe('0 0 500 400');
      });
    });
  });

  describe('when skeleton is passed via the slot', () => {
    it('does not render a container around the svg', () => {
      createComponent({
        slots: {
          default: '<rect width="86" height="24" rx="4" />',
        },
      });

      expect(wrapper.element.tagName).toBe('svg');
    });

    describe('when `width` and `height` props are set', () => {
      it('sets the viewBox to those values', () => {
        createComponent({
          slots: {
            default: '<rect width="86" height="24" rx="4" />',
          },
          propsData: {
            width: 500,
            height: 300,
          },
        });

        expect(wrapper.attributes('viewBox')).toBe('0 0 500 300');
      });
    });

    describe('when `width` and `height` props are not set', () => {
      it('sets the viewBox to the default values', () => {
        createComponent({
          slots: {
            default: '<rect width="86" height="24" rx="4" />',
          },
        });

        expect(wrapper.attributes('viewBox')).toBe('0 0 400 130');
      });
    });
  });
});
