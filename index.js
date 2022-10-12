const mustache = require('mustache');
const fs = require('fs');
const { isNumberObject } = require('util/types');

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

const cirthModes = {
    'erebor': {
        title: 'Angerthas Erebor',
        name: 'angerthas-erebor',
        orthography: {
            1: {orthography: 'p'},
            2: {orthography: 'b'},
            3: {orthography: 'f'},
            4: {orthography: 'v'},
            5: {orthography: 'hw'},
            6: {orthography: 'm'},
            7: {orthography: 'mb'},
            8: {orthography: 't'},
            9: {orthography: 'd'},
            10: {orthography: 'th'},
            11: {orthography: 'dh'},
            12: {orthography: 'r'},
            13: {orthography: 'ch'},
            14: {orthography: 'j'},
            15: {orthography: 'sh'},
            16: {orthography: 'zh'},
            17: {orthography: 'ks'},
            18: {orthography: 'k'},
            19: {orthography: 'g'},
            20: {orthography: 'kh'},
            21: {orthography: 'gh'},
            22: {orthography: 'n'},
            23: {orthography: 'kw'},
            24: {orthography: 'gw'},
            25: {orthography: 'khw'},
            26: {orthography: 'ghw'},
            27: {orthography: 'ngw'},
            28: {orthography: 'nw'},
            29: {orthography: 'g'},
            30: {orthography: 'gh'},
            31: {orthography: 'l'},
            32: {orthography: ''},
            33: {orthography: 'nd'},
            34: {orthography: 's'},
            35: {orthography: 's'},
            36: {orthography: 'ŋ'},
            37: {orthography: 'ng'},
            38: {orthography: 'ou'},
            39: {orthography: 'i'},
            40: {orthography: 'y'},
            41: {orthography: 'hy'},
            42: {orthography: 'u'},
            43: {orthography: 'z'},
            44: {orthography: 'w'},
            45: {orthography: 'ü'},
            46: {orthography: 'e'},
            47: {orthography: 'ee'},
            48: {orthography: 'a'},
            49: {orthography: 'aa'},
            50: {orthography: 'o'},
            51: {orthography: 'oo'},
            52: {orthography: 'ö'},
            53: {orthography: 'n'},
            54: {orthography: 'h'},
            55: {orthography: 'ə'}, // unstressed schwa
            56: {orthography: 'ʌ'}, // stressed schwa
            57: {orthography: 'ps'},
            58: {orthography: 'ts'},
            59: {orthography: '+h'},
            60: {orthography: '&', isWord: true},
            E1: {orthography: 'eu'},
            E2: {orthography: 'll'},
            E3: {orthography: 'the', isWord: true},
            '#4': {orthography: '(4)'},
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
            U61: {orthography: 'y/ü'},
            U62: {orthography: ''},
            U63: {orthography: 'is', isWord: true},
            U64: {orthography: ''},
            U65: {orthography: 'ö/ø'},
            U66: {orthography: ''},
            [DOUBLE_PIPE]: {orthography: ''},
            [PUNCT_STAR]: {orthography: '*'},
            [PUNCT_CROSS]: {orthography: ''},
        }
    }
}
const cirthData = {
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

const cirthLayout = {
    textPositions: {
        descriptionText: {x: 118.24999, y: 237.91302},
        punctuationTitle: {x: 180.27777, y: 136.91945},
        chartTitle: {x: -270.40067, y: 23.093559},
    },
    textSizes: {
        descriptionText: {fontSize: 3.88056, lineHeight: 1.25},
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
        {rowLabel: '10.5', cirth: ['U62', 'U61', 'U63', 43], leftchar: 3.5},
        {rowLabel: '11', cirth: [21, 20, 18, 19], leftchar: -2},
        {rowLabel: '11.5', cirth: [44, 42, 'U2D', 45], leftchar: 3.5},
        {rowLabel: '12', cirth: [34, 30, 29, 35], leftchar: -2},
        {rowLabel: '12.5', cirth: [5, SPACE, 'U2E', '45_alt'], leftchar: 3.5},
        {rowLabel: '13', cirth: [16, 15, 13, 14], leftchar: -2},
        {rowLabel: '14', cirth: ['U45', 'U44', 'U42', 'U43'], leftchar: -2},
        {rowLabel: '15', cirth: [58, 57], leftchar: -1},
        {rowLabel: '16', cirth: ['U60', 7, 4, 3, 1, 2, 6], leftchar: -4},
    ],
    punctuationRows: [
        {rowLabel: '8.44', cirth: [CIRTH_PUNCT_MID_DOT, CIRTH_PUNCT_THREE_DOTS], leftchar: 10},
        {rowLabel: '9', cirth: [CIRTH_PUNCT_DOT, CIRTH_PUNCT_THREE_DOTS_L, CIRTH_PUNCT_EQUAL], leftchar: 10},
        {rowLabel: '9.55', cirth: [CIRTH_PUNCT_TWO_DOTS, CIRTH_PUNCT_FOUR_DOTS], leftchar: 10},
    ],
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
        if (orthInfo === undefined) { console.error(`Couldn't find orthography for ${cirthNumber}`); }
        if (orthInfo.orthography == '')
            orthInfo.orthography = '-';
        if (orthInfo.isWord == true) {
            cirthStyle += ' cirthWord';
        }
        charInfo = Object.assign(charInfo, orthInfo);
    }
    charInfo['cirthStyle'] = cirthStyle;
    return charInfo;
}

