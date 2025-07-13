import { get, writable } from "svelte/store";
import { settings } from "./settings.svelte";

let firefoxVoiceLoadedRetryCount = 300;

export var voices = writable<SpeechSynthesisVoice[]>([]);

export function loadVoices(eventNameToFire: string) {
	let firefoxVoiceLoadedEventInterval = setInterval(() => {
		if (!firefoxVoiceLoadedRetryCount) {
			clearInterval(firefoxVoiceLoadedEventInterval);
			alert('Unable to load voice list.');
			return;
		}

		if (speechSynthesis.getVoices().length) {
			_proceedWithProcess(speechSynthesis.getVoices());
			return;
		}

		firefoxVoiceLoadedRetryCount -= 1;
	}, 100);

	speechSynthesis.onvoiceschanged = (_: Event) => {
		_proceedWithProcess(speechSynthesis.getVoices());
	};

	function _proceedWithProcess(voiceList: SpeechSynthesisVoice[]) {
		clearInterval(firefoxVoiceLoadedEventInterval);

		voices.set(voiceList);

		document.dispatchEvent(new CustomEvent(eventNameToFire));
	}
}

export function doSpeak(theText: string) {
	speechSynthesis.cancel();

	let speech = new SpeechSynthesisUtterance(theText);

	speech.text = theText;

	let voices = speechSynthesis.getVoices();

	if (!voices.length) {
		return;
	}

	if ((get(settings) || {})?.voice) {
		speech.voice = voices.find((v) => v.name === get(settings).voice);
	}
	
	if (!speech.voice) {
		speech.voice = voices[0];
	}

	speech.volume = parseFloat("1");
	
	speechSynthesis.speak(speech);
}


