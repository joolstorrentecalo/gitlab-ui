import { shallowMount } from '@vue/test-utils';
import { variantCssColorMap } from '../../../utils/constants';
import GlAnimatedNumber from '../../utilities/animated_number/animated_number.vue';
import GlSingleStat from './single_stat.vue';

const title = 'Singe stat title';
const value = '100';
const unit = '%';
const titleIcon = 'hourglass';
const metaIcon = 'heart';
const metaText = 'Success';
const variant = 'info';

describe('GlSingleStat', () => {
  let wrapper;

  const createWrapper = (props = {}) => {
    wrapper = shallowMount(GlSingleStat, {
      propsData: {
        title,
        value,
        ...props,
      },
    });
  };

  const findIemByTestId = (testId) => wrapper.find(`[data-testid="${testId}"]`);

  describe('displays the correct default data', () => {
    beforeEach(() => createWrapper());

    describe.each`
      element                 | testId                  | shouldDisplay | expected
      ${'metric value'}       | ${'displayValue'}       | ${true}       | ${value}
      ${'non animated value'} | ${'non-animated-value'} | ${true}       | ${value}
      ${'metric title'}       | ${'title-text'}         | ${true}       | ${title}
      ${'metric value units'} | ${'unit'}               | ${false}      | ${null}
      ${'metric title icon'}  | ${'title-icon'}         | ${false}      | ${null}
      ${'meta icon'}          | ${'meta-icon'}          | ${false}      | ${null}
      ${'meta badge'}         | ${'meta-badge'}         | ${false}      | ${null}
    `('for the $element', ({ shouldDisplay, testId, expected, element }) => {
      it(`${shouldDisplay ? 'displays' : "doesn't display"} the ${element}`, () => {
        const el = findIemByTestId(testId);

        expect(el.exists()).toBe(shouldDisplay);

        if (shouldDisplay) expect(el.text()).toBe(expected);
      });
    });
  });

  describe('shouldAnimate', () => {
    it.each`
      propValue | shouldUseAnimatedComponent
      ${'abc'}  | ${false}
      ${'123'}  | ${true}
    `(
      'renders the correct display type for $propValue',
      ({ propValue, shouldUseAnimatedComponent }) => {
        createWrapper({ value: propValue, shouldAnimate: true });

        const el = wrapper.findComponent(GlAnimatedNumber);
        expect(el.exists()).toBe(shouldUseAnimatedComponent);
      }
    );

    describe('units visibility', () => {
      it.each`
        display    | event          | expected
        ${'hides'} | ${'animating'} | ${true}
        ${'shows'} | ${'animated'}  | ${false}
      `('$display the units when $event', async ({ event, expected }) => {
        createWrapper({ unit, shouldAnimate: true });

        wrapper.findComponent(GlAnimatedNumber).vm.$emit(event);

        await wrapper.vm.$nextTick();

        expect(findIemByTestId('unit').classes('gl-opacity-0!')).toBe(expected);
      });
    });
  });

  describe('optional data', () => {
    describe('meta information', () => {
      describe.each`
        scenario                                    | mockData
        ${'with only a meta icon specified'}        | ${{ metaIcon }}
        ${'with a meta icon and variant specified'} | ${{ metaIcon, variant }}
      `('$scenario', ({ mockData }) => {
        beforeEach(() => createWrapper(mockData));

        it('displays a standalone icon', () => {
          const el = findIemByTestId('meta-icon');
          const variantSpecified = Object.keys(mockData).includes('variant');

          expect(el.exists()).toBe(true);
          expect(el.props('name')).toBe(metaIcon);
          expect(el.classes()).toContain(
            variantSpecified ? variantCssColorMap[variant] : variantCssColorMap.muted
          );
        });

        it('does not display a badge', () => {
          expect(findIemByTestId('meta-badge').exists()).toBe(false);
        });
      });

      describe.each`
        scenario                                          | mockData
        ${'with only meta text specified'}                | ${{ metaText }}
        ${'with meta text and variant specified'}         | ${{ metaText, variant }}
        ${'with a meta icon and text specified'}          | ${{ metaIcon, metaText }}
        ${'with a meta icon, text and variant specified'} | ${{ metaIcon, metaText, variant }}
      `('$scenario', ({ mockData }) => {
        beforeEach(() => createWrapper(mockData));

        it("doesn't display a standalone icon", () => {
          expect(findIemByTestId('meta-icon').exists()).toBe(false);
        });

        it('displays a badge', () => {
          const badge = findIemByTestId('meta-badge');
          const iconSpecified = Object.keys(mockData).includes('metaIcon');
          const variantSpecified = Object.keys(mockData).includes('variant');

          expect(badge.exists()).toBe(true);
          expect(badge.text()).toBe(metaText);
          expect(badge.props('icon')).toBe(iconSpecified ? metaIcon : null);
          expect(badge.props('variant')).toBe(variantSpecified ? variant : 'muted');
        });
      });
    });

    describe.each`
      element                 | testId          | mockData
      ${'metric value units'} | ${'unit'}       | ${{ unit }}
      ${'metric title icon'}  | ${'title-icon'} | ${{ titleIcon }}
    `('$element', ({ testId, mockData }) => {
      beforeEach(() => createWrapper(mockData));

      it('displays when specified', () => {
        const el = findIemByTestId(testId);

        expect(el.exists()).toBe(true);
      });
    });
  });
});
