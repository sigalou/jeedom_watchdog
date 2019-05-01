
/* This file is part of Jeedom.
 *
 * Jeedom is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Jeedom is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Jeedom. If not, see <http://www.gnu.org/licenses/>.
 */
 
$("#table_cmd").sortable({axis: "y", cursor: "move", items: ".cmd", placeholder: "ui-state-highlight", tolerance: "intersect", forcePlaceholderSize: true});


/*
$("body").delegate(".listCmdInfo", 'click', function() {
	var type = $(this).attr('data-type');	
	var el = $(this).closest('.' + type).find('.cmdAttr[data-l1key=configuration][data-l2key=state]');
    jeedom.cmd.getSelectModal({cmd: {type: 'info', subtype: 'binary'}}, function(result) {
        el.value(result.human);
    });
});

*/


function rempliCondition() {
	
	


	
}



$("body").delegate(".listCmdInfo", 'click', function() {
	
	


	
//$('.eqLogicAttr[data-l1key=configuration][data-l2key=nameOn]').value("coucou");	
	//$('#div_watchdogMasterEqLogicList').off('click').on('click','.listEqLogic', function(event) {
//	var el = $(this).closest('.' + type).find('.cmdAttr[data-l1key=configuration][data-l2key=state]');
  var eldebut = $(this);
  
  var expression = $(this).closest('expressionn');
  	var type = $(this).attr('data-type');	  
	//var type = 'info';
  
  	var el = $(this).closest('.' + type).find('.cmdAttr[data-l1key=configuration][data-l2key=state]');


//valeurprecedente = $('.eqLogicAttr[data-l1key=configuration][data-l2key=nameOn]').value();
//$('#div_alert').showAlert({message: valeurprecedente, level: 'danger'});
  
  if (expression.find('.expressionAttr[data-l1key=type]').value() == 'action') {
    type = 'action';
  }
  
  			//console.log("coucou lionel");
			//console.log(expression);
			//this._options.logger && this._options.logger('Alexa-Config (alexa-remote.js): amazonserver=');
  
  
  



 jeedom.cmd.getSelectModal({cmd: {}}, function (result) {
	 var date = new Date();

	
	//vient de desktop/js/scneario.js
	
     message = 'Aucun choix possible';
	
      if(result.cmd.subType == '0numeric'){
        message = '<div class="row">  ' +
        '<div class="col-md-12"> ' +
        '<form class="form-horizontal" onsubmit="return false;"> ' +
        '<div class="form-group"> ' +
        '<label class="col-xs-5 control-label" >'+result.human+' {{est}}</label>' +
        '             <div class="col-xs-3">' +
        '                <select class="conditionAttr form-control" data-l1key="operator">' +
        '                    <option value="==">{{égal}}</option>' +
        '                  <option value=">">{{supérieur}}</option>' +
        '                  <option value="<">{{inférieur}}</option>' +
        '                 <option value="!=">{{différent}}</option>' +
        '            </select>' +
        '       </div>' +
        '      <div class="col-xs-4">' +
        '         <input type="number" class="conditionAttr form-control" data-l1key="operande" />' +
        '    </div>' +
        '</div>' +
        '<div class="form-group"> ' +
        '<label class="col-xs-5 control-label" >{{Ensuite}}</label>' +
        '             <div class="col-xs-3">' +
        '                <select class="conditionAttr form-control" data-l1key="next">' +
        '                    <option value="">rien</option>' +
        '                  <option value="ET">{{et}}</option>' +
        '                  <option value="OU">{{ou}}</option>' +
        '            </select>' +
        '       </div>' +
        '</div>' +
        '</div> </div>' +
        '</form> </div>  </div>';
      }
      if(result.cmd.subType == '0string'){
        message = '<div class="row">  ' +
        '<div class="col-md-12"> ' +
        '<form class="form-horizontal" onsubmit="return false;"> ' +
        '<div class="form-group"> ' +
        '<label class="col-xs-5 control-label" >'+result.human+' {{est}}</label>' +
        '             <div class="col-xs-3">' +
        '                <select class="conditionAttr form-control" data-l1key="operator">' +
        '                    <option value="==">{{égale}}</option>' +
        '                  <option value="matches">{{contient}}</option>' +
        '                 <option value="!=">{{différent}}</option>' +
        '            </select>' +
        '       </div>' +
        '      <div class="col-xs-4">' +
        '         <input class="conditionAttr form-control" data-l1key="operande" />' +
        '    </div>' +
        '</div>' +
        '<div class="form-group"> ' +
        '<label class="col-xs-5 control-label" >{{Ensuite}}</label>' +
        '             <div class="col-xs-3">' +
        '                <select class="conditionAttr form-control" data-l1key="next">' +
        '                    <option value="">{{rien}}</option>' +
        '                  <option value="ET">{{et}}</option>' +
        '                  <option value="OU">{{ou}}</option>' +
        '            </select>' +
        '       </div>' +
        '</div>' +
        '</div> </div>' +
        '</form> </div>  </div>';
      }
      if(result.cmd.subType == 'binary'){
        message = '<div class="row">  ' +
        '<div class="col-md-12"> ' +
        '<form class="form-horizontal" onsubmit="return false;"> ' +
        '<div class="form-group"> ' +
        '<label class="col-xs-5 control-label" >'+result.human+' {{est}}</label>' +
        '            <div class="col-xs-7">' +
        '                 <input class="conditionAttr" data-l1key="operator" value="==" style="display : none;" />' +
        '                  <select class="conditionAttr form-control" data-l1key="operande">' +
        '                       <option value="1">{{Ouvert}}</option>' +
        '                       <option value="0">{{Fermé}}</option>' +
        '                       <option value="1">{{Allumé}}</option>' +
        '                       <option value="0">{{Eteint}}</option>' +
        '                       <option value="1">{{Déclenché}}</option>' +
        '                       <option value="0">{{Au repos}}</option>' +
        '                       </select>' +
        '                    </div>' +
        '                 </div>' +
        '<div class="form-group"> ' +
        '<label class="col-xs-5 control-label" >{{Ensuite}}</label>' +
        '             <div class="col-xs-3">' +
        '                <select class="conditionAttr form-control" data-l1key="next">' +
        '                  <option value="">{{rien}}</option>' +
        '                  <option value="ET">{{et}}</option>' +
        '                  <option value="OU">{{ou}}</option>' +
        '            </select>' +
        '       </div>' +
        '</div>' +
        '</div> </div>' +
        '</form> </div>  </div>';
      }
	  

      
      bootbox.dialog({
        title: "{{Quel test faire ?}}",
        message: message,
        buttons: {
          "Ne rien mettre": {
            className: "btn-default",
            callback: function () {
              //expression.find('.watchdogMasterEqLogicAttr[data-l1key=expression]').atCaret('insert', result.human);
			 //el.closest('.watchdogMasterEqLogic').find('.watchdogMasterEqLogicAttr[data-l1key=eqLogic]').value(result.human); C'est pour mettre la résultat précédent
            }
          },
          success: {
            label: "Valider",
            className: "btn-primary",
            callback: function () {
				
              var condition = result.human;
              condition += ' ' + $('.conditionAttr[data-l1key=operator]').value();
              if(result.cmd.subType == 'string'){
                if($('.conditionAttr[data-l1key=operator]').value() == 'matches'){
                  condition += ' "/' + $('.conditionAttr[data-l1key=operande]').value()+'/"';
                }else{
                  condition += ' "' + $('.conditionAttr[data-l1key=operande]').value()+'"';
                }
              }else{
                condition += ' ' + $('.conditionAttr[data-l1key=operande]').value();
              }
              condition += ' ' + $('.conditionAttr[data-l1key=next]').value()+' ';
				             // $('#div_alert').showAlert({message: condition, level: 'danger'});
			
			//expression.find('.expressionAttr[data-l1key=expression]').atCaret('insert', 'condition');			  
            //expression.find('.expressionAttr[data-l1key=expression]').atCaret('insert', condition);

valeurprecedente = $('.eqLogicAttr[data-l1key=configuration][data-l2key=nameOn]').value();
condition=valeurprecedente+condition;
$('.eqLogicAttr[data-l1key=configuration][data-l2key=nameOn]').value(condition);				  
			
              if($('.conditionAttr[data-l1key=next]').value() != ''){
                eldebut.click();
				//rempliCondition(); //on reboucle pour une autre condition
              }
			  else
			  {
				  el.value(condition);
				  $('.eqLogicAttr[data-l1key=configuration][data-l2key=nameOn]').value("");				  

			  }
			  
			 // data-l1key="configuration" data-l2key='nameOn'
			  
 			  //el.value(condition);
           }
          },
        }
      });
  });	
  
  });




