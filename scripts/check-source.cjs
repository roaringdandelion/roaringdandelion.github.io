const fs=require('fs'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname,'..');
for(const name of ['books','movies','games']){
 const rows=JSON.parse(fs.readFileSync(path.join(root,'_data',name+'.json'),'utf8'));
 assert(rows.length>0,name+' is empty');const seen=new Set();
 for(const row of rows){assert(/^\d{4}-\d{2}-\d{2}$/.test(row.date),'Invalid date');assert(row.title||row.name,'Missing title');const key=(row.title||row.name)+row.date;assert(!seen.has(key),'Duplicate '+key);seen.add(key);if(row.cover)assert(fs.existsSync(path.join(root,row.cover)),'Missing cover '+row.cover);}
 console.log(name+': '+rows.length+' valid records');
}
for(const file of fs.readdirSync(path.join(root,'_projects'))){const text=fs.readFileSync(path.join(root,'_projects',file),'utf8');const link=JSON.parse(text.match(/^link: (.+)$/m)[1]);assert(fs.existsSync(path.join(root,link)),'Missing project '+link);}
console.log('Project destinations exist.');
