<script>
import { nextTick } from 'vue';
import { contextItemValidator } from '../utils';
import GlModal from '../../../../../../base/modal/modal.vue';
import { SafeHtmlDirective as SafeHtml } from '../../../../../../../directives/safe_html/safe_html';
import GlSkeletonLoader from '../../../../../../base/skeleton_loader/skeleton_loader.vue';
import { CONTEXT_ITEM_CATEGORY_GIT } from '../constants';
import { translate } from '../../../../../../../utils/i18n';

export default {
  name: 'GlDuoChatContextItemDetails',
  components: {
    GlSkeletonLoader,
    GlModal,
  },
  directives: {
    SafeHtml,
  },
  inject: {
    renderGFM: {
      from: 'renderGFM',
      default: () => (element) => {
        element.classList.add('gl-markdown', 'gl-compact-markdown');
      },
    },
  },
  props: {
    /**
     * Context items to preview. If it has no `content`, the loading state will be displayed.
     */
    contextItem: {
      type: Object,
      required: true,
      validator: contextItemValidator,
    },
  },
  computed: {
    isLoadingContent() {
      return this.contextItem.content === undefined;
    },
    languageIdentifierClass() {
      if (this.contextItem.category === CONTEXT_ITEM_CATEGORY_GIT) {
        return 'language-diff';
      }

      const fileExtension = this.contextItem.metadata?.relativePath?.split('.').at(-1);
      if (fileExtension && fileExtension !== this.contextItem.metadata?.relativePath) {
        return `language-${fileExtension}`;
      }

      return 'language-plaintext';
    },
    title() {
      return (
        this.contextItem.metadata?.title ||
        this.contextItem.metadata?.relativePath ||
        translate('GlDuoChatContextItemDetails.title', 'Preview')
      );
    },
  },
  watch: {
    contextItem: {
      async handler(newVal, oldVal) {
        const shouldFormat = newVal?.content !== oldVal?.content && newVal?.content;
        if (shouldFormat) {
          await nextTick();
          await this.hydrateContentWithGFM();
        }
      },
      immediate: true,
    },
  },
  methods: {
    async hydrateContentWithGFM() {
      await nextTick();

      if (this.$refs.content) {
        this.renderGFM(this.$refs.content);
      }
    },
  },
  ACTION_PRIMARY: { text: translate('GlDuoChatContextItemDetails.close', 'Close') },
};
</script>

<template>
  <gl-modal
    modal-id="context-item-details-modal"
    :title="title"
    :visible="true"
    :action-primary="$options.ACTION_PRIMARY"
    :scrollable="true"
    size="lg"
    @close="$emit('close')"
    @primary="$emit('close')"
  >
    <gl-skeleton-loader v-if="isLoadingContent" />
    <div v-else ref="content" data-testid="context-item-content">
      <pre
        v-safe-html="contextItem.content"
        class="code js-syntax-highlight p-3"
        :class="languageIdentifierClass"
      ></pre>
    </div>
  </gl-modal>
</template>
