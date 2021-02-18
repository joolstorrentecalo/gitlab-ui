import { GlChart } from '../../../../charts';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlTabs, GlTab } from '../../../../index';
import readme from './chart.md';

const createStory = (template) => ({
  components: {
    GlChart,
    GlTabs,
    GlTab,
  },
  data() {
    return {
      options: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'bar',
          },
        ],
      },
    };
  },
  template,
});

documentedStoriesOf('charts/chart', readme)
  .add('default', () =>
    createStory(`<gl-chart
      :options="options"
    />`)
  )
  .add('tab', () =>
    createStory(`
      <gl-tabs>
        <gl-tab title="Chart">
          <gl-chart :options="options" />
        </gl-tab>
      </gl-tabs>
    `)
  );
