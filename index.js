const mustache = require('mustache');
const fs = require('fs');
const { isNumberObject } = require('util/types');

const cirthData = {
    title: "Angerthas Erebor",
    name: "angerthas-erebor",
    chars: {
        0: {fontchar: '0', orthography: ''},
        1: {fontchar: '1', orthography: 'p'},
        2: {fontchar: '2', orthography: 'b'},
        3: {fontchar: '3', orthography: 'f'},
        4: {fontchar: '4', orthography: 'v'},
        6: {fontchar: '6', orthography: 'm'},
        7: {fontchar: '7', orthography: 'mb'},
        18: {fontchar: 'e', orthography: 'k'},
        19: {fontchar: 'r', orthography: 'g'},
        20: {fontchar: 't', orthography: 'kh'},
        21: {fontchar: 'y', orthography: 'gh'},
        57: {fontchar: 'X', orthography: 'ps'},
        58: {fontchar: 'C', orthography: 'ts'},
        U52: {fontchar: 'Ü', orthography: 'ps'},
        U53: {fontchar: 'Ý', orthography: 'bz'},
        U54: {fontchar: 'Þ', orthography: 'ks'},
        U55: {fontchar: 'ß', orthography: 'gz'},
        U60: {fontchar: 'ö', orthography: 'of', isWord: true},
    },
    
}

const cirthLayout = {
    layoutRows: [
        {rowLabel: '16', cirth: ['U60', 7, 4, 3, 1, 2, 6]},
        {rowLabel: '15', cirth: [58, 57]},
        {rowLabel: '14', cirth: ['U55', 'U54', 'U52', 'U53']},
        {rowLabel: '11', cirth: [21, 20, 18, 19]},
    ],
    // TODO: calculate this layout info logically
    rowOffsets: {
        11: {x: 0, y: -36.83084, chary: 148.19369},
        14: {x: 0, y: -56.40996, chary: 223.01904},
        15: {x: 0, y: 0, chary: 185.24779},
        16: {x: 0, y: 23.211107, chary: 180.22876},
    },
    charOffsets: {
        1: 11.999348,
        2: 28.263628,
        3: -5.313631,
        4: -21.763332,
        6: 44.726389,
        7: -38.178644,
        18: 11.842247,
        19: 28.305008,
        20: -4.422029,
        21: -21.735008,
        57: 11.999348,
        58: -5.313631,
        U52: 11.999348,
        U53: 28.263628,
        U54: -5.313631,
        U55: -21.763332,
        U60: -54.420213,
    }
}

function expandedLayout(layout, charLookup) {
    // this includes the relevant character information into the layout
    var expandedLayout = [];
    for (var layoutRow of layout['layoutRows']) {
        const rowLabel = layoutRow['rowLabel'];
        const rowOffset = layout['rowOffsets'][rowLabel];
        var expandedRow = {'rowLabel': rowLabel, 'offset': {x: rowOffset['x'], y: rowOffset['y']}};
        var expandedChars = [];
        for (var cirthNumber of layoutRow['cirth']) {
            var cirthId = typeof cirthNumber == 'number' ? cirthNumber.toString() : cirthNumber;
            var cirthLabel = cirthId;
            var cirthDisplayNumber = cirthId;
            var cirthStyle = 'cirthRegular';
            if (cirthLabel.startsWith('U')) {
                cirthLabel = cirthLabel.replace('U', 'Uxx');
                cirthStyle = 'cirthUnicode';
                cirthDisplayNumber = cirthDisplayNumber.replace('U', '');
            }
            var charInfo = Object.assign({}, charLookup[cirthNumber]);
            if (charInfo['isWord'] == true) {
                cirthStyle += ' cirthWord';
            }
            charInfo['cirthNumber']  = cirthDisplayNumber;
            charInfo['cirthId'] = cirthId;
            charInfo['cirthLabel'] = cirthLabel;
            charInfo['cirthStyle'] = cirthStyle;
            charInfo['offset'] = {x: layout['charOffsets'][cirthNumber], y: rowOffset['chary']};
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
