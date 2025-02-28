import { installFactory } from './utils/plugins'
import { componentsPlugin } from './components'
import { directivesPlugin } from './directives'
import { BVConfigPlugin } from './bv-config'

const NAME = 'BootstrapVue'

// --- BootstrapVue installer ---
const install = /*#__PURE__*/ installFactory({
  plugins: {
    componentsPlugin,
    directivesPlugin
  }
})

// --- BootstrapVue plugin ---
const BootstrapVue = /*#__PURE__*/ {
  install,
  NAME
}

// --- Named exports for BvConfigPlugin ---
export {
  // Installer exported in case the consumer does not import `default`
  // as the plugin in CommonJS build (or does not have interop enabled for CommonJS)
  // Both the following will work:
  //   BootstrapVue = require('bootstrap-vue')
  //   BootstrapVue = require('bootstrap-vue').default
  //   Vue.use(BootstrapVue)
  install,
  NAME,
  // BootstrapVue config plugin
  BVConfigPlugin,
  // `BVConfigPlugin` has been documented as `BVConfig` as well,
  // so we add an alias to the shorter name for backwards compat
  BVConfigPlugin as BVConfig,
  // Main BootstrapVue plugin
  BootstrapVue
}

// --- Export named injection plugins ---
// TODO:
//   We should probably move injections into their own
//   parent directory (i.e. `/src/injections`)
export { BVModalPlugin } from './components/modal/helpers/bv-modal'
export { BVToastPlugin } from './components/toast/helpers/bv-toast'

// Webpack 4 has optimization difficulties with re-export of re-exports,
// so we import the components individually here for better tree shaking
//
// Webpack v5 fixes the optimizations with re-export of re-exports so this
// can be reverted back to `export * from './table'` when Webpack v5 is released
// See: https://github.com/webpack/webpack/pull/9203 (available in Webpack v5.0.0-alpha.15)

// -- Export Icon components and IconPlugin/BootstrapVueIcons ---
// export * from './icons'
export { IconsPlugin, BootstrapVueIcons } from './icons/plugin'
export { BIcon } from './icons/icon'
export { BIconstack } from './icons/iconstack'
// This re-export is only a single level deep, which
// Webpack 4 (usually) handles correctly when tree shaking
export * from './icons/icons'

// --- Export all individual components and component group plugins as named exports ---

// export * from './components/badge'
export { BadgePlugin } from './components/badge'
export { BBadge } from './components/badge/badge'

// export * from './components/breadcrumb'
export { BreadcrumbPlugin } from './components/breadcrumb'
export { BBreadcrumb } from './components/breadcrumb/breadcrumb'
export { BBreadcrumbItem } from './components/breadcrumb/breadcrumb-item'

// export * from './components/button'
export { ButtonPlugin } from './components/button'
export { BButton } from './components/button/button'
export { BButtonClose } from './components/button/button-close'

// export * from './components/button-group'
export { ButtonGroupPlugin } from './components/button-group'
export { BButtonGroup } from './components/button-group/button-group'

// export * from './components/collapse'
export { CollapsePlugin } from './components/collapse'
export { BCollapse } from './components/collapse/collapse'

// export * from './components/dropdown'
export { DropdownPlugin } from './components/dropdown'
export { BDropdown } from './components/dropdown/dropdown'
export { BDropdownItem } from './components/dropdown/dropdown-item'
export { BDropdownItemButton } from './components/dropdown/dropdown-item-button'
export { BDropdownDivider } from './components/dropdown/dropdown-divider'
export { BDropdownForm } from './components/dropdown/dropdown-form'
export { BDropdownGroup } from './components/dropdown/dropdown-group'
export { BDropdownHeader } from './components/dropdown/dropdown-header'
export { BDropdownText } from './components/dropdown/dropdown-text'

// export * from './components/form'
export { FormPlugin } from './components/form'
export { BForm } from './components/form/form'
export { BFormText } from './components/form/form-text'
export { BFormInvalidFeedback } from './components/form/form-invalid-feedback'
export { BFormValidFeedback } from './components/form/form-valid-feedback'

// export * from './components/form-checkbox'
export { FormCheckboxPlugin } from './components/form-checkbox'
export { BFormCheckbox } from './components/form-checkbox/form-checkbox'
export { BFormCheckboxGroup } from './components/form-checkbox/form-checkbox-group'

// export * from './components/form-group'
export { FormGroupPlugin } from './components/form-group'
export { BFormGroup } from './components/form-group/form-group'

// export * from './components/form-input'
export { FormInputPlugin } from './components/form-input'
export { BFormInput } from './components/form-input/form-input'

