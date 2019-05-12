
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
var chaineExpressionTest="";

$("#table_controles").sortable({axis: "y", cursor: "move", items: ".cmd", placeholder: "ui-state-highlight", tolerance: "intersect", forcePlaceholderSize: true});
$("#table_actions").sortable({axis: "y", cursor: "move", items: ".watchdogAction", placeholder: "ui-state-highlight", tolerance: "intersect", forcePlaceholderSize: true});

console.log("--------- Lancement ---------");


// BOUTONS -------------

 $("body").delegate('.bt_removeAction', 'click', function () {
    var type = $(this).attr('data-type');
    $(this).closest('.' + type).remove();
});

$('.bt_addControle').off('click').on('click',function(){
//console.log("--------- bt_addControle");
//console.log ("Valeur de data-type:"+$(this).attr('data-type'));
  //addCmdToTable({}, $(this).attr('data-type'));
  addCmdToTable({}, 'info');
});

$('.bt_addAction').off('click').on('click',function(){
//console.log("--------- bt_addAction");
$('#table_actions').append('</center><br><legend><i class="fa fa-cogs"></i> {{Nouvelle action}}</legend><center>');
  addAction({}, "watchdogAction");
});

$('#bt_cronGenerator').off('click').on('click',function(){
    jeedom.getCronSelectModal({},function (result) {
        $('.eqLogicAttr[data-l1key=configuration][data-l2key=autorefresh]').value(result.value);
    });
});

function addAction(_action) {
	console.log("--------- addAction");

    if (!isset(_action)) {
        _action = {};
    }
    if (!isset(_action.options)) {
        _action.options = {};
    }
    var input = '';
    var div = '<div class="watchdogAction">';
		
    div += '<div class="form-group ">';
    //Suppression du nom, pas utile
	//div += '<div class="col-sm-1">';	
	//div += '<input class="expressionAttr form-control input-sm" data-l1key="name" style="width : 80px;" placeholder="{{Nom}}">';
    //div += '</div>';
    div += '<div class="col-sm-2">';
    //div += '<i class="fa fa-arrows-v pull-left" style="margin-top : 9px; margin-right: 10px; "></i>';
    div += '<input type="checkbox" style="margin-top : 11px;margin-right : 10px;" class="expressionAttr" data-l1key="options" data-l2key="enable" checked title="{{Décocher pour désactiver l\'action}}" />';
    div += '<input type="checkbox" style="margin-top : 11px;margin-right : 10px;" class="expressionAttr" data-l1key="options" data-l2key="background" title="Cocher pour que la commande s\'exécute en parallèle des autres actions" />';

    /*div += '<select class="expressionAttr form-control input-sm" data-l1key="actionQuoi" style="width:calc(100% - 50px);display:inline-block">';
    div += '<option value="Un">{{Un contrôle}}</option>';
    div += '<option value="Tous">{{Tous les contrôles}}</option>';
    div += '</select><br>';
    div += '<input type="checkbox" style="visibility:hidden" >';*/
    div += '<select class="expressionAttr form-control input-sm" data-l1key="actionType" style="width:calc(100% - 50px);display:inline-block">';
    div += '<option value="True">{{Passe à True}}</option>';
    div += '<option value="False">{{Passe à False}}</option>';
    div += '</select>';
    div += '</div>';
    //div += '<div class="col-sm-1">';
    //div += '<label class="checkbox-inline"><input type="checkbox" class="expressionAttr" data-l1key="actionSens"/>{{Inverser}}</label>';
    //div += '</div>';
    div += '<div class="col-sm-5">';
    div += '<div class="input-group">';
    div += '<span class="input-group-btn">';

    div += '<a class="btn btn-default bt_removeAction btn-sm" data-type="watchdogAction"><i class="fa fa-minus-circle"></i></a>';
    div += '</span>';
    div += '<input class="expressionAttr form-control input-sm cmdAction" data-l1key="cmd" data-type="watchdogAction" />';
    div += '<span class="input-group-btn">';
    div += '<a class="btn btn-success btn-sm listAction" data-type="watchdogAction" title="{{Sélectionner un mot-clé}}"><i class="fa fa-tasks"></i></a>';
    div += '<a class="btn btn-success btn-sm listCmdAction" data-type="watchdogAction"><i class="fa fa-list-alt"></i></a>';
    div += '</span>';
    div += '</div>';
    div += '</div>';
    var actionOption_id = uniqId();
	//console.log(uniqId());
    div += '<div class="col-sm-5 actionOptions" id="'+actionOption_id+'">';
    div += '</div>';
    div += '</div><hr>';
        $('#table_actions').append(div);
        $('#table_actions .watchdogAction:last').setValues(_action, '.expressionAttr');

    actionOptions.push({
        expression : init(_action.cmd, ''),
        options : _action.options,
        id : actionOption_id
    });

}

