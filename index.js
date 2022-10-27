// import { default as mustache } from 'https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.js';;
import { default as mustache } from './node_modules/mustache/mustache.mjs';

const HALF_SPACE = {'special': 'half-space'};
const FULL_SPACE = {'special': 'full-space'};
const SPACE = FULL_SPACE;
const DOUBLE_PIPE = '||';
const PUNCT_STAR = 'P*';
const PUNCT_CROSS = 'PX';
const FUTHORC_EH = 'EH'; // Futhorc Eh is a character in the font, but did Tolkien ever use it in the Cirth?
const E_ = 'E_'; // FIXME: Called Erebor underscore, but that seems to be based on the font name
const CIRTH_PUNCT_MID_DOT = 'P49';      // 73 == character for I which is how you type this
const CIRTH_PUNCT_DOT = 'P5C';          // 92 == character for \ which is how you type this
const CIRTH_PUNCT_TWO_DOTS = 'P4F';     // 79 == character for O which is how you type this
const CIRTH_PUNCT_THREE_DOTS = 'P50';   // 80 == character for P which is how you type this
const CIRTH_PUNCT_THREE_DOTS_L = 'P7B'; // 123 == character for { which is how you type this
const CIRTH_PUNCT_FOUR_DOTS = 'P7D';    // 125 == character for } which is how you type this
const CIRTH_PUNCT_EQUAL = 'P=';         // 61 / 0x3D would be the character for =

export const cirthModes = {
    common: {
        orthography: {
            1: {orthography: 'p'},
            2: {orthography: 'b'},
            3: {orthography: 'f'},
            4: {orthography: 'v'},
            5: {orthography: 'hw'},
            6: {orthography: 'm'},
            8: {orthography: 't'},
            9: {orthography: 'd'},
            10: {orthography: 'th'},
            11: {orthography: 'dh'},
            13: {orthography: 'ch'},
            15: {orthography: 'sh'},
            18: {orthography: 'k'},
            19: {orthography: 'g'},
            20: {orthography: 'kh'},
            21: {orthography: 'gh'},
            23: {orthography: 'kw'},
            24: {orthography: 'gw'},
            25: {orthography: 'khw'},
            26: {orthography: 'ghw'},
            27: {orthography: 'ngw'},
            28: {orthography: 'nw'},
            31: {orthography: 'l'},
            42: {orthography: 'u'},
            44: {orthography: 'w'},
            45: {orthography: 'ü'},
            46: {orthography: 'e'},
            48: {orthography: 'a'},
            50: {orthography: 'o'},
            59: {orthography: '+h'},
            60: {orthography: '&', isWord: true},
        },
    },
    daeron: {
        title: 'Angerthas Daeron',
        name: 'angerthas-daeron',
        language: 'Sindarin or Quenya',
        orthography: {
            7: {orthography: 'mh|mb', reduceSize: true},
            12: {orthography: 'n'},
            14: {orthography: 'j'},
            16: {orthography: 'zh'},
            17: {orthography: 'nj'},
            22: {orthography: 'ŋ'},
            29: {orthography: 'r'},
            30: {orthography: 'rh'},
            32: {orthography: 'lh'},
            33: {orthography: 'ng'},
            34: {orthography: 's'},
            35: {orthography: 's'},
            36: {orthography: 'ss|z'},
            38: {orthography: 'nd'},
            39: {orthography: 'i|y'},
            43: {orthography: 'ú'},
            47: {orthography: 'é'},
            49: {orthography: 'á'},
            51: {orthography: 'ó'},
            52: {orthography: 'ö'},
            53: {orthography: ''},
            54: {orthography: 'h'},
        },
    },
    moria: {
        title: 'Angerthas Moria',
        name: 'angerthas-moria',
        language: 'Khuzdul or Westron',
        orthography: {
            7: {orthography: 'mb'},
            12: {orthography: 'r'},
            17: {orthography: 'j'},
            22: {orthography: 'n'},
            29: {orthography: 'j'},
            30: {orthography: 'zh'},
            32: {orthography: 'lh'},
            33: {orthography: 'nd'},
            34: {orthography: 'h'}, // the value of this and 54 are sometimes swapped
            35: {orthography: "'"}, // the value of this and 54 are sometimes swapped
            36: {orthography: 'ŋ'},
            37: {orthography: 'ng'},
            38: {orthography: 'nj'},
            39: {orthography: 'i'},
            40: {orthography: 'y'},
            41: {orthography: 'hy'},
            43: {orthography: 'ú'},
            47: {orthography: 'é'},
            49: {orthography: 'á'},
            51: {orthography: 'ó'},
            52: {orthography: 'ö'},
            53: {orthography: 'n'},
            54: {orthography: 's'}, // the value of this and 34/35 are sometimes swapped
            55: {orthography: 'ə'}, // unstressed schwa
            56: {orthography: 'ʌ'}, // stressed schwa
        },
    },
    'erebor': {
        title: 'Angerthas Erebor',
        name: 'angerthas-erebor',
        language: 'Khuzdul or English',
        orthography: {
            7: {orthography: 'mb'},
            12: {orthography: 'r'},
            14: {orthography: 'j'},
            16: {orthography: 'zh'},
            17: {orthography: 'ks'},
            22: {orthography: 'n'},
            29: {orthography: 'g'},
            30: {orthography: 'gh'},
            32: {orthography: ''},
            33: {orthography: 'nd'},
            34: {orthography: 's'},
            35: {orthography: 's'},
            36: {orthography: 'ŋ'},
            37: {orthography: 'ng'},
            38: {orthography: 'ou'},
            39: {orthography: 'i|1'},
            40: {orthography: 'y'},
            41: {orthography: 'hy'},
            43: {orthography: 'z'},
            47: {orthography: 'ee'},
            49: {orthography: 'aa'},
            51: {orthography: 'oo'},
            52: {orthography: 'ö|3'},
            53: {orthography: 'n'},
            54: {orthography: 'h'},
            55: {orthography: 'ə'}, // unstressed schwa
            56: {orthography: 'ʌ'}, // stressed schwa
            57: {orthography: 'ps'},
            58: {orthography: 'ts'},
            E1: {orthography: 'eu'},
            E2: {orthography: 'll'},
            E3: {orthography: 'the', isWord: true},
            '#4': {orthography: '4'},
            E4: {orthography: 'ai'},
            E5: {orthography: 'ay'},
            E6: {orthography: 'ea'},
            E7: {orthography: 'oa'},
            E_: {orthography: ''},
            [FUTHORC_EH]: {orthography: ''},
            U2D: {orthography: 'iu'}, // very similar to cirth 45
            U2E: {orthography: 'ui'}, // very similar to cirth 45_alt
            U46: {orthography: 'ndž'},
            U47: {orthography: ''},
            U48: {orthography: ''},
            U49: {orthography: ''},
            U4A: {orthography: ''},
            U4B: {orthography: ''},
            U4C: {orthography: 'nd'},
            U4D: {orthography: ''},
            U4F: {orthography: ''},
            U50: {orthography: 'au'},
            U42: {orthography: 'ps'},
            U43: {orthography: 'bz'},
            U44: {orthography: 'ks'},
            U45: {orthography: 'gz'},
            U53: {orthography: 'ae'},
            U56: {orthography: 'o'},
            U58: {orthography: 'oo'},
            U59: {orthography: 'ou'},
            U5A: {orthography: 'eu'},
            U5B: {orthography: 'ou'},
            U5C: {orthography: ''},
            U5D: {orthography: ''},
            U5F: {orthography: ''},
            U60: {orthography: 'of', isWord: true},
            U61: {orthography: 'y|ü'},
            U62: {orthography: ''},
            U63: {orthography: 'is', isWord: true},
            U64: {orthography: ''},
            U65: {orthography: 'ö|ø'},
            U66: {orthography: ''},
            [DOUBLE_PIPE]: {orthography: ''},
            [PUNCT_STAR]: {orthography: '*'},
            [PUNCT_CROSS]: {orthography: ''},
        },
    },
}

