$(document).ready(function()
{

  var lineColor = '#333';
  var lineWidthVal = 7;
  var isMouseDown = false;
  var jcanvas = $("#canvasTest");
  var canvas  = document.getElementById("canvasTest");

  var pos = {
    x: 0,
    y: 0
  };
  var lastPos = {
    x: 0,
    y: 0
  };

  initCanvas();

  /* To fill the canvas with white */
  function fillWhite(canvas)
  {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);    
  }

  //jCanvas drawLine() method
  function paintLine(jcanvas, x1, y1, x2, y2, paintWidth, paintColor) 
  {
    jcanvas.drawLine({
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

  function initCanvas()
  {
    fillWhite(canvas);
    
    //On mousedown the painting functionality kicks in
    jcanvas.on('mousedown', function(e) 
    {
      isMouseDown = true;
    });

    //On mouseup the painting functionality stops
    jcanvas.on('mouseup', function() 
    {
      isMouseDown = false;
      return;
    });

    //On mousemove store the mouse coordinates and 
    //use jCanvas drawLine() method
    jcanvas.on('mousemove', function(e) 
    {
      lastPos.x = pos.x;
      lastPos.y = pos.y;
      pos.x = e.pageX - $(this).offset().left;
      pos.y = e.pageY - $(this).offset().top;

      if (isMouseDown) 
      {
        paintLine($(this), lastPos.x, lastPos.y, pos.x, pos.y, lineWidthVal, lineColor);
      }
    });
  }

  $("#clearTestBtn").on('click', function()
  {
    jcanvas.clearCanvas();
    fillWhite(canvas);
  });

  
  $('#recogBtn').click(function()
  { 
    var dataURL = canvas.toDataURL();

    $.ajax(
    {
      type: "POST",
      url: "/predict",
      data: { image: dataURL }
    });
  });

});