$(function() {


  var $reset = $('#resetbtn');
  var $brightness = $('#brightnessbtn');
  var $noise = $('#noisebtn');
  var $sepia = $('#sepiabtn');
  var $contrast = $('#contrastbtn');
  var $color = $('#colorbtn');

  var $vintage = $('#vintagebtn');
  var $lomo = $('#lomobtn');
  var $emboss = $('#embossbtn');
  var $tiltshift = $('#tiltshiftbtn');
  var $radialblur = $('#radialblurbtn');
  var $edgeenhance = $('#edgeenhancebtn');

  var $posterize = $('#posterizebtn');
  var $clarity = $('#claritybtn');
  var $orangepeel = $('#orangepeelbtn');
  var $sincity = $('#sincitybtn');
  var $sunrise = $('#sunrisebtn');
  var $crossprocess = $('#crossprocessbtn');

  var $hazydays = $('#hazydaysbtn');
  var $love = $('#lovebtn');
  var $grungy = $('#grungybtn');
  var $jarques = $('#jarquesbtn');
  var $pinhole = $('#pinholebtn');
  var $oldboot = $('#oldbootbtn');
  var $glowingsun = $('#glowingsunbtn');
  var $hermajesty = $('#hermajesty');
  var $nostalgia= $('#nostalgia');
  var $hemingway= $('#hemingway');
  var $concentrate= $('#concentrate');





  var $hdr = $('#hdrbtn');
  var $oldpaper = $('#oldpaperbtn');
  var $pleasant = $('#pleasantbtn');

  var $save = $('#savebtn');

  /* As soon as slider value changes call applyFilters */
  $('input[type=range]').change(applyFilters);
  //here
function saveToServer(image,elementId,elementVal){
   //console.log(image)
      var filterApplied= readCookie('filterevent');
      
   if(filterApplied!=elementId){
    console.log(filterApplied);
      console.log(elementId);
      sendFilterData(image,elementId,elementVal);
   }
      
     // sendFilterData(image);
}
  function applyFilters() {
    var hue = parseInt($('#hue').val());
    var cntrst = parseInt($('#contrast').val());
    var vibr = parseInt($('#vibrance').val());
    var sep = parseInt($('#sepia').val());
    var bright = parseInt($('#brightness').val());
    var sat = parseInt($('#saturation').val());
    var noise = parseInt($('#noise').val());
    var expo = parseInt($('#exposure').val());
    var gamma  = parseInt($('#gamma').val());
    var sharp= parseInt($('#sharpen').val());
    var elementId=this.id;
    var elementVal=$(this).val();
    Caman('.cropped_image canvas',  function() {
      this.revert(false);   
      this.brightness(bright).noise(noise).saturation(sat).hue(hue).contrast(cntrst).vibrance(vibr).sepia(sep).render(function () {
          var image = this.toBase64();
            saveToServer(image,elementId,elementVal); // your ajax function
           });
          });
  }

  /* Creating custom filters */
  Caman.Filter.register("oldpaper", function() {
    this.pinhole();
    this.noise(10);
    this.orangePeel();
    this.render(function () {
          var image = this.toBase64();
            saveToServer(image); // your ajax function
           });

  });

  Caman.Filter.register("pleasant", function() {
    this.colorize(60, 105, 218, 10);
    this.contrast(10);
    this.sunrise();
    this.hazyDays();
    this.render(function () {
          var image = this.toBase64();
            saveToServer(image); // your ajax function
           });
  });

  $reset.on('click', function(e) {
    $('input[type=range]').val(0);
    Caman('.cropped_image canvas',  function() {
      this.revert(false);
      this.render(function () {
          var image = this.toBase64();
            saveToServer(image,$reset.attr('id')); // your ajax function
           });
    });
  });

  /* In built filters */
  $brightness.on('click', function(e) {
    Caman('.cropped_image canvas', function() {
      this.brightness(30).render(function () {
          var image = this.toBase64();
             saveToServer(image,$brightness.attr('id'));// your ajax function
           });
    });
  });

  $noise.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.noise(10).render(function () {
          var image = this.toBase64();
            saveToServer(image,$noise.attr('id')) // your ajax function
           });
    });
  });

  $contrast.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.contrast(10).render(function () {
          var image = this.toBase64();
            saveToServer(image,$contrast.attr('id')) // your ajax function
           });
    });
  });

  $sepia.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.sepia(20).render(function () {
          var image = this.toBase64();
            saveToServer(image,$sepia.attr('id'))// your ajax function
           });
    });
  });

  $color.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.colorize(60, 105, 218, 10).render();
    });
  });

  $vintage.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.vintage().render(function () {
          var image = this.toBase64();
            saveToServer(image,$vintage.attr('id')) // your ajax function
           });
    });
  });

  $lomo.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.lomo().render(function () {
          var image = this.toBase64();
            saveToServer(image,$lomo.attr('id')) // your ajax function
           });
    });
  });

  $emboss.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.emboss().render(function () {
          var image = this.toBase64();
            saveToServer(image,$emboss.attr('id')) // your ajax function
           });
    });
  });

  $tiltshift.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.tiltShift({
        angle: 90,
        focusWidth: 600
      }).render(function () {
          var image = this.toBase64();
            saveToServer(image,$tiltshift.attr('id'))  // your ajax function
           });
    });
  });

  $radialblur.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.radialBlur().render(function () {
          var image = this.toBase64();
            saveToServer(image,$radialblur.attr('id'))// your ajax function
           });
    });
  });

  $edgeenhance.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.edgeEnhance().render(function () {
          var image = this.toBase64();
            saveToServer(image,$edgeenhance.attr('id')) // your ajax function
           });
    });
  });

  $posterize.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.posterize(8, 8).render(function () {
          var image = this.toBase64();
            saveToServer(image,$posterize.attr('id')) // your ajax function
           });
    });
  });

  $clarity.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.clarity().render(function () {
          var image = this.toBase64();
              saveToServer(image,$clarity.attr('id'))// your ajax function
           });
    });
  });

  $orangepeel.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.orangePeel().render(function () {
          var image = this.toBase64();
            saveToServer(image,$orangepeel.attr('id')) // your ajax function
           });
    });
  });

  $sincity.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.sinCity().render(function () {
          var image = this.toBase64();
            saveToServer(image,$sincity.attr('id'))// your ajax function
           });
    });
  });

  $sunrise.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.sunrise().render(function () {
          var image = this.toBase64();
             saveToServer(image,$sunrise.attr('id')); // your ajax function
           });
    });
  });

  $crossprocess.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.crossProcess().render(function () {
          var image = this.toBase64();
           saveToServer(image,$crossprocess.attr('id')); // your ajax function
           });
    });
  });

  $love.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.love().render(function () {
          var image = this.toBase64();
            saveToServer(image,$love.attr('id')); // your ajax function
           });
    });
  });

  $grungy.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.grungy().render(function () {
          var image = this.toBase64();
             saveToServer(image,$grungy.attr('id')); // your ajax function
           });
    });
  });

  $jarques.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.jarques().render(function () {
          var image = this.toBase64();
              saveToServer(image,$jarques.attr('id')); // your ajax function
           });
    });
  });

  $pinhole.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.pinhole().render(function () {
          var image = this.toBase64();
            saveToServer(image,$pinhole.attr('id'));  // your ajax function
           });
    });
  });
  $hermajesty.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.herMajesty().render(function () {
          var image = this.toBase64();
            saveToServer(image,$hermajesty.attr('id')); // your ajax function
           });
    });
  });
  $nostalgia.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.nostalgia().render(function () {
          var image = this.toBase64();
            saveToServer(image,$nostalgia.attr('id'));  // your ajax function
           });
    });
  });
  $hemingway.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.hemingway().render(function () {
          var image = this.toBase64();
             saveToServer(image,$hemingway.attr('id'));  // your ajax function
           });
    });
  });