export const cirthData = {
    // This unicodeTable is for reference, and represents the proposed inclusion of Cirth in unicode (not yet standardised)
    // See https://www.evertype.com/standards/iso10646/pdf/cirth.pdf
    unicodeTable: {
        0xE080: {name: "CIRTH LETTER P", cirthNumber: 1},
        0xE081: {name: "CIRTH LETTER B", cirthNumber: 2},
        0xE082: {name: "CIRTH LETTER F", cirthNumber: 3},
        0xE083: {name: "CIRTH LETTER V", cirthNumber: 4},
        0xE084: {name: "CIRTH LETTER HW", cirthNumber: 5},
        0xE085: {name: "CIRTH LETTER M", cirthNumber: 6},
        0xE086: {name: "CIRTH LETTER MB", cirthNumber: 7},
        0xE087: {name: "CIRTH LETTER T", cirthNumber: 8},
        0xE088: {name: "CIRTH LETTER D", cirthNumber: 9},
        0xE089: {name: "CIRTH LETTER TH", cirthNumber: 10},
        0xE08A: {name: "CIRTH LETTER DH", cirthNumber: 11},
        0xE08B: {name: "CIRTH LETTER N", cirthNumber: 12},
        0xE08C: {name: "CIRTH LETTER CH", cirthNumber: 13},
        0xE08D: {name: "CIRTH LETTER J", cirthNumber: 14},
        0xE08E: {name: "CIRTH LETTER SH", cirthNumber: 15},
        0xE08F: {name: "CIRTH LETTER ZH", cirthNumber: 16},
        0xE090: {name: "CIRTH LETTER NJ", cirthNumber: 17},
        0xE091: {name: "CIRTH LETTER K", cirthNumber: 18},
        0xE092: {name: "CIRTH LETTER G", cirthNumber: 19},
        0xE093: {name: "CIRTH LETTER KH", cirthNumber: 20},
        0xE094: {name: "CIRTH LETTER GH", cirthNumber: 21},
        0xE095: {name: "CIRTH LETTER ENG", cirthNumber: 22},
        0xE096: {name: "CIRTH LETTER KW", cirthNumber: 23},
        0xE097: {name: "CIRTH LETTER GW", cirthNumber: 24},
        0xE098: {name: "CIRTH LETTER KHW", cirthNumber: 25},
        0xE099: {name: "CIRTH LETTER GHW", cirthNumber: 26},
        0xE09A: {name: "CIRTH LETTER NGW", cirthNumber: 27},
        0xE09B: {name: "CIRTH LETTER NW", cirthNumber: 28},
        0xE09C: {name: "CIRTH LETTER R", cirthNumber: 29},
        0xE09D: {name: "CIRTH LETTER RH", cirthNumber: 30},
        0xE09E: {name: "CIRTH LETTER L", cirthNumber: 31},
        0xE09F: {name: "CIRTH LETTER LH", cirthNumber: 32},
        0xE0A0: {name: "CIRTH LETTER NG", cirthNumber: 33},
        0xE0A1: {name: "CIRTH LETTER S", cirthNumber: 34},
        0xE0A2: {name: "CIRTH LETTER KHUZDUL GLOTTAL STOP", cirthNumber: 35},
        0xE0A3: {name: "CIRTH LETTER Z", cirthNumber: 36},
        0xE0A4: {name: "CIRTH LETTER KHUZDUL NG", cirthNumber: 37},
        0xE0A5: {name: "CIRTH LETTER ND", cirthNumber: 38},
        0xE0A6: {name: "CIRTH LETTER EI", cirthNumber: '38_alt'},
        0xE0A7: {name: "CIRTH LETTER I", cirthNumber: 39},
        0xE0A8: {name: "CIRTH LETTER KHUZDUL Y", cirthNumber: 40},
        0xE0A9: {name: "CIRTH LETTER KHUZDUL HY", cirthNumber: 41},
        0xE0AA: {name: "CIRTH LETTER U", cirthNumber: 42},
        0xE0AB: {name: "CIRTH LETTER UU", cirthNumber: 43},
        0xE0AC: {name: "CIRTH LETTER W", cirthNumber: 44},
        0xE0AD: {name: "CIRTH LETTER UE", cirthNumber: 45}, // another variant as 'U2D'
        0xE0AE: {name: "CIRTH LETTER UI", cirthNumber: '45_alt'}, // another variant as 'U2D_alt'
        0xE0AF: {name: "CIRTH LETTER E", cirthNumber: 46},
        0xE0B0: {name: "CIRTH LETTER EE", cirthNumber: 47},
        0xE0B1: {name: "CIRTH LETTER A", cirthNumber: 48},
        0xE0B2: {name: "CIRTH LETTER AA", cirthNumber: 49},
        0xE0B3: {name: "CIRTH LETTER O", cirthNumber: 50},
        0xE0B4: {name: "CIRTH LETTER OO", cirthNumber: 51},
        0xE0B5: {name: "CIRTH LETTER VARIANT OO", cirthNumber: '51_alt'},
        0xE0B6: {name: "CIRTH LETTER OE", cirthNumber: 52},
        0xE0B7: {name: "CIRTH LETTER VARIANT OE", cirthNumber: '52_alt'},
        0xE0B8: {name: "CIRTH LETTER KHUZDUL N", cirthNumber: 53},
        0xE0B9: {name: "CIRTH LETTER H", cirthNumber: 54},
        0xE0BA: {name: "CIRTH LETTER KHUZDUL REVERSED SCHWA", cirthNumber: 55},
        0xE0BB: {name: "CIRTH LETTER SHORT REVERSED SCHWA", cirthNumber: '55_alt'},
        0xE0BC: {name: "CIRTH LETTER KHUZDUL SCHWA", cirthNumber: 56},
        0xE0BD: {name: "CIRTH LETTER SHORT SCHWA", cirthNumber: '56_alt'},
        0xE0BE: {name: "CIRTH LETTER KHUZDUL PS", cirthNumber: 57},
        0xE0BF: {name: "CIRTH LETTER KHUZDUL TS", cirthNumber: 58},
        0xE0C0: {name: "CIRTH MODIFIER LETTER H", cirthNumber: 59},
        0xE0C1: {name: "CIRTH AMPERSAND", cirthNumber: 60}, // Tolkien's main Cirth chart ends here
        0xE0C2: {name: "CIRTH LETTER SP", cirthNumber: 'U42'},
        0xE0C3: {name: "CIRTH LETTER SB", cirthNumber: 'U43'},
        0xE0C4: {name: "CIRTH LETTER SC", cirthNumber: 'U44'},
        0xE0C5: {name: "CIRTH LETTER SG", cirthNumber: 'U45'},
        0xE0C6: {name: "CIRTH LETTER NDZH", cirthNumber: 'U46'},
        0xE0C7: {name: "CIRTH LETTER DORIATHRIN KW", cirthNumber: 'U47'},
        0xE0C8: {name: "CIRTH LETTER DORIATHRIN GW", cirthNumber: 'U48'},
        0xE0C9: {name: "CIRTH LETTER DORIATHRIN KHW", cirthNumber: 'U49'},
        0xE0CA: {name: "CIRTH LETTER DORIATHRIN GHW", cirthNumber: 'U4A'},
        0xE0CB: {name: "CIRTH LETTER DORIATHRIN L", cirthNumber: 'U4B'},
        0xE0CC: {name: "CIRTH LETTER ENGLISH ND", cirthNumber: 'U4C'},
        0xE0CD: {name: "CIRTH LETTER DORIATHRIN Z", cirthNumber: 'U4D'},
        0xE0CE: {name: "CIRTH LETTER LL", cirthNumber: 'U4E'}, // This is not in Dan Smith's Erebor font; Cirth 31 with double cross bar
        0xE0CF: {name: "CIRTH LETTER IU", cirthNumber: 'U4F'},
        0xE0D0: {name: "CIRTH LETTER AI", cirthNumber: 'U50'},
        0xE0D1: {name: "CIRTH LETTER AU", cirthNumber: 'E5'},
        0xE0D2: {name: "CIRTH LETTER AY", cirthNumber: 'E4'},
        0xE0D3: {name: "CIRTH LETTER AE", cirthNumber: 'U53'},
        0xE0D4: {name: "CIRTH LETTER EA", cirthNumber: 'E6'},
        0xE0D5: {name: "CIRTH LETTER EW", cirthNumber: 'E1'},
        0xE0D6: {name: "CIRTH LETTER NOLDORIN O", cirthNumber: 'U56'},
        0xE0D7: {name: "CIRTH LETTER VARIANT NOLDORIN O", cirthNumber: '#4'},
        0xE0D8: {name: "CIRTH LETTER NOLDORIN OO", cirthNumber: 'U58'},
        0xE0D9: {name: "CIRTH LETTER IO", cirthNumber: 'U59'},
        0xE0DA: {name: "CIRTH LETTER EU", cirthNumber: 'U5A'},
        0xE0DB: {name: "CIRTH LETTER OU", cirthNumber: 'U5B'},
        0xE0DC: {name: "CIRTH LETTER NOLDORIN OE", cirthNumber: 'U5C'},
        0xE0DD: {name: "CIRTH LETTER DORIATHRIN O", cirthNumber: 'U5D'},
        0xE0DE: {name: "CIRTH ENGLISH THE", cirthNumber: 'E3'},
        0xE0DF: {name: "CIRTH NOLDORIN L", cirthNumber: 'U5F'},
        0xE0E0: {name: "CIRTH ENGLISH OF", cirthNumber: 'U60'},
        0xE0E1: {name: "CIRTH LETTER Y", cirthNumber: 'U61'},
        0xE0E2: {name: "CIRTH LETTER VARIANT Y", cirthNumber: 'U62'},
        0xE0E3: {name: "CIRTH ENGLISH IS", cirthNumber: 'U63'},
        0xE0E4: {name: "CIRTH LETTER YY", cirthNumber: 'U64'},
        0xE0E5: {name: "CIRTH LETTER NOLDORIN OE", cirthNumber: 'U65'},
        0xE0E6: {name: "CIRTH LETTER NOLDORIN OOE", cirthNumber: 'U66'},
        0xE0E7: {name: "CIRTH SEPARATOR SINGLE DOT", cirthNumber: 'P49'},
        0xE0E8: {name: "CIRTH SEPARATOR DOUBLE DOT", cirthNumber: 'P4F'},
        0xE0E9: {name: "CIRTH SEPARATOR TRIPLE DOT", cirthNumber: 'P50'},
        0xE0EA: {name: "CIRTH START OR END OF TEXT", cirthNumber: 'P7D'},
        0xE0EB: {name: "CIRTH DOUBLE EM DASH", cirthNumber: 'P='},
        /*
        // These are from the tables at https://www.evertype.com/standards/csur/cirth.html, which are out of date
        0xE0E9: {name: "CIRTH SEPARATOR DOUBLE PIPE", cirthNumber: '||'}, // we have this as DOUBLE_PIPE
        // in Dan Smith's Erebor font these combining marks are present as a set of characters with varying widths
        0xE0EA: {name: "CIRTH COMBINING NASAL MARK", cirthNumber: ''},  // from characters 200-203 / c8-cb
        0xE0EB: {name: "CIRTH COMBINING LENGTH MARK", cirthNumber: ''}, // from characters 204-207 / cc-cf
        0xE0EC: {name: "CIRTH COMBINING NUMERIC DOT", cirthNumber: ''}, // from characters 209-211 / d1-d3
        */
    },
    fontData: {
        1: {keystroke: '1'},
        2: {keystroke: '2'},
        3: {keystroke: '3'},
        4: {keystroke: '4'},
        5: {keystroke: '5'},
        6: {keystroke: '6'},
        7: {keystroke: '7'},
        8: {keystroke: '8'},
        9: {keystroke: '9'},
        10: {keystroke: '0'},
        11: {keystroke: '!'},
        12: {keystroke: '@'},
        13: {keystroke: '#'},
        14: {keystroke: '$'},
        15: {keystroke: '%'},
        16: {keystroke: 'q'},
        17: {keystroke: 'w'},
        18: {keystroke: 'e'},
        19: {keystroke: 'r'},
        20: {keystroke: 't'},
        21: {keystroke: 'y'},
        22: {keystroke: 'u'},
        23: {keystroke: 'i'},
        24: {keystroke: 'o'},
        25: {keystroke: 'p'},
        26: {keystroke: 'Q'},
        27: {keystroke: 'W'},
        28: {keystroke: 'E'},
        29: {keystroke: 'R'},
        30: {keystroke: 'T'},
        31: {keystroke: 'a'},
        32: {keystroke: 's'},
        33: {keystroke: 'd'},
        34: {keystroke: 'f'},
        35: {keystroke: 'g'},
        36: {keystroke: 'h'},
        37: {keystroke: 'j'},
        38: {keystroke: 'k'},
        '38_alt': {keystroke: 'J'},
        39: {keystroke: 'l'},
        40: {keystroke: ';'},
        41: {keystroke: 'A'},
        42: {keystroke: 'S'},
        43: {keystroke: 'D'},
        44: {keystroke: 'F'},
        45: {keystroke: 'G'},
        '45_alt': {keystroke: 'L'},
        46: {keystroke: 'z'},
        47: {keystroke: 'x'},
        48: {keystroke: 'c'},
        49: {keystroke: 'v'},
        50: {keystroke: 'b'},
        51: {keystroke: 'n'},
        '51_alt': {keystroke: 'M'},
        52: {keystroke: 'm'},
        '52_alt': {keystroke: '<'},
        53: {keystroke: ','},
        54: {keystroke: '.'},
        55: {keystroke: '/'},
        '55_alt': {keystroke: '>'},
        56: {keystroke: 'Z'},
        '56_alt': {keystroke: '?'},
        57: {keystroke: 'X'},
        58: {keystroke: 'C'},
        59: {keystroke: 'V'},
        60: {keystroke: 'B'},
        E1: {keystroke: 'K'},
        E2: {keystroke: ':'},
        E3: {keystroke: '"'},
        E4: {keystroke: '&'},
        '#4': {keystroke: '+'},
        E5: {keystroke: '*'},
        E6: {keystroke: '('},
        E7: {keystroke: ')'},
        E_: {keystroke: '_'},
        [FUTHORC_EH]: {keystroke: 'ñ'},
        U2D: {keystroke: 'ë'},
        U2E: {keystroke: 'ì'},
        U46: {keystroke: 'æ'},
        U47: {keystroke: 'à'},
        U48: {keystroke: 'á'},
        U49: {keystroke: 'â'},
        U4A: {keystroke: 'ã'},
        U4B: {keystroke: 'ä'},
        U4C: {keystroke: 'å'},
        U4D: {keystroke: 'é'},
        U4F: {keystroke: 'ê'},
        U50: {keystroke: 'í'},
        U42: {keystroke: 'Ü'},
        U43: {keystroke: 'Ý'},
        U44: {keystroke: 'Þ'},
        U45: {keystroke: 'ß'},
        U53: {keystroke: 'û'},
        U56: {keystroke: 'ð'},
        U58: {keystroke: 'ò'},
        U59: {keystroke: 'ó'},
        U5A: {keystroke: 'î'},
        U5B: {keystroke: 'ï'},
        U5C: {keystroke: 'õ'},
        U5D: {keystroke: 'è'},
        U5D_alt: {keystroke: 'ç'},
        U5F: {keystroke: 'ô'},
        U60: {keystroke: 'ö'},
        U61: {keystroke: 'ø'},
        U62: {keystroke: 'ù'},
        U63: {keystroke: 'ú'},
        U64: {keystroke: '÷'},
        U65: {keystroke: 'ü'},
        U66: {keystroke: 'ý'},
        [DOUBLE_PIPE]: {keystroke: '|'},
        [PUNCT_STAR]: {keystroke: 'U'},
        [PUNCT_CROSS]: {keystroke: ']'},
        [CIRTH_PUNCT_MID_DOT]: {keystroke: 'I'},
        [CIRTH_PUNCT_DOT]: {keystroke: '\\'},
        [CIRTH_PUNCT_TWO_DOTS]: {keystroke: 'O'},
        [CIRTH_PUNCT_THREE_DOTS]: {keystroke: 'P'},
        [CIRTH_PUNCT_THREE_DOTS_L]: {keystroke: '{'},
        [CIRTH_PUNCT_FOUR_DOTS]: {keystroke: '}'},
        [CIRTH_PUNCT_EQUAL]: {keystroke: '='},
    },
}

