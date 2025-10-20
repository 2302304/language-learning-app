import { useState, useEffect } from 'react'
import VocabularySelector from './components/VocabularySelector'
import FlashCard from './components/FlashCard'
import ResultsView from './components/ResultsView'
import Statistics from './components/Statistics'
import vocabularyData from './data/vocabularies.json'
import { saveProgress, saveStreak } from './utils/storage'

function App() {
  const [selectedVocab, setSelectedVocab] = useState(null)
  const [direction, setDirection] = useState('en-fi')
  const [isLearning, setIsLearning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [completedWords, setCompletedWords] = useState([])
  const [shuffledWords, setShuffledWords] = useState([])

  // 🔀 Sekoitusfunktio (Fisher–Yates)
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Kuuntele tilastot-painiketta
  useEffect(() => {
    const handleShowStats = () => setShowStats(true)
    window.addEventListener('showStats', handleShowStats)
    return () => window.removeEventListener('showStats', handleShowStats)
  }, [])

  const handleStartLearning = () => {
    if (selectedVocab) {
      const currentVocab = vocabularyData.vocabularies.find(v => v.id === selectedVocab)

      // 🔀 Sekoita sanat ennen oppimisen aloitusta
      const mixed = shuffleArray(currentVocab.words)
      setShuffledWords(mixed)

      setIsLearning(true)
      setShowResults(false)
      setCurrentWordIndex(0)
      setCompletedWords([])
    }
  }

  const handleAnswer = (knew) => {
    const currentWord = shuffledWords[currentWordIndex]
    
    const updatedCompleted = [...completedWords, { word: currentWord, knew }]
    setCompletedWords(updatedCompleted)

    // Tallenna edistyminen
    saveProgress(selectedVocab, { completedWords: updatedCompleted })

    // Siirry seuraavaan sanaan tai näytä tulokset
    if (currentWordIndex < shuffledWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      // Tallenna oppimisputki
      const today = new Date().toISOString().split('T')[0]
      saveStreak(today)
      
      setIsLearning(false)
      setShowResults(true)
    }
  }

  const handleBackToMenu = () => {
    setIsLearning(false)
    setShowResults(false)
    setShowStats(false)
    setSelectedVocab(null)
    setCurrentWordIndex(0)
    setCompletedWords([])
    setShuffledWords([])
  }

  const handleRestart = () => {
    // 🔁 Sekoita sanat uudelleen
    const mixed = shuffleArray(shuffledWords)
    setShuffledWords(mixed)

    setCurrentWordIndex(0)
    setCompletedWords([])
    setShowResults(false)
    setIsLearning(true)
  }

  // Tilastot
  if (showStats) {
    return (
      <Statistics
        vocabularies={vocabularyData.vocabularies}
        onBack={() => setShowStats(false)}
      />
    )
  }

  // Tulosnäkymä
  if (showResults) {
    return (
      <ResultsView
        results={completedWords}
        totalWords={shuffledWords.length}
        onRestart={handleRestart}
        onBackToMenu={handleBackToMenu}
      />
    )
  }

  // Oppiminen käynnissä
  if (isLearning) {
    const currentWord = shuffledWords[currentWordIndex]

    return (
      <FlashCard
        word={currentWord}
        direction={direction}
        onAnswer={handleAnswer}
        progress={{
          current: currentWordIndex + 1,
          total: shuffledWords.length
        }}
      />
    )
  }

  // Valikko
  return (
    <VocabularySelector
      vocabularies={vocabularyData.vocabularies}
      onSelect={(vocabId) => {
        setSelectedVocab(vocabId)
        if (vocabId) {
          handleStartLearning()
        }
      }}
      selectedVocab={selectedVocab}
      direction={direction}
      onDirectionChange={setDirection}
    />
  )
}

export default App
