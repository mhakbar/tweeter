/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */





// Test / driver code (temporary). Eventually will get this from the server.
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

$(document).ready(() => {


  const createTweetElement = (tweet) => {
    
  

  const $tweet = $(`<article class="tweetOutline"></article>`);
  $tweet.append(`<header class="tweetHeader">
  <div class="nameAvatar">
  <img src="${tweet.user.avatars}"/>
  <span id="name">${tweet.user.name}</span>
</div>
  <span>${tweet.user.handle}</span>
</header>
<p>${tweet.content.text}</p>
<footer class="tweetFooter">
  <h4>${timeago.format(tweet.created_at)}</h4>
  <span class="tweetIcons">
    <i class="fa fa-flag" idtweetObjg"></i>
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

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    const tweetElement = createTweetElement(tweet);
    $('#tweetContainer').append(tweetElement);

  }
}
//renderTweets(data);

// $(() => {
  const $inputButton = $('#submit-tweet');
  

    
  
  
  $('#submit-tweet').on('submit', () => {
    event.preventDefault();
    //console.log("random text");
    const tweetPost = document.forms[0][0].value;

  if (tweetPost.length > 140) {
    alert("Exceeding");
  } else if (!tweetPost) {
    alert("empty");
  }else {
    const serial = $('#submit-tweet').serialize();
    console.log(serial);

    $.post ("/tweets", serial, ).then(loadTweets);

    }
    
    //renderTweets(data);
  })
// });

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (indexHTML) {
      console.log('Success: ', renderTweets(indexHTML));
      //renderTweets(data);

})

}
loadTweets();

});

// const loadTweets = () => {
//   $.ajax({
//     type: "GET",
//     url: "http://localhost:8080/tweets/",
//     success: (data) => {
//       renderTweets(data);
//     },
//   });
// };

