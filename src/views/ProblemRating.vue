<template>
  <div class="app-container">
    <!-- ======== TOP BAR ======== -->
    <header class="top-bar">
      <div class="top-bar__title">
        <svg
          class="top-bar__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        <h1>{{ $t("appTitle") }}</h1>
      </div>
      <div class="top-bar__actions">
        <el-dropdown @command="switchLocale">
          <span class="locale-toggle">
            {{ $t("lang") }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="'en'">English</el-dropdown-item>
              <el-dropdown-item :command="'zh'">简体中文</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>

    <!-- ======== PROGRESS SUMMARY ======== -->
    <section class="progress-section">
      <div class="progress-card">
        <div class="progress-card__stats">
          <div class="stat-item">
            <span class="stat-item__label">{{ $t("totalSolved") }}</span>
            <span class="stat-item__value">
              <span class="stat-item__number stat-item__number--solved">{{
                totalCompleted
              }}</span>
              <span class="stat-item__separator">/</span>
              <span class="stat-item__total">{{ totalProblems }}</span>
            </span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-item__label">{{ $t("starredForRevision") }}</span>
            <span class="stat-item__value">
              <span class="stat-item__icon">★</span>
              <span class="stat-item__number stat-item__number--starred">{{
                totalRevision
              }}</span>
            </span>
          </div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-track">
            <div
              class="progress-bar-fill"
              :style="{ width: progressPercent + '%' }"
            ></div>
          </div>
          <span class="progress-bar-label">{{ progressPercent }}%</span>
        </div>
      </div>
    </section>

    <!-- ======== FILTERS ======== -->
    <section class="filters-section">
      <!-- Quick Progress Filters -->
      <div class="quick-filters">
        <button
          v-for="f in progressFilters"
          :key="f.value"
          :class="[
            'quick-filter-btn',
            { 'quick-filter-btn--active': progressFilter === f.value },
          ]"
          @click="setProgressFilter(f.value)"
        >
          {{ $t(f.label) }}
          <span v-if="f.count !== null" class="quick-filter-btn__count">{{
            f.count
          }}</span>
        </button>
      </div>

      <!-- Existing Filters -->
      <div class="filter-bar">
        <el-form :inline="true" class="filter-form" @submit.prevent="query">
          <el-form-item :label="$t('keyword')">
            <el-input
              :placeholder="$t('placeholder')"
              v-model="keyword"
              @keyup.enter="query"
              clearable
            />
          </el-form-item>
          <el-form-item :label="$t('contestNumber')">
            <el-input-number
              v-model="contestIndex"
              :min="0"
              :max="9999"
              :controls="false"
              style="width: 90px"
              @keyup.enter="query"
              @change="query"
            />
          </el-form-item>
          <el-form-item :label="$t('ratingInterval')">
            <el-input-number
              v-model="left"
              :min="0"
              :max="9999"
              :controls="false"
              style="width: 90px"
              @keyup.enter="query"
              @change="query"
            />
          </el-form-item>
          <el-form-item class="dash-separator"> — </el-form-item>
          <el-form-item>
            <el-input-number
              v-model="right"
              :min="0"
              :max="9999"
              :controls="false"
              style="width: 90px"
              @keyup.enter="query"
              @change="query"
            />
          </el-form-item>
          <el-form-item>
            <button type="button" class="reset-btn" @click="reset">
              {{ $t("reset") }}
            </button>
          </el-form-item>
        </el-form>
      </div>
    </section>

    <!-- ======== TABLE ======== -->
    <section class="table-section">
      <div class="table-card">
        <el-table
          :data="problemSetShow"
          border
          stripe
          style="width: 100%"
          :table-layout="'auto'"
          @sort-change="sortChange"
          :default-sort="{ prop: 'ID', order: 'descending' }"
          row-class-name="table-row"
        >
          <!-- Status Column -->
          <el-table-column :label="$t('status')" width="80" align="center">
            <template #default="scope">
              <button
                :class="[
                  'status-checkbox',
                  { 'status-checkbox--checked': isCompleted(scope.row.ID) },
                ]"
                @click="toggleCompleted(scope.row.ID)"
                :aria-label="'Toggle completed for problem ' + scope.row.ID"
              >
                <svg
                  v-if="isCompleted(scope.row.ID)"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  class="check-icon"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </button>
            </template>
          </el-table-column>

          <!-- ID Column -->
          <el-table-column prop="ID" label="ID" width="100" sortable="custom">
            <template #default="scope">
              <span class="cell-id">{{ scope.row.ID }}</span>
            </template>
          </el-table-column>

          <!-- Problem Name Column -->
          <el-table-column :label="$t('problemName')">
            <template #default="scope">
              <el-link
                :href="scope.row.ProblemHrefZH"
                target="_blank"
                v-if="locale === 'zh'"
                :class="{ 'completed-title': isCompleted(scope.row.ID) }"
                >{{ scope.row.TitleZH }}</el-link
              >
              <el-link
                :href="scope.row.ProblemHrefEN"
                target="_blank"
                v-else
                :class="{ 'completed-title': isCompleted(scope.row.ID) }"
                >{{ scope.row.Title }}</el-link
              >
            </template>
          </el-table-column>

          <!-- Contest Column -->
          <el-table-column :label="$t('contestName')">
            <template #default="scope">
              <el-link
                :href="scope.row.ContestHrefZH"
                target="_blank"
                v-if="locale === 'zh'"
                class="cell-contest"
                >{{ scope.row.ContestID_zh }}</el-link
              >
              <el-link
                :href="scope.row.ContestHrefEN"
                target="_blank"
                v-else
                class="cell-contest"
                >{{ scope.row.ContestID_en }}</el-link
              >
            </template>
          </el-table-column>

          <!-- # Column -->
          <el-table-column
            prop="ProblemIndex"
            label="#"
            width="60"
            align="center"
          >
            <template #default="scope">
              <span class="cell-index">{{ scope.row.ProblemIndex }}</span>
            </template>
          </el-table-column>

          <!-- Rating Column -->
          <el-table-column
            :label="$t('rating')"
            prop="Rating"
            sortable="custom"
            width="120"
            align="center"
          >
            <template #default="scope">
              <span :class="['rating-pill', ratingClass(scope.row.Rating)]">
                {{ formatNumber(scope.row.Rating) }}
              </span>
            </template>
          </el-table-column>

          <!-- Revision Column -->
          <el-table-column :label="$t('revision')" width="90" align="center">
            <template #default="scope">
              <button
                :class="[
                  'star-btn',
                  { 'star-btn--active': isRevision(scope.row.ID) },
                ]"
                @click="toggleRevision(scope.row.ID)"
                :aria-label="'Toggle revision star for problem ' + scope.row.ID"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="star-icon"
                  :class="{ 'star-icon--filled': isRevision(scope.row.ID) }"
                >
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                    :fill="isRevision(scope.row.ID) ? '#eab308' : 'none'"
                    :stroke="isRevision(scope.row.ID) ? '#eab308' : '#64748b'"
                    stroke-width="2"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>

    <!-- ======== PAGINATION ======== -->
    <footer class="pagination-footer">
      <el-pagination
        :page-sizes="[10, 15, 20, 30, 40, 50, 100]"
        v-model:page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filterProblemSet.length"
        v-model:current-page="currentPage"
        @current-change="currentChange"
        @size-change="sizeChange"
      />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref, computed } from "vue";