$("body").delegate(".listCmdActionOff", 'click', function() {
    var type = $(this).attr('data-type');
    var el = $(this).closest('.' + type).find('.cmdAttr[data-l1key=configuration][data-l2key=OFF]');
    jeedom.cmd.getSelectModal({cmd: {type: 'action'}}, function(result) {
        el.value(result.human);
    });
});

$("body").delegate(".listCmdActionOn", 'click', function() {
    var type = $(this).attr('data-type');
    var el = $(this).closest('.' + type).find('.cmdAttr[data-l1key=configuration][data-l2key=ON]');
    jeedom.cmd.getSelectModal({cmd: {type: 'action'}}, function(result) {
        el.value(result.human);
    });
});




$('.cmdAction[data-action=addCmd]').on('click', function () {
	var _cmd = "";
    addCmdToTable(_cmd);
});





 $('body').undelegate('.icone .iconeOn[data-l1key=chooseIcon]', 'click').delegate('.icone .iconeOn[data-l1key=chooseIcon]', 'click', function () {
    var mode = $(this).closest('.icone');
    chooseIcon(function (_icon) {
        mode.find('.iconeAttrOn[data-l2key=iconOn]').empty().append(_icon);
    });
});

 $('body').undelegate('.icone .iconeAttrOn[data-l2key=iconOn]', 'click').delegate('.icone .iconeAttrOn[data-l2key=iconOn]', 'click', function () {
    $(this).empty();
});

 $('body').undelegate('.icone .iconeOff[data-l1key=chooseIcon]', 'click').delegate('.icone .iconeOff[data-l1key=chooseIcon]', 'click', function () {
    var mode = $(this).closest('.icone');
    chooseIcon(function (_icon) {
        mode.find('.iconeAttrOff[data-l2key=iconOff]').empty().append(_icon);
    });
});

 $('body').undelegate('.icon .iconeAttrOff[data-l2key=iconOff]', 'click').delegate('.icone .iconeAttrOff[data-l2key=iconOff]', 'click', function () {
    $(this).empty();
});