/*
 * Fonction pour l'ajout de commande, appellé automatiquement par plugin.watchdog
 */
function addCmdToTable(_cmd, type) {
	
		console.log("--------- addCmdToTable");

	// On est sur les commandes INFO -- Onglet Equipements à surveiller

	// On remplit la table 	table_controles qui correspond à la table des equipements à tester Type=info SType=watchdog
	// On utilise cmdAttr

    if (!isset(_cmd)) 
        //var _cmd = {configuration: {}};
        var _cmd = {};
    if (!isset(_cmd.configuration)) 
        _cmd.configuration = {};
	if (isset(type))
		_cmd.type=type;
	if (!isset(_cmd.subType)) 
		_cmd.subType = "watchdog";	


		//var tr = '<tr class="cmd ' + _cmd.type + '" data-cmd_id="' + init(_cmd.id) + '">';
		var tr = '<tr class="cmd info" >';
		
		tr += '<td>';
		tr += '<span class="cmdAttr" data-l1key="id" style="display:none;"></span>';
		tr += '<input class="cmdAttr form-control input-sm" data-l1key="name" style="width : 140px;" placeholder="{{Nom}}">';
		tr += '<span style="display:none;" class="type" type="' + init(_cmd.type) + '">' + jeedom.cmd.availableType() + '</span>';
		tr += '<input class="cmdAttr form-control" type="hidden" data-l1key="subType" value="watchdog">';
		tr += '</td>';
		 tr += '<td>';
		tr += ' <input class="cmdAttr form-control input-sm"  data-type="' + _cmd.type + '" data-l1key="configuration" data-l2key="controle"  style="margin-bottom : 5px;width : 80%; display : inline-block;" >';
		tr += '<a class="btn btn-success btn-sm cursor listCmdInfo" data-type="' + _cmd.type + '"  style="margin-left : 5px;"><i class="fa fa-list-alt "></i></a>';
		tr += '</td>';   
		 tr += '<td>';
		tr += '<span class="cmdAttr" style="font-weight: bold;" data-l1key="configuration" data-l2key="resultat"></span>';
		tr += '</td>'; 	tr += '<td>';

		tr += '<i class="fa fa-minus-circle pull-right cmdAction cursor" data-action="remove"></i>';
		tr += '</td>';
		tr += '</tr>';
		$('#table_controles tbody').append(tr);
		$('#table_controles tbody tr:last').setValues(_cmd, '.cmdAttr');
		if (isset(_cmd.type)) {
			$('#table_controles tbody tr:last .cmdAttr[data-l1key=type]').value(init(_cmd.type));
		}
		//Affiche le sous-type et n'affiche que les champs concernés par le type
		jeedom.cmd.changeType($('#table_controles tbody tr:last'), init(_cmd.subType));
	
}


function saveEqLogic(_eqLogic) {
	
console.log("--------- saveEqLogic");

    if (!isset(_eqLogic.configuration)) {
        _eqLogic.configuration = {};
    }
	//Sauvegarde de l'action à effectuer, façon scénario, avec ses options (pour les commandes qui ont un titre ou autres options)
    _eqLogic.configuration.watchdogAction = $('#table_actions .watchdogAction').getValues('.expressionAttr');
			return _eqLogic;
}

