const state = {
    isListening: false,
    detectedWord: '',
  };
  
  const mutations = {
    setIsListening(state, isListening) {
      state.isListening = isListening;
    },
    setDetectedWord(state, word) {
      state.detectedWord = word;
    },
  };
  
  const actions = {
    startListening({ commit }) {
      // Start speech recognition here using the web-speech-api polyfill
      const recognition = new window.SpeechRecognition();
      
      recognition.onstart = () => {
        commit('setIsListening', true);
      };
  
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        commit('setDetectedWord', transcript);
      };
  
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
  
      recognition.onend = () => {
        commit('setIsListening', false);
      };
  
      recognition.start();
    },
    stopListening() {
      // Stop speech recognition here
      // You can implement this if you want to explicitly stop listening
    },
  };
  
  const getters = {
    isListening: state => state.isListening,
    detectedWord: state => state.detectedWord,
  };
  
  export const voiceStore = ({
    state,
    mutations,
    actions,
    getters,
  });