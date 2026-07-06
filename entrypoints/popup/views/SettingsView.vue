<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode'
import { i18n } from '@/lib/i18n'

const { theme, setTheme } = useDarkMode()
</script>

<template>
  <div class="view">
    <el-card shadow="never">
      <template #header>
        <span>{{ i18n.t('common.theme') }}</span>
      </template>

      <el-radio-group :model-value="theme" @change="(value) => setTheme(value as any)">
        <el-radio-button value="system">
          {{ i18n.t('common.followSystem') }}
        </el-radio-button>
        <el-radio-button value="light">
          {{ i18n.t('common.light') }}
        </el-radio-button>
        <el-radio-button value="dark">
          {{ i18n.t('common.dark') }}
        </el-radio-button>
      </el-radio-group>
    </el-card>

    <el-alert
      class="hint"
      type="info"
      :closable="false"
      :title="i18n.t('popup.settingsHint')"
    />
  </div>
</template>

<style scoped lang="scss">
.view {
  padding-top: 12px;
}

.hint {
  margin-top: 16px;
}
</style>
