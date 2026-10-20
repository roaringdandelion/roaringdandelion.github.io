const fs=require('fs'),path=require('path');
const root=path.resolve(process.argv[2]||'_site');let count=0,errors=[];
if(!fs.existsSync(root))throw Error('Build Jekyll first: _site is missing');
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(e.name.endsWith('.html')){
const html=fs.readFileSync(p,'utf8');for(const m of html.matchAll(/(?:href|src)\s*=\s*["']([^"']+)["']/g)){
const url=m[1];if(/^(?:[a-z]+:|\/\/|#|\$\{)/i.test(url)||url.includes('${'))continue;
let target;try{const clean=decodeURIComponent(url.split(/[?#]/)[0].replaceAll('&amp;','&'));if(!clean)continue;target=path.resolve(url.startsWith('/')?root:path.dirname(p),'.'+(url.startsWith('/')?'':'/')+clean);}catch{errors.push(p+': invalid URL '+url);continue;}
count++;if(!fs.existsSync(target))errors.push(path.relative(root,p)+' → '+url);
else if(fs.statSync(target).isDirectory()&&!fs.existsSync(path.join(target,'index.html')))errors.push(path.relative(root,p)+' → missing index '+url);
}}}}
walk(root);if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(count+' local links/assets checked.');
