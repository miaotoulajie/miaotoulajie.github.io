<template>
  <div class="message-board">
    <h1>留言板</h1>
    <p class="subtitle">欢迎留言交流，建议留下你的名字和想法。</p>

    <form @submit.prevent="submitMessage" class="message-form">
      <div class="form-group">
        <label for="username" class="form-label">名字</label>
        <input
          id="username"
          v-model="newMessage.username"
          type="text"
          placeholder="你的名字"
          required
          :maxlength="constraints.usernameMaxLength"
          class="input-field"
        />
      </div>
      <div class="form-group">
        <label for="content" class="form-label">留言内容</label>
        <textarea
          id="content"
          v-model="newMessage.content"
          placeholder="留言内容..."
          required
          rows="4"
          :maxlength="constraints.contentMaxLength"
          class="textarea-field"
        ></textarea>
      </div>
      <button type="submit" :disabled="loading" class="submit-btn">
        {{ loading ? '提交中...' : '提交留言' }}
      </button>
      <p class="submit-hint">为防止刷屏，连续提交间隔为 {{ Math.floor(constraints.submitIntervalMs / 1000) }} 秒。</p>
    </form>

    <p v-if="errorMessage" class="feedback error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="feedback success">{{ successMessage }}</p>

    <div class="messages-list">
      <div v-if="loadingMessages" class="loading">加载中...</div>

      <div v-else-if="messages.length === 0" class="empty-state">
        还没有留言，快来第一条吧！
      </div>

      <div v-else class="messages">
        <div v-for="message in messages" :key="message.id" class="message-card">
          <div class="message-header">
            <div class="left-info">
              <span class="username">{{ message.username }}</span>
              <span class="status" :class="message.status === 'approved' ? 'approved' : 'pending'">
                {{ message.status === "approved" ? "已审核" : "待审核" }}
              </span>
            </div>
            <span class="timestamp">
              {{ formatDate(message.created_at) }}
            </span>
          </div>
          <div class="message-content">
            {{ message.status === "approved" ? message.content : "内容正在审核中" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import {
  fetchMessageList,
  getMessageConstraints,
  submitMessage as submitMessageToService
} from '@/services/messageService'

export default {
  name: 'MessageBoard',
  setup() {
    const messages = ref([])
    const loading = ref(false)
    const loadingMessages = ref(false)
    const newMessage = ref({
      username: '',
      content: ''
    })
    const constraints = getMessageConstraints()
    const errorMessage = ref('')
    const successMessage = ref('')

    const fetchMessages = async () => {
      errorMessage.value = ''
      try {
        loadingMessages.value = true
        messages.value = await fetchMessageList()
      } catch (error) {
        errorMessage.value = error.message || '获取留言失败，请刷新重试'
      } finally {
        loadingMessages.value = false
      }
    }

    const submitMessage = async () => {
      errorMessage.value = ''
      successMessage.value = ''
      try {
        loading.value = true
        const created = await submitMessageToService(newMessage.value)
        messages.value = [created, ...messages.value]
        newMessage.value = { username: '', content: '' }
        successMessage.value = '留言成功，感谢你的分享！'
      } catch (error) {
        errorMessage.value = error.message || '留言提交失败，请重试'
      } finally {
        loading.value = false
      }
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    onMounted(() => {
      fetchMessages()
    })

    return {
      messages,
      loading,
      loadingMessages,
      newMessage,
      constraints,
      errorMessage,
      successMessage,
      submitMessage,
      formatDate
    }
  }
}
</script>

<style scoped>
.message-board {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px 16px 40px;
}

.subtitle {
  color: #546079;
  margin-bottom: 20px;
}

.message-form {
  background: #f5f8ff;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
}

.submit-hint {
  margin-top: 10px;
  color: #6b7791;
  font-size: 12px;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #1f2a44;
  margin-bottom: 8px;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #cfd6e6;
  border-radius: 8px;
  font-size: 14px;
}

.textarea-field {
  resize: vertical;
  min-height: 80px;
}

.submit-btn {
  background-color: #42b883;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background-color: #369c6c;
}

.feedback {
  margin: -16px 0 20px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
}

.feedback.error {
  background: #ffe8e8;
  color: #8d1f1f;
}

.feedback.success {
  background: #e8fff2;
  color: #1f6c3f;
}

.messages-list {
  margin-top: 20px;
}

.loading,
.empty-state {
  text-align: center;
  color: #666;
  padding: 40px;
}

.message-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.left-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.username {
  font-weight: bold;
  color: #333;
}

.status {
  font-size: 11px;
  border-radius: 999px;
  padding: 2px 8px;
}

.status.approved {
  background: #e8fff2;
  color: #1f6c3f;
}

.status.pending {
  background: #fff5e6;
  color: #9a6412;
}

.timestamp {
  font-size: 12px;
  color: #888;
}

.message-content {
  color: #333;
  line-height: 1.5;
}
</style>