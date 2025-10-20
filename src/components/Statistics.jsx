import { useEffect, useState } from 'react'
import { getAllProgress, loadStreakData } from '../utils/storage'

function Statistics({ vocabularies, onBack, onContinue }) {
  const [progressData, setProgressData] = useState({})
  const [streakData, setStreakData] = useState({ currentStreak: 0 })

  useEffect(() => {
    setProgressData(getAllProgress())
    setStreakData(loadStreakData())
  }, [])

  const totalWordsStudied = Object.values(progressData).reduce(
    (sum, prog) => sum + (prog.completedWords?.length || 0),
    0
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📊 Tilastot
        </h1>

        {/* Oppimisputki */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">🔥</span>
            <div>
              <div className="text-3xl font-bold text-orange-600">
                {streakData.currentStreak} päivää
              </div>
              <div className="text-sm text-gray-600">Oppimisputki</div>
            </div>
          </div>
        </div>

        {/* Yleistilastot */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {totalWordsStudied}
            </div>
            <div className="text-sm text-gray-600">
              Opiskeltua sanaa
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {Object.keys(progressData).length}
            </div>
            <div className="text-sm text-gray-600">
              Aloitettua sanastoa
            </div>
          </div>
        </div>

        {/* Sanasto-kohtainen edistyminen */}
        <div className="mb-6">
          <h2 className="font-semibold text-gray-700 mb-3">
            Sanastojen edistyminen:
          </h2>
          <div className="space-y-3">
            {vocabularies.map((vocab) => {
              const progress = progressData[vocab.id]
              const completed = progress?.completedWords?.length || 0
              const percentage = Math.round((completed / vocab.wordCount) * 100)

              return (
                <div key={vocab.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">
                      {vocab.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      {completed} / {vocab.wordCount}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  {progress && (
                    <div className="text-xs text-gray-500 mt-2">
                      Viimeksi opiskeltu:{' '}
                      {new Date(progress.lastStudied).toLocaleDateString('fi-FI')}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <button
          onClick={onBack}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          ← Takaisin
        </button>
      </div>
    </div>
  )
}

export default Statistics