function printEqLogic(_eqLogic) {
	console.log("--------- printEqLogic");
			console.log("_eqLogic");
			console.dir (_eqLogic);

// on remplit la table du résultat global
    $('#table_controles_resultat').empty();
		var tr = '<tr style="width: 100%; border-collapse: collapse; background-color: #26ae5f;">';
		tr += '<td style="width: 200px;">';
		tr += '</td>';
		 tr += '<td>';
		tr += '</td>';   
		 tr += '<td style="width: 100px;">';
		 tr += '<strong><span style="color: #ffffff;">' + _eqLogic.configuration.dernierEtat + '</span></strong>'; 
		tr += '</td>'; 	
		tr += '<td style="width: 100px;">';
		tr += '</td>';
		tr += '</tr>';
	$('#table_controles_resultat').append(tr);

// On remplit la table_actions
    actionOptions = [];
    $('#table_actions').empty(); 
    if (isset(_eqLogic.configuration.watchdogAction)) {
//console.log("--------- _eqLogic.configuration.watchdogAction")
//console.dir(_eqLogic.configuration.watchdogAction);; 


//typeControl = $('.eqLogicAttr[data-l1key=configuration][data-l2key=tempo1]').value()+" secondes"; 
typeControl = _eqLogic.configuration.typeControl;
dernierEtat = "(actuellement à "+_eqLogic.configuration.dernierEtat+")";


if (typeControl == "")
$('#table_actions').append('<br><legend><i class="fa fa-cogs"></i> {{Actions à executer quand un des contrôles passe à True}}</legend>');
else
$('#table_actions').append('<br><legend><i class="fa fa-cogs"></i> Actions à executer quand le résultat global des contrôles passe à True '+dernierEtat+'</legend>');

        // On va lister en premier les actions qui se déclencheront quand on passera de false à true
		for (var i in _eqLogic.configuration.watchdogAction) {
			if (_eqLogic.configuration.watchdogAction[i].actionType == "True")
			addAction(_eqLogic.configuration.watchdogAction[i])
        }
		
if (typeControl == "")
$('#table_actions').append('<br><legend><i class="fa fa-cogs"></i> {{Actions à executer quand un des contrôles passe à False}}</legend>');
else
$('#table_actions').append('<br><legend><i class="fa fa-cogs"></i> Actions à executer quand le résultat global des contrôles passe à False '+dernierEtat+'</legend>');

        // puis les actions qui se déclencheront quand on passera de true à false
        for (var i in _eqLogic.configuration.watchdogAction) {
			if (_eqLogic.configuration.watchdogAction[i].actionType == "False")
			addAction(_eqLogic.configuration.watchdogAction[i])
        }    
	}
		
    jeedom.cmd.displayActionsOption({
        params : actionOptions,
        async : false,
        error: function (error) {
            $('#div_alert').showAlert({message: error.message, level: 'danger'});
        },
        success : function(data){
            for(var i in data){
                $('#'+data[i].id).append(data[i].html.html);
            }
            taAutosize();
        }
    });
	
}
			

// --Boutons
 /**************** Commun ***********/
 $("body").delegate(".listCmdAction", 'click', function () {
console.log("--------- listCmdAction");
    var type = $(this).attr('data-type');
    var el = $(this).closest('.' + type).find('.expressionAttr[data-l1key=cmd]');
 //   var el = $(this).closest('.' + type).find('.expressionAttr[data-l1key=configuration][data-l2key=commande]');
    jeedom.cmd.getSelectModal({cmd: {type: 'action'}}, function (result) {
        el.value(result.human);
        jeedom.cmd.displayActionOption(el.value(), '', function (html) {
            el.closest('.' + type).find('.actionOptions').html(html);
            taAutosize();
        });
    });
});

$("body").delegate(".listAction", 'click', function () {
	console.log("--------- listAction");
  var type = $(this).attr('data-type');
  var el = $(this).closest('.' + type).find('.expressionAttr[data-l1key=cmd]');
	//var el = $(this).closest('.' + type).find('.expressionAttr[data-l1key=configuration][data-l2key=commande]');

  jeedom.getSelectActionModal({}, function (result) {
    el.value(result.human);
    jeedom.cmd.displayActionOption(el.value(), '', function (html) {
      el.closest('.' + type).find('.actionOptions').html(html);
      taAutosize();
  });
});
});


//-------------------------------------
// Pour remplir facilement le test à faire sur un equipement
//-------------------------------------


