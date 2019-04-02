import { withKnobs, object, boolean } from '@storybook/addon-knobs';
import documentedStoriesOf from '../utils/documented_stories';
import { GlLineChart } from '../../charts';
import readme from '../../components/charts/line/line.md';
import { gray200 } from '../../scss_to_js/scss_variables'; // eslint-disable-line import/no-unresolved
import { generateTimeSeries } from '../utils/data_utils';

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
  xAxis: {
    name: 'Time',
    type: 'category',
  },
};
const template = `<gl-line-chart
  :data="data"
  :option="option"
  :thresholds="thresholds"
/>`;

function generateData({
  data = defaultData,
  option = defaultOptions,
  thresholds = [],
  includeLegendAvgMax = true,
} = {}) {
  return {
    option: object('EChart Options', option),
    thresholds: object('Thresholds', thresholds),
    data: object('Chart Data', data),
    includeLegendAvgMax: boolean('Include Legend Avg Max', includeLegendAvgMax),
  };
}

documentedStoriesOf('charts|line-chart', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    data() {
      return generateData();
    },
    components,
    template,
  }))
  .add('with threshold', () => ({
    data() {
      return generateData({
        thresholds: [{ threshold: 1350, operator: '>' }],
      });
    },
    components,
    template,
  }))
  .add('with zoom and scroll', () => ({
    data() {
      return generateData({
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
              formatter: d => {
                const date = new Date(d);
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date
                  .getDate()
                  .toString()
                  .padStart(2, '0');

                return `${date.getFullYear()}-${month}-${day}`;
              },
            },
          },
          dataZoom: {
            startValue: '2018-03-01T00:00:00.000',
            handleIcon: `path://m7 14c-3.86599325 0-7-3.1340068-7-7 0-3.86599325 3.13400675-7 7-7 3.8659932 0 7 3.13400675 7 7 0 3.8659932-3.1340068 7-7 7zm-2-11c-.55228475 0-1 .44771525-1 1v6c0 .5522847.44771525 1 1 1s1-.4477153 1-1v-6c0-.55228475-.44771525-1-1-1zm4 0c-.55228475 0-1 .44771525-1 1v6c0 .5522847.44771525 1 1 1s1-.4477153 1-1v-6c0-.55228475-.44771525-1-1-1z`,
            dataBackground: {
              lineStyle: {
                width: 2,
                color: gray200,
              },
              areaStyle: null,
            },
          },
        },
      });
    },
    components,
    template,
  }));
