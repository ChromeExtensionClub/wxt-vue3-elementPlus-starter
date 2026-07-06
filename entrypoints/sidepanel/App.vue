<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useDarkMode } from '@/composables/useDarkMode'
import { i18n } from '@/lib/i18n'

const route = useRoute()
const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <div class="sidepanel-container">
    <header class="sidepanel-header">
      <div>
        <h2>{{ i18n.t('appName') }}</h2>
        <p>{{ i18n.t('appDescription') }}</p>
      </div>

      <el-switch :model-value="isDark" inline-prompt @change="toggleDark" />
    </header>

    <el-menu class="nav" mode="horizontal" :default-active="route.path" router>
      <el-menu-item index="/">
        {{ i18n.t('sidepanel.overview') }}
      </el-menu-item>
      <el-menu-item index="/tools">
        {{ i18n.t('sidepanel.tools') }}
      </el-menu-item>
    </el-menu>

    <div class="view-container">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidepanel-container {
  min-height: 100vh;
  padding: 16px;
}

.sidepanel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  h2 {
    color: $cus-color-primary;
    font-size: 18px;
    margin-bottom: 6px;
  }

  p {
    color: $cus-text-color-secondary;
    line-height: 1.6;
  }
}

.nav {
  margin-top: 20px;
}

.view-container {
  margin-top: 24px;
}
</style>