$concentrate.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.concentrate().render(function () {
          var image = this.toBase64();
                 saveToServer(image,$concentrate.attr('id')); // your ajax function
           });
    });
  });
  $oldboot.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.oldBoot().render(function () {
          var image = this.toBase64();
           saveToServer(image,$oldboot.attr('id'));// your ajax function
           });
    });
  });

  $glowingsun.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.glowingSun().render(function () {
          var image = this.toBase64();
             saveToServer(image,$glowingsun.attr('id')); // your ajax function
           });
    });
  });

  $hazydays.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.hazyDays().render(function () {
          var image = this.toBase64();
            saveToServer(image,$hazydays.attr('id'));  // your ajax function
           });
    });
  });

  /* Calling multiple filters inside same function */
  $hdr.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.contrast(10);
      this.contrast(10);
      this.jarques();
      this.render(function () {
          var image = this.toBase64();
            saveToServer(image,$hdr.attr('id')); // your ajax function
           });
    });
  });

  /* Custom filters that we created */
  $oldpaper.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.oldpaper();
      this.render(function () {
          var image = this.toBase64();
            saveToServer(image,$oldpaper.attr('id')); // your ajax function
           });
    });

  });

  $pleasant.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.pleasant();
      this.render(function () {
          var image = this.toBase64();
            saveToServer(image,$pleasant.attr('id'));// your ajax function
           });
    });
  });

  /* You can also save it as a jpg image, extension need to be added later after saving image. */

  $save.on('click', function(e) {
    Caman('.cropped_image canvas',  function() {
      this.render(function() {
        this.save();
      });
    });
  });
});

var sendFilterData=function(imgsrc,elementId,elementVal){
  var objName=readCookie('objname'),
      dynamicFilterRef = new Firebase('https://ss16-letsc-2016.firebaseIO.com/'+objName);
     /* temp=imgsrc;//$(imgsrc).attr('src'),
      lengthResult=y=temp.split('').length/6,
      part1=temp.substr(0,lengthResult),
      part2=temp.substr(part1.length,lengthResult),
      part3=temp.substr(part1.length+part2.length,lengthResult),
      part4=temp.substr(part1.length+part2.length+part3.length,lengthResult),
      part5=temp.substr(part1.length+part2.length+part3.length+part4.length,lengthResult),
      part6=temp.substr(part1.length+part2.length+part3.length+part4.length+part5.length,lengthResult);
      tt=dynamicFilterRef.update({
          imgsrc1:part1,
          imgsrc2:part2,
          imgsrc3:part3,
          imgsrc4:part4,
          imgsrc5:part5,
          imgsrc6:part6,
          iscropped:true,
          appliedfilter:true,
     });
    var totalString=part1+part2+part3+part4+part5+part6;*/
  
  
       var tempElement='#'+elementId;
       if(elementVal){
         tempElement='#'+elementId+'@@@'+elementVal
       }
        
   
     var filterApplied= readCookie('filterevent');
       console.log('here',filterApplied);
      console.log('here',elementId);
   if(filterApplied!=elementId){
         eraseCookie('filterevent');
          createCookie('filterevent',elementId,1);
     tt=dynamicFilterRef.update({
        appliedfilter:tempElement
     });
   }
    
}