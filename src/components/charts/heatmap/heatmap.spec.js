import { shallowMount } from '@vue/test-utils';

import { TOOLTIP_LEFT_OFFSET } from '~/utils/charts/constants';
import { createMockChartInstance } from '~helpers/chart_stubs';
import Chart from '../chart/chart.vue';
import ChartTooltip from '../tooltip/tooltip.vue';
import HeatMapChart from './heatmap.vue';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

describe('heatmap component', () => {
  let wrapper;

  const findChart = () => wrapper.findComponent(Chart);
  const findChartTooltip = () => wrapper.findComponent(ChartTooltip);
  const getOptions = () => findChart().props('options');

  const emitChartCreated = () => findChart().vm.$emit('created', mockChartInstance);

  beforeEach(() => {
    mockChartInstance = createMockChartInstance();

    wrapper = shallowMount(HeatMapChart, {
      propsData: { options: { series: [] }, dataSeries: [] },
    });
    emitChartCreated();

    return wrapper.vm.$nextTick();
  });

  it('emits `created`, with the chart instance', () => {
    expect(wrapper.emitted('created').length).toBe(1);
    expect(wrapper.emitted('created')[0][0]).toBe(mockChartInstance);
  });

  describe('tooltip position', () => {
    it('is initialized', () => {
      expect(findChartTooltip().props('left')).toBe('0');
      expect(findChartTooltip().props('top')).toBe('0');
    });

    it('is reset when the xAxis formatter is triggered', () => {
      const seriesId = 'Series Name0';
      const value = ['2020-02-10T06:45:26.879Z', 0.002671530922619002];
      const pixel = [66, 99];

      const params = {
        seriesData: [{ seriesId, value }],
      };

      mockChartInstance.convertToPixel.mockReturnValueOnce(pixel);

      getOptions().xAxis.axisPointer.label.formatter(params);

      return wrapper.vm.$nextTick(() => {
        expect(mockChartInstance.convertToPixel).toHaveBeenCalledWith({ seriesId }, value);

        expect(findChartTooltip().props('left')).toBe(`${pixel[0] + TOOLTIP_LEFT_OFFSET}px`);
        expect(findChartTooltip().props('top')).toBe(`${pixel[1]}px`);
      });
    });
  });
});