function printEqLogic(_eqLogic) {
	$('.action').show();
	if (!isset(_eqLogic)) {
		var _eqLogic = {configuration: {}};
	}
	
	if (!isset(_eqLogic.configuration)) {
	   _eqLogic.configuration = {};
	}
	/*activAction sert à afficher ou pas d'autres types d'actions, supprimé dans derniere version
	if (isset(_eqLogic.configuration.activAction)) {
		if(_eqLogic.configuration.activAction == 1) {
			$('.action').show();
		} else {
			$('.action').hide();
			
		}
	} else {
		$('.action').show();
	}*/
	
	
	
}

 function saveEqLogic(_eqLogic) {
    if (!isset(_eqLogic.configuration)) {
        _eqLogic.configuration = {};
    }
	 _eqLogic.configuration.etat = [];
	 _eqLogic.configuration.cmd_on = [];
	 _eqLogic.configuration.cmd_off = []
    $('#table_cmd .cmd').each(function () {
        var etats = $(this).find('.trigger').getValues('.cmdAttr[data-l1key=configuration][data-l2key=state]');
		/*var ons = $(this).find('.action').getValues('.cmdAttr[data-l1key=configuration][data-l2key=ON]');
		var offs = $(this).find('.action').getValues('.cmdAttr[data-l1key=configuration][data-l2key=OFF]');
		 _eqLogic.configuration.etat.push(etats[0].configuration.state);
		 _eqLogic.configuration.cmd_on.push(ons[0].configuration.ON);
		 _eqLogic.configuration.cmd_off.push(offs[1].configuration.OFF);*/
		 
		
    });

  	return _eqLogic;
 }
 
$('.eqLogicAttr[data-l1key=configuration][data-l2key=activAction]').change(function () {
	 if(this.checked) {
		 $('.action').show();		 
		 
	 } else {
		$('.action').hide();
	 }
});		
 