export const cirthLayouts = {
    portrait: {
        name: 'portrait',
        orientation: 'portrait',
        tileMetrics: {
            cirthOffset: {x: 81.417236, y: -16.574439},
            cirthSpacing: {x: 16.68, y: 18.4154},
            cirthPunctOffset: {x: 66.792236, y: 0},
            cirthPunctSpacing: {x: 10.709, y: 18.4154},
        },
        textPositions: {
            cirthLegend: {x: 157.95149, y: 276.338212},
            legendLText: {x: 156.92776, y: 278.83761},
            legendRText: {x: 172.47233, y: 276.77080},
            descriptionText: {x: 118.24999, y: 236.91302},
            punctuationTitle: {x: 180.27777, y: 136.91945},
            chartTitle: {x: -270.40067, y: 23.093559, transform: 'rotate(-90)'},
        },
        textSizes: {
            descriptionText: {fontSize: 3.7, lineHeight: 1.25},
            legendText: {fontSize: 2.46944, lineHeight: 1.25},
            punctuationTitle: {fontSize: 4.23333},
            chartTitle: {fontSize: 19.7556},
        },
        cirthRows: [
            {rowLabel: '1', cirth: ['U66', SPACE, 'U65', 'U5C', SPACE, SPACE, SPACE, SPACE, HALF_SPACE, 'U64', 'E1'], leftchar: -3.5},
            {rowLabel: '2', cirth: ['U58', '#4', 'U56', E_, 50, 51, '51_alt', FUTHORC_EH, '38_alt', 38, 'U4F'], leftchar: -3.5},
            {rowLabel: '3', cirth: [53, SPACE, 54, '52_alt', 'E7', 'E6', 'E4', 'U50', 'E5'], leftchar: -1.5},
            {rowLabel: '4', cirth: ['U5B', 'U59', 22, 33, 17, 52, 'U5A', SPACE, 'U53', 48, 49], leftchar: -3.5},
            {rowLabel: '5', cirth: [PUNCT_STAR, PUNCT_CROSS, 36, 37], leftchar: -2.5},
            {rowLabel: '6', cirth: [31, '56_alt', 56, 'E3', 39, 59, 55, '55_alt', 32, DOUBLE_PIPE, 46, 47], leftchar: -4.5},
            {rowLabel: '7', cirth: ['U46', 27, 12, 'U4B', 'U4C', SPACE, HALF_SPACE, SPACE, SPACE, 'E2'], leftchar: -3},
            {rowLabel: '8', cirth: ['U4D', 25, 60, 'U5F', 23, 28, HALF_SPACE, 40, 41], leftchar: -3},
            {rowLabel: '9', cirth: ['U4A', 'U49', 'U47', 'U48', 'U5D_alt', HALF_SPACE, 'U5D'], leftchar: -2},
            {rowLabel: '10', cirth: [26, 11, 10, 8, 9, 24], leftchar: -3},
            {rowLabel: '10.5', cirth: [43, "U63", "U61", "U62"], leftchar: 3.25},
            {rowLabel: '11', cirth: [21, 20, 18, 19], leftchar: -2},
            {rowLabel: '11.5', cirth: [45, "U2D", 42, 44], leftchar: 3.25},
            {rowLabel: '12', cirth: [34, 30, 29, 35], leftchar: -2},
            {rowLabel: '12.5', cirth: ["45_alt", "U2E", SPACE, 5], leftchar: 3.25},
            {rowLabel: '13', cirth: [16, 15, 13, 14], leftchar: -2},
            {rowLabel: '14', cirth: ['U45', 'U44', 'U42', 'U43'], leftchar: -2},
            {rowLabel: '15', cirth: [58, 57], leftchar: -1},
            {rowLabel: '16', cirth: ['U60', 7, 4, 3, 1, 2, 6], leftchar: -4},
        ],
        punctuationRows: [
            {rowLabel: '8.44', cirth: [CIRTH_PUNCT_EQUAL, CIRTH_PUNCT_MID_DOT, CIRTH_PUNCT_THREE_DOTS], leftchar: 9.8},
            {rowLabel: '9', cirth: [CIRTH_PUNCT_DOT, CIRTH_PUNCT_THREE_DOTS_L], leftchar: 11},
            {rowLabel: '9.55', cirth: [CIRTH_PUNCT_TWO_DOTS, CIRTH_PUNCT_FOUR_DOTS], leftchar: 11},
        ],
    },
    landscape: {
        name: 'landscape',
        orientation: 'landscape',
        // note some metrics are interpreted inverted in landscape mode
        tileMetrics: {
            cirthOffset: {x: 80, y: -14.574439},
            cirthSpacing: {x: 17.2, y: 17},
            cirthScaling: {x: 0.95, y: 0.95},
            cirthPunctOffset: {x: 82, y: 0},
            cirthPunctSpacing: {x: 9.9, y: 18.9},
        },
        textPositions: {
            cirthLegend: {x: 239.05549, y: 185.79812},
            legendLText: {x: 238.03176, y: 188.29761},
            legendRText: {x: 253.50633, y: 186.23080},
            descriptionText: {x: 214, y: 143.25836},
            punctuationTitle: {x: -204.04176, y: 125, transform: 'rotate(-90)'},
            chartTitle: {x: 105.05647, y: 19.49925},
        },
        textSizes: {
            descriptionText: {fontSize: 3.7, lineHeight: 1.25},
            legendText: {fontSize: 2.46944, lineHeight: 1.25},
            punctuationTitle: {fontSize: 4.23333},
            chartTitle: {fontSize: 19.7556},
        },
        cirthRows: [
            {rowLabel: '1', cirth: ['U66', SPACE, 'U65', 'U5C', SPACE, SPACE, SPACE, SPACE, HALF_SPACE, 'U64', 'E1'], leftchar: -3.5},
            {rowLabel: '2', cirth: ['U58', '#4', 'U56', E_, 50, 51, '51_alt', FUTHORC_EH, '38_alt', 38, 'U4F'], leftchar: -3.5},
            {rowLabel: '3', cirth: [53, SPACE, 54, '52_alt', 'E7', 'E6', 'E4', 'U50', 'E5'], leftchar: -1.5},
            {rowLabel: '4', cirth: ['U5B', 'U59', 22, 33, 17, 52, 'U5A', SPACE, 'U53', 48, 49], leftchar: -3.5},
            {rowLabel: '5', cirth: [PUNCT_STAR, PUNCT_CROSS, 36, 37], leftchar: -2.5},
            {rowLabel: '6', cirth: [31, '56_alt', 56, 'E3', 39, 59, 55, '55_alt', 32, DOUBLE_PIPE, 46, 47], leftchar: -4.5},
            {rowLabel: '7', cirth: ['U46', 27, 12, 'U4B', 'U4C', SPACE, HALF_SPACE, SPACE, SPACE, 'E2'], leftchar: -3},
            {rowLabel: '8', cirth: ['U4D', 25, 60, 'U5F', 23, 28, HALF_SPACE, 40, 41], leftchar: -3},
            {rowLabel: '9', cirth: ['U4A', 'U49', 'U47', 'U48', 'U5D_alt', HALF_SPACE, 'U5D'], leftchar: -2},
            {rowLabel: '10', cirth: [26, 11, 10, 8, 9, 24], leftchar: -3},
            {rowLabel: '10.5', cirth: [43, "U63", "U61", "U62"], leftchar: 3.25},
            {rowLabel: '11', cirth: [21, 20, 18, 19], leftchar: -2},
            {rowLabel: '11.5', cirth: [45, "U2D", 42, 44], leftchar: 3.25},
            {rowLabel: '12', cirth: [34, 30, 29, 35], leftchar: -2},
            {rowLabel: '12.5', cirth: ["45_alt", "U2E", SPACE, 5], leftchar: 3.25},
            {rowLabel: '13', cirth: [16, 15, 13, 14], leftchar: -2},
            {rowLabel: '14', cirth: ['U45', 'U44', 'U42', 'U43'], leftchar: -2},
            {rowLabel: '15', cirth: [58, 57], leftchar: -1},
            {rowLabel: '16', cirth: ['U60', 7, 4, 3, 1, 2, 6], leftchar: -4},
        ],
        punctuationRows: [
            {rowLabel: '8.44', cirth: [CIRTH_PUNCT_EQUAL, CIRTH_PUNCT_MID_DOT, CIRTH_PUNCT_THREE_DOTS], leftchar: 10},
            {rowLabel: '9', cirth: [CIRTH_PUNCT_DOT, CIRTH_PUNCT_THREE_DOTS_L], leftchar: 11},
            {rowLabel: '9.55', cirth: [CIRTH_PUNCT_TWO_DOTS, CIRTH_PUNCT_FOUR_DOTS], leftchar: 11},
        ],
    },
}

