const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const drawn=[],elements=new Map();
class Element{constructor(){this.value='';this.children=[];this.style={setProperty(){}};}click(){this.onclick?.()}append(...items){this.children.push(...items)}replaceChildren(){this.children=[]}setAttribute(){}getContext(){return {font:'',measureText:s=>({width:s.length*20}),fillText:s=>drawn.push(s),fillRect(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},arc(){},fill(){}}}toBlob(cb){cb({})}}
const get=id=>{if(!elements.has(id))elements.set(id,new Element());return elements.get(id)};get('theme').value='sage';get('source').value='2026年10月20日9点30分，开会。';
const context={document:{getElementById:get,createElement:()=>new Element(),documentElement:new Element()},window:{},URL:{createObjectURL:()=>'',revokeObjectURL(){}},setTimeout(){},Blob};
vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../apps/shixu/app.js'),'utf8'),context);const api=context.window.TimelineAPI;
let r=api.parse('2026-10-20 14:05，汇报。2026年10月20日9点30分，开会。2026年10月20日9时05分，签到。');
assert.equal(r.events.length,3);assert.equal(r.events[0].text,'签到');assert.equal(r.events[1].minute,30);assert.equal(r.events[2].hour,14);
r=api.parse('2026-10-21T00:00，次日。2026-10-20 23:59，前日。');assert.equal(r.events[0].day,20);assert.equal(r.events[1].minute,0);
r=api.parse('2026年10月20日9点，整点。2026年10月20日，无时间。2026-10-20 09:00，零分。');assert.equal(r.events[0].hour,null);assert.equal(r.events[1].minute,null);assert.equal(r.events[2].minute,0);
r=api.parse('2026-10-20 24:00，无效。2026-10-20 10:60，无效。2023年2月29日，无效。2024年2月29日0点0分，有效。');assert.equal(r.invalid,3);assert.equal(r.events.length,1);
r=api.parse('公元前221年，统一。1939年9月1日，事件。2026年10月，月份。');assert.equal(r.events.length,3);assert.equal(r.events[0].year,-221);
assert.equal(api.parse('没有日期').events.length,0);
get('source').value='2026年10月20日9点30分，开会。2026-10-20 09:05，签到。';get('generate').click();const json=api.exportJSON();assert.equal(json.version,4);assert.equal(json.events[0].minute,5);assert.equal(json.events[1].hour,9);
assert.equal(get('preview').children[2].children[0].textContent,'2026年10月20日 09:05');api.exportPNG();assert(drawn.join('').includes('2026年10月20日 09:05'));assert(drawn.includes('2026年10月20日 09:30'));
console.log('Passed: minute/hour sorting, midnight, missing precision, invalid clocks/dates, BCE, preview, JSON and PNG timestamps.');
for(const style of ['1','2','3','4']){get('layout').value=style;get('layout').onchange();assert.equal(get('preview').className,'layout-'+style);assert.equal(api.exportJSON().layout,Number(style));drawn.length=0;api.exportPNG();assert(drawn.join('').includes('2026年10月20日 09:05'));assert(drawn.includes('签到'));}
console.log('Passed: four preview styles, matching export selection, PNG content retained.');
