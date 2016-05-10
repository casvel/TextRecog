$(document).ready(function() 
{

  console.log("canvas: " + active_canvas);

  var all_canvas = $('canvas');
  var offset = $("#"+all_canvas[1].id).offset();
  var clearBtn = $('#clearBtn');

  var lineColor = '#333';
  var lineWidthVal = 4;

  var isMouseDown = false;

  var pos = {
    x: 0,
    y: 0
  };
  var lastPos = {
    x: 0,
    y: 0
  };

  fillWhite();
  initCanvas();

  /* To fill the canvas with white */
  function fillWhite()
  {
    var plain_canvas = document.getElementById("canvas"+active_canvas);
    var ctx = plain_canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, plain_canvas.width, plain_canvas.height);
  }

  //jCanvas drawLine() method
  function paintLine(canvas, x1, y1, x2, y2, paintWidth, paintColor) 
  {
    console.log(x1, y1, x2, y2);
    canvas.drawLine({
      strokeStyle: paintColor,
      strokeWidth: paintWidth,
      rounded: true,
      strokeJoin: 'round',
      strokeCap: 'round',
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2
    });
  }

  /*  
   ** PAINTING FUNCTIONALITY **
   */

  function initCanvas()
  {
    for (var i = 0; i < 52; i++)
    {
      canvas = $("#"+all_canvas[i].id);
      
      //On mousedown the painting functionality kicks in
      canvas.on('mousedown', function(e) 
      {
        isMouseDown = true;
      });

      //On mouseup the painting functionality stops
      canvas.on('mouseup', function() 
      {
        isMouseDown = false;
        return;
      });

      //On mousemove store the mouse coordinates and 
      //use jCanvas drawLine() method
      canvas.on('mousemove', function(e) 
      {

        lastPos.x = pos.x;
        lastPos.y = pos.y;
        pos.x = e.pageX - offset.left;
        pos.y = e.pageY - offset.top;

        if (isMouseDown) 
        {
          paintLine($("#"+this.id), lastPos.x, lastPos.y, pos.x, pos.y, lineWidthVal, lineColor);
        }
      });
    }

    //Clears all canvas surface
    clearBtn.on('click', function()
    {
      canvas.clearCanvas();
      fillWhite();
    });
  }

});