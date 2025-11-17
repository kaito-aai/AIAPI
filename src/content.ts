const getDetector = () => {
  return LanguageDetector.create({
    monitor(m) {
      m.addEventListener("downloadprogress", (e) => {
        console.log(`Downloaded ${e.loaded * 100}%`);
      });
    },
  });
};

const getTranslator = (detectedLanguage: string) => {
  return Translator.create({
    sourceLanguage: detectedLanguage,
    targetLanguage: window.navigator.language,
    monitor(m) {
      m.addEventListener("downloadprogress", (e) => {
        console.log(`Downloaded ${e.loaded * 100}%`);
      });
    },
  });
};

const func = async (text: string) => {
  const detector = await getDetector();

  const results = await detector.detect(text);
  const detectedLanguage = results[0]?.detectedLanguage;
  console.log(detectedLanguage);
  if (!detectedLanguage) {
    return;
  }
  const translator = await getTranslator(detectedLanguage);
  const result = await translator.translate(text);

  console.log(result);
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.action === "detect") {
    func(message.text).then(sendResponse);
    return true;
  }
});
