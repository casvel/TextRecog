$(document).ready(function()
{

	letters = new Array(52);
	for (var i = 0; i < 52; i += 2)
	{
		var x = i/2;
		letters[i]   = x+65;
		letters[i+1] = x+97; 
	}
	letters = shuffleArray(letters);

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

	$('#canvas-'+active_canvas).sketch();

	$("#tLetter").html(String.fromCharCode(letters[0]));
	$('#pag_letters').bootpag({
	  total: 52,
	  maxVisible: 13,
	  leaps: false,
	  firstLastUse: true
	}).on("page", function(event, num)
	{
	  $("#tLetter").html(String.fromCharCode(letters[num-1]));
	  $("#canvas-"+active_canvas).css("display", "none");
	  active_canvas = num-1;
	  $("#canvas-"+active_canvas).css("display", "inline");
	  $('#canvas-'+active_canvas).sketch();
	});

	$("#clearBtn").click(function()
	{
		var canvas = document.getElementById("canvas-"+active_canvas);
    var ctx = canvas.getContext('2d');
    $('#canvas-'+active_canvas).sketch().actions = [];
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	});

	$("#saveBtn").click(function()
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
				$('#success-alert').show().delay(1500).fadeOut();
			else
				$('#fail-alert').show().delay(1500).fadeOut();
		});
	});

});