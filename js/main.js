
//NAV

$(window).on('resize', function(){
  winWidth = $(window).innerWidth();
  addButton(winWidth);
});

var winWidthOnLoad = $(window).innerWidth();

if (winWidthOnLoad < 750){
  $('.responsive-menu-btn').show();
  $('.nav-menu').hide();
} else {
  $('.responsive-menu-btn').hide();
  $('.nav-menu').show();
}

function addButton(winWidth){
  if (winWidth < 750){
    $('.responsive-menu-btn').fadeIn();
    $('.nav-menu').hide();
  } else {
    $('.responsive-menu-btn').hide();
    $('.nav-menu').show();
  }
}

$('.responsive-menu-btn a').on('click', function(e){
    e.preventDefault();
    $('.nav-menu').toggle();
  });

//NAV CONTROLS

$('.nav-menu a').on('click',function(e){
  e.preventDefault();
  scrollTo($(this));
});

$('.slide-down').on('click',function(e){
  e.preventDefault();
  scrollTo($(this));
});


function scrollTo(button){
  var hash = button.attr('href');
  var pos = $(hash).offset();
  $('html, body').animate({scrollTop: pos.top}, "slow");
}





var overlay = $('.overlay');
var exitBtn = $('.close-overlay');


exitBtn.on('click', function(e){
  e.preventDefault();
  overlay.fadeOut();
  $('.main-wrapper').css('opacity', 1);
  overlay.addClass('not-showing');
});

$('a.project').on('click', function(e){
  e.preventDefault();
  var href = $(this).attr('href');
  ajaxRequest(href);
  var winPos = $(window).scrollTop();
  winPos += 10;
  overlay.css('top', winPos);
  overlay.fadeIn();
  $('.main-wrapper').css('opacity', 0.1);
  overlay.addClass('showing');
});

$('.main-wrapper').on('click', function (e) {
   var el = e.target;
   if ($(el).parent().hasClass('project') === false && $(el).hasClass('button') === false){
     overlay.fadeOut();
     $('.main-wrapper').css('opacity', 1);
   }

});


function ajaxRequest(href){
  $.get('projects.json', function(response){
    for (var i = 0; i < response.length; i++){
      if (response[i].id === href) {
        buildProject(response[i]);
        var next = response[i + 1];
        var previous = response[i - 1];
        setArrow(next, previous);
      }
    }
  });
}

function setArrow(next, previous){
  if (! next) {
    $('.next-arrow').hide();
    $('.prev-arrow').fadeIn();
    $('.prev-arrow').attr('href', previous.id);
  } else if (! previous){
    $('.prev-arrow').hide();
    $('.next-arrow').fadeIn();
    $('.next-arrow').attr('href', next.id);
  } else {
    $('.prev-arrow').fadeIn();
    $('.next-arrow').fadeIn();
    $('.prev-arrow').attr('href', previous.id);
    $('.next-arrow').attr('href', next.id);
  }


}

function buildProject(project){
  var pName = project.project_name;
  var pURL = project.project_url;
  var pImg = project.project_img;
  var pDesc = project.project_description;
  $('.o-content h2').replaceWith('<h2>' + pName + '</h2>');
  $('.o-content p').replaceWith('<p>' + pDesc + '</p>');
  $('.o-content .button').attr('href', pURL );
  $('.o-img img').attr('src', pImg);
}

$('.prev-arrow').on('click', function(e){
  e.preventDefault();
  var href = $(this).attr('href');
  ajaxRequest(href);
});

$('.next-arrow').on('click', function(e){
  e.preventDefault();
  var href = $(this).attr('href');
  ajaxRequest(href);
});
