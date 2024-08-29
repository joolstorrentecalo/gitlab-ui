import { shallowMount } from '@vue/test-utils';
import GlPopover from '../../../../../../base/popover/popover.vue';
import {
  MOCK_CONTEXT_ITEM_FILE,
  MOCK_CONTEXT_ITEM_FILE_DISABLED,
  MOCK_CONTEXT_ITEM_ISSUE,
  MOCK_CONTEXT_ITEM_ISSUE_DISABLED,
  MOCK_CONTEXT_ITEM_MERGE_REQUEST,
} from '../mock_context_data';
import GlDuoChatContextItemPopover from './duo_chat_context_item_popover.vue';

describe('GlDuoChatContextItemPopover', () => {
  let wrapper;

  const createComponent = (props = {}, options = {}) => {
    wrapper = shallowMount(GlDuoChatContextItemPopover, {
      propsData: {
        item: MOCK_CONTEXT_ITEM_FILE,
        target: 'test-target',
        placement: 'top',
        ...props,
      },
      ...options,
    });
  };

  const findByTestId = (testId) => wrapper.find(`[data-testid="${testId}"]`);
  const findPopover = () => wrapper.findComponent(GlPopover);
  const findPopoverTitle = () => findByTestId('chat-context-popover-title');
  const findDisabledMessage = () => findByTestId('chat-context-popover-disabled');

  it('renders the popover component', () => {
    createComponent();

    expect(findPopover().exists()).toBe(true);
  });

  it('passes the correct props to the popover', () => {
    createComponent();

    const popover = findPopover();

    expect(popover.attributes('target')).toBe('test-target');
    expect(popover.props('triggers')).toBe('hover focus');
    expect(popover.props('placement')).toBe('top');
    expect(popover.props('title')).toBe(MOCK_CONTEXT_ITEM_FILE.metadata.name);
  });

  it('renders the item name in the title slot', () => {
    createComponent(
      {},
      {
        stubs: {
          GlPopover: {
            name: 'GlPopover',
            template: '<div><slot name="title"></slot></div>',
          },
        },
      }
    );

    expect(findPopoverTitle().text()).toBe(MOCK_CONTEXT_ITEM_FILE.metadata.name);
  });

  describe('item info rendering', () => {
    it.each([
      ['file', MOCK_CONTEXT_ITEM_FILE, MOCK_CONTEXT_ITEM_FILE.metadata.info.relFilePath],
      ['issue', MOCK_CONTEXT_ITEM_ISSUE, MOCK_CONTEXT_ITEM_ISSUE.metadata.info.iid.toString()],
      [
        'merge request',
        MOCK_CONTEXT_ITEM_MERGE_REQUEST,
        MOCK_CONTEXT_ITEM_MERGE_REQUEST.metadata.info.iid.toString(),
      ],
    ])('renders correct project and type for %s', (_, item, expected) => {
      createComponent({ item });

      const content = findPopover().text();
      expect(content).toContain(item.metadata.info.project);
      expect(content).toContain(expected);
    });

    it('renders file path for file items', () => {
      createComponent({ item: MOCK_CONTEXT_ITEM_FILE });

      const content = findPopover().text();
      expect(content).toContain(MOCK_CONTEXT_ITEM_FILE.metadata.info.relFilePath);
    });

    it.each([
      ['issue', MOCK_CONTEXT_ITEM_ISSUE, '#1234'],
      ['merge request', MOCK_CONTEXT_ITEM_MERGE_REQUEST, '!1122'],
    ])('renders ID for %s items with correct prefix', (_, item, expected) => {
      createComponent({ item });

      const content = findPopover().text();
      expect(content).toContain(expected);
    });
  });

  describe('disabled items', () => {
    it('renders disabled message', () => {
      createComponent({ item: MOCK_CONTEXT_ITEM_ISSUE_DISABLED });

      expect(findDisabledMessage().text()).toContain(
        'This foo is not available to bar, Lorem something something wow?'
      );
    });

    it('renders default disabled message when no specific reasons are provided', () => {
      const itemWithoutReasons = {
        ...MOCK_CONTEXT_ITEM_FILE_DISABLED,
        info: { ...MOCK_CONTEXT_ITEM_FILE_DISABLED.metadata.info, disabledReasons: undefined },
      };
      createComponent({ item: itemWithoutReasons });

      expect(findDisabledMessage().text()).toContain('This item is disabled');
    });
  });
});
