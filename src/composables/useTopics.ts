import { ref } from 'vue'

export interface Topic {
  name: string
  desc: string
  color?: string
  settingType?: 'ai' | 'general'
  scenario?: string
  keywords?: string
  keywordDesc?: string
  viewableMember?: string
}

// 全域主題列表（可依實際情況改為 Pinia / API 來源）
const topics = ref<Topic[]>([
  { name: '科技', desc: '科技相關新聞、趨勢、產業動態與技術評論', color: '#2196F3', settingType: 'general' },
  { name: '財經', desc: '財經政策、股市走勢、投資理財與產業分析', color: '#4CAF50', settingType: 'general' },
  { name: '生活', desc: '日常生活、健康醫療、旅遊與美食資訊', color: '#FF9800', settingType: 'general' },
  { name: '娛樂', desc: '影視音、名人動態與娛樂綜合內容', color: '#E91E63', settingType: 'general' },
  { name: '體育', desc: '國內外體育賽事與運動相關評論', color: '#9C27B0', settingType: 'general' }
])

export function useTopics() {
  function addTopic(topic: Topic) {
    if (topics.value.some(t => t.name === topic.name)) {
      throw new Error('主題名稱已存在')
    }
    topics.value.push(topic)
  }
  function updateTopic(oldName: string, next: Topic) {
    const idx = topics.value.findIndex(t => t.name === oldName)
    if (idx === -1) return
    if (oldName !== next.name && topics.value.some(t => t.name === next.name)) {
      throw new Error('主題名稱已存在')
    }
    topics.value[idx] = { ...next }
  }
  function deleteTopic(name: string) {
    topics.value = topics.value.filter(t => t.name !== name)
  }
  function moveTopic(from: number, to: number) {
    if (from === to || from < 0 || to < 0 || from >= topics.value.length || to >= topics.value.length) return
    const item = topics.value.splice(from, 1)[0]
    topics.value.splice(to, 0, item)
  }
  // 模擬異步同步 (未真正呼叫後端)
  async function syncToServer() {
    return new Promise(resolve => setTimeout(resolve, 200))
  }
  async function loadFromServer() {
    return new Promise<Topic[]>(resolve => setTimeout(() => resolve(topics.value), 200))
  }
  return { topics, addTopic, updateTopic, deleteTopic, moveTopic, syncToServer, loadFromServer }
}
