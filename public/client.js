// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  
  getDreams()

  $('form').submit(function(event) {
    event.preventDefault();
    var dream = $('input').val();
    $.post('/dreams?' + $.param({dream: dream}), function() {
      getDreams()
      $('input').val('');
      $('input').focus();
    });
  });

});

function getDreams() {
   
   $.get('/dreams', function(dreams) {
    $('ul#dreams li').remove();
    dreams.forEach(function(dream) {
      $('<li></li>').text(dream).appendTo('ul#dreams').click(deleteDream);
    });
  }); 
  
}

function deleteDream(ev) {
  var dream = $(ev.target).text()
  $.ajax('/dreams?' + $.param({dream: dream}), {method: 'DELETE', success: function () {
    getDreams ()
  }})
}