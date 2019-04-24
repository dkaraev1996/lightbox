
  $(document).ready(() => {
    // $(document).ready(function() {

    $('#slideshow').append('<div class="overlay"></div>')
    $('.overlay').append('<div id = "controls"></div>')
    $('#controls').append('<div id = "lb" class = "controlButton"><img src="arrowLeft.png"></div>')
    $('#controls').append('<div id = "rb" class = "controlButton"><img src="arrowRight.png"></div>')
    $('#controls').append('<div id = "cap"></div>')
    //need to make sure z-index of controls keeps it on top
    $('.overlay').hide()

    $('p.pic').click(function(e){
      e.preventDefault()
      const imagePath = $(this).children('a').attr('href')
      $('#cap').html($(this).children('a').attr('title'))

      $('.overlay').append('<img src = "' + imagePath + '" class = "big">')
      $('.big').on('load', function(){
        resizeImage()
        //use the size data from the image to postition the controls
        // $('#controls').css('width', $('.big').width())
        // $('#cap').css({
        //   width: $('.big').width(),
        //   top: $('.big').height()/2 - $('#cap').height() + $('.controlButton').height()/2
        // })//end css stuff
      })//end load image


      $('.overlay').fadeIn('slow')

    })//end pic click

    $('.overlay').click(function(e){
      clearBigImage()
    })//end click overlay

    const pathList = []
    const titleList = []
    const totalImages = $('#slideshow .pic').length
    for (let i = 0; i < totalImages; i++){
      pathList[i] = $('#slideshow a').eq(i).attr('href')
      titleList[i] = $('#slideshow a').eq(i).attr('title')
    }
    let currentImageNumber

    $('#lb').click(function(e){
      e.preventDefault()
      e.stopPropagation()
      currentImageNumber = pathList.indexOf($('.big').attr('src'))
      currentImageNumber--
      if (currentImageNumber >= 0) {
        updateImageAndTitle()
      } else {
        clearBigImage()
      }
    })//end lb click

    $('#rb').click(function(e){
      e.preventDefault()
      e.stopPropagation()
      currentImageNumber = pathList.indexOf($('.big').attr('src'))
      currentImageNumber++
      if (currentImageNumber < totalImages) {
        updateImageAndTitle()
      } else {
        clearBigImage()
      }
    })//end rb click

    function updateImageAndTitle(){
      //update image
      $('.big, #controls').fadeOut(500, function(){
        $('.big').attr('src', pathList[currentImageNumber])
        $('#cap').html(titleList[currentImageNumber])
      })
      $('.big, #controls').fadeIn(500)
    }//end updateImageAndTitle

    function clearBigImage(){
      $('.overlay').fadeOut('slow')
      $('.big').remove()
    }//end clearBigImage

    $(window).resize(function(){
      resizeImage()
    })

    function resizeImage(){
      $('.big').css('width', "")
      $('.big').css('height', "")

      const cHeight = $(window).height()
      const cWidth = $(window).width()
      const iHeight = $('.big').height()
      const iWidth = $('.big').width()
      let ratio = 1

      let newHeight;
      let newWidth;

      if (iHeight >= iWidth){
        //image is portrait
        newHeight = cHeight * 0.9
        ratio = cHeight / iHeight
        newWidth = iWidth * ratio
      if (newWidth > cWidth * 0.9) {
        ratio = cWidth / newWidth
        newWidth = cWidth = 0.9
        newHeight *= ratio
      }
    } else if (iHeight < iWidth){
        //image is landscape
        newWidth = cWidth * 0.9
        ratio = cWidth / iWidth
        newHeight = iHeight * ratio
      if (newHeight > cHeight * 0.9) {
          ratio = cHeight / newHeight
          newHeight = cHeight * 0.9
          newWidth *= ratio
        }
      } else {
        console.log("Something went wrong during resize");
      }
      $('.big').css({
        height: newHeight,
        width: newWidth
      })
      $('#controls').css('width', newWidth)
      $('#cap').css({
        top: newHeight / 2 - $('#cap').height() + $('.controlButton').height()/2,
        width: newWidth
    })
  }
  }) //end ready
