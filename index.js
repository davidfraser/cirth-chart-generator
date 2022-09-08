const mustache = require('mustache');
const fs = require('fs');
const { isNumberObject } = require('util/types');

const cirthData = {
    title: "Angerthas Erebor",
    name: "angerthas-erebor",
    chars: {
        0: {fontchar: ''},
        1: {fontchar: '1'},
        2: {fontchar: '2'},
        3: {fontchar: '3'},
        4: {fontchar: '4'},
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
        18: {fontchar: 'e'},
        19: {fontchar: 'r'},
        20: {fontchar: 't'},
        21: {fontchar: 'y'},
        23: {fontchar: 'i'},
        24: {fontchar: 'o'},
        25: {fontchar: 'p'},
        26: {fontchar: 'Q'},
        27: {fontchar: 'W'},
        28: {fontchar: 'E'},
        29: {fontchar: 'R'}, // This was T in the original chart, but that's wrong
        30: {fontchar: 'T'}, // This was R in the original chart, but that's wrong
        34: {fontchar: 'f'},
        35: {fontchar: 'g'},
        40: {fontchar: ';'},
        41: {fontchar: 'A'},
        57: {fontchar: 'X'},
        58: {fontchar: 'C'},
        60: {fontchar: 'B'},
        E2: {fontchar: ':'},
        U46: {fontchar: 'æ'},
        U47: {fontchar: 'à'},
        U48: {fontchar: 'á'},
        U49: {fontchar: 'â'},
        U4A: {fontchar: 'ã'},
        U4B: {fontchar: 'ä'},
        U4C: {fontchar: 'å'},
        U4D: {fontchar: 'é'},
        U52: {fontchar: 'Ü'},
        U53: {fontchar: 'Ý'},
        U54: {fontchar: 'Þ'},
        U55: {fontchar: 'ß'},
        U5D: {fontchar: 'è'},
        U5D_alt: {fontchar: 'ç'},
        U60: {fontchar: 'ö'},
    }, 
    orthography: {
        0: {orthography: ''},
        1: {orthography: 'p'},
        2: {orthography: 'b'},
        3: {orthography: 'f'},
        4: {orthography: 'v'},
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
        29: {orthography: 'g'},
        30: {orthography: 'gh'},
        34: {orthography: 's'},
        35: {orthography: 's'},
        40: {orthography: 'y'},
        41: {orthography: 'hy'},
        57: {orthography: 'ps'},
        58: {orthography: 'ts'},
        60: {orthography: '&', isWord: true},
        E2: {orthography: 'll'},
        U46: {orthography: 'ndž'},
        U47: {orthography: ''},
        U48: {orthography: ''},
        U49: {orthography: ''},
        U4A: {orthography: ''},
        U4B: {orthography: ''},
        U4C: {orthography: 'nd'},
        U4D: {orthography: ''},
        U52: {orthography: 'ps'},
        U53: {orthography: 'bz'},
        U54: {orthography: 'ks'},
        U55: {orthography: 'gz'},
        U5D: {orthography: ''},
        U5D_alt: {orthography: ''},
        U5F: {orthography: ''},
        U60: {orthography: 'of', isWord: true},
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

function expandedLayout(layout, charLookup, orthLookup) {
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
            var orthInfo = orthLookup[cirthNumber];
            if (orthInfo.orthography == '') orthInfo.orthography = '-';
            charInfo = Object.assign(charInfo, orthInfo);
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
    const layout = expandedLayout(cirthLayout, cirthData['chars'], cirthData['orthography']);
    const templateData = Object.assign({}, cirthData, layout);
    const cirthSvg = mustache.render(templateText, templateData);
    fs.writeFileSync(`cirth-chart-${cirthData['name']}.svg`, cirthSvg)
} catch(err) {
    console.error(err);
}