import axios, { AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import { useStorage } from "../composables/useStorage";

const url = "./data.json";

interface Problem {
  ContestID_en: string;
  ContestID_zh: string;
  ContestSlug: string;
  ID: number;
  ProblemIndex: string;
  Rating: number;
  Title: string;
  TitleSlug: string;
  TitleZH: string;
  ProblemHrefZH: string | null;
  ProblemHrefEN: string | null;
  ContestHrefEN: string | null;
  ContestHrefZH: string | null;
}

interface SortInfo {
  prop: "Rating" | "ID";
  order: string;
}

// ---- i18n ----
let i18n = useI18n();
let locale = i18n.locale;

// ---- Storage ----
const {
  isCompleted,
  isRevision,
  toggleCompleted,
  toggleRevision,
  totalCompleted,
  totalRevision,
} = useStorage();

// ---- Existing state (preserved) ----
let left = ref(null);
let right = ref(null);
let sortInfo = reactive({
  prop: "ID",
  order: "descending",
} as SortInfo);
const pageSizeCache = localStorage.getItem("pageSize");
let pageSize = ref(pageSizeCache ? parseInt(pageSizeCache) : 15);
let contestIndex = ref(null);
const problemSetAll: Array<Problem> = reactive([]);
const problemSetShow: Array<Problem> = reactive([]);
const filterProblemSet: Array<Problem> = reactive([]);
let keyword = ref("");
let currentPage = ref(1);

// ---- New state ----
type ProgressFilter = "all" | "solved" | "unsolved" | "starred";
let progressFilter = ref<ProgressFilter>("all");

const totalProblems = computed(() => problemSetAll.length);
const progressPercent = computed(() => {
  if (totalProblems.value === 0) return 0;
  return Math.round((totalCompleted.value / totalProblems.value) * 100);
});

const progressFilters = computed(() => [
  { value: "all" as ProgressFilter, label: "showAll", count: null },
  {
    value: "solved" as ProgressFilter,
    label: "solved",
    count: totalCompleted.value,
  },
  {
    value: "unsolved" as ProgressFilter,
    label: "unsolved",
    count: totalProblems.value - totalCompleted.value,
  },
  {
    value: "starred" as ProgressFilter,
    label: "starred",
    count: totalRevision.value,
  },
]);

// ---- Lifecycle ----
onMounted(() => {
  axios.get(url).then((res: AxiosResponse<Array<Problem>>) => {
    const problems = res.data;
    problems.forEach((item) => {
      item.ProblemHrefZH = "https://leetcode.cn/problems/" + item.TitleSlug;
      item.ProblemHrefEN = "https://leetcode.com/problems/" + item.TitleSlug;
      item.ContestHrefZH = "https://leetcode.cn/contest/" + item.ContestSlug;
      item.ContestHrefEN = "https://leetcode.com/contest/" + item.ContestSlug;
      problemSetAll.push(item);
      filterProblemSet.push(item);
    });
    query();
  });
});

// ---- Existing functions (preserved 1:1) ----
function sortChange(s: SortInfo) {
  if (s.prop == null) {
    sortInfo.order = "descending";
    sortInfo.prop = "ID";
  } else {
    sortInfo.order = s.order;
    sortInfo.prop = s.prop;
  }
  query();
}

function switchLocale(locale: string) {
  i18n.locale.value = locale;
  localStorage.setItem("locale", locale);
}

function formatNumber(rating: number) {
  return Math.round(rating);
}

function currentChange() {
  problemSetShow.length = 0;
  let no = currentPage.value;
  let size = pageSize.value;
  let total = filterProblemSet.length;
  for (let i = (no - 1) * size; i < Math.min(total, no * size); i++) {
    problemSetShow.push(filterProblemSet[i]);
  }
}

function sizeChange() {
  currentPage.value = 1;
  localStorage.setItem("pageSize", String(pageSize.value));
  currentChange();
}

function query() {
  if (left.value != null && right.value != null && right.value < left.value) {
    ElMessage.error({
      message: "left must less than right",
      duration: 1000,
    });
    return;
  }
  filterProblemSet.length = 0;
  problemSetAll.forEach((item) => {
    // Keyword filter
    if (keyword.value.trim().length > 0) {
      let k = keyword.value.trim().toLowerCase();
      if (
        !item.TitleZH.toLowerCase().includes(k) &&
        !item.Title.toLowerCase().includes(k) &&
        !item.TitleSlug.toLowerCase().includes(k) &&
        !String(item.ID).includes(k)
      ) {
        return;
      }
    }
    // Contest filter
    if (contestIndex.value != null) {
      let index = parseInt(item.ContestSlug.replace(/\D/gi, ""));
      if (index != contestIndex.value) {
        return;
      }
    }
    // Rating range filter
    if (left.value != null && Math.round(item.Rating) < left.value) {
      return;
    }
    if (right.value != null && Math.round(item.Rating) > right.value) {
      return;
    }
    // Progress filter (new)
    if (progressFilter.value === "solved" && !isCompleted(item.ID)) {
      return;
    }
    if (progressFilter.value === "unsolved" && isCompleted(item.ID)) {
      return;
    }
    if (progressFilter.value === "starred" && !isRevision(item.ID)) {
      return;
    }
    filterProblemSet.push(item);
  });
  filterProblemSet.sort((a: Problem, b: Problem) => {
    if (sortInfo.order === "descending") {
      return b[sortInfo.prop] - a[sortInfo.prop];
    } else {
      return a[sortInfo.prop] - b[sortInfo.prop];
    }
  });
  sizeChange();
}

function reset() {
  keyword.value = "";
  contestIndex.value = null;
  left.value = null;
  right.value = null;
  sortInfo.order = "descending";
  sortInfo.prop = "ID";
  progressFilter.value = "all";
  query();
}

// ---- New functions ----
function setProgressFilter(value: ProgressFilter) {
  progressFilter.value = value;
  query();
}

function ratingClass(rating: number): string {
  const r = Math.round(rating);
  if (r < 1200) return "rating-pill--gray";
  if (r < 1400) return "rating-pill--green";
  if (r < 1600) return "rating-pill--cyan";
  if (r < 1900) return "rating-pill--blue";
  if (r < 2100) return "rating-pill--purple";
  if (r < 2400) return "rating-pill--orange";
  return "rating-pill--red";
}
</script>

<style scoped>
/* ============================================
   LAYOUT
   ============================================ */
.app-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px 48px;
  min-height: 100vh;
}

/* ============================================
   TOP BAR
   ============================================ */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #1e293b;
  margin-bottom: 24px;
}
.top-bar__title {
  display: flex;
  align-items: center;
  gap: 12px;
}
.top-bar__icon {
  width: 28px;
  height: 28px;
  color: #f97316;
}
.top-bar__title h1 {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #f97316, #eab308);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.locale-toggle {
  color: #94a3b8;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  transition: all 0.2s;
}
.locale-toggle:hover {
  border-color: #f97316;
  color: #f8fafc;
}

/* ============================================
   PROGRESS CARD
   ============================================ */
.progress-section {
  margin-bottom: 24px;
}
.progress-card {
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.8),
    rgba(15, 23, 42, 0.9)
  );
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 24px 32px;
  backdrop-filter: blur(12px);
}
.progress-card__stats {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 16px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stat-item__label {
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}
.stat-item__value {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 24px;
  font-weight: 700;
}
.stat-item__number--solved {
  color: #f97316;
}
.stat-item__separator {
  color: #475569;
  font-weight: 400;
}
.stat-item__total {
  color: #64748b;
  font-size: 18px;
}
.stat-item__icon {
  color: #eab308;
  font-size: 20px;
}
.stat-item__number--starred {
  color: #eab308;
}
.stat-divider {
  width: 1px;
  height: 40px;
  background: #334155;
}
.progress-bar-container {
  display: flex;
  align-items: center;
  gap: 12px;
}
.progress-bar-track {
  flex: 1;
  height: 8px;
  background: #1e293b;
  border-radius: 4px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #f97316, #eab308);
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  min-width: 0;
}
.progress-bar-label {
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
  min-width: 40px;
  text-align: right;
}

/* ============================================
   QUICK FILTERS
   ============================================ */
.filters-section {
  margin-bottom: 20px;
}
.quick-filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.quick-filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 20px;
  border: 1px solid #334155;
  background: #1e293b;
  color: #94a3b8;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}
.quick-filter-btn:hover {
  border-color: #475569;
  color: #e2e8f0;
  background: #293548;
}
.quick-filter-btn--active {
  background: rgba(249, 115, 22, 0.15);
  border-color: #f97316;
  color: #f97316;
}
.quick-filter-btn--active:hover {
  background: rgba(249, 115, 22, 0.25);
  color: #fb923c;
}
.quick-filter-btn__count {
  background: rgba(255, 255, 255, 0.08);
  padding: 1px 7px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
}
.quick-filter-btn--active .quick-filter-btn__count {
  background: rgba(249, 115, 22, 0.2);
}

/* ============================================
   FILTER BAR
   ============================================ */
.filter-bar {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 16px 20px 4px;
}
.filter-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0;
}
.dash-separator {
  color: #64748b;
  font-weight: 500;
}
.reset-btn {
  padding: 8px 20px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}
