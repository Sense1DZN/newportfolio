const fs = require('fs');

let workInnerHTML = '';
const dir = fs.opendirSync('res/portfolio');
let path;
while ((path = dir.readSync()) !== null) {
    if (path.isDirectory()) {
        workInnerHTML += `<section class="work-group"><h2 class="group-title">${path.name}</h2><div class="work-overlay"></div><div class="work-wrapper">`;
        const subdir = fs.opendirSync('res/portfolio/'+path.name);
        let subpath;
        while ((subpath = subdir.readSync()) !== null) {
            workInnerHTML += `<img class="work-example" src="res/portfolio/${path.name}/${subpath.name}" alt="${subpath.name}">`;
        }
        workInnerHTML += '</div></section>'
    }
}
dir.closeSync();

fs.writeFile('src/images.js', `const workInnerHTML = '${workInnerHTML}';`, err => { if (err) console.log(err); return; })