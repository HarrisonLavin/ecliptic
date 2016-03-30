function CreateLightHex(color){
  var canvas = document.createElement('canvas');
  canvas.width = 173;
  canvas.height = 200;
  
  var ctx = canvas.getContext('2d');
  var grad = ctx.createLinearGradient(0,0,173,0);
  grad.addColorStop(0, color);
  grad.addColorStop(0.07, 'rgba(0,0,0,0)');
  grad.addColorStop(0.93, 'rgba(0,0,0,0)');
  grad.addColorStop(1, color);
  MakeHexTile(ctx, grad);
  
  return canvas;
}

function MakeHexTile(ctx, fillStyle){
  ctx.save();
  
  var rotateBy = 60 * Math.PI / 180;
  
  ctx.fillStyle = fillStyle;
  ctx.fillRect(0,50,173,100);
  ctx.translate(129,-25);
  ctx.rotate(rotateBy);
  ctx.fillRect(0,50,173,100);
  ctx.translate(129,-25);
  ctx.rotate(rotateBy);
  ctx.fillRect(0,50,173,100);
  
  // Reset the context rotation
  ctx.restore();
};

function MakeHexBKG(){
  var tile = CreateLightHex('#00ffff');
  var canv = document.createElement('canvas');
  canv.width = tile.width;
  canv.height = 300;
  
  var ctx = canv.getContext('2d');
  ctx.drawImage(tile,0,0);
  ctx.drawImage(tile,0,300);
  ctx.drawImage(tile,-86.5,-150);
  ctx.drawImage(tile,-86.5,150);
  ctx.drawImage(tile,86.5,-150);
  ctx.drawImage(tile,86.5,150);
  
  return canv;
}

var url = MakeHexBKG().toDataURL('image/png');
document.body.style.backgroundImage = 'url('+url+')';