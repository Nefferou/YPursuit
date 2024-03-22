const questions = {
    INFO: {
        EASY: [
            {
                id: 1,
                question: "What does HTML stand for?",
                answers: [
                    { text: "Hyper Trainer Markup Language", correct: false },
                    { text: "Hyper Text Markup Language", correct: true },
                    { text: "Hyper Tabs Markup Language", correct: false },
                    { text: "Hyperlinking Text Marking Language", correct: false },
                ],
            },
            {
                id: 2,
                question: "Which device is used to process data?",
                answers: [
                    { text: "Keyboard", correct: false },
                    { text: "Mouse", correct: false },
                    { text: "Printer", correct: false },
                    { text: "Computer", correct: true },
                ],
            },
            {
                id: 3,
                question: "WWW stands for?",
                answers: [
                    { text: "World Worm Web", correct: false },
                    { text: "World Wide Web", correct: true },
                    { text: "World Word Web", correct: false },
                    { text: "Wide World Web", correct: false },
                ],
            },
        ],
        MEDIUM: [
            {
                id: 4,
                question: "Which of the following is a JavaScript framework?",
                answers: [
                    { text: "Django", correct: false },
                    { text: "Angular", correct: true },
                    { text: "Laravel", correct: false },
                    { text: "Flask", correct: false },
                ],
            },
            {
                id: 5,
                question: "What is the purpose of CSS?",
                answers: [
                    { text: "To structure web pages", correct: false },
                    { text: "To create animated effects", correct: false },
                    { text: "To style web pages", correct: true },
                    { text: "To add functionality to web pages", correct: false },
                ],
            },
            {
                id: 6,
                question: "What does SQL stand for?",
                answers: [
                    { text: "Structured Query Language", correct: true },
                    { text: "Stylish Question Language", correct: false },
                    { text: "Statement Question Language", correct: false },
                    { text: "Structured Question List", correct: false },
                ],
            },
        ],
        HARD: [
            {
                id: 7,
                question: "What does 'this' keyword in JavaScript refer to?",
                answers: [
                    { text: "The current function", correct: false },
                    { text: "The window object", correct: false },
                    { text: "The document object", correct: false },
                    { text: "The object that called the function", correct: true },
                ],
            },
            {
                id: 8,
                question: "Which of the following is NOT a type of cybersecurity threat?",
                answers: [
                    { text: "Phishing", correct: false },
                    { text: "Trojan Horse", correct: false },
                    { text: "Worm", correct: false },
                    { text: "Encryption", correct: true },
                ],
            },
            {
                id: 9,
                question: "In which language is the Unix operating system written?",
                answers: [
                    { text: "C#", correct: false },
                    { text: "Java", correct: false },
                    { text: "C", correct: true },
                    { text: "Python", correct: false },
                ],
            },
        ],
    },
    MARKET_COM: {
        EASY: [
            {
                id: 10,
                question: "What is the primary goal of marketing?",
                answers: [
                    { text: "To increase production efficiency", correct: false },
                    { text: "To build customer relationships", correct: true },
                    { text: "To reduce costs", correct: false },
                    { text: "To hire more employees", correct: false },
                ],
            },
            {
                id: 11,
                question: "Which platform is best known for business networking?",
                answers: [
                    { text: "Facebook", correct: false },
                    { text: "Instagram", correct: false },
                    { text: "LinkedIn", correct: true },
                    { text: "Twitter", correct: false },
                ],
            },
            {
                id: 12,
                question: "What does PPC stand for in marketing?",
                answers: [
                    { text: "Personal Product Call", correct: false },
                    { text: "Pay Per Click", correct: true },
                    { text: "Product Placement Cost", correct: false },
                    { text: "Publicity and Press Coverage", correct: false },
                ],
            },
        ],
        MEDIUM: [
            {
                id: 13,
                question: "Which of the following is a key component of a marketing plan?",
                answers: [
                    { text: "Profit margins", correct: false },
                    { text: "Target market", correct: true },
                    { text: "Employee salaries", correct: false },
                    { text: "Supplier list", correct: false },
                ],
            },
            {
                id: 14,
                question: "What is 'branding' in marketing?",
                answers: [
                    { text: "Creating a logo", correct: false },
                    { text: "Setting product prices", correct: false },
                    { text: "The process of creating a unique name and image for a product", correct: true },
                    { text: "Developing a new product", correct: false },
                ],
            },
            {
                id: 15,
                question: "What does the '4 Ps' of marketing stand for?",
                answers: [
                    { text: "Product, Price, Place, Promotion", correct: true },
                    { text: "Product, Process, People, Performance", correct: false },
                    { text: "Price, Position, Promotion, People", correct: false },
                    { text: "Product, Performance, Promotion, Process", correct: false },
                ],
            },
        ],
        HARD: [
            {
                id: 16,
                question: "What is the main purpose of content marketing?",
                answers: [
                    { text: "To directly increase sales", correct: false },
                    { text: "To improve search engine rankings", correct: false },
                    { text: "To engage and educate the target audience", correct: true },
                    { text: "To create viral content", correct: false },
                ],
            },
            {
                id: 17,
                question: "Which metric is most important for evaluating the success of an email marketing campaign?",
                answers: [
                    { text: "The number of emails sent", correct: false },
                    { text: "The open rate", correct: true },
                    { text: "The size of the email list", correct: false },
                    { text: "The color scheme of the email", correct: false },
                ],
            },
            {
                id: 18,
                question: "What strategy involves selling products without holding inventory?",
                answers: [
                    { text: "Wholesaling", correct: false },
                    { text: "Dropshipping", correct: true },
                    { text: "Retailing", correct: false },
                    { text: "Consignment selling", correct: false },
                ],
            },
        ],
    },
    AUDIO: {
        EASY: [
            {
                id: 19,
                question: "What does 'EQ' stand for in audio production?",
                answers: [
                    { text: "Equalize", correct: false },
                    { text: "Equal Quantity", correct: false },
                    { text: "Equalizer", correct: true },
                    { text: "Equilibrium", correct: false },
                ],
            },
            {
                id: 20,
                question: "Which device converts sound into electrical signals?",
                answers: [
                    { text: "Speaker", correct: false },
                    { text: "Amplifier", correct: false },
                    { text: "Microphone", correct: true },
                    { text: "Mixer", correct: false },
                ],
            },
            {
                id: 21,
                question: "What is reverb?",
                answers: [
                    { text: "A type of audio compression", correct: false },
                    { text: "The reflection of sound waves", correct: true },
                    { text: "A technique for adjusting bass", correct: false },
                    { text: "A method for syncing audio tracks", correct: false },
                ],
            },
        ],
        MEDIUM: [
            {
                id: 22,
                question: "What does MIDI stand for?",
                answers: [
                    { text: "Musical Instrument Digital Interface", correct: true },
                    { text: "Music Interface Digital Instrument", correct: false },
                    { text: "Musical Internal Digital Interface", correct: false },
                    { text: "Music Instrument Data Interface", correct: false },
                ],
            },
            {
                id: 23,
                question: "Which term describes the perceived frequency of a sound?",
                answers: [
                    { text: "Amplitude", correct: false },
                    { text: "Pitch", correct: true },
                    { text: "Timbre", correct: false },
                    { text: "Velocity", correct: false },
                ],
            },
            {
                id: 24,
                question: "What is the purpose of a compressor in audio production?",
                answers: [
                    { text: "To increase the overall volume", correct: false },
                    { text: "To reduce the dynamic range", correct: true },
                    { text: "To add reverb to the sound", correct: false },
                    { text: "To convert analog signals to digital", correct: false },
                ],
            },
        ],
        HARD: [
            {
                id: 25,
                question: "What is 'phase' in audio production?",
                answers: [
                    { text: "A type of effect added to vocals", correct: false },
                    { text: "The alignment of waveforms", correct: true },
                    { text: "The progression of musical chords", correct: false },
                    { text: "A stage in audio mixing", correct: false },
                ],
            },
            {
                id: 26,
                question: "What does a limiter do?",
                answers: [
                    { text: "Limits the frequency range", correct: false },
                    { text: "Prevents the audio signal from exceeding a certain level", correct: true },
                    { text: "Reduces the bitrate of audio files", correct: false },
                    { text: "Cuts off the audio signal at a specific threshold", correct: false },
                ],
            },
            {
                id: 27,
                question: "Which microphone type is most sensitive to sound coming from all directions?",
                answers: [
                    { text: "Dynamic", correct: false },
                    { text: "Condenser", correct: false },
                    { text: "Shotgun", correct: false },
                    { text: "Omnidirectional", correct: true },
                ],
            },
        ],
    },
    JEUX_VIDEO: {
        EASY: [
            {
                id: 28,
                question: "What is the primary objective in Minecraft?",
                answers: [
                    { text: "To build structures", correct: false },
                    { text: "To defeat the Ender Dragon", correct: true },
                    { text: "To collect coins", correct: false },
                    { text: "To rescue the princess", correct: false },
                ],
            },
            {
                id: 29,
                question: "Which console is made by Sony?",
                answers: [
                    { text: "Xbox", correct: false },
                    { text: "PlayStation", correct: true },
                    { text: "Switch", correct: false },
                    { text: "GameCube", correct: false },
                ],
            },
            {
                id: 30,
                question: "What genre of game is 'Fortnite'?",
                answers: [
                    { text: "Role-Playing Game (RPG)", correct: false },
                    { text: "Battle Royale", correct: true },
                    { text: "Simulation", correct: false },
                    { text: "Platformer", correct: false },
                ],
            },
        ],
        MEDIUM: [
            {
                id: 31,
                question: "Which game introduced the character 'Link'?",
                answers: [
                    { text: "Final Fantasy", correct: false },
                    { text: "The Legend of Zelda", correct: true },
                    { text: "Super Mario Bros.", correct: false },
                    { text: "Mega Man", correct: false },
                ],
            },
            {
                id: 32,
                question: "What is the primary currency in 'The Witcher 3: Wild Hunt'?",
                answers: [
                    { text: "Gold", correct: false },
                    { text: "Crowns", correct: true },
                    { text: "Galleons", correct: false },
                    { text: "Rupees", correct: false },
                ],
            },
            {
                id: 33,
                question: "In which game do players build decks to battle others in the world of Azeroth?",
                answers: [
                    { text: "Magic: The Gathering", correct: false },
                    { text: "Hearthstone", correct: true },
                    { text: "Gwent", correct: false },
                    { text: "Yu-Gi-Oh!", correct: false },
                ],
            },
        ],
        HARD: [
            {
                id: 34,
                question: "What is the name of the protagonist in 'Half-Life'?",
                answers: [
                    { text: "Master Chief", correct: false },
                    { text: "Gordon Freeman", correct: true },
                    { text: "Marcus Fenix", correct: false },
                    { text: "Samus Aran", correct: false },
                ],
            },
            {
                id: 35,
                question: "Which of these games is known for its incredibly difficult Souls-like gameplay?",
                answers: [
                    { text: "The Elder Scrolls V: Skyrim", correct: false },
                    { text: "Dark Souls", correct: true },
                    { text: "The Legend of Zelda: Breath of the Wild", correct: false },
                    { text: "Witcher 3: Wild Hunt", correct: false },
                ],
            },
            {
                id: 36,
                question: "What AI character leads the player through the tests in 'Portal'?",
                answers: [
                    { text: "Cortana", correct: false },
                    { text: "GLaDOS", correct: true },
                    { text: "HAL 9000", correct: false },
                    { text: "Claptrap", correct: false },
                ],
            },
        ],
    },
    ARCHI: {
        EASY: [
            {
                id: 37,
                question: "What is the architectural style characterized by pointed arches, ribbed vaults, and flying buttresses?",
                answers: [
                    { text: "Baroque", correct: false },
                    { text: "Gothic", correct: true },
                    { text: "Renaissance", correct: false },
                    { text: "Romanesque", correct: false },
                ],
            },
            {
                id: 38,
                question: "Which of these materials is commonly used for modern skyscrapers?",
                answers: [
                    { text: "Wood", correct: false },
                    { text: "Steel", correct: true },
                    { text: "Brick", correct: false },
                    { text: "Concrete", correct: false },
                ],
            },
            {
                id: 39,
                question: "What is the main purpose of a foundation in construction?",
                answers: [
                    { text: "To decorate the building", correct: false },
                    { text: "To support the structure", correct: true },
                    { text: "To provide insulation", correct: false },
                    { text: "To prevent leaks", correct: false },
                ],
            },
        ],
        MEDIUM: [
            {
                id: 40,
                question: "Who designed the Guggenheim Museum in Bilbao, Spain?",
                answers: [
                    { text: "Frank Lloyd Wright", correct: false },
                    { text: "Frank Gehry", correct: true },
                    { text: "I.M. Pei", correct: false },
                    { text: "Zaha Hadid", correct: false },
                ],
            },
            {
                id: 41,
                question: "Which architectural principle is described as the idea that a building's form should be based on its intended function or purpose?",
                answers: [
                    { text: "Form follows function", correct: true },
                    { text: "Less is more", correct: false },
                    { text: "Decorative ornamentation", correct: false },
                    { text: "Structural expressionism", correct: false },
                ],
            },
            {
                id: 42,
                question: "What is 'sustainable architecture' focused on?",
                answers: [
                    { text: "Creating iconic skyscrapers", correct: false },
                    { text: "Minimizing environmental impact", correct: true },
                    { text: "Using traditional construction methods", correct: false },
                    { text: "Building with the cheapest materials", correct: false },
                ],
            },
        ],
        HARD: [
            {
                id: 43,
                question: "Which city is known for its Art Nouveau architecture, particularly seen in the works of Antoni Gaudí?",
                answers: [
                    { text: "Paris", correct: false },
                    { text: "Barcelona", correct: true },
                    { text: "Vienna", correct: false },
                    { text: "Prague", correct: false },
                ],
            },
            {
                id: 44,
                question: "What is a cantilever in architecture?",
                answers: [
                    { text: "A type of arch", correct: false },
                    { text: "A long projecting beam or girder fixed at only one end", correct: true },
                    { text: "An open courtyard in the center of a building", correct: false },
                    { text: "A decorative cap on top of a pillar", correct: false },
                ],
            },
            {
                id: 45,
                question: "What architectural style is characterized by flat roofs, glass walls, and an emphasis on horizontal lines?",
                answers: [
                    { text: "Victorian", correct: false },
                    { text: "International Style", correct: true },
                    { text: "Art Deco", correct: false },
                    { text: "Craftsman", correct: false },
                ],
            },
        ],
    },
    CREA_DESIGN: {
        EASY: [
            {
                id: 46,
                question: "Which tool is commonly used to create vector graphics?",
                answers: [
                    { text: "Adobe Photoshop", correct: false },
                    { text: "Adobe Illustrator", correct: true },
                    { text: "Microsoft Paint", correct: false },
                    { text: "Adobe Premiere Pro", correct: false },
                ],
            },
            {
                id: 47,
                question: "What is the primary purpose of a mood board?",
                answers: [
                    { text: "To compile financial reports", correct: false },
                    { text: "To convey a general idea or feeling about a particular topic", correct: true },
                    { text: "To create a detailed plan for software development", correct: false },
                    { text: "To organize daily tasks", correct: false },
                ],
            },
            {
                id: 48,
                question: "What does 'CMYK' stand for in printing?",
                answers: [
                    { text: "Cyan, Magenta, Yellow, Key (Black)", correct: true },
                    { text: "Cyan, Magenta, Yellow, Kite", correct: false },
                    { text: "Color, Mix, Yellow, Black", correct: false },
                    { text: "Cyan, Maximum, Yellow, Black", correct: false },
                ],
            },
        ],
        MEDIUM: [
            {
                id: 49,
                question: "What is kerning in typography?",
                answers: [
                    { text: "Adjusting the opacity of type", correct: false },
                    { text: "Adjusting the spacing between characters", correct: true },
                    { text: "Applying effects to type", correct: false },
                    { text: "Changing the typeface", correct: false },
                ],
            },
            {
                id: 50,
                question: "In web design, what is a 'responsive' design?",
                answers: [
                    { text: "A design that responds to user actions like clicks or hover", correct: false },
                    { text: "A design that automatically adjusts to fit the screen size of the device", correct: true },
                    { text: "A design that loads quickly on all devices", correct: false },
                    { text: "A design that uses vibrant colors", correct: false },
                ],
            },
            {
                id: 51,
                question: "Which principle of design refers to the visual weight of elements in a composition?",
                answers: [
                    { text: "Alignment", correct: false },
                    { text: "Balance", correct: true },
                    { text: "Contrast", correct: false },
                    { text: "Proximity", correct: false },
                ],
            },
        ],
        HARD: [
            {
                id: 52,
                question: "What does 'skeuomorphism' mean in design?",
                answers: [
                    { text: "A minimalist design approach", correct: false },
                    { text: "Design elements that mimic their real-world counterparts", correct: true },
                    { text: "A trend in digital design that emphasizes simplicity", correct: false },
                    { text: "The use of abstract shapes and colors", correct: false },
                ],
            },
            {
                id: 53,
                question: "What is the rule of thirds in composition?",
                answers: [
                    { text: "Dividing a design into three equal parts horizontally and vertically", correct: false },
                    { text: "A guideline proposing that an image should be imagined as divided into nine equal parts", correct: true },
                    { text: "A design must have three primary colors", correct: false },
                    { text: "Every design should have three elements for balance", correct: false },
                ],
            },
            {
                id: 54,
                question: "Which color model is based on human perception rather than mathematical models?",
                answers: [
                    { text: "RGB", correct: false },
                    { text: "CMYK", correct: false },
                    { text: "LAB", correct: true },
                    { text: "HSV", correct: false },
                ],
            },
        ],
    },
};

module.exports = questions;
