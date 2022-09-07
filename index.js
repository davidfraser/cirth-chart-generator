const mustache = require('mustache');
const fs = require('fs');
const { isNumberObject } = require('util/types');

const cirthData = {
    title: "Angerthas Erebor",
    name: "angerthas-erebor",
    chars: {
        0: {fontchar: '', orthography: ''},
        1: {fontchar: '1', orthography: 'p'},
        2: {fontchar: '2', orthography: 'b'},
        3: {fontchar: '3', orthography: 'f'},
        4: {fontchar: '4', orthography: 'v'},
        6: {fontchar: '6', orthography: 'm'},
        7: {fontchar: '7', orthography: 'mb'},
        8: {fontchar: '8', orthography: 't'},
        9: {fontchar: '9', orthography: 'd'},
        10: {fontchar: '0', orthography: 'th'},
        11: {fontchar: '!', orthography: 'dh'},
        12: {fontchar: '@', orthography: 'r'},
        13: {fontchar: '#', orthography: 'ch'},
        14: {fontchar: '$', orthography: 'j'},
        15: {fontchar: '%', orthography: 'sh'},
        16: {fontchar: 'q', orthography: 'zh'},
        18: {fontchar: 'e', orthography: 'k'},
        19: {fontchar: 'r', orthography: 'g'},
        20: {fontchar: 't', orthography: 'kh'},
        21: {fontchar: 'y', orthography: 'gh'},
        23: {fontchar: 'i', orthography: 'kw'},
        24: {fontchar: 'o', orthography: 'gw'},
        25: {fontchar: 'p', orthography: 'khw'},
        26: {fontchar: 'Q', orthography: 'ghw'},
        27: {fontchar: 'W', orthography: 'ngw'},
        28: {fontchar: 'E', orthography: 'nw'},
        29: {fontchar: 'R', orthography: 'g'}, // This was T in the original chart, but that's wrong
        30: {fontchar: 'T', orthography: 'gh'}, // This was R in the original chart, but that's wrong
        34: {fontchar: 'f', orthography: 's'},
        35: {fontchar: 'g', orthography: 's'},
        40: {fontchar: ';', orthography: 'y'},
        41: {fontchar: 'A', orthography: 'hy'},
        57: {fontchar: 'X', orthography: 'ps'},
        58: {fontchar: 'C', orthography: 'ts'},
        60: {fontchar: 'B', orthography: '&', isWord: true},
        E2: {fontchar: ':', orthography: 'll'},
        U46: {fontchar: 'æ', orthography: 'ndž'},
        U47: {fontchar: 'à', orthography: ''},
        U48: {fontchar: 'á', orthography: ''},
        U49: {fontchar: 'â', orthography: ''},
        U4A: {fontchar: 'ã', orthography: ''},
        U4B: {fontchar: 'ä', orthography: ''},
        U4C: {fontchar: 'å', orthography: 'nd'},
        U4D: {fontchar: 'é', orthography: ''},
        U52: {fontchar: 'Ü', orthography: 'ps'},
        U53: {fontchar: 'Ý', orthography: 'bz'},
        U54: {fontchar: 'Þ', orthography: 'ks'},
        U55: {fontchar: 'ß', orthography: 'gz'},
        U5D: {fontchar: 'è', orthography: ''},
        U5D_alt: {fontchar: 'ç', orthography: ''},
        U60: {fontchar: 'ö', orthography: 'of', isWord: true},
    },
    
}

const HALF_SPACE = {'special': 'half-space'};
const FULL_SPACE = {'special': 'full-space'};
const SPACE = FULL_SPACE;

const cirthLayout = {
    layoutRows: [
        // {rowLabel: '0', cirth: []},
        {rowLabel: '7', cirth: ['U46', 27, 12, 'U4B', 'U4C', SPACE, HALF_SPACE, SPACE, SPACE, 'E2']},
        {rowLabel: '8', cirth: ['U4D', 25, 60, 'U5F', 23, 28, HALF_SPACE, 40, 41]},
        {rowLabel: '9', cirth: ['U4A', 'U49', 'U47', 'U48', 'U5D_alt', HALF_SPACE, 'U5D']},
        {rowLabel: '10', cirth: [26, 11, 10, 8, 9, 24]},
        {rowLabel: '11', cirth: [21, 20, 18, 19]},
        {rowLabel: '12', cirth: [34, 29, 30, 35]},
        {rowLabel: '13', cirth: [16, 15, 13, 14]},
        {rowLabel: '14', cirth: ['U55', 'U54', 'U52', 'U53']},
        {rowLabel: '15', cirth: [58, 57]},
        {rowLabel: '16', cirth: ['U60', 7, 4, 3, 1, 2, 6]},
    ],
    rowOffsets: {
        7: {leftchar: -3},
        8: {leftchar: -3},
        9: {leftchar: -2},
        10: {leftchar: -3},
        11: {leftchar: -2},
        12: {leftchar: -2},
        13: {leftchar: -2},
        14: {leftchar: -2},
        15: {leftchar: -1},
        16: {leftchar: -4},
    },
}

function expandedLayout(layout, charLookup) {
    // this includes the relevant character information into the layout
    var expandedLayout = [];
    for (var layoutRow of layout['layoutRows']) {
        const rowLabel = layoutRow['rowLabel'];
        const rowOffset = layout['rowOffsets'][rowLabel];
        var yOffset = parseInt(rowLabel)*18.4154-91.20655;
        var expandedRow = {'rowLabel': rowLabel, 'offset': {x: 0, y: yOffset}};
        var expandedChars = [];
        let indexOffset = 0;
        for (let [index, cirthNumber] of layoutRow['cirth'].entries()) {
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
                if (cirthDisplayNumber.endsWith('_alt')) {
                    cirthDisplayNumber = cirthDisplayNumber.replace('_alt', '*');
                }
            } else if (cirthLabel.startsWith('E')) {
                cirthLabel = cirthLabel.replace('E', 'Erebor');
                cirthStyle = 'cirthErebor';
                cirthDisplayNumber = cirthDisplayNumber.toLowerCase();
            }
            var charInfo = Object.assign({}, charLookup[cirthNumber]);
            if (charInfo['isWord'] == true) {
                cirthStyle += ' cirthWord';
            }
            charInfo['cirthNumber']  = cirthDisplayNumber;
            charInfo['cirthId'] = cirthId;
            charInfo['cirthLabel'] = cirthLabel;
            charInfo['cirthStyle'] = cirthStyle;
            if (charInfo.orthography == '') charInfo.orthography = '-';
            var charOffset = (index + indexOffset + rowOffset['leftchar'])*16.68 + 11.625;
            charInfo['offset'] = {x: charOffset, y: 0};
            expandedChars.push(charInfo);
        }
        expandedRow['cirth'] = expandedChars;
        expandedLayout.push(expandedRow);
    }
    return {'layoutRows': expandedLayout};
}

try {
    const templateText = fs.readFileSync('cirth-chart.svg.mustache', {encoding: 'utf-8'});
    const layout = expandedLayout(cirthLayout, cirthData['chars']);
    const templateData = Object.assign({}, cirthData, layout);
    const cirthSvg = mustache.render(templateText, templateData);
    fs.writeFileSync(`cirth-chart-${cirthData['name']}.svg`, cirthSvg)
} catch(err) {
    console.error(err);
}
