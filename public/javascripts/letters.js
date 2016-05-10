$(document).ready(function()
{

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