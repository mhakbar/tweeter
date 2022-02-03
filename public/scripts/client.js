/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const $inputButton = $('#tweetButton');
  $inputButton.on('click', () => {
    console.log('I got clicked!!!');
    const $tweetMessage = $('.tweet-text');

    const tweetOld = $tweetMessage.val();

    const $li = $('<header>').text(tweetOld);

    $('.tweetOld').append($li); 

    $tweetMessage.val('').focus();

});
})