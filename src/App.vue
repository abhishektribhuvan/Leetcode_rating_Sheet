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
   APPLE OFFICIAL LUXURY DARK THEME
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
  background-color: #000000;
  background-image: radial-gradient(
      ellipse 80% 40% at 50% -10%,
      rgba(255, 255, 255, 0.06) 0%,
      transparent 70%
    ),
    radial-gradient(
      circle at 85% 15%,
      rgba(41, 151, 255, 0.04) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 15% 35%,
      rgba(255, 159, 10, 0.03) 0%,
      transparent 45%
    );
  background-attachment: fixed;
  color: #f5f5f7;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
    "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

/* Custom Scrollbar - Apple Minimal */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #000000;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.28);
}

/* ---- Element Plus Dark Overrides — Apple Style ---- */

/* Table */
.el-table {
  --el-table-bg-color: #0e0e10 !important;
  --el-table-tr-bg-color: #0e0e10 !important;
  --el-table-header-bg-color: #161618 !important;
  --el-table-row-hover-bg-color: rgba(255, 255, 255, 0.04) !important;
  --el-table-border-color: rgba(255, 255, 255, 0.08) !important;
  --el-table-text-color: #d2d2d7 !important;
  --el-table-header-text-color: #86868b !important;
  --el-table-current-row-bg-color: rgba(255, 255, 255, 0.05) !important;
  color: #d2d2d7 !important;
  background: transparent !important;
  font-size: 14px !important;
}
.el-table th.el-table__cell {
  background-color: #161618 !important;
  color: #86868b !important;
  font-weight: 600 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  font-size: 11px !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
}
.el-table td.el-table__cell {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
}
.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
  background-color: #131316 !important;
}
.el-table--border .el-table__inner-wrapper::after,
.el-table--border::before,
.el-table--border::after,
.el-table__inner-wrapper::before {
  background-color: rgba(255, 255, 255, 0.08) !important;
}
.el-table .sort-caret.ascending {
  border-bottom-color: #6e6e73 !important;
}
.el-table .sort-caret.descending {
  border-top-color: #6e6e73 !important;
}
.el-table .ascending .sort-caret.ascending {
  border-bottom-color: #2997ff !important;
}
.el-table .descending .sort-caret.descending {
  border-top-color: #2997ff !important;
}
.el-table__empty-block {
  background: #0e0e10 !important;
}
.el-table__empty-text {
  color: #86868b !important;
}

/* Pagination - Apple Style */
.el-pagination {
  --el-pagination-bg-color: transparent !important;
  --el-pagination-text-color: #86868b !important;
  --el-pagination-button-bg-color: rgba(255, 255, 255, 0.06) !important;
  --el-pagination-button-color: #86868b !important;
  --el-pagination-hover-color: #2997ff !important;
}
.el-pagination .el-input__wrapper {
  background-color: rgba(255, 255, 255, 0.06) !important;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset !important;
  border-radius: 8px !important;
}
.el-pagination .el-input__inner {
  color: #f5f5f7 !important;
}
.el-pagination .el-pager li {
  background: rgba(255, 255, 255, 0.05) !important;
  color: #86868b !important;
  border-radius: 8px !important;
  margin: 0 3px !important;
  border: 1px solid rgba(255, 255, 255, 0.06);
  font-weight: 500;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.el-pagination .el-pager li:hover {
  color: #f5f5f7 !important;
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.2);
}
.el-pagination .el-pager li.is-active {
  background: #0071e3 !important;
  color: #ffffff !important;
  border-color: transparent;
  box-shadow: 0 2px 10px rgba(0, 113, 227, 0.4);
  font-weight: 600;
}
.el-pagination .btn-prev,
.el-pagination .btn-next {
  background: rgba(255, 255, 255, 0.05) !important;
  color: #86868b !important;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px !important;
  transition: all 0.2s;
}
.el-pagination .btn-prev:hover,
.el-pagination .btn-next:hover {
  color: #f5f5f7 !important;
  background: rgba(255, 255, 255, 0.1) !important;
}
.el-pagination .el-pagination__sizes .el-select .el-input__wrapper {
  background-color: rgba(255, 255, 255, 0.06) !important;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset !important;
  border-radius: 8px !important;
}
.el-pagination .el-pagination__total,
.el-pagination .el-pagination__jump {
  color: #86868b !important;
}

