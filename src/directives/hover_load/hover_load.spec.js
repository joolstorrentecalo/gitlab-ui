import { shallowMount } from '@vue/test-utils';
import { HoverLoadDirective as hoverLoad } from './hover_load';

describe('hover load directive', () => {
  let wrapper;
  const findTarget = () => wrapper.find('.target');

  const createComponent = (handleLoad) => {
    const component = {
      directives: {
        hoverLoad,
      },
      data() {
        return {
          handleLoad,
        };
      },
      template: `<div v-hover-load="handleLoad" class="target"></div>`,
    };

    wrapper = shallowMount(component);
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each`
    hoverDuration | action
    ${150}        | ${'triggers'}
    ${99}         | ${'does not trigger'}
  `(
    'if hover durations is $hoverDuration, directive $action the handler',
    async ({ hoverDuration }) => {
      const mockHandleLoad = jest.fn();
      createComponent(mockHandleLoad);

      findTarget().trigger('mouseover');
      await new Promise((resolve) => setTimeout(resolve, hoverDuration));
      findTarget().trigger('mouseout');

      if (hoverDuration < 100) {
        expect(mockHandleLoad).not.toHaveBeenCalled();
      } else {
        expect(mockHandleLoad).toHaveBeenCalledTimes(1);
      }
    }
  );

  it('cleans up the mouseover event when component is destroyed', () => {
    createComponent(jest.fn());

    const target = findTarget().vm.$el;
    jest.spyOn(target, 'removeEventListener');
    wrapper.destroy();

    expect(target.removeEventListener).toHaveBeenCalledWith(
      'mouseover',
      expect.any(Function),
      true
    );
  });
});
