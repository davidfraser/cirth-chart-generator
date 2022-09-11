const mustache = require('mustache');
const fs = require('fs');
const { isNumberObject } = require('util/types');

const cirthData = {
    title: "Angerthas Erebor",
    name: "angerthas-erebor",
    chars: {
        1: {fontchar: '1'},
        2: {fontchar: '2'},
        3: {fontchar: '3'},
        4: {fontchar: '4'},
        5: {fontchar: '5'},
        6: {fontchar: '6'},
        7: {fontchar: '7'},
        8: {fontchar: '8'},
        9: {fontchar: '9'},
        10: {fontchar: '0'},
        11: {fontchar: '!'},
        12: {fontchar: '@'},
        13: {fontchar: '#'},
        14: {fontchar: '$'},
        15: {fontchar: '%'},
        16: {fontchar: 'q'},
        17: {fontchar: 'w'},
        18: {fontchar: 'e'},
        19: {fontchar: 'r'},
        20: {fontchar: 't'},
        21: {fontchar: 'y'},
        22: {fontchar: 'u'},
        23: {fontchar: 'i'},
        24: {fontchar: 'o'},
        25: {fontchar: 'p'},
        26: {fontchar: 'Q'},
        27: {fontchar: 'W'},
        28: {fontchar: 'E'},
        29: {fontchar: 'R'}, // This was T in the original chart, but that's wrong
        30: {fontchar: 'T'}, // This was R in the original chart, but that's wrong
        31: {fontchar: 'k'},
        32: {fontchar: 's'},
        33: {fontchar: 'd'},
        34: {fontchar: 'f'},
        35: {fontchar: 'g'},
        36: {fontchar: 'h'},
        37: {fontchar: 'j'},
        38: {fontchar: 'J'},
        '38_alt': {fontchar: 'k'}, // which way round are these?
        39: {fontchar: 'l'},
        40: {fontchar: ';'},
        41: {fontchar: 'A'},
        42: {fontchar: 'S'},
        43: {fontchar: 'D'},
        44: {fontchar: 'F'},
        45: {fontchar: 'G'},
        46: {fontchar: 'z'},
        47: {fontchar: 'x'},
        48: {fontchar: 'c'},
        49: {fontchar: 'v'},
        50: {fontchar: 'b'},
        51: {fontchar: 'n'},
        '51_alt': {fontchar: 'M'}, // which way round are these?
        52: {fontchar: '<'},
        '52_alt': {fontchar: 'm'},
        53: {fontchar: ','},
        54: {fontchar: '.'},
        55: {fontchar: '/'},
        '55_alt': {fontchar: '>'},
        56: {fontchar: 'Z'},
        '56_alt': {fontchar: '?'},
        57: {fontchar: 'X'},
        58: {fontchar: 'C'},
        59: {fontchar: 'V'},
        60: {fontchar: 'B'},
        E1: {fontchar: 'K'},
        E2: {fontchar: ':'},
        E3: {fontchar: '"'},
        E4: {fontchar: '&'},
        '#4': {fontchar: '+'},
        E5: {fontchar: '*'},
        E6: {fontchar: '('},
        E7: {fontchar: ')'},
        U2D: {fontchar: 'ë'},
        U2E: {fontchar: 'ì'},
        U46: {fontchar: 'æ'},
        U47: {fontchar: 'à'},
        U48: {fontchar: 'á'},
        U49: {fontchar: 'â'},
        U4A: {fontchar: 'ã'},
        U4B: {fontchar: 'ä'},
        U4C: {fontchar: 'å'},
        U4D: {fontchar: 'é'},
        U4F: {fontchar: 'ê'},
        U50: {fontchar: 'í'},
        U52: {fontchar: 'Ü'},
        U53: {fontchar: 'Ý'},
        // U53: {fontchar: 'û'}, // this is a double-numbered one
        U54: {fontchar: 'Þ'},
        U55: {fontchar: 'ß'},
        U56: {fontchar: 'ð'}, //
        U58: {fontchar: 'ò'}, //
        U59: {fontchar: 'ó'}, //
        U5A: {fontchar: 'î'},
        U5B: {fontchar: 'ï'},
        U5C: {fontchar: 'õ'}, //
        U5D: {fontchar: 'è'},
        U5D_alt: {fontchar: 'ç'},
        U5F: {fontchar: 'ô'},
        U60: {fontchar: 'ö'},
        U61: {fontchar: 'ø'},
        U62: {fontchar: 'ù'},
        U63: {fontchar: 'ú'},
        U64: {fontchar: '÷'}, //
        U65: {fontchar: 'ü'}, //
        U66: {fontchar: 'ý'}, //
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
    }, 
}

const HALF_SPACE = {'special': 'half-space'};
const FULL_SPACE = {'special': 'full-space'};
const SPACE = FULL_SPACE;
const DOUBLE_PIPE = FULL_SPACE; // FIXME: Double Pipe is a character we don't know what to do with yet
const PUNCT_STAR = FULL_SPACE; // FIXME: Punct Star is a character we don't know what to do with yet
const PUNCT_CROSS = FULL_SPACE; // FIXME: Punct Cross is a character we don't know what to do with yet
const FUTHORC_EH = FULL_SPACE; // FIXME: Futhorc Eh is a character we don't know what to do with yet
const E_ = FULL_SPACE; // Erebor underscore??

