import $ from 'jquery';

$(document).ready(function() {
  expandCard();
  clickArticle();
});


function expandCard() {
  $('.cluster').click(function(e) {
    // card already showing
    const show = !$(this).hasClass('selected');
    // reset all other cards
    $('.card-expand').hide();
    $('.card').addClass('span');
    $('.card').removeClass('full-span');
    $('.card').removeClass('selected')
    // show this card
    if (show) {
      $(this).children('.card-expand').show();
      $(this).toggleClass('full-span');
      $(this).toggleClass('span');
      $(this).toggleClass('selected');
    }
  });
}


export function clickArticle() {
  $('.article').click(function(e) {
    e.stopPropagation();
    var win = window.open(e.target.id, '_blank');
    win.focus();
  });
}

