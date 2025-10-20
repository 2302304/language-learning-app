function ResultsView({ results, totalWords, onRestart, onBackToMenu }) {
  const correctCount = results.filter(r => r.knew).length
  const percentage = Math.round((correctCount / totalWords) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Hienoa työtä! 🎉
          </h1>
          <p className="text-gray-600">
            Suoritit koko sanaston läpi
          </p>
        </div>

        {/* Tilastot */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">
              {totalWords}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Sanaa yhteensä
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-600">
              {correctCount}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Osasit
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-purple-600">
              {percentage}%
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Oikein
            </div>
          </div>
        </div>

        {/* Edistymispalkki */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Osaaminen</span>
            <span>{correctCount} / {totalWords}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Vaikeat sanat */}
        {results.filter(r => !r.knew).length > 0 && (
          <div className="mb-8 bg-yellow-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">
              💡 Kertaa näitä sanoja:
            </h3>
            <div className="space-y-2">
              {results
                .filter(r => !r.knew)
                .slice(0, 5)
                .map((r, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-700">{r.word.english}</span>
                    <span className="text-gray-600">→</span>
                    <span className="text-gray-700 font-semibold">{r.word.finnish}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Toimintopainikkeet */}
        <div className="flex gap-4">
          <button
            onClick={onBackToMenu}
            className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            ← Takaisin valikkoon
          </button>
          <button
            onClick={onRestart}
            className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            🔄 Harjoittele uudelleen
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultsView