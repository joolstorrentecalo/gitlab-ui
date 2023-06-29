import times from 'lodash/times';
import { GlAreaChart } from '../../../charts';
import { mockAnnotationsSeries, mockAnnotationsConfigs } from '../../../utils/charts/mock_data';
import { toolbox } from '../../../utils/charts/story_config';
import { DATA_VIZ_AQUA_500, DATA_VIZ_ORANGE_600 } from '../../../../dist/tokens/js/tokens';
import { timeSeriesDateFormatter } from '../../../utils/charts/utils';
import { generateTimeSeries } from '../../../utils/data_utils';
import { disableControls } from '../../../utils/stories_utils';

const defaultData = [
  {
    name: 'First Series',
    data: [
      ['Mon', 1220],
      ['Tue', 932],
      ['Wed', 901],
      ['Thu', 934],
      ['Fri', 1290],
      ['Sat', 1330],
      ['Sun', 1320],
    ],
  },
];

const defaultOptions = {
  xAxis: {
    name: 'Time',
    type: 'category',
  },
};

const template = `<gl-area-chart
  :data="data"
  :option="option"
  :thresholds="thresholds"
  :annotations="annotations"
  :includeLegendAvgMax="includeLegendAvgMax"
  :height="height"
  :legendSeriesInfo="legendSeriesInfo"
/>`;

const generateProps = ({
  data = defaultData,
  option = defaultOptions,
  thresholds = [],
  annotations = [],
  includeLegendAvgMax = true,
  height = null,
  legendSeriesInfo = [],
} = {}) => ({
  data,
  option,
  thresholds,
  annotations,
  includeLegendAvgMax,
  height,
  legendSeriesInfo,
});

const Template = (args, { argTypes }) => ({
  components: {
    GlAreaChart,
  },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const WithThreshold = Template.bind({});
WithThreshold.args = generateProps({
  thresholds: [{ threshold: 1200, operator: '>' }],
});

export const WithAnnotationsAsProps = Template.bind({});
WithAnnotationsAsProps.storyName = 'With annotations as props (recommended)';
WithAnnotationsAsProps.args = generateProps({
  ...mockAnnotationsConfigs,
  data: [
    {
      name: 'Time Series',
      data: generateTimeSeries(),
    },
  ],
  option: {
    xAxis: {
      type: 'time',
      name: 'Time',
      axisLabel: {
        formatter: timeSeriesDateFormatter,
      },
    },
  },
});

export const WithAnnotationsAsOptionSeries = Template.bind({});
WithAnnotationsAsOptionSeries.args = generateProps({
  data: [
    {
      name: 'Time Series',
      data: generateTimeSeries(),
    },
  ],
  option: {
    ...mockAnnotationsSeries,
    xAxis: {
      type: 'time',
      name: 'Time',
      axisLabel: {
        formatter: timeSeriesDateFormatter,
      },
    },
  },
});

export const WithZoomAndScroll = Template.bind({});
WithZoomAndScroll.args = generateProps({
  data: [
    {
      name: 'Time Series',
      data: generateTimeSeries(),
    },
  ],
  option: {
    xAxis: {
      type: 'time',
      name: 'Time',
      axisLabel: {
        formatter: timeSeriesDateFormatter,
      },
    },
    dataZoom: [
      {
        startValue: '2018-03-01T00:00:00.000',
      },
    ],
  },
});

export const WithToolbox = Template.bind({});
WithToolbox.args = generateProps({
  option: {
    xAxis: {
      name: 'Time',
      type: 'category',
    },
    toolbox,
  },
});

export const MultSeries = Template.bind({});
MultSeries.args = generateProps({
  data: times(10, (index) => ({
    name: index,
    data: defaultData[0].data.map(([label, value]) => [label, value * index]),
  })),
});

export const WithCustomLegendItems = Template.bind({});
WithCustomLegendItems.args = generateProps({
  legendSeriesInfo: [
    {
      name: 'Custom Legend Item 1',
      type: 'solid',
      color: DATA_VIZ_ORANGE_600,
      data: [10, 20],
    },
    {
      name: 'Custom Legend Item 2',
      type: 'solid',
      color: DATA_VIZ_AQUA_500,
      data: [30, 50],
    },
  ],
});

export default {
  title: 'charts/area-chart',
  component: GlAreaChart,
  argTypes: {
    ...disableControls([
      'dataSeries',
      'formatTooltipText',
      'legendAverageText',
      'legendMaxText',
      'legendMinText',
      'legendCurrentText',
      'legendLayout',
    ]),
  },
};
