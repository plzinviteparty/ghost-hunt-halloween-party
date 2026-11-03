'use strict';
const RASTER_MANIFEST={"sprites": {"kim": {"down": "assets/kim-uniform-down.png", "left": "assets/kim-uniform-left.png", "right": "assets/kim-uniform-right.png", "up": "assets/kim-uniform-up.png"}, "ode": {"down": "assets/ode-down.png", "right": "assets/ode-right.png", "left": "assets/ode-left.png", "up": "assets/ode-up.png"}, "monsterHachi": {"down": "assets/monsterHachi-down.png", "left": "assets/monsterHachi-left.png", "right": "assets/monsterHachi-right.png", "up": "assets/monsterHachi-up.png"}, "hachi": {"down": "assets/hachi-down.png", "left": "assets/hachi-left.png", "right": "assets/hachi-right.png", "up": "assets/hachi-up.png"}, "usagi": {"down": "assets/usagi-down.png", "left": "assets/usagi-left.png", "right": "assets/usagi-right.png", "up": "assets/usagi-up.png"}, "chiikawa": {"down": "assets/chiikawa-down.png", "left": "assets/chiikawa-left.png", "right": "assets/chiikawa-right.png", "up": "assets/chiikawa-up.png"}, "player": {"down": "assets/player-uniform-down.png", "left": "assets/player-uniform-left.png", "right": "assets/player-uniform-right.png", "up": "assets/player-uniform-up.png"}, "man": {"down": "assets/man-uniform-down.png", "left": "assets/man-uniform-left.png", "right": "assets/man-uniform-right.png", "up": "assets/man-uniform-up.png"}, "alien": {"down": "assets/alien-down.png", "left": "assets/alien-left.png", "right": "assets/alien-right.png", "up": "assets/alien-up.png"}, "cat": {"down": "assets/cat-down.png", "left": "assets/cat-left.png", "right": "assets/cat-right.png", "up": "assets/cat-up.png"}, "briano": {"down": "assets/briano-uniform-down.png", "left": "assets/briano-uniform-left.png", "right": "assets/briano-uniform-right.png", "up": "assets/briano-uniform-up.png"}, "lemming": {"down": "assets/lemming-down.png", "left": "assets/lemming-left.png", "right": "assets/lemming-right.png", "up": "assets/lemming-up.png"}, "jubin": {"down": "assets/jubin-uniform-down.png", "left": "assets/jubin-uniform-left.png", "right": "assets/jubin-uniform-right.png", "up": "assets/jubin-uniform-up.png"}, "changwon": {"down": "assets/changwon-uniform-down.png", "left": "assets/changwon-uniform-left.png", "right": "assets/changwon-uniform-right.png", "up": "assets/changwon-uniform-up.png"}, "nasol": {"down": "assets/nasol-down.png", "left": "assets/nasol-left.png", "right": "assets/nasol-right.png", "up": "assets/nasol-up.png"}}, "props": {"chair": "assets/prop-chair.png", "fallenChair": "assets/prop-fallenChair.png", "chairPile": "assets/prop-chairPile.png", "table": "assets/prop-table.png", "bed": "assets/prop-bed.png", "door": "assets/prop-door.png", "desk": "assets/prop-desk.png", "piano": "assets/prop-piano.png", "mirror": "assets/prop-mirror.png", "plant": "assets/prop-plant.png", "lamp": "assets/prop-lamp.png", "ufo": "assets/prop-ufo.png"}, "textures": {"mansion": {"floor": "assets/mansion-floor.png", "wall": "assets/mansion-wall.png"}, "backroom": {"floor": "assets/backroom-floor.png", "wall": "assets/backroom-wall.png"}, "ward": {"floor": "assets/ward-floor.png", "wall": "assets/ward-wall.png"}, "water": {"floor": "assets/water-floor.png", "wall": "assets/water-wall.png"}}};
const ALTAR_ART='assets/altar-atlas-v2.png';
const rasterImages={},rasterErrors=[];
let rasterLoaded=typeof Image==='undefined';
const rasterPromise=typeof Image==='undefined'?Promise.resolve():Promise.all([...new Set([ALTAR_ART,...Object.values(RASTER_MANIFEST.sprites).flatMap(Object.values),...Object.values(RASTER_MANIFEST.props),...Object.values(RASTER_MANIFEST.textures).flatMap(Object.values)])].map(src=>new Promise(resolve=>{const im=new Image();im.onload=()=>{rasterImages[src]=im;resolve()};im.onerror=()=>{rasterErrors.push(src);resolve()};im.src=src;}))).then(()=>{rasterLoaded=true});
const SPRITE_HEIGHT={nasol:82,jubin:82,changwon:82,player:82,kim:82,man:94,ode:76,monsterHachi:142,hachi:53,usagi:66,chiikawa:53,alien:64,cat:36,briano:82,lemming:65};
function drawRasterSprite(kind,x,y,face='down'){
 kind=({bigcat:'monsterHachi',smallcat:'chiikawa',rabbit:'usagi',nurse:'lemming',doctor:'briano',alien:'lemming'})[kind]||kind;
 const frames=RASTER_MANIFEST.sprites[kind];if(!frames)return false;
 const im=rasterImages[frames[face]||frames.down];if(!im)return false;
 const h=SPRITE_HEIGHT[kind],w=Math.round(h*im.naturalWidth/im.naturalHeight),left=Math.round(x-w/2),top=Math.round(y-h);
 shadow(x,y,Math.min(w*.7,kind==='monsterHachi'?80:42));cx.imageSmoothingEnabled=false;cx.drawImage(im,left,top,w,h);return true;
}
const PROP_SIZE={chair:[37,55],fallenChair:[54,40],chairPile:[77,73],table:[105,76],bed:[66,99],door:[53,90],desk:[82,69],piano:[98,82],mirror:[42,82],plant:[48,68],lamp:[31,42],ufo:[156,112]};
function drawRasterProp(kind,x,y){if(drawRasterSprite(kind,x,y))return true;const key=kind==='fireplace'?null:kind,src=RASTER_MANIFEST.props[key],im=src&&rasterImages[src];if(!im)return false;const [maxW,maxH]=PROP_SIZE[key],ratio=Math.min(maxW/im.naturalWidth,maxH/im.naturalHeight),w=Math.round(im.naturalWidth*ratio),h=Math.round(im.naturalHeight*ratio);shadow(x,y,Math.min(w*.7,82));cx.imageSmoothingEnabled=false;cx.drawImage(im,Math.round(x-w/2),Math.round(y-h),w,h);return true}
function drawRasterTile(x,y){
 const m=MAPS[s.room],theme=({bedroom:'mansion',slime:'water',lab:'ward',yard:'backroom'})[m.theme]||m.theme,tx=RASTER_MANIFEST.textures[theme];if(!tx)return false;const floor=rasterImages[tx.floor],wall=rasterImages[tx.wall];if(!floor||!wall)return false;
 const sx=x*TS-camera.x,sy=y*TS-camera.y,maze=s.room==='backroom'&&x%10===0&&x>0&&x<50&&collision(s.room).has(x+','+y),isWall=y<3||x===0||x===m.w-1||y===m.h-1||maze;
 cx.imageSmoothingEnabled=false;
 if(isWall){let sourceY,sourceH;if(y<3){sourceH=wall.naturalHeight/3;sourceY=y*sourceH}else{sourceH=wall.naturalHeight/3;const belowBlocked=collision(s.room).has(x+','+(y+1));sourceY=belowBlocked?64:wall.naturalHeight-sourceH}cx.drawImage(wall,(x%6)*64,sourceY,64,sourceH,sx,sy,32,32);if(x===0||x===m.w-1||maze){rect(sx,sy,3,32,'#1a172166');rect(sx+29,sy,3,32,'#15101d99')}if(y===2)rect(sx,sy+30,32,2,'#261c29')}else{cx.drawImage(floor,(x%6)*64,(y%8)*64,64,64,sx,sy,32,32);if(m.theme==='yard'){cx.fillStyle='#213f3e55';cx.fillRect(sx,sy,32,32)}if(m.theme==='slime'){cx.fillStyle='#7dcac32b';cx.fillRect(sx,sy,32,32)}}return true;
}

