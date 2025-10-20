import { useState, useEffect } from 'react'

function FlashCard({ word, direction, onAnswer, progress }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const question = direction === 'en-fi' ? word.english : word.finnish
  const answer = direction === 'en-fi' ? word.finnish : word.english

  const handleFlip = () => {
    setIsFlipped(true)
  }

  const handleAnswer = (knew) => {
    setIsFlipped(false)
    onAnswer(knew)
  }

  // Näppäimistötuki
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && !isFlipped) {
        e.preventDefault()
        handleFlip()
      } else if (isFlipped) {
        if (e.code === 'ArrowLeft' || e.code === 'Digit1') {
          handleAnswer(false)
        } else if (e.code === 'ArrowRight' || e.code === 'Digit2') {
          handleAnswer(true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isFlipped])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Edistymispalkki */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Edistyminen: {progress.current} / {progress.total}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((progress.current / progress.total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[400px] flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Kysymys */}
            <div className="text-center mb-8">
              <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
                {direction === 'en-fi' ? 'English' : 'Suomi'}
              </p>
              <h2 className="text-5xl font-bold text-gray-800 mb-8">
                {question}
              </h2>
            </div>

            {/* Vastaus (näkyy vain kun flipattu) */}
            {isFlipped ? (
              <div className="text-center mb-8 animate-fadeIn">
                <p className="text-sm text-blue-600 mb-2 uppercase tracking-wide font-semibold">
                  {direction === 'en-fi' ? 'Suomi' : 'English'}
                </p>
                <h3 className="text-4xl font-bold text-blue-600">
                  {answer}
                </h3>
              </div>
            ) : (
              <div className="mb-8">
                <button
                  onClick={handleFlip}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Näytä vastaus
                </button>
              </div>
            )}
          </div>

          {/* Vastausnapit */}
          {isFlipped && (
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => handleAnswer(false)}
                className="flex-1 bg-red-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-red-600 transition-colors"
              >
                ❌ En osannut
              </button>
              <button
                onClick={() => handleAnswer(true)}
                className="flex-1 bg-green-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors"
              >
                ✓ Osasin
              </button>
            </div>
          )}
        </div>

        {/* Info-teksti */}
        {!isFlipped && (
          <p className="text-center text-gray-600 mt-4 text-sm">
            💡 Vinkki: Voit myös painaa välilyöntiä näyttääksesi vastauksen
          </p>
        )}
      </div>
    </div>
  )
}

export default FlashCard