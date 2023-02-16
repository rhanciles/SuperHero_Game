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

	var duration = 0;
	var compBtns = ['#00', '#11', '#22', '#33', '#44', '#55'];
	for (i = 0; i < compBtns.length; i++) {
		duration += 0.5
		$(compBtns[i]).animate({
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
				},  140 * duration++,
				
				);

			},

		});

	};

	var userBtns = ['#0', '#1', '#2', '#3', '#4', '#5'];
	for (j = 0; j < compBtns.length; j++) {
		duration += 0.5
		$(userBtns[j]).animate({
			height: '2%',
			width: '2%',
			left: '16rem',
			fontSize: '1%'
		}, 
		{    
			duration: 10,
			complete: function () {
				$(this).animate({
					height: '3.2rem',
					width: '100%',
					fontSize: '100%',
					left: ''
				},  140 * duration++,
				
				);

			},

		});

	};

	$('#letsPlay').animate({
		// width: '2%',
		opacity: '0',
		fontSize: '1%'
	}, 
	{    // options parameter 
		duration: 10,
		complete: function () {
			$(this)
			// .animate({ width: '100%'}, 1400 )
			.animate({ opacity: '1'}, 2200 )
			.animate({ fontSize: '100%'}, 1000 );
				
			}
			
		}

	);

	$('#startOver').animate({
		width: '2%',
		height: '2%',
		fontSize: '1%'
	}, 
	{    // options parameter 
		duration: 10,
		complete: function () {
			$(this)
			.animate({ width: '100%'}, 1200 )
			.animate({ height: '3.2rem'}, 600 )
			.animate({ fontSize: '100%'}, 1400 );
				
			}
			
		}

	);

	$('#fetchData').animate({
		width: '2%',
		height: '2%',
		fontSize: '1%'
	}, 
	{    // options parameter 
		duration: 10,
		complete: function () {
			$(this)
			.animate({ width: '100%'}, 1200 )
			.animate({ height: '3.2rem'}, 600 )
			.animate({ fontSize: '100%'}, 1400 );
				
			}
			
		}

	);
    
    $('#introCard').animate({
        marginTop: '-44rem'
      }, 
       2000);

       $("#letsPlay").on("click", function(event) {

            $('#introCard').animate({
                marginTop: '-180rem'
            }, 
            2000);

	});
    

});