function expandedLayout(layout, charLookup, orthLookup) {
    // this includes the relevant character information into the layout
    var cirthLayout = [];
    var punctuationLayout = [];
    for (var cirthRow of layout['cirthRows']) {
        const rowLabel = cirthRow['rowLabel'];
        const rowOffset = cirthRow.leftchar;
        var yOffset = parseFloat(rowLabel)*18.4154-91.20655+74.632111;
        var expandedRow = {'rowLabel': rowLabel, 'offset': {x: 69.792236, y: yOffset}};
        var expandedChars = [];
        let indexOffset = 0;
        for (let [index, cirthNumber] of cirthRow['cirth'].entries()) {
            if (cirthNumber == HALF_SPACE) {
                indexOffset -= 0.5;
                continue
            }
            if (cirthNumber == FULL_SPACE) {
                continue;
            }
            var charInfo = compileCirthInfo(cirthNumber, charLookup, orthLookup);
            var charOffset = (index + indexOffset + rowOffset)*16.68 + 11.625;
            charInfo['offset'] = {x: charOffset, y: 0};
            expandedChars.push(charInfo);
        }
        expandedRow['cirth'] = expandedChars;
        cirthLayout.push(expandedRow);
    }
    for (var cirthRow of layout['punctuationRows']) {
        const rowLabel = cirthRow['rowLabel'];
        const rowOffset = cirthRow.leftchar;
        var yOffset = parseFloat(rowLabel)*18.4154-91.20655;
        var expandedRow = {'rowLabel': rowLabel, 'offset': {x: 0, y: yOffset}};
        var expandedChars = [];
        let indexOffset = 0;
        for (let [index, cirthNumber] of cirthRow['cirth'].entries()) {
            if (cirthNumber == HALF_SPACE) {
                indexOffset -= 0.5;
                continue
            }
            if (cirthNumber == FULL_SPACE) {
                continue;
            }
            var charInfo = compileCirthInfo(cirthNumber, charLookup, false);
            var charOffset = (index + indexOffset + rowOffset)*10.709 - 3 + 69.792236;
            charInfo['offset'] = {x: charOffset, y: 74.632111};
            charInfo['widechar'] = (cirthNumber == CIRTH_PUNCT_EQUAL);
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
    return {'cirthRows': cirthLayout, 'punctuationRows': punctuationLayout,
            'textSizes': layout.textSizes, 'textPositions': layout.textPositions};
}

try {
    const cirthMode = cirthModes.erebor;
    const templateText = fs.readFileSync('cirth-chart.svg.mustache', {encoding: 'utf-8'});
    const layout = expandedLayout(cirthLayout, cirthData.fontData, cirthMode.orthography);
    const templateData = Object.assign({}, cirthData, cirthMode, layout);
    const cirthSvg = mustache.render(templateText, templateData);
    fs.writeFileSync(`cirth-chart-${cirthData['name']}.svg`, cirthSvg)
} catch(err) {
    console.error(err);
}
