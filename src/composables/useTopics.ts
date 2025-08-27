import { ref } from 'vue'

export interface Topic {
  name: string
  desc?: string
  color?: string
  settingType?: 'ai' | 'general'
  scenario?: string
  keywords?: string
  keywordDesc?: string
  viewableMember?: string
  members?: string[]
}

const topics = ref<Topic[]>([
  {
    name: '科技趨勢',
    desc: '關於最新科技發展的討論',
    color: '#2196F3',
    keywords: 'AI, 人工智慧, 機器學習, ChatGPT, 科技',
    settingType: 'general',
    viewableMember: 'admin',
    members: []
  },
  {
    name: '市場分析',
    desc: '股市與投資相關內容',
    color: '#4CAF50',
    keywords: '股市, 投資, 基金, 財經, 經濟',
    settingType: 'general',
    viewableMember: 'admin',
    members: []
  },
  {
    name: '健康生活',
    desc: '健康與生活方式相關話題',
    color: '#FF9800',
    keywords: '健康, 運動, 飲食, 醫療, 養生',
    settingType: 'general',
    viewableMember: 'admin',
    members: []
  }
])

export function useTopics() {
  const addTopic = (topic: Topic) => {
    // 檢查名稱是否重複
    const exists = topics.value.some(t => t.name === topic.name)
    if (exists) {
      throw new Error('主題名稱已存在')
    }

    const newTopic: Topic = {
      ...topic,
      members: topic.members || []
    }

    topics.value.push(newTopic)
  }

  const updateTopic = (originalName: string, updatedTopic: Topic) => {
    const index = topics.value.findIndex(t => t.name === originalName)
    if (index === -1) {
      throw new Error('找不到要更新的主題')
    }

    // 如果改名，檢查新名稱是否重複
    if (originalName !== updatedTopic.name) {
      const exists = topics.value.some(t => t.name === updatedTopic.name)
      if (exists) {
        throw new Error('主題名稱已存在')
      }
    }

    topics.value[index] = {
      ...topics.value[index],
      ...updatedTopic,
      members: updatedTopic.members || topics.value[index].members || []
    }
  }

  const deleteTopic = (name: string) => {
    const index = topics.value.findIndex(t => t.name === name)
    if (index === -1) {
      throw new Error('找不到要刪除的主題')
    }
    topics.value.splice(index, 1)
  }

  const getTopic = (name: string) => {
    return topics.value.find(t => t.name === name)
  }

  const reorderTopics = (fromIndex: number, toIndex: number) => {
    const topic = topics.value.splice(fromIndex, 1)[0]
    topics.value.splice(toIndex, 0, topic)
  }

  const moveTopic = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return
    const topic = topics.value.splice(fromIndex, 1)[0]
    topics.value.splice(toIndex, 0, topic)
  }

  return {
    topics,
    addTopic,
    updateTopic,
    deleteTopic,
    getTopic,
    reorderTopics,
    moveTopic
  }
}
