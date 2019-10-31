
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


$(document).ready(function(){ //lancé quand toute la page est chargée
	$(".bt_masqueCalculs").hide();
	});

//console.log("--------- Lancement ---------");


// BOUTONS -------------

 $("body").delegate('.bt_removeAction', 'click', function () {
//$("bt_removeAction").off('click').on("click", function () {
//console.log("--------- bt_removeAction");
    var type = $(this).attr('data-type');
    $(this).closest('.' + type).remove();
});

$('.bt_addControle').off('click').on('click',function(){
//console.log ("Valeur de data-type:"+$(this).attr('data-type'));
  //addCmdToTable({}, $(this).attr('data-type'));
  addCmdToTable({}, 'info');
});


$('.listCmdInfoVacances').off('click').on('click',function(){
    var type = $(this).attr('data-type');
 // var el = $(this).closest('.' + type).find('.expressionAttr[data-l1key=cmd]');
	var el = $(this).closest('.' + type).find('.eqLogicAttr[data-l1key=configuration][data-l2key=modevacances]');
console.log("--------- type");
console.dir(type);
console.log("--------- el");
console.dir(el);
    jeedom.cmd.getSelectModal({cmd: {type: 'action'}}, function (result) {
        el.value(result.human);
        jeedom.cmd.displayActionOption(el.value(), '', function (html) {
            el.closest('.' + type).find('.actionOptions').html(html);
            taAutosize();
        });
    });
	
	el.value("coucou");
console.log("--------- coucou");
	
	
});
  
$('.bt_afficheCalculs').off('click').on('click',function(){
  $(".calcul").show();
  $(".bt_masqueCalculs").show();
  $(".bt_afficheCalculs").hide();
  });
  
$('.bt_masqueCalculs').off('click').on('click',function(){
  $(".calcul").hide();
  $(".bt_masqueCalculs").hide();
  $(".bt_afficheCalculs").show();
});
$('.bt_addAction').off('click').on('click',function(){
//console.log("--------- bt_addAction");
$('#table_actions').append('</center><br><legend><i class="fa fa-cogs"></i> {{Nouvelle action}}</legend><center>');
  addAction({}, "watchdogAction");
  addLog();
});

$('#bt_cronGenerator').off('click').on('click',function(){
    jeedom.getCronSelectModal({},function (result) {
        $('.eqLogicAttr[data-l1key=configuration][data-l2key=autorefresh]').value(result.value);
    });
});


$('.bt_plugin_view_log').on('click',function(){
   $('#md_modal').dialog({title: "{{Log de }}"+$('.eqLogicAttr[data-l1key=name]').value()});
   $("#md_modal").load('index.php?v=d&modal=log.display&log=watchdog_'+$('.eqLogicAttr[data-l1key=id]').value()).dialog('open');

});

