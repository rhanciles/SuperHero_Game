$(document).ready(function () {
    $('#computerCards').animate({
        height: '5%',
        width: '5%',
        left: '16rem'
    }, 
    {    
        duration: 10,
        complete: function () {
            $(this).animate({
                height: '100%',
                width: '100%',
                left: ''
            }, 1400, "linear",

            );
        },

    });

    $('#playerCards').animate({
        height: '5%',
        width: '5%'
    }, 
    {    
        duration: 10,
        complete: function () {
            $(this).animate({
                height: '100%',
                width: '100%'
            }, 1400, "linear",

            );
        },

    });

    $('#00').animate({
        height: '2%',
        width: '2%',
        fontSize: '1%',
        left: '16rem'
    }, 
    {    
        duration: 10,
        complete: function () {
            $(this).animate({
                height: '3.2rem',
                width: '100%',
                fontSize: '100%',
                left: ''
            }, 1400,
            
            );

        },

    });


});