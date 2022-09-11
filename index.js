const mustache = require('mustache');
const fs = require('fs');
const { isNumberObject } = require('util/types');

const HALF_SPACE = {'special': 'half-space'};
const FULL_SPACE = {'special': 'full-space'};
const SPACE = FULL_SPACE;
const DOUBLE_PIPE = '||'; // FIXME: Double Pipe is a character we don't know what to do with yet
const PUNCT_STAR = 'P*'; // FIXME: Punct Star is a character we don't know what to do with yet
const PUNCT_CROSS = 'PX'; // FIXME: Punct Cross is a character we don't know what to do with yet
const FUTHORC_EH = 'EH'; // Futhorc Eh is a character in the font, but did Tolkien ever use it in the Cirth?
const E_ = 'E_'; // Erebor underscore??
const CIRTH_PUNCT_MID_DOT = 'P49';
const CIRTH_PUNCT_DOT = 'P5C';
const CIRTH_PUNCT_TWO_DOTS = 'P4F';
const CIRTH_PUNCT_THREE_DOTS = 'P50';
const CIRTH_PUNCT_THREE_DOTS_L = 'P50';
const CIRTH_PUNCT_FOUR_DOTS = 'P7D';
const CIRTH_PUNCT_EQUAL = 'P=';

const cirthData = {
    title: "Angerthas Erebor",
    name: "angerthas-erebor",
    chars: {
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
        29: {keystroke: 'R'}, // This was T in the original chart, but that's wrong
        30: {keystroke: 'T'}, // This was R in the original chart, but that's wrong
        31: {keystroke: 'k'},
        32: {keystroke: 's'},
        33: {keystroke: 'd'},
        34: {keystroke: 'f'},
        35: {keystroke: 'g'},
        36: {keystroke: 'h'},
        37: {keystroke: 'j'},
        38: {keystroke: 'J'},
        '38_alt': {keystroke: 'k'}, // which way round are these?
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
        '51_alt': {keystroke: 'M'}, // which way round are these?
        52: {keystroke: '<'},
        '52_alt': {keystroke: 'm'},
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
        U52: {keystroke: 'Ü'},
        U53: {keystroke: 'Ý'},
        // U53: {keystroke: 'û'}, // this is a double-numbered one
        U54: {keystroke: 'Þ'},
        U55: {keystroke: 'ß'},
        U56: {keystroke: 'ð'}, //
        U58: {keystroke: 'ò'}, //
        U59: {keystroke: 'ó'}, //
        U5A: {keystroke: 'î'},
        U5B: {keystroke: 'ï'},
        U5C: {keystroke: 'õ'}, //
        U5D: {keystroke: 'è'},
        U5D_alt: {keystroke: 'ç'},
        U5F: {keystroke: 'ô'},
        U60: {keystroke: 'ö'},
        U61: {keystroke: 'ø'},
        U62: {keystroke: 'ù'},
        U63: {keystroke: 'ú'},
        U64: {keystroke: '÷'}, //
        U65: {keystroke: 'ü'}, //
        U66: {keystroke: 'ý'}, //
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
    orthography: {
        0: {orthography: ''},
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
        U2D: {orthography: 'iu'},
        U2E: {orthography: 'ui'},
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
        U52: {orthography: 'ps'},
        U53: {orthography: 'bz'},
        // U53: {orthography: 'ae'}, // This duplicate showed me that all the unicode references are wrong :( :( :(
        U54: {orthography: 'ks'},
        U55: {orthography: 'gz'},
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
    }, 
}

const cirthLayout = {
    cirthRows: [
        {rowLabel: '1', cirth: ['U66', SPACE, 'U65', 'U5C', SPACE, SPACE, SPACE, SPACE, HALF_SPACE, 'U64', 'E1'], leftchar: -3.5},
        {rowLabel: '2', cirth: ['U58', '#4', 'U56', E_, 50, 51, '51_alt', FUTHORC_EH, 38, '38_alt', 'U4F'], leftchar: -3.5},
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
        {rowLabel: '12', cirth: [34, 29, 30, 35], leftchar: -2},
        {rowLabel: '12.5', cirth: [5, SPACE, 'U2E', '45_alt'], leftchar: 3.5},
        {rowLabel: '13', cirth: [16, 15, 13, 14], leftchar: -2},
        {rowLabel: '14', cirth: ['U55', 'U54', 'U52', 'U53'], leftchar: -2},
        {rowLabel: '15', cirth: [58, 57], leftchar: -1},
        {rowLabel: '16', cirth: ['U60', 7, 4, 3, 1, 2, 6], leftchar: -4},
    ],
    punctuationRows: [
        {rowLabel: '8.44', cirth: [CIRTH_PUNCT_MID_DOT, CIRTH_PUNCT_THREE_DOTS], leftchar: 10},
        {rowLabel: '9', cirth: [CIRTH_PUNCT_DOT, CIRTH_PUNCT_THREE_DOTS_L, CIRTH_PUNCT_EQUAL], leftchar: 10},
        {rowLabel: '9.55', cirth: [CIRTH_PUNCT_TWO_DOTS, CIRTH_PUNCT_FOUR_DOTS], leftchar: 10},
    ],
}

// TODO: Add the Unicode codepoint for information somewhere, including for the regular characters
// TODO: change the keystrokes for these U items to be the hex sequence you can enter them with for the Erebor font with Alt-NumPad+
// TODO: correct the names of these U items to be consistent
// TODO: change the numbers that are displayed for these U times to be consistent

function compileCirthInfo(cirthNumber, charLookup, orthLookup) {
    var cirthId = typeof cirthNumber == 'number' ? cirthNumber.toString() : cirthNumber;
    var cirthLabel = cirthId;
    var cirthDisplayNumber = cirthId;
    var cirthStyle = 'cirthRegular';
    if (cirthLabel.startsWith('U')) {
        cirthLabel = cirthLabel.replace('U', 'Uxx');
        cirthStyle = 'cirthUnicode';
        cirthDisplayNumber = cirthDisplayNumber.replace('U', '').toLowerCase();
        var cirthUnicodeDecimal = parseInt(cirthDisplayNumber, 16);
        var charUnicode = charLookup[cirthNumber].keystroke;
        var charCodePoint = charUnicode.length > 0 ? charUnicode.codePointAt(0) : 0;
        console.log(`Unicode ${cirthLabel} ${cirthUnicodeDecimal} ${charUnicode} ${charCodePoint} ux ${charCodePoint.toString(16)}`);
        // Note: These U numbers are generally intended to be the last two hex digits of the Unicode codepoint proposed in ISO10646
        // They cannot be used to type in the Cirth Erebor font
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
        cirthStyle = 'cirthUnicode';
        cirthDisplayNumber = '?'; // cirthDisplayNumber.replace('P', '').toLowerCase();
    }
    if (cirthDisplayNumber.endsWith('_alt')) {
        cirthDisplayNumber = cirthDisplayNumber.replace('_alt', '*');
    }
    var charInfo = Object.assign({}, charLookup[cirthNumber]);
    if (charInfo['isWord'] == true) {
        cirthStyle += ' cirthWord';
    }
    charInfo['cirthNumber'] = cirthDisplayNumber;
    charInfo['cirthId'] = cirthId;
    charInfo['cirthLabel'] = cirthLabel;
    charInfo['cirthStyle'] = cirthStyle;
    if (orthLookup !== false) {
        var orthInfo = orthLookup[cirthId.replace('_alt', '')];
        if (orthInfo === undefined) { console.error(`Couldn't find orthography for ${cirthNumber}`); }
        if (orthInfo.orthography == '')
            orthInfo.orthography = '-';
        charInfo = Object.assign(charInfo, orthInfo);
    }
    return charInfo;
}

function expandedLayout(layout, charLookup, orthLookup) {
    // this includes the relevant character information into the layout
    var cirthLayout = [];
    var punctuationLayout = [];
    for (var cirthRow of layout['cirthRows']) {
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
            var charOffset = (index + indexOffset + rowOffset)*10.709 - 3;
            charInfo['offset'] = {x: charOffset, y: 0};
            charInfo['widechar'] = (cirthNumber == CIRTH_PUNCT_EQUAL);
            expandedChars.push(charInfo);
        }
        expandedRow['cirth'] = expandedChars;
        punctuationLayout.push(expandedRow);
    }
    return {'cirthRows': cirthLayout, 'punctuationRows': punctuationLayout};
}

try {
    const templateText = fs.readFileSync('cirth-chart.svg.mustache', {encoding: 'utf-8'});
    const layout = expandedLayout(cirthLayout, cirthData['chars'], cirthData['orthography']);
    const templateData = Object.assign({}, cirthData, layout);
    const cirthSvg = mustache.render(templateText, templateData);
    fs.writeFileSync(`cirth-chart-${cirthData['name']}.svg`, cirthSvg)
} catch(err) {
    console.error(err);
}
