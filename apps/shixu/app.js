const $=id=>document.getElementById(id);let events=[];const colors={sage:'#34624e',blue:'#345b89',terracotta:'#ad603e'};
function parse(text) {
  // A clock is only recognized after a complete date; date-only entries stay valid.
  const re = /(公元前|前)?\s*(\d{1,4})(?:年(?:(\d{1,2})月(?:(\d{1,2})[日号])?)?|[-/.](\d{1,2})(?:[-/.](\d{1,2}))?)(?:[ \t]*(?:[Tt][ \t]*)?(\d{1,3})(?:[:：](\d{1,3})|[时点](?:[ \t]*(\d{1,3})分)?))?/g;
  const matches = [...text.matchAll(re)], out = [];
  let invalid = 0;
  matches.forEach((m, i) => {
    const year = Number(m[2]) * (m[1] ? -1 : 1);
    const month = Number(m[3] || m[5] || 1), day = Number(m[4] || m[6] || 1);
    const hasTime = m[7] !== undefined, hasMinute = m[8] !== undefined || m[9] !== undefined;
    const hour = hasTime ? Number(m[7]) : null, minute = hasMinute ? Number(m[8] ?? m[9]) : null;
    const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (!year || month < 1 || month > 12 || day < 1 || day > days[month - 1] ||
        (hasTime && (!(m[4] || m[6]) || hour > 23 || (minute !== null && minute > 59)))) {
      invalid++; return;
    }
    const body = text.slice(m.index + m[0].length, matches[i + 1]?.index ?? text.length)
      .replace(/^[\s，,：:。;；]+|[\s。;；]+$/g, '');
    if (!body) return;
    let date = (year < 0 ? '公元前' : '') + Math.abs(year) + '年' +
      ((m[3] || m[5]) ? month + '月' : '') + ((m[4] || m[6]) ? day + '日' : '');
    if (hasTime) date += ' ' + String(hour).padStart(2, '0') + (hasMinute ? ':' + String(minute).padStart(2, '0') : '时');
    out.push({year, month, day, hour, minute, date, text: body});
  });
  return {events: out.sort((a, b) => a.year - b.year || a.month - b.month || a.day - b.day ||
    (a.hour ?? -1) - (b.hour ?? -1) || (a.minute ?? -1) - (b.minute ?? -1)), invalid};
}
function selectedLayout(){return ["1","2","3","4"].includes($("layout").value)?$("layout").value:"1"}
function render(){$("preview").className="layout-"+selectedLayout();document.documentElement.style.setProperty('--accent',colors[$('theme').value]);$('preview').replaceChildren();let h=document.createElement('h1');h.textContent=$('title').value||'我的时间线';$('preview').append(h);let range=document.createElement('div');range.className='range';range.textContent=events.length?events[0].date+' — '+events.at(-1).date:'输入文字，开始生成你的时间线';$('preview').append(range);events.forEach(e=>{let item=document.createElement('div');item.className='event';let date=document.createElement('div');date.className='date';date.textContent=e.date;let p=document.createElement('p');p.textContent=e.text;item.append(date,p);$('preview').append(item)});$('count').textContent=events.length+' 个事件'}
function edit(){ $('editor').replaceChildren();events.forEach((e,i)=>{let row=document.createElement('div');row.className='edit';let label=document.createElement('label');label.textContent=e.date;let input=document.createElement('input');input.value=e.text;input.setAttribute('aria-label',e.date+'事件内容');input.oninput=()=>{e.text=input.value;render()};let del=document.createElement('button');del.textContent='删除';del.onclick=()=>{events.splice(i,1);edit();render()};row.append(label,input,del);$('editor').append(row)})}
function download(blob,name){if(window.AndroidExport){const reader=new FileReader();reader.onload=()=>window.AndroidExport.save(String(reader.result).split(",")[1],name,blob.type);reader.readAsDataURL(blob);return;}let a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function exportJSON(){return {version:4,layout:Number(selectedLayout()),theme:$('theme').value,title:$('title').value,events:events.map(e=>({...e}))}}
function exportPNG() {
  if (!events.length) { $('status').textContent='请先生成至少一个事件。'; return; }
  const canvas=document.createElement('canvas'),c=canvas.getContext('2d'),layout=selectedLayout();
  canvas.width=1400;
  function wrap(text,width,font) { c.font=font;const lines=[];let line='';for(const ch of text){if(line&&c.measureText(line+ch).width>width){lines.push(line);line=ch}else line+=ch}if(line)lines.push(line);return lines; }
  const title=wrap($('title').value||'我的时间线',1200,'bold 38px sans-serif');
  const rows=events.map((e,i)=>{const x=layout==='3'?(i%2?770:100):layout==='4'?480:150;
    const width=layout==='3'?500:layout==='4'?800:layout==='2'?1080:1150;
    const lines=wrap(e.text,width,'28px sans-serif');
    const dates=wrap(e.date,layout==='4'?320:width,'bold 25px sans-serif');
    const height=layout==='4'?Math.max(lines.length*42,dates.length*34)+44:dates.length*34+lines.length*42+76;
    return {...e,x,width,lines,dates,height};});
  const top=150+title.length*48;canvas.height=top+rows.reduce((n,r)=>n+r.height+(layout==='2'?20:0),0)+80;
  c.fillStyle='#fafbf7';c.fillRect(0,0,canvas.width,canvas.height);
  c.fillStyle='#23362e';c.font='bold 38px sans-serif';title.forEach((line,i)=>c.fillText(line,100,90+i*48));
  let y=top;const accent=colors[$('theme').value];
  rows.forEach(row=>{
    if(layout==='2'){c.fillStyle='#ffffff';c.fillRect(100,y-20,1200,row.height);c.fillStyle=accent;c.fillRect(100,y-20,6,row.height);}
    if(layout==='1'||layout==='3'){const axis=layout==='3'?700:110;c.strokeStyle='#d9e3d8';c.beginPath();c.moveTo(axis,y);c.lineTo(axis,y+row.height);c.stroke();c.fillStyle=accent;c.beginPath();c.arc(axis,y+4,8,0,Math.PI*2);c.fill();}
    if(layout==='4'){c.strokeStyle='#d9e3d8';c.beginPath();c.moveTo(100,y+row.height-20);c.lineTo(1300,y+row.height-20);c.stroke();}
    c.fillStyle=accent;c.font='bold 25px sans-serif';row.dates.forEach((line,i)=>c.fillText(line,layout==='4'?100:row.x,y+12+i*34));
    c.fillStyle='#23362e';c.font='28px sans-serif';const bodyY=layout==='4'?y+12:y+row.dates.length*34+30;
    row.lines.forEach((line,i)=>c.fillText(line,row.x,bodyY+i*42));
    y+=row.height+(layout==='2'?20:0);
  });
  canvas.toBlob(blob=>{if(blob)download(blob,'timeline.png')},'image/png');
}
$('generate').onclick=()=>{let result=parse($('source').value);events=result.events;$('status').textContent=events.length?'已识别并排序 '+events.length+' 个事件'+(result.invalid?'；已跳过 '+result.invalid+' 个无效日期或时间':''):'未找到有效日期及事件，请使用“2024年1月1日9点30分，事件内容”等格式。';edit();render()};$('title').oninput=render;$('theme').onchange=render;$('layout').onchange=render;$('png').onclick=exportPNG;$('json').onclick=()=>download(new Blob([JSON.stringify(exportJSON(),null,2)],{type:'application/json'}),'timeline.json');window.TimelineAPI={parse,exportJSON,exportPNG};$('generate').click();

