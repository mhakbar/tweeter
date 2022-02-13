/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */







$(document).ready(() => {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const createTweetElement = (tweet) => {



    const $tweet = $(`<article class="tweetOutline"></article>`);
    $tweet.append(`<header class="tweetHeader">
  <div class="nameAvatar">
  <img src="${tweet.user.avatars}"/>
  <span id="name">${tweet.user.name}</span>
</div>
  <span>${tweet.user.handle}</span>
</header>
<p>${escape(tweet.content.text)}</p>
<footer class="tweetFooter">
  <h4>${timeago.format(tweet.created_at)}</h4>
  <span class="tweetIcons">
    <i class="fa fa-flag" id="flag"></i>
    <i class="fa fa-retweet" id="retweet"></i>             
    <i class="fa fa-heart" id="heart"></i>
  </span>
</footer>`)
    return $tweet;
  };


  // const $tweet = createTweetElement(tweetData);
  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elem
  // $('#tweetContainer').append($tweet);

  const renderTweets = function (tweets) {
    $('#tweetContainer').empty();
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $('#tweetContainer').prepend(tweetElement);

    }
  }
  //renderTweets(data);

  // $(() => {
  const $inputButton = $('#submit-tweet');


  $('#submit-tweet').on('submit', function (event) {
    event.preventDefault();
    const formdata = $("#submit-tweet");

    if (formdata === null) {
      $(".alert-tweet-blank").slideDown();
      return;

    }

    //console.log("random text");
    const tweetPost = $(this).find("#tweet-text").val();

    if (tweetPost.length > 140) {
      // alert("Exceeding");
      $('.alert-char-exceeding').show();
      setTimeout(() => {
        $('.alert-char-exceeding').fadeOut('fast');
      }, 3000);
    } else if (!tweetPost) {
      // alert("empty");
      $('.alert-tweet-blank').show();
      setTimeout(() => {
        $('.alert-tweet-blank').fadeOut('fast');
      }, 3000)
    } else {
      const serial = $(this).serialize();
      console.log(serial);

     

      $.post("/tweets", serial,).then(function() {loadTweets();
        formdata[0].reset();
        $(".counter").val(140);
      })

    }

    //renderTweets(data);
  })
  // });

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (indexHTML) {
        console.log('Success: ', renderTweets(indexHTML));
        //renderTweets(data);

      })

  }
  $('.alert-char-exceeding').hide();
  $('.alert-tweet-blank').hide();
  loadTweets();

  //Scroll-to-top button
  $(window).scroll(() => {
    if ($(this).scrollTop()) {
      $('#to-top-btn').fadeIn();
    } else {
      $('#to-top-btn').fadeOut();
    }
  });

  $("#to-top-btn").on('click', () => {
    $(window).scrollTop(0);
  });


});




