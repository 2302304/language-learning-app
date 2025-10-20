function VocabularySelector({ vocabularies, onSelect, selectedVocab, direction, onDirectionChange }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
        <div className="flex justify-end mb-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('showStats'))}
            className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-200 transition-colors text-sm"
          >
            📊 Tilastot
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Language Learning
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Valitse sanasto aloittaaksesi
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Valitse sanasto:
            </h2>
            <div className="space-y-2">
              {vocabularies.map((vocab) => (
                <label
                  key={vocab.id}
                  className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                  style={{
                    borderColor: selectedVocab === vocab.id ? '#3b82f6' : '#e5e7eb',
                  }}
                >
                  <input
                    type="radio"
                    name="vocabulary"
                    value={vocab.id}
                    checked={selectedVocab === vocab.id}
                    onChange={(e) => onSelect(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="ml-3 flex-1">
                    <div className="font-semibold text-gray-800">
                      {vocab.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {vocab.wordCount} sanaa • {vocab.level}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Suunta:
            </h2>
            <div className="space-y-2">
              <label
                className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                style={{
                  borderColor: direction === 'en-fi' ? '#3b82f6' : '#e5e7eb',
                }}
              >
                <input
                  type="radio"
                  name="direction"
                  value="en-fi"
                  checked={direction === 'en-fi'}
                  onChange={(e) => onDirectionChange(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3 text-gray-800">
                  Englanti → Suomi
                </span>
              </label>

              <label
                className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                style={{
                  borderColor: direction === 'fi-en' ? '#3b82f6' : '#e5e7eb',
                }}
              >
                <input
                  type="radio"
                  name="direction"
                  value="fi-en"
                  checked={direction === 'fi-en'}
                  onChange={(e) => onDirectionChange(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3 text-gray-800">
                  Suomi → Englanti
                </span>
              </label>
            </div>
          </div>

          <button
            onClick={() => onSelect(selectedVocab)}
            disabled={!selectedVocab}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mt-6"
          >
            Aloita oppiminen
          </button>
        </div>
      </div>
    </div>
  );
}

export default VocabularySelector;