.reset-btn:hover {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

/* ============================================
   TABLE
   ============================================ */
.table-section {
  margin-bottom: 20px;
}
.table-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  overflow: hidden;
}

/* Status Checkbox */
.status-checkbox {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 2px solid #475569;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0;
}
.status-checkbox:hover {
  border-color: #f97316;
  background: rgba(249, 115, 22, 0.1);
}
.status-checkbox--checked {
  background: #f97316 !important;
  border-color: #f97316 !important;
  animation: checkPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.check-icon {
  width: 14px;
  height: 14px;
  color: #fff;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@keyframes checkPop {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

/* Cell styles */
.cell-id {
  color: #64748b;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
.cell-contest {
  color: #94a3b8 !important;
  font-size: 13px;
}
.cell-index {
  color: #64748b;
  font-size: 13px;
}
.completed-title {
  opacity: 0.55 !important;
  text-decoration: line-through !important;
  text-decoration-color: #475569 !important;
}

/* Rating Pills */
.rating-pill {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}
.rating-pill--gray {
  background: rgba(100, 116, 139, 0.15);
  color: #94a3b8;
}
.rating-pill--green {
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
}
.rating-pill--cyan {
  background: rgba(6, 182, 212, 0.15);
  color: #22d3ee;
}
.rating-pill--blue {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}
.rating-pill--purple {
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
}
.rating-pill--orange {
  background: rgba(249, 115, 22, 0.15);
  color: #fb923c;
}
.rating-pill--red {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
}

/* Star Button */
.star-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 6px;
}
.star-btn:hover {
  transform: scale(1.15);
  background: rgba(234, 179, 8, 0.1);
}
.star-icon {
  width: 20px;
  height: 20px;
  transition: all 0.2s;
}
.star-icon--filled {
  filter: drop-shadow(0 0 4px rgba(234, 179, 8, 0.4));
  animation: starPop 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes starPop {
  0% {
    transform: scale(0.6) rotate(-15deg);
  }
  50% {
    transform: scale(1.25) rotate(5deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

/* ============================================
   PAGINATION
   ============================================ */
.pagination-footer {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 768px) {
  .app-container {
    padding: 0 12px 32px;
  }
  .top-bar {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  .top-bar__title h1 {
    font-size: 18px;
  }
  .progress-card {
    padding: 16px 20px;
  }
  .progress-card__stats {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  .stat-divider {
    width: 60px;
    height: 1px;
  }
  .stat-item__value {
    font-size: 20px;
  }
  .filter-bar {
    padding: 12px 12px 0;
  }
  .filter-form {
    flex-direction: column;
    align-items: stretch;
  }
  .quick-filters {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 4px;
  }
  .quick-filter-btn {
    white-space: nowrap;
  }
  .table-card {
    border-radius: 12px;
  }
  .pagination-footer {
    padding: 16px 0;
  }
  .dash-separator {
    display: none;
  }
}

@media (max-width: 480px) {
  .top-bar__title h1 {
    font-size: 16px;
  }
  .progress-card {
    padding: 14px 16px;
  }
  .stat-item__value {
    font-size: 18px;
  }
}
</style>
