import { shallowMount } from '@vue/test-utils';
import { buttonCategoryOptions } from '../../../utils/constants';
import GlAlert from './alert.vue';

const DummyComponent = {
  template: '<p>dummy</p>',
};

const primaryButtonText = 'foo';
const primaryButtonLink = '#foo';
const secondaryButtonText = 'bar';
const secondaryButtonLink = '#bar';

describe('Alert component', () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(GlAlert, {
      ...options,
    });
  };

  const findDismissButton = () => wrapper.findComponent({ ref: 'dismiss' });
  const findTitle = () => wrapper.find('.gl-alert-title');
  const findBodyContainer = () => wrapper.find('.gl-alert-body');
  const findActionsContainer = () => wrapper.find('.gl-alert-actions');
  const findActionButtons = () => wrapper.findAll('.gl-alert-action');

  describe('by default', () => {
    beforeEach(() => {
      createComponent({ slots: { default: DummyComponent } });
    });

    it('renders a dismiss button', () => {
      expect(findDismissButton().exists()).toBe(true);
    });

    it('clicking on dismiss button emits a dismiss event', () => {
      findDismissButton().vm.$emit('click');

      expect(wrapper.emitted('dismiss')).toHaveLength(1);
    });

    it('does not render a title', () => {
      expect(findTitle().exists()).toBe(false);
    });

    it('does not render any actions', () => {
      expect(findActionsContainer().exists()).toBe(false);
    });

    it('renders default slot content', () => {
      expect(findBodyContainer().findComponent(DummyComponent).exists()).toBe(true);
    });
  });

  it('does not render a dismiss button when dismissible = false', () => {
    createComponent({ propsData: { dismissible: false } });

    expect(findDismissButton().exists()).toBe(false);
  });

  it('renders the provided title', () => {
    const title = 'foo';
    createComponent({ propsData: { title } });

    const titleWrapper = findTitle();
    expect(titleWrapper.exists()).toBe(true);
    expect(titleWrapper.text()).toContain(title);
  });

  describe('given primaryButtonText', () => {
    beforeEach(() => {
      createComponent({ propsData: { primaryButtonText } });
    });

    it('renders a primary button', () => {
      expect(findActionsContainer().exists()).toBe(true);

      const buttons = findActionButtons();
      expect(buttons).toHaveLength(1);

      const button = buttons.at(0);
      expect(button.text()).toContain(primaryButtonText);

      const props = button.props();
      expect('href' in props).toBe(false);
      expect(props.category).toEqual(buttonCategoryOptions.primary);
    });

    it('emits a primaryAction event when primary button is clicked', () => {
      findActionButtons().at(0).vm.$emit('click');

      expect(wrapper.emitted('primaryAction')).toHaveLength(1);
    });
  });

  describe('given primaryButtonText and primaryButtonLink', () => {
    beforeEach(() => {
      createComponent({ propsData: { primaryButtonText, primaryButtonLink } });
    });

    it('renders a primary button with an href given primaryButtonLink', () => {
      const button = findActionButtons().at(0);
      expect(button.attributes('href')).toEqual(primaryButtonLink);
    });
  });

  describe('given secondaryButtonText', () => {
    beforeEach(() => {
      createComponent({ propsData: { secondaryButtonText } });
    });

    it('renders a secondary button', () => {
      expect(findActionsContainer().exists()).toBe(true);

      const buttons = findActionButtons();
      expect(buttons).toHaveLength(1);

      const button = buttons.at(0);
      expect(button.text()).toContain(secondaryButtonText);

      const attrs = button.attributes();
      expect('href' in attrs).toBe(false);
      expect(attrs.category).toEqual(buttonCategoryOptions.secondary);
    });

    it('emits a secondaryAction event when secondary button is clicked', () => {
      findActionButtons().at(0).vm.$emit('click');

      expect(wrapper.emitted('secondaryAction')).toHaveLength(1);
    });
  });

  describe('given secondaryButtonText and secondaryButtonLink', () => {
    beforeEach(() => {
      createComponent({ propsData: { secondaryButtonText, secondaryButtonLink } });
    });

    it('renders a secondary button with an href given secondaryButtonLink', () => {
      const button = findActionButtons().at(0);
      expect(button.attributes('href')).toEqual(secondaryButtonLink);
    });
  });

  it('renders actions slot content', () => {
    createComponent({ slots: { actions: DummyComponent } });

    const actionsContainer = findActionsContainer();
    expect(actionsContainer.exists()).toBe(true);
    expect(actionsContainer.findComponent(DummyComponent).exists()).toBe(true);
  });

  describe('top-level classes', () => {
    describe.each`
      prop             | cssClass                      | presentIf
      ${'sticky'}      | ${'gl-alert-sticky'}          | ${true}
      ${'dismissible'} | ${'gl-alert-not-dismissible'} | ${false}
    `('$cssClass', ({ prop, cssClass, presentIf }) => {
      it(`adds class ${cssClass} when ${prop} is ${presentIf}`, () => {
        createComponent({
          propsData: {
            [prop]: presentIf,
          },
        });

        expect(wrapper.classes()).toContain(cssClass);
      });

      it(`does not add class ${cssClass} when ${prop} is ${!presentIf}`, () => {
        createComponent({
          propsData: {
            [prop]: !presentIf,
          },
        });

        expect(wrapper.classes()).not.toContain(cssClass);
      });
    });
  });
});
