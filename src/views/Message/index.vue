<template>
  <div class="message-board">
    <h2>留言板</h2>
    
    <!-- 留言表单 -->
    <form @submit.prevent="submitMessage" class="message-form">
      <div class="form-group">
        <input
          v-model="newMessage.username"
          type="text"
          placeholder="你的名字"
          required
          class="input-field"
        />
      </div>
      <div class="form-group">
        <textarea
          v-model="newMessage.content"
          placeholder="留言内容..."
          required
          rows="4"
          class="textarea-field"
        ></textarea>
      </div>
      <button type="submit" :disabled="loading" class="submit-btn">
        {{ loading ? '提交中...' : '提交留言' }}
      </button>
    </form>

    <!-- 留言列表 -->
    <div class="messages-list">
      <div v-if="loadingMessages" class="loading">加载中...</div>
      
      <div v-else-if="messages.length === 0" class="empty-state">
        还没有留言，快来第一条吧！
      </div>

      <div v-else class="messages">
        <div v-for="message in messages" :key="message.id" class="message-card">
          <div class="message-header">
            <span class="username">{{ message.username }}</span>
            <span class="timestamp">
              {{ formatDate(message.created_at) }}
            </span>
          </div>
          <div class="message-content">{{ message.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabase/client'

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

    // 获取所有留言
    const fetchMessages = async () => {
      try {
        loadingMessages.value = true
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        messages.value = data
      } catch (error) {
        console.error('获取留言失败:', error.message)
        alert('获取留言失败，请刷新重试')
      } finally {
        loadingMessages.value = false
      }
    }

    // 提交新留言
    const submitMessage = async () => {
      if (!newMessage.value.username.trim() || !newMessage.value.content.trim()) {
        alert('请填写名字和留言内容')
        return
      }

      try {
        loading.value = true
        const { error } = await supabase
          .from('messages')
          .insert([{
            username: newMessage.value.username.trim(),
            content: newMessage.value.content.trim()
          }])

        if (error) throw error

        // 清空表单并重新获取留言
        newMessage.value = { username: '', content: '' }
        await fetchMessages()
        
        alert('留言成功！')
      } catch (error) {
        console.error('提交留言失败:', error.message)
        alert('留言提交失败，请重试')
      } finally {
        loading.value = false
      }
    }

    // 格式化日期
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    // 组件挂载时获取留言
    onMounted(() => {
      fetchMessages()
    })

    return {
      messages,
      loading,
      loadingMessages,
      newMessage,
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
  padding: 20px;
}

.message-form {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.textarea-field {
  resize: vertical;
  min-height: 80px;
}

.submit-btn {
  background-color: #42b883;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
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
  border-radius: 8px;
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

.username {
  font-weight: bold;
  color: #333;
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