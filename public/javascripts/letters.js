$(document).ready(function()
{

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

  letters = new Array(26);
	for (var i = 0; i < 26; i++)
		letters[i] = i+97; 
	letters = shuffleArray(letters);

	$("#tLetter").html(String.fromCharCode(letters[0]));
	$('#pag_letters').bootpag({
	  total: 26,
	  maxVisible: 13,
	  leaps: false,
	  firstLastUse: true
	}).on("page", function(event, num)
	{
	  $("#tLetter").html(String.fromCharCode(letters[num-1]));
	  $("#canvas-"+active_canvas).css("display", "none");
	  active_canvas = num-1;
	  $("#canvas-"+active_canvas).css("display", "inline");
	});


	function shuffleArray(array) 
	{
    for (var i = array.length - 1; i > 0; i--) 
    {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
	}

  /* To fill the canvas with white */
  function fillWhite(i)
  {
    var plain_canvas = document.getElementById("canvas-"+i);
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

  function initCanvas()
  {
    for (var i = 0; i < 26; i++)
    {
      fillWhite(i);
      canvas = $("#canvas-"+i);
      
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
    }
  }

  $("#clearBtn").on('click', function()
  {
    $("#canvas-"+active_canvas).clearCanvas();
    fillWhite(active_canvas);
  });

	
	$('#saveBtn').click(function()
	{	
		var canvas  = document.getElementById("canvas-"+active_canvas);						
		var dataURL = canvas.toDataURL();
		var letter = $("#tLetter").text();

		$.ajax(
		{
		  type: "POST",
		  url: "/save/letter/"+letter,
		  data: { image: dataURL }
		}).done(function(res)
		{			
			if (res == "Success")
			{
				$('#success-alert').show().delay(1500).fadeOut();
				$("li.next").trigger("click");
			}
			else
				$('#fail-alert').show().delay(1500).fadeOut();
		});
	});

});