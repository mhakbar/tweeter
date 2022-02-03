$(document).ready(function() {
  // --- our code goes here ---



  $('textarea').on("input", function() {

    // display correct number in counter
    // get the right number from something
    const characters = 140 - $(this).val().length;
    const counter = $('.counter')[0];

    if (characters < 0) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "black");
    }

    counter.innerText = characters;
    
    
    
    // apply that number

  });
  
});

// https://api.jquery.com/on/

