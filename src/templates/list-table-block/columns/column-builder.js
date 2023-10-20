import { h } from 'vue'
import AvatarWithTextTooltipColumn from './avatar-with-text-tooltip-column.vue'
import AvatarWithTextColumn from './avatar-with-text-column.vue'
import TextWithClipboardColumn from './text-with-clipboard-column.vue'
import ClickableText from './clickable-text-column.vue'
import Tag from 'primevue/tag'

/**
 * Build and return a specific column based on the given appearance.
 *
 * @param {Object} params - The parameters to build the column.
 * @param {string} params.columnAppearance - The appearance of the column.
 *   Valid values are:
 *   - 'avatar-with-text'
 *   - 'avatar-with-text-and-tooltip'
 *   - 'text-with-clipboard'
 *   - 'clickable-text'
 *   - 'tag'
 * @param {Object} params.data - The data with specific properties of the column appearance.
 * @param {Object} [params.dependencies]- (Optional) The dependencies needed for rendering this column appearance.
 *
 * @returns {VNode} The constructed column as a Vue VNode.
 * @throws {Error} If an invalid column appearance is provided.
 */
export const columnBuilder = ({ data, columnAppearance, dependencies }) => {
  switch (columnAppearance) {
    case 'avatar-with-text':
      return h(AvatarWithTextColumn, {
        nameInitial: data.nameInitial,
        tooltipText: data.tooltipText,
        text: data.timeDifference
      })
    case 'avatar-with-text-and-tooltip':
      return h(AvatarWithTextTooltipColumn, {
        nameInitial: data.nameInitial,
        tooltipText: data.tooltipText,
        text: data.timeDifference
      })
    case 'clickable-text':
      return h(ClickableText, {
        content: data.content,
        clickAction: dependencies.clickAction
      })
    case 'text-with-clipboard':
      return h(TextWithClipboardColumn, {
        content: data.content,
        copyContentService: dependencies.copyContentService
      })
    case 'tag':
      return h(Tag, {
        value: data.content,
        icon: data.icon,
        severity: data.severity
      })
    default:
      throw new Error('Invalid column appearance')
  }
}