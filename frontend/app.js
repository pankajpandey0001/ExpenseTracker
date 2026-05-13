const { useState, useEffect } = React;
const API_URL = "http://localhost:8000";

// --- O(1) LOCALIZATION DICTIONARY (ALL 22 OFFICIAL INDIAN LANGUAGES + ENGLISH) ---
const TRANSLATIONS = {
    en: { // English
        title: "Intelligent Budget", settings: "Settings", logout: "Logout",
        addSec: "Add Expense", name: "Item Name", cost: "Cost (INR)", priority: "Priority (1-10)",
        addBtn: "Add Item", listSec: "My Budget", empty: "No expenses...",
        aiTitle: "AI Optimizer", setBudget: "Set Max Budget", optBtn: "Run Optimizer",
        limit: "Limit", rec: "Recommended", sel: "Optimized List",
        globalSet: "App Preferences", selectLang: "1. Select App Language", 
        selectTarget: "2. Convert Total To (Live Rate)", saveBtn: "Apply Changes",
        login: "Login", register: "Register", signIn: "Sign In", signUp: "Sign Up",
        needAcc: "Need an account? Register", haveAcc: "Have an account? Login"
    },
    as: { // Assamese
        title: "স্মার্ট বাজেট", settings: "ছেটিংছ", logout: "লগ আউট",
        addSec: "খৰচ যোগ কৰক", name: "সামগ্ৰীৰ নাম", cost: "মূল্য (INR)", priority: "অগ্ৰাধিকাৰ (1-10)",
        addBtn: "যোগ কৰক", listSec: "মোৰ বাজেট", empty: "কোনো খৰচ নাই...",
        aiTitle: "AI অপ্টিমাইজৰ", setBudget: "সৰ্বোচ্চ বাজেট নিৰ্ধাৰণ কৰক", optBtn: "অপ্টিমাইজ কৰক",
        limit: "সীমা", rec: "পৰামৰ্শিত", sel: "অপ্টিমাইজ কৰা তালিকা",
        globalSet: "এপৰ পছন্দসমূহ", selectLang: "1. এপৰ ভাষা বাছক", 
        selectTarget: "2. ৰূপান্তৰ কৰক (Live Rate)", saveBtn: "প্ৰয়োগ কৰক",
        login: "লগ ইন", register: "পঞ্জীয়ন কৰক", signIn: "ছাইন ইন", signUp: "ছাইন আপ",
        needAcc: "একাউণ্ট লাগে? পঞ্জীয়ন কৰক", haveAcc: "একাউণ্ট আছে? লগ ইন"
    },
    bn: { // Bengali
        title: "স্মার্ট বাজেট", settings: "সেটিংস", logout: "লগআউট",
        addSec: "খরচ যোগ করুন", name: "আইটেমের নাম", cost: "খরচ (INR)", priority: "অগ্রাধিকার (1-10)",
        addBtn: "যোগ করুন", listSec: "আমার বাজেট", empty: "কোনো খরচ নেই...",
        aiTitle: "AI অপ্টিমাইজার", setBudget: "সর্বোচ্চ বাজেট সেট করুন", optBtn: "অপ্টিমাইজার চালান",
        limit: "সীমা", rec: "প্রস্তাবিত", sel: "অপ্টিমাইজ করা তালিকা",
        globalSet: "অ্যাপ পছন্দসমূহ", selectLang: "1. ভাষা নির্বাচন করুন", 
        selectTarget: "2. রূপান্তর করুন (Live Rate)", saveBtn: "প্রয়োগ করুন",
        login: "লগইন", register: "নিবন্ধন করুন", signIn: "প্রবেশ করুন", signUp: "নিবন্ধন করুন",
        needAcc: "অ্যাকাউন্ট দরকার? নিবন্ধন করুন", haveAcc: "অ্যাকাউন্ট আছে? লগইন করুন"
    },
    brx: { // Bodo
        title: "स्मार्ट बाजेत", settings: "सेटिंफोर", logout: "लॉग आउट",
        addSec: "खरसा दाजाब", name: "मुवानि मुङ", cost: "खरसा (INR)", priority: "गोनांथि (1-10)",
        addBtn: "दाजाब", listSec: "आंनि बाजेत", empty: "जेबो खरसा गैया...",
        aiTitle: "AI अप्टिमाइजर", setBudget: "बांसिन बाजेत थि खालाम", optBtn: "अप्टिमाइजर चलाय",
        limit: "सिमा", rec: "मोजां होननाय", sel: "अप्टिमाइज खालामनाय फारिलाइ",
        globalSet: "एपनि मोजां मोननाय", selectLang: "1. रावाखौ सायख", 
        selectTarget: "2. सोलाय (Live Rate)", saveBtn: "बाहाय",
        login: "लॉग इन", register: "मुं थिसन", signIn: "साइन इन", signUp: "साइन अप",
        needAcc: "एकाउन्ट नांगौ? मुं थिसन", haveAcc: "एकाउन्ट दं? लॉग इन"
    },
    doi: { // Dogri
        title: "स्मार्ट बजट", settings: "सैटिंगां", logout: "लाग आउट",
        addSec: "खर्चा जोड़ो", name: "चीजा दा नां", cost: "खर्चा (INR)", priority: "पहल (1-10)",
        addBtn: "जोड़ो", listSec: "मेरा बजट", empty: "कोई खर्चा नेईं...",
        aiTitle: "AI ऑप्टिमाइजर", setBudget: "बधो-बध बजट तय करो", optBtn: "ऑप्टिमाइजर चलाओ",
        limit: "हद्द", rec: "सिफारिश कीती दी", sel: "ऑप्टिमाइज कीती दी सूची",
        globalSet: "ऐपै दी तरजीह", selectLang: "1. भाशा चुनो", 
        selectTarget: "2. बदलो (Live Rate)", saveBtn: "लागू करो",
        login: "लाग इन", register: "रजिस्टर करो", signIn: "साइन इन", signUp: "साइन अप",
        needAcc: "खाता चाहीदा? रजिस्टर करो", haveAcc: "खाता ऐ? लाग इन"
    },
    gu: { // Gujarati
        title: "સ્માર્ટ બજેટ", settings: "સેટિંગ્સ", logout: "લૉગ આઉટ",
        addSec: "ખર્ચ ઉમેરો", name: "વસ્તુનું નામ", cost: "કિંમત (INR)", priority: "પ્રાથમિકતા (1-10)",
        addBtn: "ઉમેરો", listSec: "મારું બજેટ", empty: "કોઈ ખર્ચ નથી...",
        aiTitle: "AI ઑપ્ટિમાઇઝર", setBudget: "મહત્તમ બજેટ સેટ કરો", optBtn: "ઑપ્ટિમાઇઝર ચલાવો",
        limit: "મર્યાદા", rec: "ભલામણ કરેલ", sel: "ઑપ્ટિમાઇઝ કરેલી સૂચિ",
        globalSet: "ઍપ પસંદગીઓ", selectLang: "1. ઍપની ભાષા", 
        selectTarget: "2. કન્વર્ટ કરો (Live Rate)", saveBtn: "લાગુ કરો",
        login: "લૉગિન", register: "નોંધણી કરો", signIn: "સાઇન ઇન", signUp: "સાઇન અપ",
        needAcc: "ખાતું જોઈએ છે? નોંધણી કરો", haveAcc: "ખાતું છે? લૉગિન કરો"
    },
    hi: { // Hindi
        title: "इंटेलिजेंट बजट", settings: "सेटिंग्स", logout: "लॉग आउट",
        addSec: "खर्च जोड़ें", name: "आइटम का नाम", cost: "लागत (INR)", priority: "प्राथमिकता (1-10)",
        addBtn: "आइटम जोड़ें", listSec: "मेरा बजट", empty: "कोई खर्च नहीं...",
        aiTitle: "AI अनुकूलक", setBudget: "अधिकतम बजट सेट करें", optBtn: "अनुकूलन चलाएं",
        limit: "सीमा", rec: "अनुशंसित", sel: "अनुकूलित सूची",
        globalSet: "ऐप प्राथमिकताएं", selectLang: "1. ऐप की भाषा चुनें", 
        selectTarget: "2. रूपांतरित करें (Live Rate)", saveBtn: "लागू करें",
        login: "लॉग इन", register: "रजिस्टर करें", signIn: "साइन इन", signUp: "साइन अप",
        needAcc: "खाता चाहिए? रजिस्टर करें", haveAcc: "खाता है? लॉग इन करें"
    },
    kn: { // Kannada
        title: "ಸ್ಮಾರ್ಟ್ ಬಜೆಟ್", settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು", logout: "ಲಾಗ್ ಔಟ್",
        addSec: "ವೆಚ್ಚ ಸೇರಿಸಿ", name: "ವಸ್ತುವಿನ ಹೆಸರು", cost: "ವೆಚ್ಚ (INR)", priority: "ಆದ್ಯತೆ (1-10)",
        addBtn: "ಸೇರಿಸಿ", listSec: "ನನ್ನ ಬಜೆಟ್", empty: "ಯಾವುದೇ ವೆಚ್ಚಗಳಿಲ್ಲ...",
        aiTitle: "AI ಆಪ್ಟಿಮೈಜರ್", setBudget: "ಗರಿಷ್ಠ ಬಜೆಟ್ ಹೊಂದಿಸಿ", optBtn: "ಆಪ್ಟಿಮೈಜರ್ ರನ್ ಮಾಡಿ",
        limit: "ಮಿತಿ", rec: "ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ", sel: "ಆಪ್ಟಿಮೈಸ್ಡ್ ಪಟ್ಟಿ",
        globalSet: "ಅಪ್ಲಿಕೇಶನ್ ಆದ್ಯತೆಗಳು", selectLang: "1. ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", 
        selectTarget: "2. ಪರಿವರ್ತಿಸಿ (Live Rate)", saveBtn: "ಅನ್ವಯಿಸಿ",
        login: "ಲಾಗಿನ್", register: "ನೋಂದಾಯಿಸಿ", signIn: "ಸೈನ್ ಇನ್", signUp: "ಸೈನ್ ಅಪ್",
        needAcc: "ಖಾತೆ ಬೇಕೇ? ನೋಂದಾಯಿಸಿ", haveAcc: "ಖಾತೆ ಇದೆಯೇ? ಲಾಗಿನ್"
    },
    ks: { // Kashmiri
        title: "سمارٹ بجٹ", settings: "سیٹنگز", logout: "لاگ آؤٹ",
        addSec: "خرچہ شامل کریو", name: "چیزک ناو", cost: "قیمت (INR)", priority: "ترجیح (1-10)",
        addBtn: "شامل کریو", listSec: "میون بجٹ", empty: "کہین خرچہ چھنہ...",
        aiTitle: "AI آپٹیمائزر", setBudget: "زیادہ تر بجٹ مقرر کریو", optBtn: "آپٹیمائزر چلاو",
        limit: "حد", rec: "تجویز کردہ", sel: "بہتر لسٹ",
        globalSet: "ایپ ترجیحات", selectLang: "1. زبان منتخب کریو", 
        selectTarget: "2. تبدیل کریو (Live Rate)", saveBtn: "لاگو کریو",
        login: "لاگ ان", register: "رجسٹر کریو", signIn: "سائن ان", signUp: "سائن اپ",
        needAcc: "اکاؤنٹ ضرورت چھا؟ رجسٹر کریو", haveAcc: "اکاؤنٹ چھا؟ لاگ ان"
    },
    kok: { // Konkani
        title: "स्मार्ट बजेट", settings: "सेटिंग्स", logout: "लॉग आउट",
        addSec: "खर्च जोडा", name: "वस्तूचे नाव", cost: "खर्च (INR)", priority: "प्राधान्य (1-10)",
        addBtn: "जोडा", listSec: "मजे बजेट", empty: "कोणताही खर्च ना...",
        aiTitle: "AI ऑप्टिमाइझर", setBudget: "जास्तीत जास्त बजेट सेट करा", optBtn: "ऑप्टिमाइझर चलाय",
        limit: "मर्यादा", rec: "शिफारस केल्ले", sel: "ऑप्टिमाइझ केल्ली यादी",
        globalSet: "अॅप प्राधान्ये", selectLang: "1. भाशा वेंचून काड", 
        selectTarget: "2. बदलो (Live Rate)", saveBtn: "लागू करा",
        login: "लॉग इन", register: "नोंदणी करा", signIn: "साइन इन", signUp: "साइन अप",
        needAcc: "खाते जाय? नोंदणी करा", haveAcc: "खाते आसा? लॉग इन"
    },
    mai: { // Maithili
        title: "स्मार्ट बजट", settings: "सेटिंग्स", logout: "लॉग आउट",
        addSec: "खर्च जोड़ू", name: "सामानक नाम", cost: "खर्च (INR)", priority: "प्राथमिकता (1-10)",
        addBtn: "जोड़ू", listSec: "हमर बजट", empty: "कोनो खर्च नहि...",
        aiTitle: "AI ऑप्टिमाइजर", setBudget: "अधिकतम बजट सेट करू", optBtn: "ऑप्टिमाइजर चलाउ",
        limit: "सीमा", rec: "अनुशंसित", sel: "ऑप्टिमाइज्ड सूची",
        globalSet: "ऐप प्राथमिकताएँ", selectLang: "1. भाषा चुनू", 
        selectTarget: "2. परिवर्तित करू (Live Rate)", saveBtn: "लागू करू",
        login: "लॉग इन", register: "रजिस्टर करू", signIn: "साइन इन", signUp: "साइन अप",
        needAcc: "खाता चाही? रजिस्टर करू", haveAcc: "खाता अछि? लॉग इन"
    },
    ml: { // Malayalam
        title: "സ്മാർട്ട് ബജറ്റ്", settings: "ക്രമീകരണങ്ങൾ", logout: "ലോഗ് ഔട്ട്",
        addSec: "ചെലവ് ചേർക്കുക", name: "ഇനത്തിന്റെ പേര്", cost: "ചെലവ് (INR)", priority: "മുൻഗണന (1-10)",
        addBtn: "ചേർക്കുക", listSec: "എന്റെ ബജറ്റ്", empty: "ചെലവുകളില്ല...",
        aiTitle: "AI ഒപ്റ്റിമൈസർ", setBudget: "പരമാവധി ബജറ്റ് സജ്ജമാക്കുക", optBtn: "ഒപ്റ്റിമൈസർ റൺ ചെയ്യുക",
        limit: "പരിധി", rec: "ശുപാർശ ചെയ്തത്", sel: "ഒപ്റ്റിമൈസ് ചെയ്ത പട്ടിക",
        globalSet: "ആപ്പ് മുൻഗണനകൾ", selectLang: "1. ഭാഷ തിരഞ്ഞെടുക്കുക", 
        selectTarget: "2. പരിവർത്തനം ചെയ്യുക (Live Rate)", saveBtn: "പ്രയോഗിക്കുക",
        login: "ലോഗിൻ", register: "രജിസ്റ്റർ ചെയ്യുക", signIn: "സൈൻ ഇൻ", signUp: "സൈൻ അപ്പ്",
        needAcc: "അക്കൗണ്ട് വേണോ? രജിസ്റ്റർ ചെയ്യുക", haveAcc: "അക്കൗണ്ട് ഉണ്ടോ? ലോഗിൻ"
    },
    mni: { // Manipuri
        title: "স্মার্ত বজেত", settings: "সেতিংস", logout: "লোগ আউত",
        addSec: "খর্চা হাপচিনবা", name: "পোৎলমগী মমিং", cost: "মমল (INR)", priority: "মকোক থোংবা (1-10)",
        addBtn: "হাপচিনবা", listSec: "ঐগী বজেত", empty: "খর্চা অমতা লৈতে...",
        aiTitle: "AI ওপ্তিমাইজর", setBudget: "য়াম্লবদা বজেত লেপ্পা", optBtn: "ওপ্তিমাইজর চলায়বা",
        limit: "লিমিৎ", rec: "রিকমেন্দ তৌরবা", sel: "ওপ্তিমাইজ তৌরবা লিস্ত",
        globalSet: "এপকী পামজবা", selectLang: "1. লোন খনবা", 
        selectTarget: "2. ওন্থোকপা (Live Rate)", saveBtn: "এপ্লাই তৌবা",
        login: "লোগ ইন", register: "রেজিস্তর তৌবা", signIn: "সাইন ইন", signUp: "সাইন অপ",
        needAcc: "একাউন্ত চংব্রা? রেজিস্তর তৌবা", haveAcc: "একাউন্ত লৈব্রা? লোগ ইন"
    },
    mr: { // Marathi
        title: "स्मार्ट बजेट", settings: "सेटिंग्ज", logout: "लॉग आउट",
        addSec: "खर्च जोडा", name: "वस्तूचे नाव", cost: "खर्च (INR)", priority: "प्राधान्य (1-10)",
        addBtn: "जोडा", listSec: "माझे बजेट", empty: "कोणताही खर्च नाही...",
        aiTitle: "AI ऑप्टिमायझर", setBudget: "कमाल बजेट सेट करा", optBtn: "ऑप्टिमायझर चालवा",
        limit: "मर्यादा", rec: "शिफारस केलेले", sel: "ऑप्टिमाइझ केलेली यादी",
        globalSet: "अॅप प्राधान्ये", selectLang: "1. अॅपची भाषा निवडा", 
        selectTarget: "2. रूपांतरित करा (Live Rate)", saveBtn: "लागू करा",
        login: "लॉगिन", register: "नोंदणी करा", signIn: "साइन इन", signUp: "साइन अप",
        needAcc: "खाते हवे आहे? नोंदणी करा", haveAcc: "खाते आहे? लॉगिन करा"
    },
    ne: { // Nepali
        title: "स्मार्ट बजेट", settings: "सेटिङ्हरू", logout: "लग आउट",
        addSec: "खर्च थप्नुहोस्", name: "वस्तुको नाम", cost: "खर्च (INR)", priority: "प्राथमिकता (1-10)",
        addBtn: "थप्नुहोस्", listSec: "मेरो बजेट", empty: "कुनै खर्च छैन...",
        aiTitle: "AI अप्टिमाइजर", setBudget: "अधिकतम बजेट सेट गर्नुहोस्", optBtn: "अप्टिमाइजर चलाउनुहोस्",
        limit: "सीमा", rec: "सिफारिस गरिएको", sel: "अप्टिमाइज गरिएको सूची",
        globalSet: "एप प्राथमिकताहरू", selectLang: "1. भाषा चयन गर्नुहोस्", 
        selectTarget: "2. रूपान्तरण गर्नुहोस् (Live Rate)", saveBtn: "लागू गर्नुहोस्",
        login: "लग इन", register: "दर्ता गर्नुहोस्", signIn: "साइन इन", signUp: "साइन अप",
        needAcc: "खाता चाहियो? दर्ता गर्नुहोस्", haveAcc: "खाता छ? लग इन"
    },
    or: { // Odia
        title: "ସ୍ମାର୍ଟ ବଜେଟ୍", settings: "ସେଟିଂସ୍", logout: "ଲଗ୍ ଆଉଟ୍",
        addSec: "ଖର୍ଚ୍ଚ ଯୋଡନ୍ତୁ", name: "ଆଇଟମ୍ ନାମ", cost: "ଖର୍ଚ୍ଚ (INR)", priority: "ପ୍ରାଥମିକତା (1-10)",
        addBtn: "ଯୋଡନ୍ତୁ", listSec: "ମୋର ବଜେଟ୍", empty: "କୌଣସି ଖର୍ଚ୍ଚ ନାହିଁ...",
        aiTitle: "AI ଅପ୍ଟିମାଇଜର୍", setBudget: "ସର୍ବାଧିକ ବଜେଟ୍ ସେଟ୍ କରନ୍ତୁ", optBtn: "ଅପ୍ଟିମାଇଜର୍ ଚଲାନ୍ତୁ",
        limit: "ସୀମା", rec: "ସୁପାରିଶ କରାଯାଇଛି", sel: "ଅପ୍ଟିମାଇଜ୍ ତାଲିକା",
        globalSet: "ଆପ୍ ପସନ୍ଦଗୁଡ଼ିକ", selectLang: "1. ଭାଷା ଚୟନ କରନ୍ତୁ", 
        selectTarget: "2. ରୂପାନ୍ତର କରନ୍ତୁ (Live Rate)", saveBtn: "ପ୍ରୟୋଗ କରନ୍ତୁ",
        login: "ଲଗଇନ୍", register: "ପଞ୍ଜୀକରଣ କରନ୍ତୁ", signIn: "ସାଇନ୍ ଇନ୍", signUp: "ସାଇନ୍ ଅପ୍",
        needAcc: "ଆକାଉଣ୍ଟ ଦରକାର କି? ପଞ୍ଜୀକରଣ କରନ୍ତୁ", haveAcc: "ଆକାଉଣ୍ଟ ଅଛି କି? ଲଗଇନ୍"
    },
    pa: { // Punjabi
        title: "ਸਮਾਰਟ ਬਜਟ", settings: "ਸੈਟਿੰਗਾਂ", logout: "ਲਾਗ ਆਉਟ",
        addSec: "ਖਰਚਾ ਸ਼ਾਮਲ ਕਰੋ", name: "ਆਈਟਮ ਦਾ ਨਾਮ", cost: "ਕੀਮਤ (INR)", priority: "ਤਰਜੀਹ (1-10)",
        addBtn: "ਸ਼ਾਮਲ ਕਰੋ", listSec: "ਮੇਰਾ ਬਜਟ", empty: "ਕੋਈ ਖਰਚਾ ਨਹੀਂ...",
        aiTitle: "AI ਓਪਟੀਮਾਈਜ਼ਰ", setBudget: "ਵੱਧ ਤੋਂ ਵੱਧ ਬਜਟ ਸੈਟ ਕਰੋ", optBtn: "ਓਪਟੀਮਾਈਜ਼ਰ ਚਲਾਓ",
        limit: "ਸੀਮਾ", rec: "ਸਿਫਾਰਸ਼ੀ", sel: "ਅਨੁਕੂਲਿਤ ਸੂਚੀ",
        globalSet: "ਐਪ ਤਰਜੀਹਾਂ", selectLang: "1. ਐਪ ਭਾਸ਼ਾ ਚੁਣੋ", 
        selectTarget: "2. ਇਸ ਵਿੱਚ ਬਦਲੋ (Live Rate)", saveBtn: "ਲਾਗੂ ਕਰੋ",
        login: "ਲਾਗਇਨ", register: "ਰਜਿਸਟਰ", signIn: "ਸਾਈਨ ਇਨ", signUp: "ਸਾਈਨ ਅੱਪ",
        needAcc: "ਖਾਤਾ ਚਾਹੀਦਾ ਹੈ? ਰਜਿਸਟਰ ਕਰੋ", haveAcc: "ਖਾਤਾ ਹੈ? ਲਾਗਇਨ ਕਰੋ"
    },
    sa: { // Sanskrit
        title: "प्रज्ञात्मकं आयव्ययकम्", settings: "व्यवस्थापनम्", logout: "बहिर्गच्छतु",
        addSec: "व्ययं योजयतु", name: "वस्तुनः नाम", cost: "मूल्यम् (INR)", priority: "प्राथमिकता (1-10)",
        addBtn: "योजयतु", listSec: "मम आयव्ययकम्", empty: "न कोऽपि व्ययः...",
        aiTitle: "AI अनुकूलकः", setBudget: "अधिकतमं आयव्ययकं निर्धारयतु", optBtn: "अनुकूलकं चालयतु",
        limit: "सीमा", rec: "अनुशंसितम्", sel: "अनुकूलिता सूची",
        globalSet: "अनुप्रयोगास्य प्राधान्यानि", selectLang: "1. भाषाम् चिनोतु", 
        selectTarget: "2. परिवर्तयतु (Live Rate)", saveBtn: "लागू करोतु",
        login: "प्रविशतु", register: "पञ्जीकरणं करोतु", signIn: "प्रविशतु", signUp: "पञ्जीकरणं करोतु",
        needAcc: "खाता आवश्यकं वा? पञ्जीकरणं करोतु", haveAcc: "खाता अस्ति वा? प्रविशतु"
    },
    sat: { // Santali
        title: "स्मार्ट बजट", settings: "सेटिंग्स", logout: "लॉग आउट",
        addSec: "खर्चा सेलेज मे", name: "जीनिस ञुतुम", cost: "गोनोङ (INR)", priority: "माणांग (1-10)",
        addBtn: "सेलेज मे", listSec: "इञाः बजट", empty: "जाहां खर्चा बाङ...",
        aiTitle: "AI ऑप्टिमाइजर", setBudget: "जास्ती बजट सेट मे", optBtn: "ऑप्टिमाइजर चालाव मे",
        limit: "सिमा", rec: "सुपारिस", sel: "ऑप्टिमाइज लिस्ट",
        globalSet: "ऐप प्राधान्य", selectLang: "1. पारसी बाछाव मे", 
        selectTarget: "2. बोदोल मे (Live Rate)", saveBtn: "लागू मे",
        login: "लॉग इन", register: "रजिस्टर मे", signIn: "साइन इन", signUp: "साइन अप",
        needAcc: "एकाउन्ट लाकती? रजिस्टर मे", haveAcc: "एकाउन्ट मेनाः? लॉग इन"
    },
    sd: { // Sindhi
        title: "سمارٹ بجيٽ", settings: "سيٽنگون", logout: "لاگ آئوٽ",
        addSec: "خرچ شامل ڪريو", name: "شئي جو نالو", cost: "قيمت (INR)", priority: "ترجيح (1-10)",
        addBtn: "شامل ڪريو", listSec: "منهنجو بجيٽ", empty: "ڪو خرچ ناهي...",
        aiTitle: "AI آپٽيمائيزر", setBudget: "وڌ ۾ وڌ بجيٽ مقرر ڪريو", optBtn: "آپٽيمائيزر هلايو",
        limit: "حد", rec: "تجويز ڪيل", sel: "بهتر ڪيل فهرست",
        globalSet: "ايپ جون ترجيحون", selectLang: "1. ٻولي چونڊيو", 
        selectTarget: "2. تبديل ڪريو (Live Rate)", saveBtn: "لاڳو ڪريو",
        login: "لاگ ان", register: "رجسٽر ڪريو", signIn: "سائن ان", signUp: "سائن اپ",
        needAcc: "اڪائونٽ گهرجي؟ رجسٽر ڪريو", haveAcc: "اڪائونٽ آهي؟ لاگ ان"
    },
    ta: { // Tamil
        title: "ஸ்மார்ட் பட்ஜெட்", settings: "அமைப்புகள்", logout: "வெளியேறு",
        addSec: "செலவைச் சேர்", name: "பொருள் பெயர்", cost: "செலவு (INR)", priority: "முன்னுரிமை (1-10)",
        addBtn: "சேர்", listSec: "என் பட்ஜெட்", empty: "செலவுகள் இல்லை...",
        aiTitle: "AI உகப்பாக்கி", setBudget: "அதிகபட்ச பட்ஜெட் அமை", optBtn: "உகப்பாக்கியை இயக்கு",
        limit: "வரம்பு", rec: "பரிந்துரைக்கப்பட்டது", sel: "உகந்த பட்டியல்",
        globalSet: "பயன்பாட்டு விருப்பங்கள்", selectLang: "1. மொழியைத் தேர்ந்தெடுக்கவும்", 
        selectTarget: "2. மாற்றவும் (Live Rate)", saveBtn: "விண்ணப்பிக்கவும்",
        login: "உள்நுழை", register: "பதிவு செய்", signIn: "உள்நுழை", signUp: "பதிவு செய்",
        needAcc: "கணக்கு வேண்டுமா? பதிவு செய்", haveAcc: "கணக்கு உள்ளதா? உள்நுழை"
    },
    te: { // Telugu
        title: "స్మార్ట్ బడ్జెట్", settings: "సెట్టింగ్‌లు", logout: "లాగ్ అవుట్",
        addSec: "ఖర్చు జోడించండి", name: "వస్తువు పేరు", cost: "ఖర్చు (INR)", priority: "ప్రాధాన్యత (1-10)",
        addBtn: "జోడించండి", listSec: "నా బడ్జెట్", empty: "ఖర్చులు లేవు...",
        aiTitle: "AI ఆప్టిమైజర్", setBudget: "గరిష్ట బడ్జెట్ సెట్ చేయండి", optBtn: "ఆప్టిమైజర్ రన్ చేయండి",
        limit: "పరిమితి", rec: "సిఫార్సు చేయబడింది", sel: "ఆప్టిమైజ్ చేసిన జాబితా",
        globalSet: "యాప్ ప్రాధాన్యతలు", selectLang: "1. యాప్ భాషను ఎంచుకోండి", 
        selectTarget: "2. మార్చండి (Live Rate)", saveBtn: "వర్తింపజేయండి",
        login: "లాగిన్", register: "నమోదు చేసుకోండి", signIn: "సైన్ ఇన్", signUp: "నమోదు",
        needAcc: "ఖాతా కావాలా? నమోదు చేసుకోండి", haveAcc: "ఖాతా ఉందా? లాగిన్"
    },
    ur: { // Urdu
        title: "اسمارٹ بجٹ", settings: "ترتیبات", logout: "لاگ آؤٹ",
        addSec: "خرچ شامل کریں", name: "آئٹم کا نام", cost: "قیمت (INR)", priority: "ترجیح (1-10)",
        addBtn: "شامل کریں", listSec: "میرا بجٹ", empty: "کوئی خرچ نہیں...",
        aiTitle: "AI آپٹیمائزر", setBudget: "زیادہ سے زیادہ بجٹ سیٹ کریں", optBtn: "آپٹیمائزر چلائیں",
        limit: "حد", rec: "تجویز کردہ", sel: "بہتر فہرست",
        globalSet: "ایپ کی ترجیحات", selectLang: "1. زبان منتخب کریں", 
        selectTarget: "2. تبدیل کریں (Live Rate)", saveBtn: "لاگو کریں",
        login: "لاگ ان", register: "رجسٹر کریں", signIn: "سائن ان", signUp: "سائن اپ",
        needAcc: "اکاؤنٹ چاہیے؟ رجسٹر کریں", haveAcc: "اکاؤنٹ ہے؟ لاگ ان"
    }
};

