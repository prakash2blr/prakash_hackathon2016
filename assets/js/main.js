
$('.nano').nanoScroller();
    var cropper;
    // Import image

    var blobURL;
  



  function start() {
        var width = this.offsetWidth;
        var height = $( window ).height();


        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(
            this,
            0, 0, this.naturalWidth, this.naturalHeight,
            0, 75, width,this.naturalHeight
        );

        cropper = new Cropper(canvas, {
            dragMode: 'move',
            // viewMode: 0,
            minCanvasHeight: 90
                // autoCrop:false
        });

        $('#image').hide()
        setTimeout(function() {
            $('.loading').hide();

        }, 1000)

        var actions = document.getElementById('actions');
        actions.querySelector('.docs-buttons').onclick = function(event) {
            var e = event || window.event;
            var target = e.target || e.srcElement;
            var result;
            var input;
            var data;

            if (!cropper) {
                return;
            }

            while (target !== this) {
                if (target.getAttribute('data-method')) {
                    break;
                }

                target = target.parentNode;
            }

            if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
                return;
            }

            data = {
                method: target.getAttribute('data-method'),
                target: target.getAttribute('data-target'),
                option: target.getAttribute('data-option'),
                secondOption: target.getAttribute('data-second-option')
            };

            if (data.method) {
                if (typeof data.target !== 'undefined') {
                    input = document.querySelector(data.target);

                    if (!target.hasAttribute('data-option') && data.target && input) {
                        try {
                            data.option = JSON.parse(input.value);
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                }

                if (data.method === 'getCroppedCanvas') {
                    data.option = JSON.parse(data.option);
                }

                result = cropper[data.method](data.option, data.secondOption);

                switch (data.method) {
                    case 'scaleX':
                    case 'scaleY':
                        target.setAttribute('data-option', -data.option);
                        break;

                    case 'getCroppedCanvas':
                        if (result) {


                            // Bootstrap's Modal
                            // $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
                            $('.image_container').addClass('hide');
                            $('.cropped_image').html(result);
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
                                download.href = result.toDataURL();
                            }
                            var objName=readCookie('objname');
								if(!objName){
									createCookie('objname', tt.key(), 365);
								}
							objName=readCookie('objname');
                            var dynamicRef = new Firebase('https://ss16-letsc-2016.firebaseIO.com/'+objName);
                            //some nonsense
                            var temp=result.toDataURL();
                            var lengthResult=y=temp.split('').length/6,
                            	part1=temp.substr(0,lengthResult),
                            	part2=temp.substr(part1.length,lengthResult),
                            	part3=temp.substr(part1.length+part2.length,lengthResult),
                            	part4=temp.substr(part1.length+part2.length+part3.length,lengthResult),
                            	part5=temp.substr(part1.length+part2.length+part3.length+part4.length,lengthResult),
                            	part6=temp.substr(part1.length+part2.length+part3.length+part4.length+part5.length,lengthResult);
						        tt=dynamicRef.update({
	                    		imgsrc1:part1,
	                    		imgsrc2:part2,
	                    		imgsrc3:part3,
	                    		imgsrc4:part4,
	                    		imgsrc5:part5,
	                    		imgsrc6:part6,
	                    		iscropped:true
	                		});
                        }

                        break;

                    case 'destroy':
                        cropper = null;
                        break;
                }

                if (typeof result === 'object' && result !== cropper && input) {
                    try {
                        input.value = JSON.stringify(result);
                    } catch (e) {
                        console.log(e.message);
                    }
                }

            }
        };

        $('[data-toggle="tooltip"]').tooltip();

    }
$(document).ready(function(){
	eraseCookie('objname');
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
    $('#backto').click(function(e) {
        $('.image_container').removeClass('hide');
        $('.cropped_image').addClass('hide');
        $('.bg').show();
        $('.manual_filter').removeClass('filter_bg');
        $('.filters').removeClass('filter_bg')
    })
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
		myDataRef.endAt().limitToLast(1).on("value", function(snapshot) {
			if(snapshot.val()){
				var objName=readCookie('objname'),
				 imgSrcValue='';
						if(!objName){
							$.each(snapshot.val(),function(i,w){
								createCookie('objname',i, 365);
							});
								
						}	
                objName=readCookie('objname');
                if(snapshot.val()[objName].hasOwnProperty('iscropped')){
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
                            if(snapshot.val()[objName].iscropped){
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
			}
				
		});
});
