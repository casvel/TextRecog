$(document).ready(function()
{

	console.log("letters: " + active_canvas);

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
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
	}


	$("#tLetter").html(String.fromCharCode(letters[0]));
	$('#pag_letters').bootpag({
	  total: 52,
	  maxVisible: 10,
	  leaps: false,
	  firstLastUse: true
	}).on("page", function(event, num)
	{
	  $("#tLetter").html(String.fromCharCode(letters[num-1]));
	  $("#canvas-container"+active_canvas).css("display", "none");
	  active_canvas = num-1;
	  $("#canvas-container"+active_canvas).css("display", "inline");
	});

	$("#saveBtn").click(function()
	{
		var canvas  = document.getElementById("canvas");
		var dataURL = canvas.toDataURL();

		$.ajax(
		{
		  type: "POST",
		  url: "/save/letter/A",
		  data: { image: dataURL }
		}).done(function(res)
		{
			console.log("saved");
		});
	});

});