function App() {
    // --- AUTH STATE ---
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // --- APP STATE ---
    const [expenses, setExpenses] = useState([]);
    const [newExp, setNewExp] = useState({ name: '', cost: '', value: '' });
    const [budget, setBudget] = useState('');
    const [optimized, setOptimized] = useState(null);

    // --- INDIA EXCLUSIVE SETTINGS ---
    const baseCurrency = 'INR';
    const flagURL = 'https://flagcdn.com/in.svg';
    
    const [showSettings, setShowSettings] = useState(false);
    const [appLanguage, setAppLanguage] = useState('en');
    const [targetCurrency, setTargetCurrency] = useState('USD'); 
    
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [exchangeRates, setExchangeRates] = useState({});

    // O(1) Translation Fallback Map
    const t = TRANSLATIONS[appLanguage] || TRANSLATIONS['en'];

    // --- FETCH COUNTRIES & RATES TOGETHER ---
    useEffect(() => {
        Promise.all([
            // Added 'population' to the fields requested from the API
            fetch("https://restcountries.com/v3.1/all?fields=name,currencies,cca2,population").then(res => res.json()),
            fetch("https://open.er-api.com/v6/latest/INR").then(res => res.json())
        ]).then(([countriesData, ratesData]) => {
            if (ratesData && ratesData.rates) {
                setExchangeRates(ratesData.rates);
                
                // ALGORITHM FIX: Sort countries by highest population first.
                // This ensures "United States" grabs USD before "Ecuador" does.
                const sortedCountries = countriesData.sort((a, b) => (b.population || 0) - (a.population || 0));
                
                const options = [];
                sortedCountries.forEach(country => {
                    if (country.currencies) {
                        const currCode = Object.keys(country.currencies)[0];
                        
                        if (ratesData.rates[currCode] && !options.find(o => o.code === currCode)) {
                            // UX Polish: Make EUR represent the whole Eurozone
                            let displayName = country.name.common;
                            if (currCode === 'EUR') displayName = "Eurozone";
                            if (currCode === 'USD') displayName = "United States"; 
                            
                            options.push({ code: currCode, countryName: displayName });
                        }
                    }
                });
                
                // Sort alphabetically for the dropdown menu
                setCurrencyOptions(options.sort((a, b) => a.countryName.localeCompare(b.countryName)));
            }
        }).catch(err => console.error("API Error:", err));
    }, []);
    
    useEffect(() => {
        if (token) fetchExpenses();
    }, [token]);

    const authHeader = { 'Authorization': `Bearer ${token}` };

    // --- AUTH & DATA LOGIC ---
    const handleAuth = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/token' : '/register/';
        const headers = isLogin ? { 'Content-Type': 'application/x-www-form-urlencoded' } : { 'Content-Type': 'application/json' };
        let body = isLogin ? new URLSearchParams({ username, password }) : JSON.stringify({ username, password });

        const res = await fetch(`${API_URL}${endpoint}`, { method: 'POST', headers, body });
        if (isLogin && res.ok) {
            const data = await res.json();
            setToken(data.access_token);
            localStorage.setItem('token', data.access_token);
        } else if (!isLogin && res.ok) {
            alert("Registered! Please login.");
            setIsLogin(true);
        } else {
            const data = await res.json();
            alert(data.detail || "Authentication Failed");
        }
    };

    const logout = () => {
        setToken(null); localStorage.removeItem('token'); setExpenses([]); setOptimized(null);
    };

    const fetchExpenses = async () => {
        const res = await fetch(`${API_URL}/expenses/`, { headers: authHeader });
        if(res.status === 401) return logout();
        setExpenses(await res.json());
    };

    const addExpense = async (e) => {
        e.preventDefault();
        await fetch(`${API_URL}/expenses/`, {
            method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader },
            body: JSON.stringify({ name: newExp.name, cost: parseFloat(newExp.cost), value: parseInt(newExp.value) })
        });
        setNewExp({ name: '', cost: '', value: '' });
        fetchExpenses();
    };

    const deleteExpense = async (id) => {
        await fetch(`${API_URL}/expenses/${id}`, { method: 'DELETE', headers: authHeader });
        fetchExpenses();
    };

    const runOptimizer = async () => {
        if(!budget) return alert("Enter budget");
        const res = await fetch(`${API_URL}/optimize-budget/?budget=${budget}`, { headers: authHeader });
        setOptimized(await res.json());
    };

    // --- LIVE CURRENCY CONVERSION LOGIC ---
    const convertCurrency = (amount) => {
        const targetRate = exchangeRates[targetCurrency] || 1;
        return (amount * targetRate).toFixed(2);
    };

    const totalExpenseCost = expenses.reduce((sum, exp) => sum + exp.cost, 0);

    // --- RENDER AUTH ---
    if (!token) return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100 font-sans">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-96 border border-slate-200">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">{isLogin ? t.login : t.register}</h2>
                <form onSubmit={handleAuth} className="space-y-4">
                    <input type="text" placeholder="Username" required className="w-full border p-3 rounded-xl outline-none focus:border-indigo-500" value={username} onChange={e => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" required className="w-full border p-3 rounded-xl outline-none focus:border-indigo-500" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="w-full bg-indigo-600 text-white p-3 rounded-xl font-bold hover:bg-indigo-700 shadow-md">{isLogin ? t.signIn : t.signUp}</button>
                </form>
                <p className="text-center mt-4 text-sm text-gray-500 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? t.needAcc : t.haveAcc}
                </p>
            </div>
        </div>
    );

    // --- RENDER APP ---
    return (
        <div className="max-w-6xl mx-auto py-10 px-4 space-y-8 font-sans antialiased">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center space-x-3">
                    <img src={flagURL} alt="India Flag" className="w-8 h-5 rounded shadow-sm border border-slate-200 object-cover" />
                    <h1 className="text-2xl font-black text-indigo-700 tracking-tight">{t.title}</h1>
                </div>
                <div className="flex items-center space-x-3">
                    <button onClick={() => setShowSettings(true)} className="bg-slate-100 p-2 px-4 rounded-xl font-bold hover:bg-slate-200 text-slate-700">⚙️ {t.settings}</button>
                    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-600">{t.logout}</button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Add Expense Form */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold mb-4 flex items-center text-slate-800"><span className="mr-2">💰</span> {t.addSec}</h2>
                    <form onSubmit={addExpense} className="space-y-4">
                        <input type="text" placeholder={t.name} required className="w-full border p-3 rounded-xl outline-none focus:border-indigo-500" value={newExp.name} onChange={e => setNewExp({...newExp, name: e.target.value})}/>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-slate-500 font-bold tracking-widest">{baseCurrency}</span>
                            <input type="number" step="0.01" placeholder={t.cost} required className="w-full border p-3 pl-16 rounded-xl outline-none focus:border-indigo-500" value={newExp.cost} onChange={e => setNewExp({...newExp, cost: e.target.value})}/>
                        </div>
                        <input type="number" placeholder={t.priority} required className="w-full border p-3 rounded-xl outline-none focus:border-indigo-500" value={newExp.value} onChange={e => setNewExp({...newExp, value: e.target.value})}/>
                        <button className="w-full bg-indigo-600 text-white p-3 rounded-xl font-bold hover:bg-indigo-700 shadow-md">{t.addBtn}</button>
                    </form>
                </div>

                {/* List View with Live Conversion */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-slate-800"><span className="mr-2">📋</span> {t.listSec}</h2>
                        {expenses.length > 0 && (
                            <div className="text-right">
                                <p className="text-sm font-bold text-slate-500">{baseCurrency} {totalExpenseCost.toFixed(2)}</p>
                                <p className="text-xs text-indigo-500 font-bold bg-indigo-50 px-2 py-1 rounded mt-1">
                                    ≈ {targetCurrency} {convertCurrency(totalExpenseCost)}
                                </p>
                            </div>
                        )}
                    </div>
                    <ul className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scroll max-h-64">
                        {expenses.length === 0 && <p className="text-slate-400 italic">{t.empty}</p>}
                        {expenses.map(exp => (
                            <li key={exp.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-indigo-200">
                                <div>
                                    <p className="font-bold text-slate-800">{exp.name}</p>
                                    <p className="text-sm text-slate-500 font-mono font-bold bg-slate-200 px-2 py-0.5 rounded text-xs inline-block mr-2">{baseCurrency}</p>
                                    <span className="text-sm text-slate-600">{exp.cost} | {t.priority}: {exp.value}</span>
                                </div>
                                <button onClick={() => deleteExpense(exp.id)} className="text-red-300 hover:text-red-500 font-bold px-2 text-xl">✕</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* AI Optimizer Section */}
            <div className="bg-emerald-50 p-8 rounded-3xl shadow-sm border border-emerald-100">
                <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center"><span className="mr-3">🧠</span> {t.aiTitle}</h2>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                    <div className="relative flex-1">
                        <span className="absolute left-4 top-4 text-emerald-700 font-bold tracking-widest">{baseCurrency}</span>
                        <input type="number" placeholder={t.setBudget} className="w-full border-2 border-emerald-200 p-4 pl-16 rounded-2xl outline-none focus:border-emerald-500 bg-white" value={budget} onChange={e => setBudget(e.target.value)}/>
                    </div>
                    <button onClick={runOptimizer} className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg">{t.optBtn}</button>
                </div>

                {optimized && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 animate-fadeIn">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                            <p className="text-slate-600">{t.limit}: <span className="font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">{baseCurrency} {optimized.budget_limit}</span></p>
                            <div className="text-right">
                                <p className="text-lg text-emerald-700 font-bold">{t.rec}: {baseCurrency} {optimized.optimized_total_cost}</p>
                                <p className="text-sm text-indigo-500 font-bold bg-indigo-50 px-2 py-1 rounded mt-1 inline-block">
                                    ≈ {targetCurrency} {convertCurrency(optimized.optimized_total_cost)}
                                </p>
                            </div>
                        </div>
                        <h4 className="font-bold text-slate-700 mb-4">{t.sel}:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {optimized.selected_expenses.map(exp => (
                                <div key={exp.id} className="bg-emerald-50 p-3 rounded-lg text-emerald-800 border border-emerald-100 font-medium flex items-center">
                                    <span className="text-xs bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded font-bold mr-2">{baseCurrency}</span>
                                    {exp.name} ({exp.cost})
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Global Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-6 animate-fadeIn">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                            <h2 className="text-2xl font-bold text-slate-800">{t.globalSet}</h2>
                            <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600 text-2xl">✕</button>
                        </div>
                        
                        <div className="space-y-5">
                            {/* App Language Dropdown */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wide">{t.selectLang}</label>
                                <select 
                                    className="w-full border-2 border-slate-100 p-3 rounded-xl bg-slate-50 outline-none focus:border-indigo-500 font-medium"
                                    value={appLanguage}
                                    onChange={(e) => setAppLanguage(e.target.value)}
                                >
                                    <option value="en">English</option>
                                    <option value="as">অসমীয়া (Assamese)</option>
                                    <option value="bn">বাংলা (Bengali)</option>
                                    <option value="brx">बड़ो (Bodo)</option>
                                    <option value="doi">डोगरी (Dogri)</option>
                                    <option value="gu">ગુજરાતી (Gujarati)</option>
                                    <option value="hi">हिन्दी (Hindi)</option>
                                    <option value="kn">ಕನ್ನಡ (Kannada)</option>
                                    <option value="ks">कॉशुर (Kashmiri)</option>
                                    <option value="kok">कोंकणी (Konkani)</option>
                                    <option value="mai">मैथिली (Maithili)</option>
                                    <option value="ml">മലയാളം (Malayalam)</option>
                                    <option value="mni">মৈতৈলোন্ (Manipuri)</option>
                                    <option value="mr">मराठी (Marathi)</option>
                                    <option value="ne">नेपाली (Nepali)</option>
                                    <option value="or">ଓଡ଼ିଆ (Odia)</option>
                                    <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                                    <option value="sa">संस्कृतम् (Sanskrit)</option>
                                    <option value="sat">ᱥᱟᱱᱛᱟᱲᱤ (Santali)</option>
                                    <option value="sd">سنڌي (Sindhi)</option>
                                    <option value="ta">தமிழ் (Tamil)</option>
                                    <option value="te">తెలుగు (Telugu)</option>
                                    <option value="ur">اردو (Urdu)</option>
                                </select>
                            </div>

                            {/* Live Target Currency Converter */}
                            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                                <label className="block text-xs font-bold text-indigo-700 uppercase mb-2 tracking-wide">{t.selectTarget}</label>
                                <select 
                                    className="w-full border border-indigo-200 p-3 rounded-lg bg-white outline-none focus:border-indigo-500 font-medium text-indigo-900"
                                    value={targetCurrency}
                                    onChange={(e) => setTargetCurrency(e.target.value)}
                                >
                                    <option disabled value="">Search by typing...</option>
                                    {currencyOptions.map(option => (
                                        <option key={option.code} value={option.code}>
                                            {option.countryName} ({option.code})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button onClick={() => setShowSettings(false)} className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-xl mt-4">{t.saveBtn}</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);