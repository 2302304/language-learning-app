// Tallenna edistyminen
export const saveProgress = (vocabId, progress) => {
  const data = {
    vocabId,
    completedWords: progress.completedWords,
    lastStudied: new Date().toISOString(),
  }
  localStorage.setItem(`vocab_progress_${vocabId}`, JSON.stringify(data))
}

// Hae edistyminen
export const loadProgress = (vocabId) => {
  const saved = localStorage.getItem(`vocab_progress_${vocabId}`)
  if (saved) {
    return JSON.parse(saved)
  }
  return null
}

// Hae kaikki edistymistiedot
export const getAllProgress = () => {
  const progress = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.startsWith('vocab_progress_')) {
      const vocabId = key.replace('vocab_progress_', '')
      progress[vocabId] = JSON.parse(localStorage.getItem(key))
    }
  }
  return progress
}

// Tyhjennä tietyn sanaston edistyminen
export const clearProgress = (vocabId) => {
  localStorage.removeItem(`vocab_progress_${vocabId}`)
}

// Tallenna oppimisputki
export const saveStreak = (date) => {
  const streakData = loadStreakData()
  if (!streakData.dates.includes(date)) {
    streakData.dates.push(date)
    streakData.currentStreak = calculateStreak(streakData.dates)
    localStorage.setItem('learning_streak', JSON.stringify(streakData))
  }
}

// Lataa oppimisputki
export const loadStreakData = () => {
  const saved = localStorage.getItem('learning_streak')
  if (saved) {
    return JSON.parse(saved)
  }
  return { dates: [], currentStreak: 0 }
}

// Laske oppimisputki
const calculateStreak = (dates) => {
  if (dates.length === 0) return 0
  
  const sortedDates = [...dates].sort().reverse()
  const today = new Date().toISOString().split('T')[0]
  
  if (sortedDates[0] !== today && sortedDates[0] !== getPreviousDate(today)) {
    return 0
  }
  
  let streak = 1
  for (let i = 0; i < sortedDates.length - 1; i++) {
    const current = new Date(sortedDates[i])
    const next = new Date(sortedDates[i + 1])
    const diffDays = Math.floor((current - next) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }
  
  return streak
}

// Apufunktio: edellinen päivä
const getPreviousDate = (dateString) => {
  const date = new Date(dateString)
  date.setDate(date.getDate() - 1)
  return date.toISOString().split('T')[0]
}