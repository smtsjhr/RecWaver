var record_animation = false;
var name = "image_"


var get_mouse_pos = false;
var get_touch_pos = false;



var x_touch = 0;
var y_touch = 0;

var p = 3*Math.PI 
var angle = Math.PI/4;

var frame = 0;
var total_frames = 300;
var t = 0;
var total_time = 2*Math.PI;
var rate = 2*Math.PI/total_frames;
var loop = 0;

var stop = false;
var fps, fpsInterval, startTime, now, then, elapsed;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

const W = canvas.width = 300;
const H = canvas.height = 300;


startAnimating(50);

function draw() {
  
  ctx.fillStyle = 'rgba(0,0,0, 0.2)';
  ctx.fillRect(0,0,W,H);

  let n = 20;
  let d = 18;
  
  ctx.fillStyle = 'rgba(255,255,255, 1)';

    for (let i = 0; i < n; i++) {
        for ( let j = 0; j < n; j++) {
            let x = (i - n/2);
            let y = (j - n/2);
            
            let phase = p*(Math.cos(angle)*x + Math.sin(angle)*y)*2*Math.PI/(4*n);
            
            ctx.fillRect(W/2 +d/2 +d*x, H/2 +d/2+d*y, d*Math.sin(t+phase), d*Math.cos(t+phase))
        }
    }
    

    frame = (frame + 1)%total_frames;
    t = -(frame*rate);

    p = 3*Math.PI + 3*Math.PI*Math.cos(t);
    
    
  //window.requestAnimationFrame(draw);
  
  canvas.addEventListener('mousedown', e => {
        get_mouse_pos = true;
        getMousePosition(canvas, e)
        });
          
        canvas.addEventListener('mouseup', e => {
        get_mouse_pos = false;
        });
      
        canvas.addEventListener('mousemove', function(e) {
          if(get_mouse_pos) {
            getMousePosition(canvas, e)
          }
        })
        
        canvas.addEventListener('touchstart', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
          
        canvas.addEventListener('touchend', function(e) {
            get_touch_pos = false;
        }, false);
          
        canvas.addEventListener('touchmove', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);


}


function startAnimating(fps) {
    
   fpsInterval = 1000 / fps;
   then = window.performance.now();
   startTime = then;
   
   animate();
}

function animate(newtime) {

    requestAnimationFrame(animate);

    now = newtime;
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        draw();
        
      

        if(record_animation) {

            if (loop === 1) { 
            let frame_number = frame.toString().padStart(total_frames.toString().length, '0');
            let filename = name+frame_number+'.png'
                
            dataURL = canvas.toDataURL();
            var element = document.createElement('a');
            element.setAttribute('href', dataURL);
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            }

            if (frame + 1 === total_frames) {
                loop += 1;
            }

            if (loop === 2) { stop_animation = true }
        }
    }
}

  

  function getMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();  
    x_touch = (event.clientX - rect.left)/canvas.width - 0.5;
    y_touch = (event.clientY - rect.top)/canvas.height - 0.5;
    x_0 = x_touch; 
    y_0 = y_touch; 

    r = Math.sqrt(x_0**2 + y_0**2)**2;
    angle = Math.atan2(y_0,x_0);
    p = 40*Math.PI*r;

    p_x = 40*Math.PI*r; 
    p_y = 40*Math.PI*r;
    
}

function getTouchPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    var touch = event.touches[0];
    x_touch = (touch.clientX - rect.left)/canvas.width - 0.5;
    y_touch = (touch.clientY - rect.top)/canvas.height - 0.5;
    
    x_0 = x_touch; 
    y_0 = y_touch; 

    r = Math.sqrt(x_0**2 + y_0**2)**2;
    angle = Math.atan2(y_0,x_0);
    p = 40*Math.PI*r;

    p_x = 40*Math.PI*r; 
    p_y = 40*Math.PI*r;
}