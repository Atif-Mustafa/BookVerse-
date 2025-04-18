import { useEffect, useState } from 'react';
import styles from './Translator.module.css';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { IoIosSwap } from 'react-icons/io';
const Translator = () => {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('Translate');

    const [sourceLanguage, setSourceLanguage] = useState('en')
    const [targetLanguage, setTargetLanguage] = useState('hi')



    async function getTranslation() {
        const url = 'https://google-api31.p.rapidapi.com/gtranslate';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': 'acf9fff77fmsh32a838509a556b4p106c28jsn5e7252ac09ae',
                'x-rapidapi-host': 'google-api31.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text:  text ,
                to:  targetLanguage ,
                from_lang:  sourceLanguage 
            })
        };

        try {
            const response = await fetch(url, options);
            // console.log(response)
            const result = await response.json();
            // console.log(result);
            setTranslatedText(result.translated_text || 'Translation Unavailable')
        } catch (error) {
            console.error(error);
        }
    }
   

   
    const languages = [
        { code: "af", name: "Afrikaans" },
        { code: "sq", name: "Albanian" },
        { code: "am", name: "Amharic" },
        { code: "ar", name: "Arabic" },
        { code: "hy", name: "Armenian" },
        { code: "az", name: "Azerbaijani" },
        { code: "eu", name: "Basque" },
        { code: "bn", name: "Bengali" },
        { code: "bs", name: "Bosnian" },
        { code: "bg", name: "Bulgarian" },
        { code: "ca", name: "Catalan" },
        { code: "ceb", name: "Cebuano" },
        { code: "zh", name: "Chinese (Simplified)" },
        { code: "zh-TW", name: "Chinese (Traditional)" },
        { code: "hr", name: "Croatian" },
        { code: "cs", name: "Czech" },
        { code: "da", name: "Danish" },
        { code: "nl", name: "Dutch" },
        { code: "en", name: "English" },
        { code: "eo", name: "Esperanto" },
        { code: "et", name: "Estonian" },
        { code: "fi", name: "Finnish" },
        { code: "fr", name: "French" },
        { code: "de", name: "German" },
        { code: "el", name: "Greek" },
        { code: "gu", name: "Gujarati" },
        { code: "hi", name: "Hindi" },
        { code: "hu", name: "Hungarian" },
        { code: "id", name: "Indonesian" },
        { code: "it", name: "Italian" },
        { code: "ja", name: "Japanese" },
        { code: "kn", name: "Kannada" },
        { code: "ko", name: "Korean" },
        { code: "lt", name: "Lithuanian" },
        { code: "ml", name: "Malayalam" },
        { code: "mr", name: "Marathi" },
        { code: "ne", name: "Nepali" },
        { code: "no", name: "Norwegian" },
        { code: "fa", name: "Persian" },
        { code: "pl", name: "Polish" },
        { code: "pt", name: "Portuguese" },
        { code: "pa", name: "Punjabi" },
        { code: "ro", name: "Romanian" },
        { code: "ru", name: "Russian" },
        { code: "sr", name: "Serbian" },
        { code: "si", name: "Sinhala" },
        { code: "sk", name: "Slovak" },
        { code: "sl", name: "Slovenian" },
        { code: "es", name: "Spanish" },
        { code: "sv", name: "Swedish" },
        { code: "ta", name: "Tamil" },
        { code: "te", name: "Telugu" },
        { code: "th", name: "Thai" },
        { code: "tr", name: "Turkish" },
        { code: "uk", name: "Ukrainian" },
        { code: "ur", name: "Urdu" },
        { code: "vi", name: "Vietnamese" },
        { code: "cy", name: "Welsh" },
    ];

    const handleTranslateBtnClick = () => {
        if (!text.trim()) {
            alert("Please enter text to translate.");
            return;
        }
        
        getTranslation();
    }

    const swap = () => {
        let temp = sourceLanguage;
        setSourceLanguage(targetLanguage);
        setTargetLanguage(temp);
    }
    let counter=0;
    const func = () => {
        counter++;
        console.log(counter)
        getTranslation()
    }
    const handleInputChange = (e) => {
        setText(e.target.value);
        debouncedTranslation();
    }
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func(...args)
            }, delay)
        }
       }
    const debouncedTranslation = debounce(func, 500);

    


    return (
        // <div className={styles.translatorContainer}>
        //     <h1>Translator</h1>
        //     <div className={styles.translator}>
        //         <div className={styles.translatorInput}>
        //             <textarea
        //                 placeholder="Type your text here"
        //                 value={text}
        //                 onChange={(e) => setText(e.target.value)}
        //             />
        //         </div>
        //         <div className={styles.translatorOutput}>
        //             <textarea
        //                 placeholder="Translation will appear here"
        //                 value={translatedText}
        //                 readOnly
        //             />
        //         </div>
        //     </div>
        //     <div className={styles.translatorButtons}>
        //         <button onClick={translateText}>Translate</button>
        //         <button onClick={clearText}>Clear</button>
        //     </div>
        // </div>
        <div className={styles.translatorContainer}>
            <div className={styles.info}>
                <h1>Welcome to our Book translator feature!</h1>
                <p>With our tool, you can effortlessly translate movie titles, descriptions, and reviews between any languages. Break language barriers, explore global cinema, and connect with international audiences seamlessly. Enhance your movie-watching experience with our movie translator!</p>
                <img src="https://cdn3d.iconscout.com/3d/premium/thumb/translate-9176634-7475583.png" alt="" />
            </div>
            <div className={styles.rightContainer}>

                <div className={styles.change}>
                    {/* Source Language Select */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">From</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={sourceLanguage}
                            onChange={(e) => setSourceLanguage(e.target.value)}
                            label="From"
                            className={styles.selectEl} >
                            {languages.map((lang) => (
                                <MenuItem key={lang.code} value={lang.code}>
                                    {lang.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className={styles.arrow} onClick={swap}>
                        <IoIosSwap />
                    </div>
                    {/* Target Language Select */}
                    <FormControl fullWidth>
                        <InputLabel>To</InputLabel>
                        <Select
                            value={targetLanguage}
                            onChange={(e) => setTargetLanguage(e.target.value)}
                            label="To"
                            className={styles.selectEl}>
                            {languages.map((lang) => (
                                <MenuItem key={lang.code} value={lang.code}>
                                    {lang.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={styles.converterContainer}>
                    <div className={styles.inputText}>
                        <textarea type="text" placeholder='Enter Text' onChange={handleInputChange} />
                    </div>
                    {/* output */}
                    <div className={styles.outputText}>
                        <p>{translatedText}</p></div>
                </div>
                <button className={styles.translateBtn} onClick={handleTranslateBtnClick}>Translate</button>
            </div>
        </div>
    )
}
export default Translator;