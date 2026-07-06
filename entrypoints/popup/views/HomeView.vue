<script setup lang="ts">
import { computed } from 'vue'
import { getBrowserLocale, i18n } from '@/lib/i18n'
import { useAppStore } from '@/stores/app'
import { sendExtensionMessage } from '@/utils/messaging'

const appStore = useAppStore()

const browserLocale = computed(() => getBrowserLocale())

async function incrementViaBackground() {
  const next = await sendExtensionMessage({ type: 'incrementCounter' })
  appStore.$patch(next)
}

async function openOptionsPage() {
  await browser.runtime.openOptionsPage()
}
</script>

<template>
  <div class="view">
    <el-space direction="vertical" fill size="large">
      <el-card shadow="never">
        <template #header>
          <span>{{ i18n.t('common.counter') }}</span>
        </template>

        <div class="counter-row">
          <el-tag type="primary" size="large">
            {{ appStore.counter }}
          </el-tag>

          <el-space wrap>
            <el-button type="primary" @click="appStore.incrementCounter()">
              {{ i18n.t('popup.increment') }}
            </el-button>
            <el-button @click="incrementViaBackground">
              {{ i18n.t('popup.incrementByBackground') }}
            </el-button>
          </el-space>
        </div>
      </el-card>

      <el-card shadow="never">
        <template #header>
          <span>{{ i18n.t('common.browserLanguage') }}</span>
        </template>

        <el-space direction="vertical" fill>
          <p>{{ i18n.t('popup.homeDescription') }}</p>
          <el-tag>{{ browserLocale }}</el-tag>
        </el-space>
      </el-card>

      <el-button plain @click="openOptionsPage">
        {{ i18n.t('popup.openOptions') }}
      </el-button>
    </el-space>
  </div>
</template>

<style scoped lang="scss">
.view {
  padding-top: 12px;
}

.counter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
</style>
