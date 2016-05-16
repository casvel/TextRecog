$(document).ready(function() 
{
  var canvasSeg = document.getElementById("canvasSeg");
  var canvasSel = document.getElementById("canvasSel");
  var canvasRes = document.getElementById("canvasRes");

  var rectOffset = 0;
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

  $("#canvasSeg").sketch();

  //Draws selection rectangle for segmentation
  function moveSelection()
  {
    var ctx_canvasSel = canvasSel.getContext("2d");   
    var ctx_canvasRes = canvasRes.getContext("2d");        
    

    ctx_canvasSel.clearRect(0, 0, canvasSel.width, canvasSel.height);
    ctx_canvasSel.fillStyle = "rgba(0, 255, 0, 0.2)";
    ctx_canvasSel.fillRect(rectOffset, 0, canvasRes.width, canvasRes.height); 

    ctx_canvasRes.clearRect(0, 0, canvasRes.width, canvasRes.height);
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


  $("#clearSegBtn").click(function()
  {
    if ($(this).attr("disabled") === "disabled")
      return;

    var ctx = canvasSeg.getContext('2d');
    $("#canvasSeg").sketch().actions = [];
    ctx.clearRect(0, 0, canvasSeg.width, canvasSeg.height);
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