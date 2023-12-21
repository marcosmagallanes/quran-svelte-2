// Arabic to Latin character mapping
const arabicToLatinMap = {
	ا: 'a',
	ب: 'b',
	ت: 't',
	ث: 'th',
	ج: 'j',
	ح: 'h',
	خ: 'kh',
	د: 'd',
	ذ: 'dh',
	ر: 'r',
	ز: 'z',
	س: 's',
	ش: 'sh',
	ص: 's',
	ض: 'd',
	ط: 't',
	ظ: 'dh',
	ع: 'ā',
	غ: 'gh',
	ف: 'f',
	ق: 'q',
	ك: 'k',
	ل: 'l',
	م: 'm',
	ن: 'n',
	ه: 'h',
	و: 'ū',
	ي: 'y',
	// Diacritic marks (commonly used)
	'َ': 'a', // Fatha
	'ُ': 'u', // Damma
	'ِ': 'i',
	' ': ' '
	// ... other diacritics ...
};

// Transliterator function
export default function transliterateArabic(inputText: string) {
	let transliteratedText = '';
	let previousCharWasDiacritic = false;

	for (let i = 0; i < inputText.length; i++) {
		let character = inputText[i];
		let nextCharacter = i + 1 < inputText.length ? inputText[i + 1] : '';

		// Example of using nextCharacter for special cases
		if (character === 'ل' && nextCharacter === 'ا') {
			// Special transliteration for 'ل' followed by 'ا'
			transliteratedText += 'la'; // Custom transliteration
			i++; // Skip the next character as it's already handled
			continue;
		}
		if (character === 'ٱ' && nextCharacter === 'ل') {
			transliteratedText += 'al-'; // Custom transliteration
			i++; // Skip the next character as it's already handled
			continue;
		}
		if (character === 'ا' && nextCharacter === '\u0653') {
			transliteratedText += 'ā'; // Custom transliteration
			i++; // Skip the next character as it's already handled
			continue;
		}
		if (arabicToLatinMap.hasOwnProperty(character)) {
			if (isDiacritic(character)) {
				// Handle diacritic marks
				if (!previousCharWasDiacritic) {
					transliteratedText += arabicToLatinMap[character];
				}
				previousCharWasDiacritic = true;
			} else {
				// Replace the Arabic character with its Latin counterpart
				transliteratedText += arabicToLatinMap[character];
				previousCharWasDiacritic = false;
			}
		} else {
			// Keep the character as is if not in the map
			//   transliteratedText += character;
			transliteratedText += '';
			previousCharWasDiacritic = false;
		}
	}

	return transliteratedText;
}

// Helper function to check if a character is a diacritic
function isDiacritic(character: string) {
	return ['َ', 'ُ', 'ِ'].includes(character);
}
