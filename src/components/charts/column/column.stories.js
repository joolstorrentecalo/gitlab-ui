import { GlColumnChart } from '../../../charts';
import {
  mockDefaultLineData,
  mockDefaultBarData,
  mockSecondaryBarData,
  mockSecondaryTrendlineData,
} from '../../../utils/charts/mock_data';
import { toolbox } from '../../../utils/charts/story_config';

const template = `
  <gl-column-chart
    :bars="bars"
    :lines="lines"
    :secondary-data="secondaryData"
    :option="option"
    :y-axis-title="yAxisTitle"
    :secondary-data-title="secondaryDataTitle"
    :x-axis-title="xAxisTitle"
    :x-axis-type="xAxisType"
  />
  `;

const generateProps = ({
  bars = mockDefaultBarData,
  lines = [],
  option = {},
  yAxisTitle = 'Pushes per day',
  xAxisTitle = 'User',
  xAxisType = 'category',
  secondaryData = [],
  secondaryDataTitle = '',
} = {}) => ({
  bars,
  lines,
  option,
  yAxisTitle,
  xAxisTitle,
  xAxisType,
  secondaryData,
  secondaryDataTitle,
});

const Template = (args, { argTypes }) => ({
  components: { GlColumnChart },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const WithLineSeries = Template.bind({});
WithLineSeries.args = generateProps({
  lines: mockDefaultLineData,
});

export const WithZoomAndScroll = Template.bind({});
WithZoomAndScroll.args = generateProps({
  option: {
    dataZoom: [
      {
        type: 'slider',
        startValue: 1,
      },
    ],
  },
});

export const WithToolbox = Template.bind({});
WithToolbox.args = generateProps({
  option: {
    toolbox,
  },
});

export const SecondaryYAxis = Template.bind({});
SecondaryYAxis.args = generateProps({
  legend: true,
  secondaryData: mockSecondaryBarData,
  secondaryDataTitle: 'New bar data',
});

export const SecondaryYAxisLine = Template.bind({});
SecondaryYAxisLine.args = generateProps({
  legend: true,
  secondaryData: mockSecondaryTrendlineData,
  secondaryDataTitle: 'New line data',
});

export default {
  title: 'charts/column-chart',
  component: GlColumnChart,
};
