
const {chromium}=require('C:/Users/ding/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}),p=await b.newPage();p.on('dialog',d=>d.accept());await p.goto('http://127.0.0.1:4173');await p.click('#demo');await p.waitForFunction(()=>!!image);
await p.evaluate(()=>{items=[{id:'label',type:'text',x:30,y:40,w:0,h:0,text:'保留位置',color:'#123456',size:32,width:4,locked:false}];commit()});
const png=await p.evaluate(()=>{const c=document.createElement('canvas');c.width=500;c.height=500;return c.toDataURL().split(',')[1]});
async function replace(mode){await p.setInputFiles('#replaceFilePlus',{name:'other.png',mimeType:'image/png',buffer:Buffer.from(png,'base64')});await p.waitForSelector('#replaceDialog:visible');await p.check('[name=replaceMode][value='+mode+']');await p.click('#confirmReplace')}
await replace('position');await p.waitForFunction(()=>sourceImage.width===500);assert.deepEqual(await p.evaluate(()=>[items[0].x,items[0].y]),[30,40]);
await p.evaluate(()=>{window.originalVersionStore=versionStore;versionStore=async()=>{throw Error('模擬儲存空間不足')}});
await replace('clear');await p.waitForFunction(()=>document.querySelector('#replaceStatus').textContent.includes('無法保存'));assert.equal(await p.evaluate(()=>items.length),1);assert.equal(await p.evaluate(()=>sourceImage.width),500);await p.click('[data-close=replaceDialog]');
await p.evaluate(()=>{versionStore=window.originalVersionStore});await replace('clear');await p.waitForFunction(()=>!document.querySelector('#replaceDialog').open);assert.equal(await p.evaluate(()=>items.length),0);
assert.equal(await p.evaluate(async()=>{const data=projectData();data.publication.logo='https://bad.invalid/a.png';try{await decodeProject(data);return false}catch{return true}}),true);
await p.evaluate(async()=>{for(let i=0;i<12;i++)await saveHistory('容量驗證'+i,true)});assert.equal(await p.evaluate(()=>plus.history.length),10);
console.log('PASS replacement keep-position/clear, storage failure preserves document, invalid remote logo rejected, ten-version retention.');await b.close()})().catch(e=>{console.error(e);process.exit(1)});

