$('.key_finding').on('click',function(){
	let findingNum = $(this).attr('data-finding');
	let expand = false;
	if($('#icon_'+findingNum).hasClass('down')){
		expand = true;
	}
	$('.key_finding').removeClass('expanded');
	$('.expanded_finding').hide();
	$('.arrow').removeClass('up');
	$('.arrow').addClass('down');
	if(expand){
		$('#icon_'+findingNum).removeClass('down');
		$('#icon_'+findingNum).addClass('up');
		$('#expanded_finding_'+findingNum).show();
		$(this).addClass('expanded');
	}
	
});

$('#nav_option_1').on('click',function(){
	if(navOption1!=''){
		window.location.href = navOption1;
	}
});

$('#nav_option_2').on('click',function(){
	if(navOption2!=''){
		window.location.href = navOption2;
	}
});

$('#nav_option_3').on('click',function(){
	if(navOption3!=''){
		window.location.href = navOption3;
	}
});

if(navOption3==''){
	$.ajax({
		url: "../data/tools.json",
		success: function(result){
	    	addTools(result,'','No filter');
	    	addToolFilter(result,'Mode of transmission',1);
	    	addToolFilter(result,'Region',2);
		}
	});
}

function addToolFilter(tools,key,i){
	let filterHTML = '';
	let filterList = [];
	tools.forEach(function(t){
		let value = t[key];
		if(filterList.indexOf(value)==-1){
			filterList.push(value);
		}
	});
	$('#toolfilter').append(key+': <select id="filter_'+i+'" class="filters"></select>');
	$('#filter_'+i).append('<option>No filter</option>');
	filterList.forEach(function(f){
		$('#filter_'+i).append('<option>'+f+'</option>');
	});
	$('#filter_'+i).on('change',function(){
		let value = $(this).val();
		$('.filters').val('No filter');
		$(this).val(value);
		addTools(tools,key,value);
	});
}

function addTools(tools,key,value){
	console.log(key);
	console.log(value);
	if(value!='No filter'){
		tools = tools.filter(function(t){
			if(t[key] == value){
				return true
			} else {
				return false
			}
		});
	}
	console.log(tools);
	$('#tools').html('');
	tools.forEach(function(tool,i){
		let toolHTML = `
			<tr class="tool">
				<td>{{tool name}}</td>
				<td>{{disease}}</td>
				<td>{{output}}</td>
				<td>{{Regions}}</td>
				<td>{{software}}</td>
				<td><button id="{{id}}" class="btn btn-light">See details</button></td>
			</tr>
		`
		let toolID = 'tool_'+i;
		let detailID = "detail_"+i;
		toolHTML = toolHTML.replace('{{id}}',toolID).replace('{{tool name}}',tool['Model name']).replace('{{disease}}',tool['Infectious diseases (pathogens)']).replace('{{output}}',tool['Model Output']).replace('{{software}}',tool['Software']).replace('{{Regions}}',tool['Region']+' '+tool['Region 2'])
		$('#tools').append(toolHTML);
		let detailHTML = `
			<tr id="{{id}}" class="details">
				<td colspan="3">
					{{details1}}
				</td>
				<td colspan="3">
					{{details2}}
				</td>
			</tr>
		`;
		
		let detailList1 = '';
		let detailList2 = ''
		let index=0;
		for(key in tool){
			let value = tool[key];
			if(key == 'Link to Tool'){
				if(value.length>60){
					value = value.substr(0,60)+'...';
				}
				value = '<a href="'+tool[key]+'" target="_blank">'+value+'</a>';
			}
			if(index<8){
				detailList1 = detailList1 + ('<p><span class="key_word">'+key+':</span> <span class="value">'+value+'</span></p>');
			} else {
				detailList2 = detailList2 + ('<p><span class="key_word">'+key+':</span> <span class="value">'+value+'</span></p>');
			}
			index++;
		}
		detailHTML = detailHTML.replace('{{id}}',detailID).replace('{{details1}}',detailList1).replace('{{details2}}',detailList2);
		$('#tools').append(detailHTML);
		$('#'+toolID).on('click',function(){
			console.log('expand details');
			$('#'+detailID).show();
		});
	});
}