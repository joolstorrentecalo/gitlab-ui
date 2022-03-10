import { GlLineChart } from '../../../charts';
import { mockAnnotationsSeries, mockAnnotationsConfigs } from '../../../utils/charts/mock_data';
import { toolbox } from '../../../utils/charts/story_config';
import { timeSeriesDateFormatter } from '../../../utils/charts/utils';
import { generateTimeSeries } from '../../../utils/data_utils';
import { disableControls } from '../../../utils/stories_utils';
import readme from './line.md';

const components = {
  GlLineChart,
};
const defaultData = [
  {
    name: 'Requested',
    data: [
      ['Mon', 1184],
      ['Tue', 1346],
      ['Wed', 1035],
      ['Thu', 1226],
      ['Fri', 1421],
      ['Sat', 1347],
      ['Sun', 1035],
    ],
  },
  {
    name: 'Actual',
    data: [
      ['Mon', 1509],
      ['Tue', 1275],
      ['Wed', 1187],
      ['Thu', 1287],
      ['Fri', 1098],
      ['Sat', 1457],
      ['Sun', 1452],
    ],
  },
  {
    name: 'Predicted',
    data: [
      ['Mon', 1041],
      ['Tue', 1468],
      ['Wed', 1273],
      ['Thu', 1503],
      ['Fri', 1209],
      ['Sat', 1416],
      ['Sun', 1213],
    ],
  },
];

const defaultOptions = {
  animation: false,
  xAxis: {
    name: 'Time',
    type: 'category',
  },
};

const template = `<gl-line-chart
  :data="data"
  :option="option"
  :thresholds="thresholds"
  :annotations="annotations"
  :includeLegendAvgMax="includeLegendAvgMax"
/>`;

const generateProps = ({
  data = defaultData,
  option = defaultOptions,
  thresholds = [],
  annotations = [],
  includeLegendAvgMax = true,
} = {}) => ({
  includeLegendAvgMax,
  option,
  thresholds,
  annotations,
  data,
});

const Template = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const WithThreshold = Template.bind({});
WithThreshold.args = generateProps({
  thresholds: [{ threshold: 1350, operator: '>' }],
});

export const WithAnnotationsAsProps = Template.bind({});
WithAnnotationsAsProps.storyNane = 'with annotations as props (recommended)';
WithAnnotationsAsProps.args = generateProps({
  ...mockAnnotationsConfigs,
  data: [
    {
      name: 'Time Series',
      data: generateTimeSeries(),
    },
  ],
  option: {
    animation: false,
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
    animation: false,
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
    animation: false,
    xAxis: {
      type: 'time',
      name: 'Time',
      axisLabel: {
        formatter: timeSeriesDateFormatter,
      },
    },
    dataZoom: [
      {
        type: 'slider',
        startValue: '2018-03-01T00:00:00.000',
      },
    ],
  },
});

export const WithToolbox = Template.bind({});
WithToolbox.args = generateProps({
  option: {
    animation: false,
    xAxis: {
      name: 'Time',
      type: 'category',
    },
    toolbox,
  },
});

export default {
  title: 'charts/line-chart',
  component: GlLineChart,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    ...disableControls([
      'showToolbox',
      'toolboxZoomIconPath',
      'toolboxBackIconPath',
      'toolboxRestoreIconPath',
      'toolboxSaveAsImageIconPath',
      'formatTooltipText',
      'legendAverageText',
      'legendMaxText',
      'legendMinText',
      'legendCurrentText',
      'legendLayout',
    ]),
  },
};