function addAction(_action) {
	//console.log("--------- addAction");

    if (!isset(_action)) {
        _action = {};
    }
    if (!isset(_action.options)) {
        _action.options = {};
    }
    var input = '';
    var div = '<div class="watchdogAction ">';
		
    div += '<div class="form-group ">';
    //Suppression du nom, pas utile
	//div += '<div class="col-sm-1">';	
	//div += '<input class="expressionAttr form-control input-sm" data-l1key="name" style="width : 80px;" placeholder="{{Nom}}">';
    //div += '</div>';
    div += '<div class="col-sm-2 ">';
    //div += '<i class="fa fa-arrows-v pull-left" style="margin-top : 9px; margin-right: 10px; "></i>';
    div += '<input type="checkbox" style="margin-top : 11px;margin-right : 5px;" class="expressionAttr" data-l1key="options" data-l2key="enable" checked title="{{Décocher pour désactiver l\'action}}" />';
    div += '<input type="checkbox" style="margin-top : 11px;margin-right : 5px;" class="expressionAttr" data-l1key="options" data-l2key="background" title="Cocher pour que la commande s\'exécute en parallèle des autres actions" />';
    div += '<input type="checkbox" class="expressionAttr tooltipstered" style="margin-top : 11px;margin-right : 5px;" data-l1key="options" data-l2key="log" checked title="Cocher pour que l\'action soit enregistrée dans le log du Watchdog" />';

    /*div += '<select class="expressionAttr form-control input-sm" data-l1key="actionQuoi" style="width:calc(100% - 50px);display:inline-block">';
    div += '<option value="Un">{{Un contrôle}}</option>';
    div += '<option value="Tous">{{Tous les contrôles}}</option>';
    div += '</select><br>';
    div += '<input type="checkbox" style="visibility:hidden" >';*/
    div += '<select class="expressionAttr form-control input-sm" data-l1key="actionType" style="width:calc(100% - 70px);display:inline-block">';
    div += '<option style="background: #dff0d8; color: #00000;" value="True">{{Passe à True}}</option>';
    div += '<option style="background: #f2dede; color: #00000;" value="False">{{Passe à False}}</option>';
    div += '<option style="background: #d9edf7; color: #00000;" value="Avant">{{Avant le contrôle}}</option>';
    div += '</select>';
    div += '</div>';
    //div += '<div class="col-sm-1">';
    //div += '<label class="checkbox-inline"><input type="checkbox" class="expressionAttr" data-l1key="actionSens"/>{{Inverser}}</label>';
    //div += '</div>';
    div += '<div class="col-sm-5">';
    div += '<div class="input-group">';
    div += '<span class="input-group-btn">';

    div += '<a class="btn btn-info bt_removeAction btn-sm" data-type="watchdogAction"><i class="fa fa-minus-circle"></i></a>';
    div += '</span>';
    div += '<input class="expressionAttr form-control input-sm cmdAction" data-l1key="cmd" data-type="watchdogAction" />';
    div += '<span class="input-group-btn">';
    div += '<a class="btn btn-info btn-sm listAction" data-type="watchdogAction" title="{{Sélectionner un mot-clé}}"><i class="fa fa-tasks"></i></a>';
    div += '<a class="btn btn-info btn-sm listCmdAction" data-type="watchdogAction"><i class="fa fa-list-alt"></i></a>';
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
	
		//console.log("--------- addCmdToTable");

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


		//console.log($('.cmdAttr[data-l1key=configuration][data-l2key=resultat]').value());
		//console.log(_cmd.configuration.resultat);
		//var tr = '<tr class="cmd ' + _cmd.type + '" data-cmd_id="' + init(_cmd.id) + '">';
		switch (_cmd.configuration.resultat) {
		  case 'True':
			var couleur = 'success';
			break;
		  case 'False':
			var couleur = 'danger';
			break;
		  default:
			var couleur = 'warning';
		}
			
		
		//var tr = '<tr class="cmd info" >';
			var tr = '<tr class="cmd info bg-'+couleur+'" >'; //la couleur ne foncitonne pas à cause de info mais on ne peut pas supprimer info
		
		tr += '<td>';
		
		
		
		// Mettre le bouton moins à gauche
   // tr += '<a class="btn btn-info btn-sm" pull-right data-action="remove" cmdAction><i class="fa fa-minus-circle"></i></a>';
   //*************************************************
   
   
   
		tr += '<span class="cmdAttr" data-l1key="id" style="display:none;"></span>';
		tr += '<input class="cmdAttr form-control input-sm" data-l1key="name" style="width : 140px;" placeholder="{{Nom}}">';
		tr += '<span style="display:none;" class="type" type="' + init(_cmd.type) + '">' + jeedom.cmd.availableType() + '</span>';
		tr += '<input class="cmdAttr form-control" type="hidden" data-l1key="subType" value="watchdog">';
		tr += '</td>';
		 tr += '<td>';
		tr += ' <input class="cmdAttr form-control input-sm"  data-type="' + _cmd.type + '" data-l1key="configuration" data-l2key="controle"  style="margin-bottom : 5px;width : 80%; display : inline-block;" >';
		tr += '<a class="btn btn-info btn-sm cursor listCmdInfo" data-type="' + _cmd.type + '"  style="margin-left : 5px;"><i class="fa fa-list-alt "></i></a>';
		tr += '<div hidden class="calcul"><small><i>';
		tr += '<span style="margin-top : 9px; margin-left: 10px; " class="cmdAttr" data-l1key="configuration" data-l2key="calcul"></span></i></small></div>';
		tr += '</td>';   
		 tr += '<td>';
		tr += '<span class="cmdAttr label label-'+couleur+'" style="font-weight: bold;" data-l1key="configuration" data-l2key="resultat"><i class="fa fa-question-circle"></i></span>';
		//tr += '<span class="cmdAttr" style="font-weight: bold;" data-l1key="configuration" data-l2key="resultat"></span>';
		tr += '</td>'; 	
		tr += '<td>';

		tr += '<i class="fa fa-minus-circle pull-right cmdAction cursor" data-action="remove"></i>';
		tr += '</td>';
		tr += '</tr>';
		//tr += '<tr class="bg-warning"><td class="bg-warning">frgthjkl</td></tr>';
		$('#table_controles tbody').append(tr);
		$('#table_controles tbody tr:last').setValues(_cmd, '.cmdAttr');
		if (isset(_cmd.type)) {
			$('#table_controles tbody tr:last .cmdAttr[data-l1key=type]').value(init(_cmd.type));
		}
		//Affiche le sous-type et n'affiche que les champs concernés par le type
		jeedom.cmd.changeType($('#table_controles tbody tr:last'), init(_cmd.subType));
	
}


