import { ref, computed } from "vue";
import { ElMessage } from "element-plus";

const COMPLETED_KEY = "lc_completed_problems";
const REVISION_KEY = "lc_revision_problems";

function loadSet(key: string): Set<number> {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const arr: number[] = JSON.parse(raw);
      return new Set(arr);
    }
  } catch {
    // corrupted data — reset
    localStorage.removeItem(key);
  }
  return new Set();
}

function saveSet(key: string, data: Set<number>): void {
  try {
    localStorage.setItem(key, JSON.stringify([...data]));
  } catch (e) {
    ElMessage.warning({
      message: "Storage quota exceeded. Some progress may not be saved.",
      duration: 3000,
    });
  }
}

// Reactive state — shared singleton across all component instances
const completedProblems = ref<Set<number>>(loadSet(COMPLETED_KEY));
const revisionProblems = ref<Set<number>>(loadSet(REVISION_KEY));

export function useStorage() {
  function isCompleted(id: number): boolean {
    return completedProblems.value.has(id);
  }

  function isRevision(id: number): boolean {
    return revisionProblems.value.has(id);
  }

  function toggleCompleted(id: number): void {
    const next = new Set(completedProblems.value);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    completedProblems.value = next;
    saveSet(COMPLETED_KEY, next);
  }

  function toggleRevision(id: number): void {
    const next = new Set(revisionProblems.value);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    revisionProblems.value = next;
    saveSet(REVISION_KEY, next);
  }

  const totalCompleted = computed(() => completedProblems.value.size);
  const totalRevision = computed(() => revisionProblems.value.size);

  return {
    completedProblems,
    revisionProblems,
    isCompleted,
    isRevision,
    toggleCompleted,
    toggleRevision,
    totalCompleted,
    totalRevision,
  };
}
