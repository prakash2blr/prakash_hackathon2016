var myDataRef = new Firebase('https://ss16-letsc-2016.firebaseIO.com');
(function() {

	// getElementById
	function $id(id) {
		return document.getElementById(id);
	}



	// file drag hover
	function FileDragHover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	}


	// file selection
	function FileSelectHandler(e) {

		// cancel event and hover styling
		FileDragHover(e);

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;

		// process all File objects
		for (var i = 0, f; f = files[i]; i++) {
			ParseFile(f);
		}

	}


	// output file information
	function ParseFile(file) {
// display an image
		

          if (/^image\/\w+/.test(file.type)) {
          	$('.loading').removeClass('hide');
          	var reader = new FileReader();
          	$('.image_container').removeClass('hide');
        	$('.drophere').addClass('hide')
          	reader.onload = function(e) {
          		$('#initimage').append('<img id="image" src="' + e.target.result + '" />');
          		var canvas = document.getElementById('canvas');
			        var image = document.getElementById('image');

			        if (image.complete) {
			            start.call(image);
			        } else {
			            image.onload = start;
			        }
   					tt=myDataRef.push({
		                    	imgsrc:e.target.result,
		                    	iscropped:false,
		                    	appliedfilter:"@"
		                	});	
		                var objName=readCookie('objname');
						if(!objName){
								createCookie('objname', tt.key(), 365);
						}
			        
          			}
			reader.readAsDataURL(file);

            
           			

            } else {
              window.alert('Please choose an image file.');
            }
               

	}


	// initialize
	function Init() {

		var fileselect = $id("fileselect"),
			filedrag = $id("filedrag");

		// file select
		fileselect.addEventListener("change", FileSelectHandler, false);

		// is XHR2 available?
		var xhr = new XMLHttpRequest();
		if (xhr.upload) {

			// file drop
			filedrag.addEventListener("dragover", FileDragHover, false);
			filedrag.addEventListener("dragleave", FileDragHover, false);
			filedrag.addEventListener("drop", FileSelectHandler, false);
			filedrag.style.display = "block";

			// remove submit button
		}

	}

	// call initialization file
	if (window.File && window.FileList && window.FileReader) {
		Init();
	}


})();