function addCmdToTable(_cmd) {
		
    if (!isset(_cmd)) {
        var _cmd = {configuration: {}};
		
    }
    if (!isset(_cmd.configuration)) {
        _cmd.configuration = {};
    }
	
	if (_cmd.name == 'Nombre On' || _cmd.name == 'Nombre Off' || _cmd.name == 'Etat' || _cmd.name == 'Dernier déclencheur' || _cmd.name == 'All on' || _cmd.name == 'All off' ) {
		var tr = '<tr class="cmd" data-cmd_id="' + init(_cmd.id) + '"  >';
		tr += '<td><input class="cmdAttr form-control" data-l1key="id" style="display : none;"><input class="cmdAttr form-control" data-l1key="name" style="width : 200px;margin-left:auto;margin-right:auto;" disabled /></td>';
		tr += '<span class="type" type="info" style="display : none;">' + jeedom.cmd.availableType() + '</span>';
		tr += '<span class="subType" subType="' + init(_cmd.subType) + '" style="display : none;"></span>';
		tr += '</td>';
		tr += '<td>';
		if (is_numeric(_cmd.id)) {
			tr += '<a class="btn btn-default btn-xs cmdAction expertModeVisible" data-action="configure"><i class="fa fa-cogs"></i></a> ';
			tr += '<a class="btn btn-default btn-xs cmdAction" data-action="test"><i class="fa fa-rss pull-right"></i> {{Tester}}</a>';
		}
		tr += '</td>';					
		tr += '</tr>';	
		$('#table_info tbody').append(tr);
		$('#table_info tbody tr:last').setValues(_cmd, '.cmdAttr');
		if (isset(_cmd.type)) {
			$('#table_info tbody tr:last .cmdAttr[data-l1key=type]').value(init(_cmd.type));
		}
		jeedom.cmd.changeType($('#table_cmd tbody tr:last'), init(_cmd.subType));
	} else {
		if (!isset(_cmd.subType)) {
			_cmd.subType = "";
		}
			
		
		var tr = '<tr class="cmd ' + _cmd.type + '" data-cmd_id="' + init(_cmd.id) + '">';
		tr += '<td>';
		tr += '<input class="cmdAttr form-control input-sm" data-l1key="id" style="display : none;">';
		tr += '<span class="type" type="info" style="display : none;">' + jeedom.cmd.availableType() + '</span>';
		tr += '<input class="cmdAttr form-control" type="hidden" data-l1key="subType" value="watchdog">';
		tr += '<input class="cmdAttr form-control input-sm" data-l1key="name" 	 placeholder="{{Nom}}">';
		tr += '</td><td class="trigger">';
		tr += ' <input class="cmdAttr form-control input-sm"  data-type="' + _cmd.type + '" data-l1key="configuration" data-l2key="state"  style="margin-bottom : 5px;width : 80%; display : inline-block;" >';
		tr += ' <a class="btn btn-default btn-sm cursor listCmdInfo" data-type="' + _cmd.type + '"  style="margin-left : 5px;"><i class="fa fa-list-alt "></i></a>';



		
		/*tr += '</td><td class="action" style="display : none;">';
		tr += '<input class="cmdAttr form-control input-sm" data-l1key="configuration" data-type="' + _cmd.type + '" data-l2key="ON"  style="margin-bottom : 5px;width : 80%; display : inline-block;" disabled>';
		tr += '<a class="btn btn-default btn-sm cursor listCmdActionOn" data-type="' + _cmd.type + '" data-input="ON" style="margin-left : 5px;"><i class="fa fa-list-alt "></i></a>';
		tr += '</td><td class="action" style="display : none;">';
		tr += '<input class="cmdAttr form-control input-sm" data-l1key="configuration" data-type="' + _cmd.type + '" data-l2key="OFF"  style="margin-bottom : 5px;width : 80%; display : inline-block;" disabled>';
		tr += '<a class="btn btn-default btn-sm cursor listCmdActionOff" data-type="' + _cmd.type + '" data-input="OFF" style="margin-left : 5px;"><i class="fa fa-list-alt "></i></a>';
		tr += '</td>';*/
		tr += '<td>';
		tr += '<input type="checkbox" class="tooltips cmdAttr" data-l1key="configuration" data-l2key="reverse">';
		tr += '</td><td>';
		tr += '<i class="fa fa-minus-circle pull-right cmdAction cursor" data-action="remove"></i>';
		tr += '</td>';
		tr += '</tr>';
		$('#table_cmd tbody').append(tr);
		$('#table_cmd tbody tr:last').setValues(_cmd, '.cmdAttr');
		if (isset(_cmd.type)) {
			$('#table_cmd tbody tr:last .cmdAttr[data-l1key=type]').value(init(_cmd.type));
		}
	}

	$.ajax({
		type: 'POST',
		url: 'plugins/watchdog/core/ajax/watchdog.ajax.php',
		data: {
			action: 'getStatus',
			id: $('.eqLogicAttr[data-l1key=id]').value()
		},
		dataType: 'json',
		error: function (request, status, error) {
			handleAjaxError(request, status, error);
		},
		success: function (data) {
			if (data.state != 'ok') {
				$('#div_alert').showAlert({message: data.result, level: 'danger'});
				return;
			}
			if (data.result == 1) {
				$('.action').show();
			} else {
				$('.action').hide();
			}					
		}
   });	
		

//			
}






