$(function() {
	$('.tooltips,.post-body').tooltip({selector:"[data-toggle=tooltip]",container:"body"});

  // animate scroll on reference links
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        && location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 70 //offsets for fixed header
        }, 250);
        return false;
      }
    }
    return true;
  });
});

if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style');
        msViewportStyle.appendChild(
                document.createTextNode(
                    '@-ms-viewport{width:auto!important}'
                    )
                );
        document.querySelector('head').appendChild(msViewportStyle);
}

$('.projects').isotope({
  itemSelector: '.project'
});
