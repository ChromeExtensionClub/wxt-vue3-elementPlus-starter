<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useDarkMode } from '@/composables/useDarkMode'
import { i18n } from '@/lib/i18n'

const route = useRoute()
const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <div class="popup-container">
    <div class="header">
      <div>
        <h2>{{ i18n.t('appName') }}</h2>
        <p>{{ i18n.t('popup.description') }}</p>
      </div>

      <el-switch :model-value="isDark" inline-prompt @change="toggleDark" />
    </div>

    <el-menu class="nav" mode="horizontal" :default-active="route.path" router>
      <el-menu-item index="/">
        {{ i18n.t('common.home') }}
      </el-menu-item>
      <el-menu-item index="/settings">
        {{ i18n.t('common.settings') }}
      </el-menu-item>
    </el-menu>

    <router-view />
  </div>
</template>

<style scoped lang="scss">
.popup-container {
  min-width: 360px;
  padding: 16px;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  h2 {
    color: $cus-color-primary;
    font-size: 16px;
    margin-bottom: 4px;
  }

  p {
    color: $cus-text-color-secondary;
    line-height: 1.5;
  }
}

.nav {
  margin-top: 16px;
}
</style>