function compileCirthInfo(cirthNumber, charLookup, orthLookup) {
    var cirthId = typeof cirthNumber == 'number' ? cirthNumber.toString() : cirthNumber;
    var cirthLabel = cirthId;
    var cirthDisplayNumber = cirthId;
    var cirthStyle = 'cirthRegular';
    if (cirthLabel.startsWith('U')) {
        cirthLabel = cirthLabel.replace('U', 'Uxx');
        cirthStyle = 'cirthUnicode';
        cirthDisplayNumber = cirthDisplayNumber.replace('U', '').toLowerCase();
    } else if (cirthLabel.startsWith('E')) {
        cirthLabel = cirthLabel.replace('E', 'Erebor');
        cirthStyle = 'cirthErebor';
        cirthDisplayNumber = cirthDisplayNumber.toLowerCase();
    } else if (cirthLabel.startsWith('#')) {
        cirthLabel = cirthLabel.replace('#', 'Numeral');
        cirthStyle = 'cirthErebor';
        cirthDisplayNumber = cirthDisplayNumber.toLowerCase();
    } else if (cirthLabel.startsWith('P')) {
        cirthLabel = cirthLabel.replace('P', 'Punct');
        cirthStyle = 'cirthPunctuation';
        cirthDisplayNumber = '?'; // cirthDisplayNumber.replace('P', '').toLowerCase();
    }
    if (cirthDisplayNumber.endsWith('_alt')) {
        cirthDisplayNumber = cirthDisplayNumber.replace('_alt', '*');
    }
    var charInfo = Object.assign({}, charLookup[cirthNumber]);
    charInfo['cirthNumber'] = cirthDisplayNumber;
    charInfo['cirthId'] = cirthId;
    charInfo['cirthLabel'] = cirthLabel;
    var keystroke = charInfo.keystroke;
    charInfo['fontCharacter'] = keystroke;
    var fontCodePoint = keystroke.codePointAt(0);
    if (fontCodePoint > 128) {
        keystroke = fontCodePoint.toString(16);
        charInfo['widekeys'] = true;
        cirthStyle += ' altnumpad';
    }
    charInfo['keystroke'] = keystroke;
    if (orthLookup !== false) {
        var orthInfo = orthLookup[cirthId.replace('_alt', '')];
        if (orthInfo === undefined) {
            // console.debug(`Couldn't find orthography for ${cirthNumber}`);
            orthInfo = {'orthography': ''};
        }
        if (orthInfo.orthography == '')
            orthInfo.orthography = '-';
        if (orthInfo.isWord == true) {
            cirthStyle += ' cirthWord';
        }
        if (orthInfo.reduceSize == true) {
            orthInfo.smallOrthography = true;
        }
        charInfo = Object.assign(charInfo, orthInfo);
    }
    charInfo['cirthStyle'] = cirthStyle;
    return charInfo;
}

