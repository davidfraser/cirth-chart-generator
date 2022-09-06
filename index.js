const mustache = require('mustache');
const fs = require('fs');
const { isNumberObject } = require('util/types');

const cirthData = {
    title: "Angerthas Erebor",
    name: "angerthas-erebor",
    chars: {
        0: {fontchar: '', orthography: ''},
        18: {fontchar: 'e', orthography: 'k'},
        19: {fontchar: 'r', orthography: 'g'},
        20: {fontchar: 't', orthography: 'kh'},
        21: {fontchar: 'y', orthography: 'gh'},
        U52: {fontchar: 'Ü', orthography: 'ps'},
        U53: {fontchar: 'Ý', orthography: 'bz'},
        U54: {fontchar: 'Þ', orthography: 'ks'},
        U55: {fontchar: 'ß', orthography: 'gz'},
        57: {fontchar: 'X', orthography: 'ps'},
        58: {fontchar: 'C', orthography: 'ts'},
    },
    
}

const cirthLayout = {
    layoutRows: [
        {rowlabel: '15', cirth: [58, 57]},
        {rowlabel: '14', cirth: ['U55', 'U54', 'U52', 'U53']},
        {rowlabel: '11', cirth: [21, 20, 18, 19]},
    ],
    // TODO: calculate this layout info logically
    rowOffsets: {
        11: {x: 0, y: -36.83084, chary: 148.19369},
        14: {x: 0, y: -56.40996, chary: 223.01904},
        15: {x: 0, y: 0, chary: 185.24779},
    },
    charOffsets: {
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
    }
}

function expandedLayout(layout, charLookup) {
    // this includes the relevant character information into the layout
    var expandedLayout = [];
    for (var layoutRow of layout['layoutRows']) {
        const rowLabel = layoutRow['rowlabel'];
        const rowOffset = layout['rowOffsets'][rowLabel];
        var expandedRow = {'rowlabel': rowLabel, 'offset': {x: rowOffset['x'], y: rowOffset['y']}};
        var expandedChars = [];
        for (var cirthNumber of layoutRow['cirth']) {
            var cirthId = typeof cirthNumber == 'number' ? cirthNumber.toString() : cirthNumber;
            var cirthLabel = cirthId;
            var cirthDisplayNumber = cirthId;
            if (cirthLabel.startsWith('U')) {
                cirthLabel = cirthLabel.replace('U', 'Uxx');
                // TODO: use information to determine style
                cirthDisplayNumber = cirthDisplayNumber.replace('U', '');
            }
            var charInfo = Object.assign({}, charLookup[cirthNumber]);
            charInfo['cirthNumber']  = cirthDisplayNumber;
            charInfo['cirthId'] = cirthId;
            charInfo['cirthLabel'] = cirthLabel;
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
