
const {chromium}=require('C:/Users/ding/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 const context=await browser.newContext({viewport:{width:1600,height:1000},permissions:['clipboard-read','clipboard-write']});
 const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());
 await p.goto('http://127.0.0.1:4173');assert.equal(await p.locator('#uiMode').inputValue(),'simple');assert.equal(await p.locator('[data-tool=crop]').isVisible(),false);
 await p.click('#demo');await p.waitForFunction(()=>!!image);await p.selectOption('#uiMode','advanced');assert.equal(await p.locator('[data-tool=crop]').isVisible(),true);
 // Phrase and stamp through UI.
 await p.fill('#textInput','此處為常用測試說明');await p.click('#rememberPhrase');await p.selectOption('#phraseSelect','此處為常用測試說明');await p.click('#usePhrase');
 assert.equal(await p.evaluate(()=>tool),'step');let b=await p.locator('#canvas').boundingBox();await p.mouse.click(b.x+110,b.y+85);
 await p.selectOption('#stampSelect','完成');await p.click('#insertStamp');assert.equal(await p.evaluate(()=>items.at(-1).stamp),true);
 // Linked arrow follows target on actual pointer movement and survives JSON round-trip.
 await p.evaluate(()=>{items=[{id:uid(),type:'step',x:100,y:100,w:400,h:0,text:'請按送出申請',n:1,color:'#dc2626',size:32,width:4,locked:false},{id:uid(),type:'arrow',x:500,y:150,w:350,h:350,color:'#dc2626',size:32,width:4,locked:false}];commit();setTool('select');setSelection([0,1])});
 await p.click('#linkArrow');const start=await p.evaluate(()=>({x:items[1].x,y:items[1].y,tip:{...items[1].linkTip}}));
 b=await p.locator('#canvas').boundingBox();const s=b.width/1200;await p.mouse.move(b.x+150*s,b.y+125*s);await p.mouse.down();await p.mouse.move(b.x+220*s,b.y+185*s);await p.mouse.up();
 assert.notEqual(await p.evaluate(()=>items[1].x),start.x);assert.deepEqual(await p.evaluate(()=>items[1].linkTip),start.tip);
 assert.equal(await p.evaluate(async()=>{const d=await decodeProject(projectData());return d.pages[0].items[1].linkTo===d.pages[0].items[0].id}),true);
 // Multiple selection cloning remaps links; margin shifting preserves endpoint.
 await p.evaluate(()=>setSelection([0,1]));await p.click('#duplicate');assert.equal(await p.evaluate(()=>items[3].linkTo===items[2].id),true);
 await p.click('#delete');const tipX=await p.evaluate(()=>items[1].linkTip.x);
 await p.fill('#marginLeft','80');await p.click('#applyMargins');assert.equal(await p.evaluate(()=>items[1].linkTip.x),tipX+80);await p.click('#undo');
 // Preserve annotations on replacement, including lock flag, and restore actual old source.
 await p.evaluate(()=>{items[0].locked=true;commit()});const old=await p.evaluate(()=>({x:items[0].x,y:items[0].y,width:sourceImage.width,encoded:currentPage().encoded}));
 const png=await p.evaluate(()=>{const c=document.createElement('canvas');c.width=600;c.height=380;const g=c.getContext('2d');g.fillStyle='#eef';g.fillRect(0,0,600,380);g.fillStyle='#345';g.font='30px sans-serif';g.fillText('Replacement',40,80);return c.toDataURL().split(',')[1]});
 await p.setInputFiles('#replaceFilePlus',{name:'replacement.png',mimeType:'image/png',buffer:Buffer.from(png,'base64')});
 await p.waitForSelector('#replaceDialog:visible');await p.click('#confirmReplace');await p.waitForFunction(()=>sourceImage.width===600);
 assert.equal(await p.evaluate(()=>items.length),2);assert.equal(await p.evaluate(()=>items[0].locked),true);assert.equal(await p.evaluate(()=>items[0].x),old.x*.5);
 await p.click('#versionsOpen');await p.locator('#versionsList li').filter({hasText:'換圖前備份'}).getByRole('button',{name:'還原'}).first().click();
 await p.waitForFunction(()=>sourceImage.width===1200);assert.equal(await p.evaluate(()=>currentPage().encoded),old.encoded);assert.equal(await p.evaluate(()=>items[0].x),old.x);
 // Named version and fresh UI storage restore.
 await p.click('#versionsOpen');await p.fill('#versionName','驗證用版本');await p.click('#saveNamedVersion');await p.waitForFunction(()=>plus.history[0]?.label==='驗證用版本');await p.click('[data-close=versionsDialog]');
 await p.evaluate(()=>flushDraft());await p.reload();await p.waitForSelector('#draftBanner:visible');assert.equal(await p.locator('#uiMode').inputValue(),'advanced');await p.click('#restoreDraft');await p.waitForFunction(()=>studio.pages.length===1);await p.click('#versionsOpen');await p.waitForFunction(()=>document.querySelector('#versionsList').textContent.includes('驗證用版本'));await p.click('[data-close=versionsDialog]');
 // Publication configuration/logo must survive project persistence.
 await p.click('#publicationOpen');await p.check('#pubCover');await p.fill('#pubTitle','公假申請操作教學');await p.fill('#pubUnit','清水國小');await p.fill('#pubDate','2026-09-29');await p.fill('#pubVersion','第 6 版');await p.fill('#pubHeader','行政系統操作手冊');await p.fill('#pubFooter','清水國小 · 內部教學');
 await p.setInputFiles('#logoFile',{name:'logo.png',mimeType:'image/png',buffer:Buffer.from(png,'base64')});await p.waitForSelector('#logoPreview:visible');await p.click('#savePublication');
 assert.equal(await p.evaluate(async()=>{const d=await decodeProject(projectData());return d.publication.title==='公假申請操作教學'&&!!d.logoImage}),true);
 // Explicitly create the four warning categories; duplicates allowed in manual numbering.
 await p.evaluate(()=>{studio.autoNumber=false;items=[{id:uid(),type:'step',x:70,y:70,w:350,h:0,text:'步驟說明一',n:1,color:'#dc2626',size:32,width:4,locked:false},{id:uid(),type:'step',x:90,y:80,w:350,h:0,text:'步驟說明二',n:1,color:'#dc2626',size:32,width:4,locked:false},{id:uid(),type:'text',x:-20,y:300,w:0,h:0,text:'太小的字',color:'#dc2626',size:16,width:4,locked:false}];commit()});
 await p.click('#checkExport');let warnings=await p.locator('#checkList').textContent();for(const text of ['超出','重複','過小','重疊'])assert.ok(warnings.includes(text)||text==='過小'&&warnings.includes('小於'),warnings);await p.locator('#checkList button').first().click();assert.equal(await p.evaluate(()=>selected>=0),true);
 const download=p.waitForEvent('download');await p.click('#export');await p.waitForSelector('#checkDialog:visible');await p.click('#continueExport');await(await download).saveAs('qa-plus-warning.png');
 // Reader uses all numbered steps, supports keys, and leaves editor state unchanged.
 const before=await p.evaluate(()=>({snap:snapshot(),active:studio.active}));await p.click('#readMode');assert.match(await p.locator('#readerProgress').textContent(),/1 \/ 3/);await p.click('#readerNext');assert.match(await p.locator('#readerCaption').textContent(),/步驟說明一/);await p.keyboard.press('ArrowRight');assert.match(await p.locator('#readerCaption').textContent(),/步驟說明二/);assert.equal(await p.locator('#readerNext').isDisabled(),true);await p.screenshot({path:'qa-plus-reader.png'});await p.click('[data-close=readerDialog]');assert.deepEqual(await p.evaluate(()=>({snap:snapshot(),active:studio.active})),before);
 // Make a clean two-page book, export cover+PDF and long image.
 await p.evaluate(()=>{items=[];commit();const c=document.createElement('canvas');c.width=600;c.height=400;c.getContext('2d').fillRect(0,0,600,400);studio.pages.push(makePage(c,'第二頁'));capturePage();update()});
 await p.click('#exportBook');let wait=p.waitForEvent('download');await p.click('#downloadPDF');await(await wait).saveAs('qa-plus.pdf');wait=p.waitForEvent('download');await p.click('#downloadLong');await(await wait).saveAs('qa-plus-long.png');await p.click('#bookClose');
 assert.equal(await p.evaluate(async()=>{await loadScript('vendor/pdf-lib.min.js');const data=await buildPDF(),pdf=await PDFLib.PDFDocument.load(data);return pdf.getPageCount()}),3);
 await p.screenshot({path:'qa-plus-desktop.png'});await p.selectOption('#uiMode','simple');await p.setViewportSize({width:390,height:844});assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await p.screenshot({path:'qa-plus-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('PASS all eight enhancements: modes, replacement/restore, persistent versions, warning categories/export, linked arrows/duplication, phrases/stamps, logo/cover/PDF/long, read-only step navigation, mobile.');
 await browser.close()
})().catch(e=>{console.error(e);process.exit(1)});