// One art atlas supplies the altar's floor, masonry and transparent decoration.
function altarArtCell(cell,x,y,w,h,crop=[0,0,1,1]){
 const im=rasterImages[ALTAR_ART];if(!im)return false;
 const cw=im.naturalWidth/4,ch=im.naturalHeight/3;
 cx.imageSmoothingEnabled=false;cx.drawImage(im,((cell%4)+crop[0])*cw,(Math.floor(cell/4)+crop[1])*ch,cw*crop[2],ch*crop[3],Math.round(x),Math.round(y),w,h);return true;
}
function drawAltarRasterTile(x,y){
 const im=rasterImages[ALTAR_ART];if(!im)return false;
 const m=MAPS.altar,cw=im.naturalWidth/4,ch=im.naturalHeight/3,sx=x*TS-camera.x,sy=y*TS-camera.y;
 const wall=y<3||x===0||x===m.w-1||y===m.h-1;cx.imageSmoothingEnabled=false;
 if(wall){
  const row=y<3?y:2,wx=cw*1.045,wy=ch*.045,ww=cw*.91,wh=ch*.91;cx.drawImage(im,wx+(x%4)*ww/4,wy+row*wh/3,ww/4,wh/3,sx,sy,32,32);
  if(x===0||x===m.w-1){rect(sx,sy,32,32,'#17142155');rect(sx+(x===0?0:27),sy,5,32,'#0d0c1488')}
  if(y===2){rect(sx,sy+25,32,2,'#b6a18366');rect(sx,sy+28,32,4,'#1a1722')}
 }else{
  const fx=cw*.06,fy=ch*.06,fw=cw*.88,fh=ch*.88;cx.drawImage(im,fx+(x%4)*fw/4,fy+(y%4)*fh/4,fw/4,fh/4,sx,sy,32,32);
  if(x>=11&&x<=15&&y>=11&&y<=26){
   rect(sx,sy,32,32,'#4b18266b');rect(sx+2,sy+3,28,1,'#d4a08d19');
   if(x===11||x===15){const bx=sx+(x===11?2:28);rect(bx,sy,2,32,'#b395626b');for(let j=0;j<4;j++)rect(bx-2,sy+j*8+3,6,2,'#ddc28c55')}
   if((x*13+y*7)%9===0){rect(sx+6,sy+8,12,2,'#18152055');rect(sx+17,sy+10,2,7,'#18152055')}
  }
 }
 return true;
}
function drawAltarRasterProp(kind,x,y){
 if(!rasterImages[ALTAR_ART])return false;
 const shape={altarPillar:[2,52,124,-116],altarTable:[3,120,88,-76],altarPlinth:[9,72,60,-50],altarCandle:[10,44,88,-81]}[kind];if(!shape)return false;
 const [cell,w,h,top]=shape;shadow(x,y,kind==='altarTable'?78:kind==='altarPillar'?44:38);
 return altarArtCell(cell,x-w/2,y+top,w,h,kind==='altarPillar'?[.28,.01,.44,.97]:kind==='altarCandle'?[.22,0,.56,1]:[0,0,1,1]);
}
function drawAltarRasterHead(x,y,id,angry){
 if(!rasterImages[ALTAR_ART])return false;
 shadow(x,y,angry?46:35);const bob=angry?Math.round(Math.sin(frameTime*7+id)*3):0;
 if(angry){rect(x-16,y-48+bob,32,24,'#9d42351b');rect(x-13,y-39+bob,26,14,'#f4ab6814')}
 return altarArtCell(4+id,x-35,y+(angry?-74:-94)+bob,70,70);
}
function drawAltarFloorDetails(){
 if(s.room!=='altar')return;
 // Faint inlaid brass bands connect the five pedestals, without adding collision.
 const x=13*TS+16-camera.x,y=12*TS+16-camera.y;
 for(let i=0;i<40;i++){const angle=i*Math.PI/20,px=x+Math.cos(angle)*65,py=y+Math.sin(angle)*23;rect(px,py,3,2,i%2?'#b19a6766':'#7c736255')}
 for(let i=0;i<5;i++){const px=(5+i*4)*TS+16-camera.x,py=8*TS+16-camera.y;rect(px-24,py+7,48,2,'#bfa17755');rect(px-21,py+10,42,1,'#16131e99')}
}
function drawAltarLighting(){
 if(s.room!=='altar')return;
 const reduced=typeof window.matchMedia==='function'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 for(const [kind,tx,ty] of MAPS.altar.props){if(kind!=='altarCandle')continue;const x=tx*TS+16-camera.x,y=ty*TS-52-camera.y;if(x< -90||x>730||y< -90||y>470)continue;
  const radius=69+(reduced?0:Math.sin(frameTime*3+tx)*3),g=cx.createRadialGradient(x,y,3,x,y,radius);g.addColorStop(0,'#e7ad6327');g.addColorStop(.35,'#c7864615');g.addColorStop(1,'#bd763000');cx.fillStyle=g;cx.fillRect(x-radius,y-radius,radius*2,radius*2);
 }
 // Deep corners frame the walkable aisle; the route itself stays readable.
 rect(0,0,20,384,'#100b1d33');rect(620,0,20,384,'#100b1d33');
}