$("body").delegate(".listCmdInfo", 'click', function() {
	console.log("--------- listCmdInfo");

  var eldebut = $(this);
  var expression = $(this).closest('expressionn');
  	var type = $(this).attr('data-type');	  
  	var el = $(this).closest('.' + type).find('.cmdAttr[data-l1key=configuration][data-l2key=controle]');


  
  if (expression.find('.cmdAttr[data-l1key=type]').value() == 'action') {
    type = 'action';
  }
  

 jeedom.cmd.getSelectModal({cmd: {}}, function (result) {
	 var date = new Date();

	
	//vient de desktop/js/scneario.js
	
     message = 'Aucun choix possible';
	
      if(result.cmd.subType == 'numeric'){
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
      if(result.cmd.subType == 'string'){
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
	  
	  // bouton radio https://forum.tomshardware.fr/threads/d%C3%A9sactiver-un-bouton-radio-en-fonction-dun-autre.530697/
	  
      if(result.cmd.subType == 'binary'){
        message = '<div class="row">  ' +
        '<div class="col-md-12"> ' +
        '<form class="form-horizontal" onsubmit="return false;"> ';
		
        message +='<table border=0><tr><td>';
			tempo1 = $('.eqLogicAttr[data-l1key=configuration][data-l2key=tempo1]').value()+" secondes"; 
			if (tempo1==" secondes") tempo1='à configurer';
			tempo2 = $('.eqLogicAttr[data-l1key=configuration][data-l2key=tempo2]').value()+" secondes"; 
			if (tempo2==" secondes") tempo2='à configurer';
			tempo3 = $('.eqLogicAttr[data-l1key=configuration][data-l2key=tempo3]').value()+" secondes"; 
			if (tempo3==" secondes") tempo3='à configurer';
        message +='<div class="form-group"> <input type="radio" value=1 name="choix"></td><TD>' +
        '<label class="col-xs-12 control-label" >Tester si le délai depuis la dernière mise à jour de : <br>'+result.human+' est supérieur à :</label>' +
        '            <div class="col-xs-7">' +
		        '              <select class="conditionAttr form-control" data-l1key="choixtempo">' +
        '                       <option value="1">Tempo1 ('+tempo1+')</option>' +
        '                       <option value="2">Tempo2 ('+tempo2+')</option>' +
        '                       <option value="3">Tempo3 ('+tempo3+')</option>' +
        '                       </select>' +
        '                    </div>' +
        '                    </div>' +
        '                 </div>';	
        message +='</TD></TR></table>';
		
		message +="<hr>OU<hr>";
		
        message +='<table border=0><tr><td>';
		
        message +='<div class="form-group"> <input type="radio" value=2 name="choix" class="conditionAttr form-control" data-l1key="radio"></td><TD>' +
        '<label class="col-xs-12 control-label" >Tester si '+result.human+' {{est}}</label><br>' +
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
        '                 </div>';
        message +='</TD></TR></table><hr>';
		
		//message +="<hr>OU";
		
        message += '<div class="form-group"> ' +
        '<label class="col-xs-5 control-label" >{{Ensuite}}</label>' +
        '             <div class="col-xs-3">' +
        '                <select class="conditionAttr form-control" data-l1key="next">' +
        '                  <option value="">{{rien}}</option>' +
        '                  <option value="ET">{{et}}</option>' +
        '                  <option value="OU">{{ou}}</option>' +
        '            </select>' +
        '       </div>' +
        '</div>' +
        '</div> </div>' ;
		
		
        message += '</form> </div>  </div>';
      }

      
      bootbox.dialog({
        title: "{{Quel test faire ?}}",
        message: message,
        buttons: {
          "Annuler": {
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
			  var test=result.cmd.subType;
			  
			  if($('.conditionAttr[data-l1key=radio]').value() != '1'){
				  
				  //On regarde quel ets le tempo sélectionné 
				  switch ($('.conditionAttr[data-l1key=choixtempo]').value()) {
						  case '2':
							choixtempo="#tempo2#";
							break;
						  case '3':
							choixtempo="#tempo3#";
							break;
						  default:
							choixtempo="#tempo1#";
						}
				  
				  
				  // On est dans le cas : Tester le délai depuis la dernière mise à jour de xxx ou aucune case
  	  condition = '(#timestamp# - strtotime(collectdate(' + condition+"))) > "+choixtempo;
			  }
			  else
			  {		  
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
			  }
			

valeurprecedente = chaineExpressionTest
//valeurprecedente = $('.eqLogicAttr[data-l1key=configuration][data-l2key=nameOn]').value();
condition=valeurprecedente+condition;
chaineExpressionTest=condition;
//$('.eqLogicAttr[data-l1key=configuration][data-l2key=nameOn]').value(condition);				  
			
              if($('.conditionAttr[data-l1key=next]').value() != ''){
                eldebut.click();
				//rempliCondition(); //on reboucle pour une autre condition
              }
			  else
			  {
				  el.value(condition);
				  chaineExpressionTest="";
				  //$('.eqLogicAttr[data-l1key=configuration][data-l2key=nameOn]').value("");	
			  

			  }
			  
 			  //el.value(condition);
           }
          },
        }
      });
  });	
  
  });



