$(function(){  
  shuffleDeck();

 
  $('.info').on('click', function(){
    $('#infoBox').show()
  })

  $('.discard').on('click', function(){
    $('#discardModal').show();
  });

  $('.project').on('click', function(){
    $('#projectInfo').show();
  })


  $('.modal').on('click', function(){
    $('.modal').hide();
  })

  $(window).resize(function(){
    $('table').height("100%")
    $('table').width("100%")
  })

  $('.playerHand img.card').draggable({
    containment: $('table'),
    stack: $('img.card'),
    snap: "#playfield",
    start: startDragging
  });  

  

  $('#playfield').droppable({
    drop: handleDropEvent
  })






})