// export * from './components/form-radio'
export { FormRadioPlugin } from './components/form-radio'
export { BFormRadio } from './components/form-radio/form-radio'
export { BFormRadioGroup } from './components/form-radio/form-radio-group'

// export * from './components/form-select'
export { FormSelectPlugin } from './components/form-select'
export { BFormSelect } from './components/form-select/form-select'
export { BFormSelectOption } from './components/form-select/form-select-option'
export { BFormSelectOptionGroup } from './components/form-select/form-select-option-group'

// export * from './components/form-textarea'
export { FormTextareaPlugin } from './components/form-textarea'
export { BFormTextarea } from './components/form-textarea/form-textarea'

// export * from './components/input-group'
export { InputGroupPlugin } from './components/input-group'
export { BInputGroup } from './components/input-group/input-group'
export { BInputGroupAddon } from './components/input-group/input-group-addon'
export { BInputGroupAppend } from './components/input-group/input-group-append'
export { BInputGroupPrepend } from './components/input-group/input-group-prepend'
export { BInputGroupText } from './components/input-group/input-group-text'

// export * from './components/layout'
export { LayoutPlugin } from './components/layout'
export { BCol } from './components/layout/col'
export { BFormRow } from './components/layout/form-row'

// export * from './components/link'
export { LinkPlugin } from './components/link'
export { BLink } from './components/link/link'

// export * from './components/modal'
export { ModalPlugin } from './components/modal'
export { BModal } from './components/modal/modal'

// export * from './components/nav'
export { NavPlugin } from './components/nav'
export { BNav } from './components/nav/nav'
export { BNavItem } from './components/nav/nav-item'
export { BNavItemDropdown } from './components/nav/nav-item-dropdown'

// export * from './components/navbar'
export { NavbarPlugin } from './components/navbar'
export { BNavbar } from './components/navbar/navbar'
export { BNavbarBrand } from './components/navbar/navbar-brand'

// export * from './components/popover'
export { PopoverPlugin } from './components/popover'
export { BPopover } from './components/popover/popover'

// export * from './components/progress'
export { ProgressPlugin } from './components/progress'
export { BProgress } from './components/progress/progress'
export { BProgressBar } from './components/progress/progress-bar'

// export * from './components/table'
export { TablePlugin, TableLitePlugin, TableSimplePlugin } from './components/table'
export { BTable } from './components/table/table'
export { BTableLite } from './components/table/table-lite'
export { BTableSimple } from './components/table/table-simple'
export { BTbody } from './components/table/tbody'
export { BThead } from './components/table/thead'
export { BTfoot } from './components/table/tfoot'
export { BTr } from './components/table/tr'
export { BTh } from './components/table/th'
export { BTd } from './components/table/td'

// export * from './components/tabs'
export { TabsPlugin } from './components/tabs'
export { BTabs } from './components/tabs/tabs'
export { BTab } from './components/tabs/tab'

// export * from './components/toast'
export { ToastPlugin } from './components/toast'
export { BToast } from './components/toast/toast'
export { BToaster } from './components/toast/toaster'

// export * from './components/tooltip'
export { TooltipPlugin } from './components/tooltip'
export { BTooltip } from './components/tooltip/tooltip'

// --- Named exports of all directives (VB<Name>) and plugins (VB<Name>Plugin) ---

// Webpack 4 has optimization difficulties with re-export of re-exports,
// so we import the directives individually here for better tree shaking
//
// Webpack v5 fixes the optimizations with re-export of re-exports so this
// can be reverted back to `export * from './scrollspy'` when Webpack v5 is released
// https://github.com/webpack/webpack/pull/9203 (available in Webpack v5.0.0-alpha.15)

// export * from './directives/hover'
export { VBHoverPlugin } from './directives/hover'
export { VBHover } from './directives/hover/hover'

// export * from './directives/modal'
export { VBModalPlugin } from './directives/modal'
export { VBModal } from './directives/modal/modal'

// export * from './directives/popover'
export { VBPopoverPlugin } from './directives/popover'
export { VBPopover } from './directives/popover/popover'

// export * from './directives/scrollspy'
export { VBScrollspyPlugin } from './directives/scrollspy'
export { VBScrollspy } from './directives/scrollspy/scrollspy'

// export * from './directives/toggle'
export { VBTogglePlugin } from './directives/toggle'
export { VBToggle } from './directives/toggle/toggle'

// export * from './directives/tooltip'
export { VBTooltipPlugin } from './directives/tooltip'
export { VBTooltip } from './directives/tooltip/tooltip'

// export * from './directives/tooltip'
export { VBVisiblePlugin } from './directives/visible'
export { VBVisible } from './directives/visible/visible'

// Default export is the BootstrapVue plugin
export default BootstrapVue
