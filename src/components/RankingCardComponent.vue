<template>
  <li
    class="entry"
    :class="[positionClass, { 'entry--current': isCurrent }]"
    :aria-current="isCurrent ? 'true' : undefined"
  >
    <span class="entry__position" aria-hidden="true">
      <svg
        v-if="position === 1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 18h18l-1.7-9.5-4.8 4L12 5l-2.5 7.5-4.8-4L3 18Z"></path>
        <path d="M5 21h14"></path>
      </svg>

      <svg
        v-else-if="position <= 3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="8" r="5"></circle>
        <path d="m15.5 12.5 1.5 9.5-5-3-5 3 1.5-9.5"></path>
      </svg>

      <span v-else class="entry__rank">#{{ position }}</span>
    </span>

    <div class="entry__body">
      <p class="entry__name-row">
        <span class="entry__name">{{ entry.player }}</span>

        <span v-if="isPodium" class="entry__label">
          <svg
            v-if="position === 1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M3 18h18l-1.7-9.5-4.8 4L12 5l-2.5 7.5-4.8-4L3 18Z"></path>
            <path d="M5 21h14"></path>
          </svg>

          <svg
            v-else
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="5"></circle>
            <path d="m15.5 12.5 1.5 9.5-5-3-5 3 1.5-9.5"></path>
          </svg>

          {{ positionLabel }}
        </span>

        <span v-if="isCurrent" class="entry__you">Tú</span>
      </p>

      <p class="entry__meta">
        {{ entry.accuracy }}% de precisión
        <span class="entry__dot" aria-hidden="true">·</span>
        {{ formattedDate }}
      </p>
    </div>

    <p class="entry__score">
      <span class="entry__points">{{ entry.score }}</span>
      <span class="entry__unit">puntos</span>
    </p>
  </li>
</template>

<script setup>
import { computed } from 'vue'

const POSITION_LABELS = ['Campeón', 'Segundo', 'Tercero']

const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  isCurrent: {
    type: Boolean,
    default: false,
  },
})

const isPodium = computed(() => props.position <= 3)

const positionClass = computed(
  () => ['', 'entry--first', 'entry--second', 'entry--third'][props.position] ?? '',
)

const positionLabel = computed(() => POSITION_LABELS[props.position - 1] ?? '')

const formattedDate = computed(() => formatDate(props.entry.date))

function formatDate(date) {
  const parsed = new Date(`${date}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return date

  return parsed.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<style scoped>
.entry {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 78px;
  padding: 14px 20px;
  border: 1px solid #f0e2ee;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(76, 29, 146, 0.04);
}

.entry--first {
  border-color: #f3d27e;
  background: #fffdf3;
}

.entry--second {
  border-color: #e5e7eb;
  background: #f9fafb;
}

.entry--third {
  border-color: #f6c99a;
  background: #fffaf3;
}

.entry--current {
  box-shadow:
    0 0 0 2px #db2777,
    0 8px 20px rgba(219, 39, 119, 0.14);
}

.entry__position {
  display: grid;
  place-items: center;
  flex: none;
  width: 26px;
  color: #9ca3af;
}

.entry__position svg {
  width: 24px;
  height: 24px;
}

.entry--first .entry__position {
  color: #eab308;
}

.entry--second .entry__position {
  color: #9ca3af;
}

.entry--third .entry__position {
  color: #d97706;
}

.entry__rank {
  font-size: 10px;
  font-weight: 600;
  color: #9ca3af;
}

.entry__body {
  flex: 1;
  min-width: 0;
}

.entry__name-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
  margin: 0;
}

.entry__name {
  overflow: hidden;
  font-size: 11.5px;
  font-weight: 700;
  line-height: 1.25;
  color: #1f2937;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.entry__label {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 9px;
  font-weight: 600;
  line-height: 1.2;
}

.entry__label svg {
  width: 10px;
  height: 10px;
  flex: none;
}

.entry--first .entry__label {
  color: #b45309;
}

.entry--second .entry__label {
  color: #6b7280;
}

.entry--third .entry__label {
  color: #c2410c;
}

.entry__you {
  padding: 1px 6px;
  border-radius: 999px;
  font-size: 8px;
  font-weight: 700;
  line-height: 1.4;
  color: #be185d;
  background: #fce7f3;
}

.entry__meta {
  margin: 6px 0 0;
  font-size: 10px;
  line-height: 1.3;
  color: #6b7280;
}

.entry__dot {
  padding: 0 3px;
  color: #d1d5db;
}

.entry__score {
  flex: none;
  margin: 0;
  text-align: right;
}

.entry__points {
  display: block;
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(90deg, #c026d3 0%, #db2777 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.entry__unit {
  display: block;
  margin-top: 4px;
  font-size: 9px;
  line-height: 1;
  color: #6b7280;
}

@media (max-width: 640px) {
  .entry {
    gap: 12px;
    padding: 12px 14px;
  }

  .entry__points {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .entry__name {
    font-size: 11px;
  }

  .entry__meta {
    font-size: 9.5px;
  }

  .entry__unit {
    font-size: 8.5px;
  }
}
</style>