/* Input - Apple Glass & Metal */
.el-input__wrapper {
  background-color: rgba(255, 255, 255, 0.05) !important;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12) inset !important;
  border-radius: 10px !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.el-input__wrapper:hover {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.24) inset !important;
  background-color: rgba(255, 255, 255, 0.07) !important;
}
.el-input__wrapper.is-focus {
  background-color: rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 0 0 1px #2997ff inset, 0 0 0 3px rgba(41, 151, 255, 0.25) !important;
}
.el-input__inner {
  color: #f5f5f7 !important;
}
.el-input__inner::placeholder {
  color: #6e6e73 !important;
}

/* Input Number */
.el-input-number {
  --el-input-bg-color: transparent !important;
}

/* Form */
.el-form-item__label {
  color: #86868b !important;
  font-weight: 500 !important;
  font-size: 13px !important;
}

/* Links - Apple Rich Blue */
.el-link {
  --el-link-text-color: #f5f5f7 !important;
  --el-link-hover-text-color: #2997ff !important;
  transition: color 0.15s ease !important;
}
.el-link.el-link--default {
  color: #f5f5f7 !important;
}
.el-link.el-link--default:hover {
  color: #2997ff !important;
  text-decoration: underline;
}

/* Dropdown Menu - Apple Frosted Glass */
.el-dropdown-link {
  color: #86868b !important;
  cursor: pointer;
}
.el-dropdown-menu {
  background-color: rgba(30, 30, 32, 0.88) !important;
  backdrop-filter: saturate(180%) blur(25px) !important;
  -webkit-backdrop-filter: saturate(180%) blur(25px) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.75) !important;
  border-radius: 12px !important;
  padding: 6px !important;
}
.el-dropdown-menu__item {
  color: #d2d2d7 !important;
  border-radius: 8px;
  margin: 2px 0;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s;
}
.el-dropdown-menu__item:hover {
  background-color: #0071e3 !important;
  color: #ffffff !important;
}
.el-popper.is-dark,
.el-popper.is-light {
  background: rgba(30, 30, 32, 0.88) !important;
  backdrop-filter: saturate(180%) blur(25px) !important;
  -webkit-backdrop-filter: saturate(180%) blur(25px) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.75) !important;
  border-radius: 12px !important;
}
.el-popper.is-light .el-popper__arrow::before {
  background: #1e1e20 !important;
  border-color: rgba(255, 255, 255, 0.12) !important;
}

/* Select Dropdown */
.el-select-dropdown {
  background-color: rgba(30, 30, 32, 0.92) !important;
  backdrop-filter: saturate(180%) blur(25px) !important;
  -webkit-backdrop-filter: saturate(180%) blur(25px) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.85) !important;
  border-radius: 14px !important;
  padding: 6px !important;
}
.el-select-dropdown__item {
  color: #d2d2d7 !important;
  border-radius: 8px;
  margin: 2px 0;
  font-size: 13px;
  transition: all 0.15s;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: rgba(255, 255, 255, 0.08) !important;
  color: #ffffff !important;
}
.el-select-dropdown__item.selected {
  color: #2997ff !important;
  font-weight: 600 !important;
}

/* Apple Tag inside Multi-select */
.el-tag.el-tag--info {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.12) !important;
  color: #f5f5f7 !important;
  border-radius: 6px !important;
}

/* Message - Apple Toast */
.el-message {
  --el-message-bg-color: rgba(32, 32, 36, 0.92) !important;
  --el-message-border-color: rgba(255, 255, 255, 0.14) !important;
  --el-message-text-color: #f5f5f7 !important;
  backdrop-filter: saturate(180%) blur(25px) !important;
  -webkit-backdrop-filter: saturate(180%) blur(25px) !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7) !important;
  border-radius: 12px !important;
}

/* Dialog - Apple Sheet Modal */
.el-dialog {
  background-color: rgba(24, 24, 27, 0.88) !important;
  backdrop-filter: saturate(190%) blur(35px) !important;
  -webkit-backdrop-filter: saturate(190%) blur(35px) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: 20px !important;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.85),
    inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
}
.el-dialog__header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-right: 0 !important;
  padding: 20px 24px !important;
}
.el-dialog__title {
  color: #f5f5f7 !important;
  font-weight: 700 !important;
  letter-spacing: -0.015em;
  font-size: 19px !important;
}
.el-dialog__body {
  padding: 24px !important;
  color: #d2d2d7 !important;
}
.el-dialog__footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 16px 24px !important;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #86868b !important;
  font-size: 18px;
  transition: all 0.2s;
}
.el-dialog__headerbtn:hover .el-dialog__close {
  color: #f5f5f7 !important;
  transform: scale(1.1);
}
</style>
