<template>
  <router-view />
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
/* ============================================
   GLOBAL DARK THEME — Element Plus Overrides
   ============================================ */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  background: #0f172a;
  color: #f8fafc;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #0f172a;
}
::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #475569;
}

/* ---- Element Plus Dark Overrides ---- */

/* Table */
.el-table {
  --el-table-bg-color: #1e293b !important;
  --el-table-tr-bg-color: #1e293b !important;
  --el-table-header-bg-color: #162032 !important;
  --el-table-row-hover-bg-color: #293548 !important;
  --el-table-border-color: #334155 !important;
  --el-table-text-color: #cbd5e1 !important;
  --el-table-header-text-color: #94a3b8 !important;
  --el-table-current-row-bg-color: #293548 !important;
  color: #cbd5e1 !important;
  background: transparent !important;
  font-size: 14px !important;
}
.el-table th.el-table__cell {
  background-color: #162032 !important;
  color: #94a3b8 !important;
  font-weight: 600 !important;
  border-bottom: 1px solid #334155 !important;
  font-size: 12px !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
}
.el-table td.el-table__cell {
  border-bottom: 1px solid #1e3048 !important;
}
.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
  background-color: #172033 !important;
}
.el-table--border .el-table__inner-wrapper::after,
.el-table--border::before,
.el-table--border::after,
.el-table__inner-wrapper::before {
  background-color: #334155 !important;
}
.el-table .sort-caret.ascending {
  border-bottom-color: #64748b !important;
}
.el-table .sort-caret.descending {
  border-top-color: #64748b !important;
}
.el-table .ascending .sort-caret.ascending {
  border-bottom-color: #f97316 !important;
}
.el-table .descending .sort-caret.descending {
  border-top-color: #f97316 !important;
}
.el-table__empty-block {
  background: #1e293b !important;
}
.el-table__empty-text {
  color: #64748b !important;
}

/* Pagination */
.el-pagination {
  --el-pagination-bg-color: transparent !important;
  --el-pagination-text-color: #94a3b8 !important;
  --el-pagination-button-bg-color: #1e293b !important;
  --el-pagination-button-color: #94a3b8 !important;
  --el-pagination-hover-color: #f97316 !important;
}
.el-pagination .el-input__wrapper {
  background-color: #1e293b !important;
  box-shadow: 0 0 0 1px #334155 inset !important;
}
.el-pagination .el-input__inner {
  color: #f8fafc !important;
}
.el-pagination .el-pager li {
  background: #1e293b !important;
  color: #94a3b8 !important;
  border-radius: 6px !important;
  margin: 0 2px !important;
}
.el-pagination .el-pager li.is-active {
  background: #f97316 !important;
  color: #fff !important;
}
.el-pagination .btn-prev,
.el-pagination .btn-next {
  background: #1e293b !important;
  color: #94a3b8 !important;
}
.el-pagination .el-pagination__sizes .el-select .el-input__wrapper {
  background-color: #1e293b !important;
  box-shadow: 0 0 0 1px #334155 inset !important;
}
.el-pagination .el-pagination__total {
  color: #64748b !important;
}
.el-pagination .el-pagination__jump {
  color: #64748b !important;
}

/* Input */
.el-input__wrapper {
  background-color: #1e293b !important;
  box-shadow: 0 0 0 1px #334155 inset !important;
}
.el-input__wrapper:hover {
  box-shadow: 0 0 0 1px #475569 inset !important;
}
.el-input__wrapper.is-focus {
  box-shadow: 0 0 0 1px #f97316 inset !important;
}
.el-input__inner {
  color: #f8fafc !important;
}
.el-input__inner::placeholder {
  color: #64748b !important;
}

/* Input Number */
.el-input-number {
  --el-input-bg-color: #1e293b !important;
}

/* Form */
.el-form-item__label {
  color: #94a3b8 !important;
}

/* Button */
.el-button--danger {
  --el-button-bg-color: #dc2626 !important;
  --el-button-border-color: #dc2626 !important;
  --el-button-hover-bg-color: #ef4444 !important;
  --el-button-hover-border-color: #ef4444 !important;
}

/* Link */
.el-link {
  --el-link-text-color: #e2e8f0 !important;
  --el-link-hover-text-color: #f97316 !important;
}
.el-link.el-link--default {
  color: #e2e8f0 !important;
}
.el-link.el-link--default:hover {
  color: #f97316 !important;
}

/* Dropdown */
.el-dropdown-link {
  color: #94a3b8 !important;
  cursor: pointer;
}
.el-dropdown-menu {
  background-color: #1e293b !important;
  border: 1px solid #334155 !important;
}
.el-dropdown-menu__item {
  color: #cbd5e1 !important;
}
.el-dropdown-menu__item:hover {
  background-color: #293548 !important;
  color: #f97316 !important;
}
.el-popper.is-dark {
  background: #1e293b !important;
  border: 1px solid #334155 !important;
}
.el-popper.is-light {
  background: #1e293b !important;
  border: 1px solid #334155 !important;
}
.el-popper.is-light .el-popper__arrow::before {
  background: #1e293b !important;
  border-color: #334155 !important;
}

/* Select dropdown */
.el-select-dropdown {
  background-color: #1e293b !important;
  border: 1px solid #334155 !important;
}
.el-select-dropdown__item {
  color: #cbd5e1 !important;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #293548 !important;
}
.el-select-dropdown__item.selected {
  color: #f97316 !important;
}

/* Message */
.el-message {
  --el-message-bg-color: #1e293b !important;
  --el-message-border-color: #334155 !important;
  --el-message-text-color: #f8fafc !important;
}
</style>
