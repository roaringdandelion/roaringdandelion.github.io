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
function render(){document.documentElement.style.setProperty('--accent',colors[$('theme').value]);$('preview').replaceChildren();let h=document.createElement('h1');h.textContent=$('title').value||'我的时间线';$('preview').append(h);let range=document.createElement('div');range.className='range';range.textContent=events.length?events[0].date+' — '+events.at(-1).date:'输入文字，开始生成你的时间线';$('preview').append(range);events.forEach(e=>{let item=document.createElement('div');item.className='event';let date=document.createElement('div');date.className='date';date.textContent=e.date;let p=document.createElement('p');p.textContent=e.text;item.append(date,p);$('preview').append(item)});$('count').textContent=events.length+' 个事件'}
function edit(){ $('editor').replaceChildren();events.forEach((e,i)=>{let row=document.createElement('div');row.className='edit';let label=document.createElement('label');label.textContent=e.date;let input=document.createElement('input');input.value=e.text;input.setAttribute('aria-label',e.date+'事件内容');input.oninput=()=>{e.text=input.value;render()};let del=document.createElement('button');del.textContent='删除';del.onclick=()=>{events.splice(i,1);edit();render()};row.append(label,input,del);$('editor').append(row)})}
function download(blob,name){if(window.AndroidExport){const reader=new FileReader();reader.onload=()=>window.AndroidExport.save(String(reader.result).split(",")[1],name,blob.type);reader.readAsDataURL(blob);return;}let a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function exportJSON(){return {version:4,title:$('title').value,events:events.map(e=>({...e}))}}
function exportPNG(){if(!events.length){$('status').textContent='请先生成至少一个事件。';return}let canvas=document.createElement('canvas'),c=canvas.getContext('2d');canvas.width=1400;c.font='28px sans-serif';let wrap=(t,w)=>{let lines=[],line='';for(const ch of t){if(c.measureText(line+ch).width>w){lines.push(line);line=ch}else line+=ch}if(line)lines.push(line);return lines};let titleLines=wrap($('title').value||'我的时间线',1160),rows=events.map(e=>({...e,lines:wrap(e.text,1070)}));canvas.height=200+titleLines.length*46+rows.reduce((n,e)=>n+100+e.lines.length*42,0);c.fillStyle='#fafbf7';c.fillRect(0,0,1400,canvas.height);c.fillStyle='#23362e';c.font='bold 38px sans-serif';titleLines.forEach((l,i)=>c.fillText(l,100,100+i*46));let y=170+titleLines.length*46;rows.forEach(e=>{c.strokeStyle='#d9e3d8';c.beginPath();c.moveTo(110,y);c.lineTo(110,y+70+e.lines.length*42);c.stroke();c.fillStyle=colors[$('theme').value];c.beginPath();c.arc(110,y,8,0,Math.PI*2);c.fill();c.font='bold 25px sans-serif';c.fillText(e.date,150,y+8);c.fillStyle='#23362e';c.font='28px sans-serif';e.lines.forEach((l,j)=>c.fillText(l,150,y+58+j*42));y+=100+e.lines.length*42});canvas.toBlob(b=>{if(b)download(b,'timeline.png')},'image/png')}
$('generate').onclick=()=>{let result=parse($('source').value);events=result.events;$('status').textContent=events.length?'已识别并排序 '+events.length+' 个事件'+(result.invalid?'；已跳过 '+result.invalid+' 个无效日期或时间':''):'未找到有效日期及事件，请使用“2024年1月1日9点30分，事件内容”等格式。';edit();render()};$('title').oninput=render;$('theme').onchange=render;$('png').onclick=exportPNG;$('json').onclick=()=>download(new Blob([JSON.stringify(exportJSON(),null,2)],{type:'application/json'}),'timeline.json');window.TimelineAPI={parse,exportJSON,exportPNG};$('generate').click();

