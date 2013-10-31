var map;
var markers = [];

$(function(){
	map = '<img src="http://maps.googleapis.com/maps/api/staticmap?center=10010&zoom=13&size=1000x1000&sensor=false">';
	$('#map_div').append(map);
	
	$('#button').on('click', function(e){
		e.preventDefault();
		var zipcode = $('#zipcode').val();
		var url = "https://api.foursquare.com/v2/venues/explore?client_id=RJSWD24SW0YBT3ARBT3UES4HFRZCE5XZR5HPN0MIC11KJXDX&client_secret=AARRX54N1DZKWZ5SPOJ3QPCDUJD2XN4TT0BJAIRUVI51DUSS&near=" + zipcode + "&limit=5&categoryId=4bf58dd8d48988d1c9941735";
		$.ajax({
			url: url,
			method: 'GET',
			dataType: 'json'
		}).done(function(data){
			result = data['response']['groups'][0]['items'];
			$.each(result, function(index, shop){
				console.log(shop['venue']['name']);
				markers.push("&markers=color:blue%7C" + shop['venue']['location']['lat'] + ',' + shop['venue']['location']['lng']);
			});
			if(markers.length > 0){
				map = '<img src="http://maps.googleapis.com/maps/api/staticmap?center=' + zipcode + '&zoom=13&size=1000x1000&sensor=false&' + markers.join('%20') + '">';
				$('#map_div').empty();
				$('#map_div').append(map);
			}
		});
	});
}); 