function expandedLayout(layout, charLookup, orthLookup, includeUnused) {
    // this includes the relevant character information into the layout
    const orientation = layout.orientation;
    var cirthLayout = [];
    var punctuationLayout = [];
    const rowsSkipped = [];
    var unusedRows = 0;
    for (var cirthRow of layout['cirthRows']) {
        const rowLabel = cirthRow['rowLabel'];
        const rowOffset = cirthRow.leftchar;
        const rowNumber = parseFloat(rowLabel) - unusedRows;
        var yOffset = rowNumber*layout.tileMetrics.cirthSpacing.y + layout.tileMetrics.cirthOffset.y;
        let offset = {}
        if (orientation == 'portrait') {
            offset = {x: layout.tileMetrics.cirthOffset.x, y: yOffset};
        } else {
            offset = {y: layout.tileMetrics.cirthOffset.x, x: yOffset};
        }
        var expandedRow = {'rowLabel': rowLabel, 'offset': offset};
        var expandedChars = [];
        let indexOffset = 0;
        for (let [index, cirthNumber] of cirthRow['cirth'].entries()) {
            if (typeof cirthNumber === 'object' && cirthNumber.special == 'half-space') {
                indexOffset -= 0.5;
                continue
            }
            if (typeof cirthNumber === 'object' && cirthNumber.special == 'full-space') {
                continue;
            }
            var charInfo = compileCirthInfo(cirthNumber, charLookup, orthLookup);
            if (!includeUnused && charInfo.orthography == '-') continue;
            var charOffset = (index + indexOffset + rowOffset)*layout.tileMetrics.cirthSpacing.x;
            if (orientation == 'portrait') {
                charInfo['offset'] = {x: charOffset, y: 0};
            } else {
                charInfo['offset'] = {x: 0, y: charOffset};
            }
            expandedChars.push(charInfo);
        }
        if (expandedChars.length > 0) {
            expandedRow['cirth'] = expandedChars;
            cirthLayout.push(expandedRow);
        } else {
            unusedRows += 1;
            rowsSkipped.push(parseFloat(rowLabel));
            console.log("Skipped row at", rowLabel);
        }
    }
    // these complicated heuristics could perhaps be handled better by fixing them based on mode id
    let shiftPunctuationRows = 0;
    let shiftLegendRows = 0;
    let shiftTitleStart = 0;
    let shiftTitleEnd = 0;
    for (let skippedRow of rowsSkipped) {
        if (skippedRow < 7) shiftTitleStart += 1;
        if (skippedRow > 7) shiftTitleEnd += 1;
        if (skippedRow < 9) shiftPunctuationRows += 1;
        if (skippedRow < 11) shiftLegendRows += 1;
    }
    if (shiftPunctuationRows != 0) {
        console.log(`Adjusting punctuation block by ${shiftPunctuationRows}`);
        layout.textPositions.punctuationTitle.y -= layout.tileMetrics.cirthSpacing.y * shiftPunctuationRows;
    }
    if (shiftLegendRows != 0) {
        console.log(`Adjusting legend by ${shiftLegendRows}`);
        if (orientation == 'portrait') {
            if (shiftTitleEnd >= 2) {
                layout.textPositions.descriptionText.x -= layout.tileMetrics.cirthSpacing.x * 5;
                layout.textPositions.descriptionText.y += layout.tileMetrics.cirthSpacing.x * 2.2;
                shiftLegendRows += 0.5;
            }
            for (let textItem of ['cirthLegend', 'legendLText', 'legendRText', 'descriptionText']) {
                layout.textPositions[textItem].y -= layout.tileMetrics.cirthSpacing.y * shiftLegendRows;
            }
        } else if (orientation == 'landscape') {
            for (let textItem of ['cirthLegend', 'legendLText', 'legendRText', 'descriptionText']) {
                layout.textPositions[textItem].x -= layout.tileMetrics.cirthSpacing.x * shiftLegendRows;
            }
        }
    }
    if (shiftTitleStart != 0 || shiftTitleEnd != 0) {
        let shiftTitle = shiftTitleStart;
        console.log(`Adjusting title by ${shiftTitle} with ${shiftTitleEnd - shiftTitleStart}`);
        if (orientation == 'portrait') {
            if (shiftTitleEnd < 2) {
                shiftTitle += 1;
                layout.textSizes.chartTitle.fontSize *= 0.95;
            }
            layout.textPositions.chartTitle.x += layout.tileMetrics.cirthSpacing.x * shiftTitle;
        }
        else if (orientation == 'landscape') {
            if (shiftTitleEnd < 2) {
                layout.textSizes.chartTitle.fontSize *= 0.92;
                shiftTitle += 0.1;
            }
            layout.textPositions.chartTitle.x -= layout.tileMetrics.cirthSpacing.x * shiftTitle;
        }
    }

    for (var cirthRow of layout['punctuationRows']) {
        const rowLabel = cirthRow['rowLabel'];
        const rowOffset = cirthRow.leftchar;
        const rowNumber = parseFloat(rowLabel) - shiftPunctuationRows;
        var yOffset = rowNumber*layout.tileMetrics.cirthSpacing.y+layout.tileMetrics.cirthOffset.y;
        let offset = {}
        if (orientation == 'portrait') {
            offset = {x: layout.tileMetrics.cirthPunctOffset.x, y: yOffset};
        } else {
            offset = {y: layout.tileMetrics.cirthPunctOffset.x, x: yOffset}
        }
        var expandedRow = {'rowLabel': rowLabel, 'offset': offset};
        var expandedChars = [];
        let indexOffset = 0;
        for (let [index, cirthNumber] of cirthRow['cirth'].entries()) {
            if (typeof cirthNumber === 'object' && cirthNumber.special == 'half-space') {
                indexOffset -= 0.5;
                continue
            }
            if (typeof cirthNumber === 'object' && cirthNumber.special == 'full-space') {
                continue;
            }
            var charInfo = compileCirthInfo(cirthNumber, charLookup, false);
            var charOffset = (index + indexOffset + rowOffset)*layout.tileMetrics.cirthPunctSpacing.x;
            if (orientation == 'portrait') {
                charInfo['offset'] = {x: charOffset, y: 0};
            } else {
                charInfo['offset'] = {x: 0, y: charOffset};
            }
            charInfo['widechar'] = (cirthNumber == CIRTH_PUNCT_EQUAL);
            if (charInfo['widechar'] && orientation == 'portrait') indexOffset += 0.2;
            expandedChars.push(charInfo);
        }
        expandedRow['cirth'] = expandedChars;
        punctuationLayout.push(expandedRow);
    }
    const descFS = layout.textSizes.descriptionText.fontSize;
    const descLH = layout.textSizes.descriptionText.lineHeight;
    const descY = layout.textPositions.descriptionText.y;
    const descRH = descFS*descLH;
    for (let textRow=0; textRow < 12; textRow++) {
        layout.textPositions.descriptionText['y'+textRow.toString()] = descY + descRH*textRow;
    }
    const legendFS = layout.textSizes.legendText.fontSize;
    const legendLH = layout.textSizes.legendText.lineHeight;
    const legendRY = layout.textPositions.legendRText.y;
    const legendLY = layout.textPositions.legendLText.y;
    const legendRH = legendFS*legendLH;
    let legendOffset = 0;
    for (let textRow=0; textRow < 6; textRow++) {
        // 0 and 1 are grouped together. 2 and 3 and 4 are grouped together
        if (textRow == 2 || textRow == 5) legendOffset += 1;
        layout.textPositions.legendRText['y'+textRow.toString()] = legendRY + legendFS*textRow + (legendLH-1)*legendOffset*3;
    }
    legendOffset = 0;
    for (let textRow=0; textRow < 6; textRow++) {
        // 0 and 1 and 2 are grouped together. 3 and 4 are grouped together, later on
        if (textRow == 3) legendOffset += 3;
        layout.textPositions.legendLText['y'+textRow.toString()] = legendLY + legendFS*textRow + (legendLH-1)*legendOffset*3;
    }
    const pageLayout = (layout.orientation == 'portrait') ? {width: '210', height: '297'} : {width: '297', height: '210'};
    return {'cirthRows': cirthLayout, 'punctuationRows': punctuationLayout, 'tileMetrics': layout.tileMetrics,
            'textSizes': layout.textSizes, 'textPositions': layout.textPositions, pageLayout};
}

function getCirthTemplateData(modeId, layoutId, includeUnused) {
    const cirthMode = cirthModes[modeId];
    const cirthLayout = structuredClone(cirthLayouts[layoutId]);
    const calculatedOrthography = Object.assign({}, cirthModes.common.orthography, cirthMode.orthography);
    cirthMode.orthography = calculatedOrthography;
    const layout = expandedLayout(cirthLayout, cirthData.fontData, cirthMode.orthography, includeUnused);
    const templateData = Object.assign({}, cirthData, cirthMode, layout);
    return templateData;
}

export function renderCirthSVG(templateText, modeId, layoutId, includeUnused) {
    if (includeUnused === undefined) includeUnused = true;
    const templateData = getCirthTemplateData(modeId, layoutId, includeUnused);
    const cirthSvg = mustache.render(templateText, templateData);
    return cirthSvg;
}

