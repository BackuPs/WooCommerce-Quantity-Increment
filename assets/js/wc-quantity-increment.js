/*! Woocommerce Quitity Spinners JS version 1.20 */

jQuery( function( $ ) {

	if ( ! String.prototype.getDecimals ) {
		String.prototype.getDecimals = function() {
			var num = this,
				match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
			if ( ! match ) {
				return 0;
			}
			return Math.max( 0, ( match[1] ? match[1].length : 0 ) - ( match[2] ? +match[2] : 0 ) );
		}
	}

	function wcqi_refresh_quantity_increments(){
		$('div.quantity input[id^=quantity_].qty, td.quantity input[id^=quantity_].qty').each(function() {
			var parent = $(this).parent('div.quantity, td.quantity');
			if (typeof parent!=undefined && !parent.hasClass('.buttons_added')) {
				var type=$(this).attr('type');
				if (typeof type!=="undefined" && type!== 'hidden' || typeof type==="undefined") {
					if (!parent.hasClass('.buttons_added')) {
					  parent.addClass( 'buttons_added' ).append( '<input type="button" value="+" class="plus" />' ).prepend( '<input type="button" value="-" class="minus" />');
					}
				}
			}
		});
	}

	$( document ).on( 'updated_wc_div', function() {
		wcqi_refresh_quantity_increments();
	} );

	$( document ).on( 'cart_page_refreshed', function() {
		wcqi_refresh_quantity_increments();
	});

	$( document ).on( 'click', '.plus, .minus', function() {
		// Get values
		var $qty		= $( this ).closest( '.quantity' ).find( '.qty'),
			currentVal	= parseFloat( $qty.val() ),
			max			= parseFloat( $qty.attr( 'max' ) ),
			min			= parseFloat( $qty.attr( 'min' ) ),
			step		= $qty.attr( 'step' );

		// Format values
		if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
		if ( max === '' || max === 'NaN' ) max = '';
		if ( min === '' || min === 'NaN' ) min = 0;
		if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;

		// Change the value
		if ( $( this ).is( '.plus' ) ) {
			if ( max && ( currentVal >= max ) ) {
				$qty.val( max );
			} else {
				$qty.val( ( currentVal + parseFloat( step )).toFixed( step.getDecimals() ) );
			}
		} else {
			if ( min && ( currentVal <= min ) ) {
				$qty.val( min );
			} else if ( currentVal > 0 ) {
				$qty.val( ( currentVal - parseFloat( step )).toFixed( step.getDecimals() ) );
			}
		}

		// Trigger change event
		$qty.trigger( 'change' );
	});

	wcqi_refresh_quantity_increments();
});
