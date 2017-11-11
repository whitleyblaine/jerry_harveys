$('.list li').on('click', function() {
  var imgSrc;
  var newImage;
  var menu = $(this).data('menu');
  var numberOfMenus = parseInt($(this).data('num'));

  $('.main-content').html('');

  console.log(numberOfMenus);

  for (i = 1; i <= numberOfMenus; i++) {
    numberOfMenus > 1 ? imgSrc = "./assets/images/" + menu + "-" + i + ".png" : imgSrc = "./assets/images/" + menu + ".png";
    newImage = "<img src='" + imgSrc + "' style='margin-top: 2em' class='menuImage'></img>";
    $('.main-content').append(newImage);
  }
})