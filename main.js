import { cirthModes, cirthLayouts, renderCirthSVG } from './index.js';
import * as fs from 'fs';

function cmdLine() {
    try {
        for (const [modeId, cirthMode] of Object.entries(cirthModes)) {
            for (const [layoutId, cirthLayout] of Object.entries(cirthLayouts)) {
                if (cirthMode.name == undefined) continue;
                const filename = `cirth-chart-${cirthMode.name}-${layoutId}.svg`;
                console.log(`Writing diagram for ${modeId} (${cirthMode.title}) into ${filename}`);
                const templateText = fs.readFileSync('cirth-chart.svg.mustache', {encoding: 'utf-8'});
                const cirthSvg = renderCirthSVG(templateText, modeId, layoutId);
                fs.writeFileSync(filename, cirthSvg);
            }
        }
    } catch(err) {
        console.error(err);
    }
}

cmdLine();
