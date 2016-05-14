$(document).ready(function() 
{
  var canvas = $('canvasSeg');
  var offset = $("#"+canvas.id).offset();
  var clearBtn = $('#clearBtn');
  var x;
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

  initCanvas();

  /* To fill the canvas with white */
  function fillWhite()
  {
    var plain_canvas = document.getElementById("canvasSeg");
    var ctx = plain_canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, plain_canvas.width, plain_canvas.height);    
  }

  //jCanvas drawLine() method
  function paintLine(canvas, x1, y1, x2, y2, paintWidth, paintColor) 
  {
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

  //Draws selection rectangle for segmentation
  function draw(x1)
  {
    var canvas = document.getElementById("canvasSeg");
    var ctx = canvas.getContext("2d");   
    var canvas1 = document.getElementById("canvasSel");    
    var ctx1 = canvas1.getContext("2d");          
    var canvas2 = document.getElementById("canvasRes");
    var ctx2 = canvas2.getContext("2d");        
    //Rectangle properties 
    var handle = {
      color: 'rgba(0, 255, 0, 0.2)',
      dim: { w: 35, h: canvas1.height },
      pos: { x: 0, y: 0 }
    };

    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx1.fillStyle = handle.color;
    ctx1.fillRect(x1+handle.pos.x, handle.pos.y, handle.dim.w, handle.dim.h);      
    ctx2.drawImage(canvas,x1+handle.pos.x,handle.pos.y,70,150,0,0,70,150);
    x = x1+handle.pos.x+14;
  }

  //Initialize and adds canvas for segmentation
  function startSegmentation()
  {
    var canvas1 = document.createElement('canvas');
    var ctx1 = canvas1.getContext("2d");          
    canvas1.setAttribute("id", "canvasSel");
    document.getElementById("segmentation").appendChild(canvas1);   

    draw(0);      
  }

  $('.decSegBtn').click(function()
  {
    var canvas = document.getElementById("canvasRes");
    var ctx = canvas.getContext("2d");  
    var dataURL = canvas.toDataURL();  
    var id = this.id;    

    if(id.match("^yes"))
      var URL = "/save/segmentation/yes";
    else
      var URL = "/save/segmentation/no";

    $.ajax(
    {
      type: "POST",
      url: URL,                              
      data: { image: dataURL }
    }).done(function(res)
    {     
      if (res == "Success")
        $('#success-alert').show().delay(1500).fadeOut();
      else
        $('#fail-alert').show().delay(1500).fadeOut();
    });

    draw(x);  
  });

  /*  
   ** PAINTING FUNCTIONALITY **
   */

  function initCanvas()
  {
      fillWhite();
      canvas = $("#canvasSeg");
      
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
        pos.x = e.pageX - $(this).offset().left;
        pos.y = e.pageY - $(this).offset().top;

        if (isMouseDown) 
        {
          paintLine($(this), lastPos.x, lastPos.y, pos.x, pos.y, lineWidthVal, lineColor);
        }
      });

      $("#clearBtn").on('click', function()
      {
        $("#canvasSeg").clearCanvas();
        $("#canvasSel").clearCanvas();
        fillWhite();
      });
    
      $("#startSegBtn").on('click', function()
      {
        startSegmentation();
      });

    //Clears canvas surface
    
  }

});