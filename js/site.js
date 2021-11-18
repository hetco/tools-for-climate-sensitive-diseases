$('.key_finding').on('click',function(){
	let findingNum = $(this).attr('data-finding');
	$('.expanded_finding').hide();
	$('#expanded_finding_'+findingNum).show();
	$('.arrow').removeClass('up');
	$('.arrow').addClass('down');
	$('#icon_'+findingNum).removeClass('down');
	$('#icon_'+findingNum).addClass('up');
});

