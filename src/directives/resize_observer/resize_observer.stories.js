import { GlResizeObserverDirective as GlResizeObserver } from '../../index';
import readme from './resize_observer.md';

const generateProps = ({ elementWidth = '100%', elementHeight = '100%' } = {}) => ({
  elementWidth,
  elementHeight,
});

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  directives: {
    GlResizeObserver,
  },
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  computed: {
    wrapperStyles() {
      return {
        height: '400px',
      };
    },
    elementStyles() {
      return {
        height: this.elementHeight,
        width: this.elementWidth,
      };
    },
  },
  methods: {
    handleResize({ contentRect: { width, height } }) {
      this.width = Math.round(width);
      this.height = Math.round(height);
    },
  },
  template: `
    <div
      :style="wrapperStyles"
      class="d-flex justify-content-center align-items-center">
      <div
        v-gl-resize-observer="handleResize"
        :style="elementStyles"
        class="d-flex position-relative justify-content-center align-items-center bg-light text-dark">
          <span class="d-inline-block p-2">
            I am {{ width }}px wide and {{ height }}px high.
          </span>
      </div>
    </div>
  `,
});
Default.args = generateProps();

const makeControl = () => ({
  options: ['100%', '75%', '50%'],
  control: {
    type: 'select',
  },
});

export default {
  title: 'directives/resize-observer-directive',
  component: GlResizeObserver,
  parameters: {
    knobs: { disable: true },
    storyshots: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    elementWidth: makeControl(),
    elementHeight: makeControl(),
  },
};