function saveEqLogic(_eqLogic) {
	
//console.log("--------- saveEqLogic");

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

// On remplit la table_log

    actionOptions = [];
    $('#table_log').empty();


$('#table_log').append('<br><div class="bg-success"><legend><i class="fa fa-cogs"></i> {{Coucou titre}}</legend>');

    if (isset(_eqLogic.configuration.watchdogLog)) {
		
$('#table_log').append('<br><div class="bg-success"><legend><i class="fa fa-cogs"></i> {{Coucou titre}}</legend>');
		
		
	}



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
$('#table_actions').append('<br><div class="bg-success"><legend><i class="fa fa-cogs"></i> {{Actions à executer quand un des contrôles passe à True}}</legend>');
else
$('#table_actions').append('<br><div class="bg-success"><legend><i class="fa fa-cogs"></i> Actions à executer quand le résultat global des contrôles passe à True '+dernierEtat+'</legend>');

        // On va lister en premier les actions qui se déclencheront quand on passera de false à true
		for (var i in _eqLogic.configuration.watchdogAction) {
			if (_eqLogic.configuration.watchdogAction[i].actionType == "True")
			addAction(_eqLogic.configuration.watchdogAction[i])
        }
		
//$('#table_actions').append('</div>');
		
if (typeControl == "")
$('#table_actions').append('<br><div class="bg-danger"><legend><i class="fa fa-cogs"></i> {{Actions à executer quand un des contrôles passe à False}}</legend>');
else
$('#table_actions').append('<br><div class="bg-danger"><legend><i class="fa fa-cogs"></i> Actions à executer quand le résultat global des contrôles passe à False '+dernierEtat+'</legend>');

        // puis les actions qui se déclencheront quand on passera de true à false
        for (var i in _eqLogic.configuration.watchdogAction) {
			if (_eqLogic.configuration.watchdogAction[i].actionType == "False")
			addAction(_eqLogic.configuration.watchdogAction[i])
        } 
		
//$('#table_actions').append('</div>');

$('#table_actions').append('<br><div class="bg-info"><legend><i class="fa fa-cogs"></i> {{Actions à executer AVANT d\'effectuer le contrôle}}</legend>');

        // puis les actions qui se déclencheront quand on passera de true à false
        for (var i in _eqLogic.configuration.watchdogAction) {
			if (_eqLogic.configuration.watchdogAction[i].actionType == "Avant")
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

//console.log("--------- listCmdAction");
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
	//console.log("--------- listAction");
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


//$("body").delegate(".listCmdInfo", 'click', function() {
$("#table_controles").off('click').on('click', ".listCmdInfo",function() {
	
	//console.log("--------- listCmdInfo");

  var eldebut = $(this);
  var expression = $(this).closest('expressionn');
  	var type = $(this).attr('data-type');	  
  	var el = $(this).closest('.' + type).find('.cmdAttr[data-l1key=configuration][data-l2key=controle]');
  	var el_name = $(this).closest('.' + type).find('.cmdAttr[data-l1key=name]');


  
  if (expression.find('.cmdAttr[data-l1key=type]').value() == 'action') {
    type = 'action';
  }



							message = '<form class="form-horizontal" onsubmit="return false;">  <div class="panel-group" id="accordion">    ';
							message += '<div class="panel panel-default">      <div class="panel-heading">        <h4 class="panel-title">            <label for="r11" style="width: 100%;">              <input type="radio" class="conditionAttr" data-l1key="radio" id="r11" value=2 name="choix" checked="checked" required />';
							message += ' Surveiller un équipement';
							message += '<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"></a>            </label>        </h4>      </div>      <div id="collapseOne" class="panel-collapse collapse in">        <div class="panel-body">          <p>';
							message += 'Par exemple : <b>[Cuisine][Détecteur de Présence]</b></div>';
							message += '</p>        </div>      </div>   '; 
							tempo1 = $('.eqLogicAttr[data-l1key=configuration][data-l2key=tempo1]').value()+" secondes"; 
							if (tempo1==" secondes") tempo1='à configurer';
							tempo2 = $('.eqLogicAttr[data-l1key=configuration][data-l2key=tempo2]').value()+" secondes"; 
							if (tempo2==" secondes") tempo2='à configurer';
							tempo3 = $('.eqLogicAttr[data-l1key=configuration][data-l2key=tempo3]').value()+" secondes"; 
							if (tempo3==" secondes") tempo3='à configurer';
							message += '<div class="panel panel-default">      <div class="panel-heading">        <h4 class=panel-title>            <label for="r12" style="width: 100%;">              <input type="radio" id="r12" value=1 name="choix" required />';
							message += " Surveiller la commande d'un équipement";
							message += '<a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"></a>            </label>        </h4>      </div>      <div id="collapseTwo" class="panel-collapse collapse">        <div class="panel-body">          <p>'+
							'Par exemple : <b>[Cuisine][Détecteur de Présence][Présent]</b></div></p>        </div>      </div>    </div>';
							message += '<script>$("#r11").on("click", function(){  $(this).parent().find("a").trigger("click")});$("#r12").on("click", function(){  $(this).parent().find("a").trigger("click")})</script>';
							message += '</div> </div>' ;
							message += '</form> ';

// Lancement de l'écran numéro 1/3	
				  bootbox.dialog({
					title: "{{Que voulez-vous surveiller ?}}",
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
							
					  
					  
	if ($('.conditionAttr[data-l1key=radio]').value() == "1")
		{
		//------------L'utilisateur demande a choisir l'équipement --
		// Lancement de l'écran numéro 2/3	
			 jeedom.eqLogic.getSelectModal({cmd: {}}, function (result) {
					var date = new Date();

					// on va trouver le nom de l'équipement dans result.human
					// exemple :
					// #[Controle Installation][Apple TV]# doit donner Apple TV

					chaine=result.human;
					for (var i = 0; i < chaine.length; i++) {
						test=chaine.substring(i, i+2);
					  if (test=="]["){
						  chaine=chaine.substring(i+2);
						  break;
					  }}
					for (var i = 0; i < chaine.length; i++) {
						test=chaine.substring(i, i+2);
					  if (test=="]#"){
						  chaine=chaine.substring(0,i);
						  break;
					  }}
						
					//vient de desktop/js/scneario.js
					// Texte de l'écran numéro 3/3	
									tempo1 = $('.eqLogicAttr[data-l1key=configuration][data-l2key=tempo1]').value()+" secondes"; 
									if (tempo1==" secondes") tempo1='à configurer';
									tempo2 = $('.eqLogicAttr[data-l1key=configuration][data-l2key=tempo2]').value()+" secondes"; 
									if (tempo2==" secondes") tempo2='à configurer';
									tempo3 = $('.eqLogicAttr[data-l1key=configuration][data-l2key=tempo3]').value()+" secondes"; 
									if (tempo3==" secondes") tempo3='à configurer';							 
									message = '<form class="form-horizontal" onsubmit="return false;">  <div class="panel-group" id="accordion">    ';
									message += '<div class="panel panel-default">      <div class="panel-heading">        <h4 class="panel-title">            <label for="r13" style="width: 100%;">              <input type="radio" class="conditionAttr" data-l1key="radio" id="r11" value=2 name="choix" checked="checked" required />';
									message += ' Tester la dernière communication avec l\'équipement';
									message += '<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"></a>            </label>        </h4>      </div>      <div id="collapseOne" class="panel-collapse collapse in">';
									
									//message += '</p>        </div>      </div>   '; 

									//message += '<div class="panel panel-default">      <div class="panel-heading">        <h4 class=panel-title>            <label for="r12" style="width: 100%;">              <input type="radio" id="r12" value=1 name="choix" required />';
									//message += " Tester la dernière communication avec l\'équipement";
									//message += '<a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"></a>            </label>        </h4>      </div>      <div id="collapseTwo" class="panel-collapse collapse">';
									message += '<div class="panel-body">          <p>'+
									'Tester si le délai depuis la dernière communicvation avec <br><b>'+result.human+'</b> est supérieur à :'+
									'            <div class="col-xs-7">' +
									'              <select class="conditionAttr form-control" data-l1key="choixtempo">' +
									'                       <option value="1">Tempo1 ('+tempo1+')</option>' +
									'                       <option value="2">Tempo2 ('+tempo2+')</option>' +
									'                       <option value="3">Tempo3 ('+tempo3+')</option>' +
									'                       </select>' +
									'                    </div>' +
									'</p>        </div>      </div>    </div>';
									//message += '<script>$("#r11").on("click", function(){  $(this).parent().find("a").trigger("click")});$("#r12").on("click", function(){  $(this).parent().find("a").trigger("click")})</script>';
									message += '<div class="form-group"> ' +
									'             <div class="col-xs-12">' +
									'  <input type="checkbox" style="margin-top : 11px;margin-right : 10px;" class="conditionAttr" data-l1key="configuration" data-l2key="assistName" > Mettre <b>'+chaine+'</b> comme nom au contrôle' +
									'       </div>' +
									'</div><hr>';
									message += '<div class="form-group"> ' +
									'<label class="col-xs-5 control-label" >{{Ensuite}}</label>' +
									'             <div class="col-xs-3">' +
									'                <select class="conditionAttr form-control" data-l1key="next">' +
									'                  <option value="">{{rien}}</option>' +
									'                  <option value="ET">{{et}}</option>' +
									'                  <option value="OU">{{ou}}</option>' +
									'            </select>' +
									'       </div>' +
									'</div>';		
									message += '</div> </div>' ;
									message += '</form> ';

					// Lancement de l'écran numéro 3/3	

						  
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
								  //var test=result.cmd.subType;
								  
								  //console.dir($('.conditionAttr[data-l1key=radio]').value());
								  
									  
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
								  condition = '(#timestamp# - strtotime(lastCommunication(' + condition+"))) > "+choixtempo;

								

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
									 // console.log("condition="+condition);
									 // console.log("chaine="+chaine);
									  el.value(condition);
									// Si la case à cocher qui permet de mettre automatiquement le nom de l'équipement est cochée
									if($('.conditionAttr[data-l1key=configuration][data-l2key=assistName]').value() == '1')
									  el_name.value(chaine);

									  chaineExpressionTest="";
								  

								  }
								  
								  //el.value(condition);
							   }
							  },
							}
						  }); // fin de bootbox.dialog(
					  });	// fin de jeedom.cmd.getSelectModal			
			
		}
	else {
 		//------------L'utilisateur demande a choisir la commande de l'équipement --
		// Lancement de l'écran numéro 2/3	
			 jeedom.cmd.getSelectModal({cmd: {}}, function (result) {
					var date = new Date();

					// on va trouver le nom de l'équipement dans result.human
					// exemple :
					// #[Controle Installation][Apple TV][Statut]# doit donner Apple TV

					chaine=result.human;
					for (var i = 0; i < chaine.length; i++) {
						test=chaine.substring(i, i+2);
					  if (test=="]["){
						  chaine=chaine.substring(i+2);
						  break;
					  }}
					for (var i = 0; i < chaine.length; i++) {
						test=chaine.substring(i, i+2);
					  if (test=="]["){
						  chaine=chaine.substring(0,i);
						  break;
					  }}
						
					//vient de desktop/js/scneario.js
					// Texte de l'écran numéro 3/3	
							 
									message = '<form class="form-horizontal" onsubmit="return false;">  <div class="panel-group" id="accordion">    ';
									message += '<div class="panel panel-default">      <div class="panel-heading">        <h4 class="panel-title">            <label for="r11" style="width: 100%;">              <input type="radio" class="conditionAttr" data-l1key="radio" id="r11" value=2 name="choix" checked="checked" required />';
									message += ' Tester un changement d\'état de la commande';
									message += '<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"></a>            </label>        </h4>      </div>      <div id="collapseOne" class="panel-collapse collapse in">        <div class="panel-body">          <p>';
									message += 'Tester si <b>'+result.human+' </b>est'+
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
									message += '</p>        </div>      </div>   '; 
									tempo1 = $('.eqLogicAttr[data-l1key=configuration][data-l2key=tempo1]').value()+" secondes"; 
									if (tempo1==" secondes") tempo1='à configurer';
									tempo2 = $('.eqLogicAttr[data-l1key=configuration][data-l2key=tempo2]').value()+" secondes"; 
									if (tempo2==" secondes") tempo2='à configurer';
									tempo3 = $('.eqLogicAttr[data-l1key=configuration][data-l2key=tempo3]').value()+" secondes"; 
									if (tempo3==" secondes") tempo3='à configurer';
									message += '<div class="panel panel-default">      <div class="panel-heading">        <h4 class=panel-title>            <label for="r12" style="width: 100%;">              <input type="radio" id="r12" value=1 name="choix" required />';
									message += " Tester la date de la dernière collecte";
									message += '<a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"></a>            </label>        </h4>      </div>      <div id="collapseTwo" class="panel-collapse collapse">        <div class="panel-body">          <p>'+
									'Tester si le délai depuis la dernière mise à jour de <br><b>'+result.human+'</b> est supérieur à :'+
									'            <div class="col-xs-7">' +
									'              <select class="conditionAttr form-control" data-l1key="choixtempo">' +
									'                       <option value="1">Tempo1 ('+tempo1+')</option>' +
									'                       <option value="2">Tempo2 ('+tempo2+')</option>' +
									'                       <option value="3">Tempo3 ('+tempo3+')</option>' +
									'                       </select>' +
									'                    </div>' +
									'</p>        </div>      </div>    </div>';
									message += '<script>$("#r11").on("click", function(){  $(this).parent().find("a").trigger("click")});$("#r12").on("click", function(){  $(this).parent().find("a").trigger("click")})</script>';
									message += '<div class="form-group"> ' +
									'             <div class="col-xs-12">' +
									'  <input type="checkbox" style="margin-top : 11px;margin-right : 10px;" class="conditionAttr" data-l1key="configuration" data-l2key="assistName" > Mettre <b>'+chaine+'</b> comme nom au contrôle' +
									'       </div>' +
									'</div><hr>';
									message += '<div class="form-group"> ' +
									'<label class="col-xs-5 control-label" >{{Ensuite}}</label>' +
									'             <div class="col-xs-3">' +
									'                <select class="conditionAttr form-control" data-l1key="next">' +
									'                  <option value="">{{rien}}</option>' +
									'                  <option value="ET">{{et}}</option>' +
									'                  <option value="OU">{{ou}}</option>' +
									'            </select>' +
									'       </div>' +
									'</div>';		
									message += '</div> </div>' ;
									message += '</form> ';

					// Lancement de l'écran numéro 3/3	

						  
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
								  
								 // console.dir($('.conditionAttr[data-l1key=radio]').value());
								  
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
									// Si la case à cocher qui permet de mettre automatiquement le nom de l'équipement est cochée
									if($('.conditionAttr[data-l1key=configuration][data-l2key=assistName]').value() == '1')
									  el_name.value(chaine);

									  chaineExpressionTest="";
								  

								  }
								  
								  //el.value(condition);
							   }
							  },
							}
						  }); // fin de bootbox.dialog(
					  });	// fin de jeedom.cmd.getSelectModal
		}
  
  // Début Fermeture des parenthèses et accolades du premier bootbox.dialog
					   }
					  },
					}
				  });
// Fin Fermeture des parenthèses et accolades du premier bootbox.dialog
  
  
  });