const cirthLayout = {
    cirthRows: [
        {rowLabel: '1', cirth: ['U66', SPACE, 'U65', 'U5C', SPACE, SPACE, SPACE, SPACE, HALF_SPACE, 'U64', 'E1']},
        {rowLabel: '2', cirth: ['U58', '#4', 'U56', E_, 50, 51, '51_alt', FUTHORC_EH, 38, '38_alt', 'U4F']},
        {rowLabel: '3', cirth: [53, SPACE, 54, '52_alt', 'E7', 'E6', 'E4', 'U50', 'E5']},
        {rowLabel: '4', cirth: ['U5B', 'U59', 22, 33, 17, 52, 'U5A', SPACE, 'U53', 48, 49]},
        {rowLabel: '5', cirth: [PUNCT_STAR, PUNCT_CROSS, 36, 37]},
        {rowLabel: '6', cirth: [31, '56_alt', 56, 'E3', 39, 59, 55, '55_alt', 32, DOUBLE_PIPE, 46, 47]},
        {rowLabel: '7', cirth: ['U46', 27, 12, 'U4B', 'U4C', SPACE, HALF_SPACE, SPACE, SPACE, 'E2']},
        {rowLabel: '8', cirth: ['U4D', 25, 60, 'U5F', 23, 28, HALF_SPACE, 40, 41]},
        {rowLabel: '9', cirth: ['U4A', 'U49', 'U47', 'U48', 'U5D_alt', HALF_SPACE, 'U5D']},
        {rowLabel: '10', cirth: [26, 11, 10, 8, 9, 24]},
        {rowLabel: '10.5', cirth: ['U62', 'U61', 'U63', 43]},
        {rowLabel: '11', cirth: [21, 20, 18, 19]},
        {rowLabel: '11.5', cirth: [44, 42, 'U2D', 45]},
        {rowLabel: '12', cirth: [34, 29, 30, 35]},
        {rowLabel: '12.5', cirth: [5, SPACE, 'U2E', '45_alt']},
        {rowLabel: '13', cirth: [16, 15, 13, 14]},
        {rowLabel: '14', cirth: ['U55', 'U54', 'U52', 'U53']},
        {rowLabel: '15', cirth: [58, 57]},
        {rowLabel: '16', cirth: ['U60', 7, 4, 3, 1, 2, 6]},
    ],
    rowOffsets: {
        1: {leftchar: -3.5},
        2: {leftchar: -3.5},
        3: {leftchar: -1.5},
        4: {leftchar: -3.5},
        5: {leftchar: -2.5},
        6: {leftchar: -4.5},
        7: {leftchar: -3},
        8: {leftchar: -3},
        9: {leftchar: -2},
        10: {leftchar: -3},
        10.5: {leftchar: 3.5},
        11: {leftchar: -2},
        11.5: {leftchar: 3.5},
        12: {leftchar: -2},
        12.5: {leftchar: 3.5},
        13: {leftchar: -2},
        14: {leftchar: -2},
        15: {leftchar: -1},
        16: {leftchar: -4},
    },
}

function expandedLayout(layout, charLookup, orthLookup) {
    // this includes the relevant character information into the layout
    var cirthLayout = [];
    var punctuationLayout = [];
    for (var cirthRow of layout['cirthRows']) {
        const rowLabel = cirthRow['rowLabel'];
        const rowOffset = layout['rowOffsets'][rowLabel];
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
            var cirthId = typeof cirthNumber == 'number' ? cirthNumber.toString() : cirthNumber;
            var cirthLabel = cirthId;
            var cirthDisplayNumber = cirthId;
            var cirthStyle = 'cirthRegular';
            if (cirthLabel.startsWith('U')) {
                cirthLabel = cirthLabel.replace('U', 'Uxx');
                cirthStyle = 'cirthUnicode';
                cirthDisplayNumber = cirthDisplayNumber.replace('U', '').toLowerCase();
                var cirthUnicodeDecimal = parseInt(cirthDisplayNumber, 16);
                var charUnicode = charLookup[cirthNumber].fontchar;
                var charCodePoint = charUnicode.length > 0 ? charUnicode.codePointAt(0) : 0;
                console.log(`Unicode ${cirthLabel} ${cirthUnicodeDecimal} ${charUnicode} ${charCodePoint} ux ${charCodePoint.toString(16)}`)
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
            }
            if (cirthDisplayNumber.endsWith('_alt')) {
                cirthDisplayNumber = cirthDisplayNumber.replace('_alt', '*');
            }
            var charInfo = Object.assign({}, charLookup[cirthNumber]);
            if (charInfo['isWord'] == true) {
                cirthStyle += ' cirthWord';
            }
            charInfo['cirthNumber']  = cirthDisplayNumber;
            charInfo['cirthId'] = cirthId;
            charInfo['cirthLabel'] = cirthLabel;
            charInfo['cirthStyle'] = cirthStyle;
            var orthInfo = orthLookup[cirthId.replace('_alt', '')];
            if (orthInfo === undefined) { console.error(`Couldn't find orthography for ${cirthNumber}`)}
            if (orthInfo.orthography == '') orthInfo.orthography = '-';
            charInfo = Object.assign(charInfo, orthInfo);
            var charOffset = (index + indexOffset + rowOffset['leftchar'])*16.68 + 11.625;
            charInfo['offset'] = {x: charOffset, y: 0};
            expandedChars.push(charInfo);
        }
        expandedRow['cirth'] = expandedChars;
        cirthLayout.push(expandedRow);
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
