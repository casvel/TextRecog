$(document).ready(function() 
{
  var canvas = $("#canvasSeg");
  var canvasSeg = document.getElementById("canvasSeg");
  var canvasSel = document.getElementById("canvasSel");
  var canvasRes = document.getElementById("canvasRes");
  var word = document.getElementById("tText");

  var rectOffset = 0;
  var lineColor = '#333';
  var lineWidthVal = 4;
  var wordNum = Math.floor((Math.random() * 20) + 0);


  var isMouseDown = false;

  var pos = {
    x: 0,
    y: 0
  };
  var lastPos = {
    x: 0,
    y: 0
  };
  var words = ['house', 'life',
    'girl', 'world',
    'dance', 'secret',
    'star', 'sailor',
    'real', 'free',
    'drive', 'music',
    'moon', 'hello',
    'light', 'bed',
    'beach', 'muse',
    'ocean', 'sun'
  ]
  
  word.innerHTML = words[wordNum];
  fillWhite(canvasSeg);

  /* To fill the canvas with white */
  function fillWhite(canvas)
  {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);    
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
  function moveSelection()
  {
    var ctx_canvasSel = canvasSel.getContext("2d");   
    var ctx_canvasRes = canvasRes.getContext("2d");        
    
    ctx_canvasSel.clearRect(0, 0, canvasSel.width, canvasSel.height);
    ctx_canvasSel.fillStyle = "rgba(0, 255, 0, 0.2)";
    ctx_canvasSel.fillRect(rectOffset, 0, canvasRes.width, canvasRes.height); 

    ctx_canvasRes.drawImage(canvasSeg, rectOffset, 0, canvasRes.width, canvasRes.height, 0, 0, canvasRes.width, canvasRes.height);
    rectOffset += 10;
  }

  $('.decSegBtn').click(function()
  {
    if ($(this).attr("disabled") === "disabled")
      return;
 
    var dataURL = canvasRes.toDataURL();  
    var id = this.id;    

    $.ajax(
    {
      type: "POST",
      url: "/save/segmentation/" + (id.match("^yes") ? "yes" : "no"),                              
      data: { image: dataURL }
    }).done(function(res)
    {     
      if (res == "Success")
        $('#success-alert').show().delay(1500).fadeOut();
      else
        $('#fail-alert').show().delay(1500).fadeOut();
    });

    if (rectOffset + canvasRes.width > canvasSeg.width)
    {
      $('.decSegBtn').attr( "disabled", true );
      $('#finish-alert').show().delay(1500).fadeOut();
      return;
    }

    moveSelection();  
  });

  /*  
  ** PAINTING FUNCTIONALITY **
  */
  
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

  $("#clearBtn").click(function()
  {
    if ($(this).attr("disabled") === "disabled")
      return;

    canvas.clearCanvas();
    fillWhite(canvasSeg);
  });

  $("#startSegBtn").click(function()
  {
    if ($(this).attr("disabled") === "disabled")
      return;


    $(this).attr( "disabled", true );
    $("#clearBtn").attr( "disabled", true );
    $('.decSegBtn').attr( "disabled", false );
    var position = $("#canvasSeg").position();
    $("#canvasSel").css({position:"absolute", top:position.top, left:position.left});
    $("#canvasSel").show();

    moveSelection(); 
  });

});