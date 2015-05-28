$(document).ready(function(){

//SKILLS ANIMATION TRIGGER
  //Check if skills div is in viewport
  $('.skills').viewportChecker({
    //animate skills div
    classToAdd: 'skills-animate',
    offset: 100
  });

  //NAVIGATION
  //Check width on resize
  $(window).on('resize', function(){
    winWidth = $(window).innerWidth();
    //add responsive menu button
    addButton(winWidth);
  });
  //check window width on load
  var winWidthOnLoad = $(window).innerWidth();
  //add responsive menu button
  addButton(winWidthOnLoad);

  function addButton(winWidth){
    if (winWidth < 850){
      $('.responsive-menu-btn').fadeIn();
      $('.nav-menu').hide();
    } else {
      $('.responsive-menu-btn').hide();
      $('.nav-menu').show();
    }
  }

  //toggle menu on click
  $('.responsive-menu-btn a').on('click', function(e){
      e.preventDefault();
      $('.nav-menu').toggle();
    });


  //SCROLL TO TO DIV CONTROLS
  $('.nav-menu a , .slide-down').on('click',function(e){
    e.preventDefault();
    scrollTo($(this));
  });

  function scrollTo(button){
    var hash = button.attr('href');
    var pos = $(hash).offset();
    $('html, body').animate({scrollTop: pos.top}, "slow");
  }


  //OVERLAY

  var overlay = $('.overlay');
  var exitBtn = $('.close-overlay');
  //hide overlay on click
  exitBtn.on('click', function(e){
    e.preventDefault();
    overlay.fadeOut();
    $('.main-wrapper').css('opacity', 1);
    overlay.addClass('not-showing');
    overlay.removeClass('showing');
  });
  //show overlay on click
  $('a.project').on('click', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    ajaxRequest(href);
    var winPos = $(window).scrollTop();
    winPos += 10;
    overlay.css('top', winPos);
    overlay.fadeIn();
    $('.main-wrapper').css('opacity', 0.1);
    overlay.removeClass('not-showing')
    overlay.addClass('showing');
  });
  //hide overlay on click outside overlay div
  $('.main-wrapper').on('click', function (e) {
     var el = e.target;
     if ($(el).parent().hasClass('project') === false && $(el).hasClass('button') === false){
       overlay.removeClass('showing').fadeOut();
       $('.main-wrapper').css('opacity', 1);
     }
  });

  //get data for clicked project
  function ajaxRequest(href){
    $.getScript('projects.js', function(response){
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

  function buildProject(project){
    $('.o-content h2').html('<h2>' + project.project_name + '</h2>');
    $('.o-content p').html('<p>' + project.project_description + '</p>');
    $('.overlay .button').attr('href', project.project_url );
    $('.o-img img').attr('src', project.project_img);
  }

  function setArrow(next, previous){
    if (! next) {
      $('.next-arrow').hide();
      $('.prev-arrow').fadeIn().attr('href', previous.id);
    } else if (! previous){
      $('.prev-arrow').hide();
      $('.next-arrow').fadeIn().attr('href', next.id);
    } else {
      $('.prev-arrow').fadeIn().attr('href', previous.id);
      $('.next-arrow').fadeIn().attr('href', next.id);
    }
  }

  $('.prev-arrow , .next-arrow').on('click', function(e){
    e.preventDefault();
    var href = $(this).attr('href');
    ajaxRequest(href);
  });



});
