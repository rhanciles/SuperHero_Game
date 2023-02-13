$('.toggle').on('click', function() {
    $('.fxmenu').toggleClass('expanded');  
    $('span').toggleClass('hidden');  
    $('.fxcontainer , .toggle').toggleClass('close');  
  });