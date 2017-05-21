
$('.nano').nanoScroller();

  




$(document).ready(function(){
	
	   /* var inputImage = $('#fileselect');
	      inputImage.on('change',function(e) {
            var files = this.files;
            var file;
            if (this.files && this.files[0] ) {
                file = files[0];
                var FR= new FileReader();

	       		 FR.onload = function(e) {
		             var imgData=e.target.result;
		                   tt=myDataRef.push({
		                    	imgsrc:imgData
		                	});	
		                var objName=readCookie('objname');
						if(!objName){
								createCookie('objname', tt.key(), 365);
						}	             
		         
		        	};       
	       			FR.readAsDataURL( this.files[0] );
            }
        });*/

    //backto 

	/*$('#inputImage').on('change',function(e){
     if ( this.files && this.files[0] ) {
	        var FR= new FileReader();
	        FR.onload = function(e) {
	             var imgData=e.target.result;
	                   tt=myDataRef.push({
	                    	imgsrc:imgData
	                	});
	             
	         
	        };       
	        FR.readAsDataURL( this.files[0] );
    	}
    });*/

	myDataRef.endAt().limitToLast(1).on("value", function(snapshot) {
		var objName=readCookie('objname');
		if(snapshot.val()){
			if(!objName){
				for (first in snapshot.val()) {
					createCookie('objname', first, 365);
					addChild(snapshot,first);
				}
		}
		else{
				addChild(snapshot,objName);
		}	
		}
		
	
	});

	/*myDataRef.on("value", function(snapshot) {
		var notes=[];
		var objName=readCookie('objname');
		if(snapshot.val()){
			$.each(snapshot.val()[objName], function(k, v) {
				if(k!='imgsrc')
	   				 	notes.push(v);
			});
			if($('.image-annotate-canvas').length){
				$('.image-annotate-canvas').first().remove();
				$('.image-annotate-add').remove();
			}			
			$(".cropper-canvas img").annotateImage({
				editable:true,
				useAjax: false,
				notes:notes.reverse()
			});
		}
	});*/
	
});

var addChild=function(snapshot,objName){
	var imgSrcValue='';
		if(!snapshot.val()[objName].iscropped){
			imgSrcValue=snapshot.val()[objName].imgsrc;
			$('.loading').removeClass('hide');
          	$('.image_container').removeClass('hide');
        	$('.drophere').addClass('hide');
        	var imageElement='<img id="image" src="' +imgSrcValue+ '" />';
				$('#initimage').append(imageElement);
						var image = document.getElementById('image');
			          if (image.complete) {
			            start.call(image);
			        } else {
			            image.onload = start;
			        }
		}
		else{
			if(snapshot.val()[objName].appliedfilter!="@"){
				if(snapshot.val()[objName].appliedfilter.indexOf("@@@")>=0){
					var tempString=snapshot.val()[objName].appliedfilter.split('@@@');
					$(tempString[0]).val(tempString[1]).trigger('change');
				}
				else{
					$(snapshot.val()[objName].appliedfilter).trigger('click');
				}
					
				
			}
			else{
				imgSrcValue=snapshot.val()[objName].imgsrc1+snapshot.val()[objName].imgsrc2+snapshot.val()[objName].imgsrc3+snapshot.val()[objName].imgsrc4+snapshot.val()[objName].imgsrc5+snapshot.val()[objName].imgsrc6
				var image=document.getElementById('image'),
				     width = image.offsetWidth,
	        		 height = $( window ).height();
		        canvas.getContext('2d').drawImage(
		            image,
		            0, 0, image.naturalWidth, image.naturalHeight,
		            0, 10, width,image.naturalHeight
		        );
	        $('.image_container').addClass('hide');
                            $('.cropped_image').html(canvas);
                            $('.cropped_image').removeClass('hide');
                            $('.manual_filter').addClass('filter_bg');
                            $('.filters').addClass('filter_bg')
                            $('.bg').hide();
                            
                            var s = document.createElement("script");
                            s.type = "text/javascript";
                            s.src = "assets/js/lib/filter.js";
                            $("body").prepend(s);

                            $('#saveme').on('click', function() {
                                alert("j")
                                Caman('.cropped_image canvas', function() {
                                    this.render(function() {
                                        this.save('png');
                                    });
                                });
                            })

                            if (!download.disabled) {
                                download.href = canvas.toDataURL();
                            }
                            $(canvas).removeClass('cropper-hidden');
			}
			
		}
		
}