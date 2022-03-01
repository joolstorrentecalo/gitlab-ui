import { shallowMount } from '@vue/test-utils';
import { waitForAnimationFrame } from '~/utils/test_utils';
import { createMockChartInstance, ChartTooltipStub } from '~helpers/chart_stubs';
import Chart from '../chart/chart.vue';
import SparklineChart from './sparkline.vue';

let mockChartInstance;

jest.mock('echarts', () => ({
  getInstanceByDom: () => mockChartInstance,
}));

let triggerResize = () => {};
jest.mock('~/directives/resize_observer/resize_observer', () => ({
  GlResizeObserverDirective: {
    bind(el, { value: resizeHandler }) {
      triggerResize = () => resizeHandler();
    },
  },
}));

describe('sparkline chart component', () => {
  let wrapper;
  let componentOptions;
  const factory = () => {
    componentOptions = {
      propsData: {
        data: [[]],
        variant: null,
      },
      scopedSlots: { latestSeriesEntry: jest.fn() },
      stubs: {
        'chart-tooltip': ChartTooltipStub,
      },
    };

    wrapper = shallowMount(SparklineChart, componentOptions);
  };

  // helpers
  const getByTestId = (id) => wrapper.find(`[data-testid="${id}"]`);
  const getChart = () => wrapper.findComponent(Chart);

  const getTooltip = () => wrapper.findComponent(ChartTooltipStub);
  const getTooltipTitle = () => getByTestId('tooltip-title');
  const getTooltipContent = () => getByTestId('tooltip-content');

  const getLastYValue = () => getByTestId('last-y-value');

  const getChartOptions = () => getChart().props('options');
  const getXAxisLabelFormatter = () => {
    const {
      xAxis: {
        axisPointer: {
          label: { formatter },
        },
      },
    } = getChartOptions();

    return formatter;
  };

  const emitChartCreated = () => getChart().vm.$emit('created', mockChartInstance);

  beforeEach(() => {
    mockChartInstance = createMockChartInstance();
    factory();
    // needs to run after every mount, or the chart-instance is `null` and `beforeDestroy` throws
    emitChartCreated();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('emits `chartCreated`, which passes on the chart instance', () => {
    expect(wrapper.emitted('chartCreated')).toHaveLength(1);
    expect(wrapper.emitted('chartCreated')[0][0]).toBe(mockChartInstance);
  });

  it('renders a chart', () => {
    expect(wrapper.findComponent(Chart).exists()).toBe(true);
  });

  it('has a default height of 50', () => {
    expect(getChart().props('height')).toBe(50);
  });

  it('accepts a custom height', async () => {
    const newHeight = 1000;
    wrapper.setProps({ height: newHeight });

    expect(getChart().props('height')).not.toBe(newHeight);

    await wrapper.vm.$nextTick();

    expect(getChart().props('height')).toBe(newHeight);
  });

  it('triggers the chart to resize when the containing elements size changes', () => {
    expect(mockChartInstance.resize).toHaveBeenCalledTimes(0);

    triggerResize();

    expect(mockChartInstance.resize).toHaveBeenCalledTimes(1);
  });

  it('includes a chart tooltip', () => {
    expect(getTooltip().exists()).toBe(true);
  });

  it('displays the given tooltip label', async () => {
    const tooltipLabel = 'foo';

    wrapper.setProps({ tooltipLabel: 'foo' });

    await wrapper.vm.$nextTick();
    expect(getTooltipContent().text()).toContain(tooltipLabel);
  });

  it('shows the tooltip when mousing over an axis point in the component', async () => {
    expect(getTooltip().attributes('show')).toBeFalsy();

    const mockData = { seriesData: [{ data: [5, 8] }] };
    getXAxisLabelFormatter()(mockData);

    await wrapper.vm.$nextTick();
    expect(getTooltip().attributes('show')).toBe('true');
  });

  it('hides the tooltip when the mouse leaves the component', async () => {
    wrapper.setData({ tooltip: { show: true } });
    await wrapper.vm.$nextTick();

    expect(getTooltip().attributes('show')).toBe('true');

    wrapper.trigger('mouseleave');
    await wrapper.vm.$nextTick();

    expect(getTooltip().attributes('show')).toBeFalsy();
  });

  it('adds the right content to the tooltip', async () => {
    const xValue = 'foo';
    const yValue = 'bar';
    const mockData = { seriesData: [{ data: [xValue, yValue] }] };

    getXAxisLabelFormatter()(mockData);

    expect(getTooltipTitle().text()).toBe('');
    expect(getTooltipContent().text()).toBe('');

    await waitForAnimationFrame();
    expect(getTooltipTitle().text()).toBe(xValue);
    expect(getTooltipContent().text()).toBe(yValue);
  });

  it(`shows the last entry's y-value per default`, async () => {
    const data = [
      ['foo', 'bar'],
      ['baz', 'qux'],
    ];
    const latestEntryYValue = data[1][1];

    wrapper.setProps({ data });

    await wrapper.vm.$nextTick();
    expect(getLastYValue().text()).toBe(latestEntryYValue);
  });

  it(`does not show the last entry's y-value if 'showLastYValue' is false`, async () => {
    expect(getLastYValue().exists()).toBe(true);

    wrapper.setProps({ showLastYValue: false });

    await wrapper.vm.$nextTick();
    expect(getLastYValue().exists()).toBe(false);
  });
});
