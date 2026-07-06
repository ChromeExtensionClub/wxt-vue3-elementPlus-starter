<script setup lang="ts">
import { Close } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { useDarkMode } from '@/composables/useDarkMode'
import { i18n } from '@/lib/i18n'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { theme, setTheme } = useDarkMode()
const visible = ref(true)
const namespace = computed(() => 'ep')

function handleClose() {
  visible.value = false
}
</script>

<template>
  <Transition name="el-fade-in">
    <div v-if="visible" class="floating-widget">
      <el-config-provider :namespace="namespace">
        <div class="widget-header">
          <div>
            <strong>{{ i18n.t('content.title') }}</strong>
            <p>{{ i18n.t('content.description') }}</p>
          </div>
          <el-button :icon="Close" circle size="small" @click="handleClose" />
        </div>

        <div class="widget-body">
          <el-space direction="vertical" fill>
            <el-tag type="primary">
              {{ i18n.t('common.counter') }}: {{ appStore.counter }}
            </el-tag>

            <el-button type="primary" @click="appStore.incrementCounter()">
              {{ i18n.t('popup.increment') }}
            </el-button>

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
          </el-space>
        </div>
      </el-config-provider>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.floating-widget {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 2147483647;
  width: 320px;
  border: 1px solid var(--el-border-color);
  border-radius: 12px;
  background: var(--el-bg-color);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.16);
  overflow: hidden;
}

.widget-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  background: var(--el-color-primary-light-9);

  p {
    margin-top: 4px;
    color: var(--el-text-color-secondary);
    line-height: 1.5;
  }
}

.widget-body {
  padding: 14px;
}
</style>
