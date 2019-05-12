<?php
if (!isConnect('admin')) {
	throw new Exception('{{401 - Accès non autorisé}}');
}
$plugin = plugin::byId('watchdog');
sendVarToJS('eqType', $plugin->getId());
$eqLogics = eqLogic::byType($plugin->getId());

// https://jeedom-facile.fr/index.php/2018/12/18/la-surveillance-de-vos-equipements-domotiques/
// http://sarakha63-domotique.fr/surveillance-equipement-z-wave-xiaomi-blea/

?>

<div class="row row-overflow">
   <div class="col-xs-12 eqLogicThumbnailDisplay">
  <legend><i class="fas fa-cog"></i>  {{Gestion}}</legend>
  <div class="eqLogicThumbnailContainer">
      <div class="cursor eqLogicAction logoPrimary" data-action="add">
        <i class="fas fa-plus-circle"></i>
        <br>
        <span>{{Ajouter}}</span>
    </div>
      <div class="cursor eqLogicAction logoSecondary" data-action="gotoPluginConf">
      <i class="fas fa-wrench"></i>
    <br>
    <span>{{Configuration}}</span>
  </div>
  </div>
  <legend><i class="fas fa-table"></i> {{Mes watchdogs}}</legend>
	   <input class="form-control" placeholder="{{Rechercher}}" id="in_searchEqlogic" />
<div class="eqLogicThumbnailContainer">
    <?php
foreach ($eqLogics as $eqLogic) {
	
	$typeControl= $eqLogic->getConfiguration('typeControl');
	
	$opacity = ($eqLogic->getIsEnable()) ? '' : 'disableCard';
	echo '<div class="eqLogicDisplayCard cursor '.$opacity.'" data-eqLogic_id="' . $eqLogic->getId() . '">';
	echo '<img src="' . $plugin->getPathImgIcon() . '"/>';
	echo '<br>';
	echo '<span class="name">' . $eqLogic->getHumanName(true, true) . '</span>';
	echo '</div>';
}
?>
</div>
</div>

<div class="col-xs-12 eqLogic" style="display: none;">
		<div class="input-group pull-right" style="display:inline-flex">
			<span class="input-group-btn">
				<a class="btn btn-default btn-sm eqLogicAction roundedLeft" data-action="configure"><i class="fa fa-cogs"></i> {{Configuration avancée}}</a><a class="btn btn-default btn-sm eqLogicAction" data-action="copy"><i class="fas fa-copy"></i> {{Dupliquer}}</a><a class="btn btn-sm btn-success eqLogicAction" data-action="save"><i class="fas fa-check-circle"></i> {{Sauvegarder}}</a><a class="btn btn-danger btn-sm eqLogicAction roundedRight" data-action="remove"><i class="fas fa-minus-circle"></i> {{Supprimer}}</a>
			</span>
		</div>
		
		
		
		
	      <!-- Liste des onglets -->
	
		
 <ul class="nav nav-tabs" role="tablist">
  <li role="presentation"><a href="#" class="eqLogicAction" aria-controls="home" role="tab" data-toggle="tab" data-action="returnToThumbnailDisplay"><i class="fa fa-arrow-circle-left"></i></a></li>
  <li role="presentation" class="active"><a href="#eqlogictab" aria-controls="home" role="tab" data-toggle="tab"><i class="fa fa-list-alt"></i> {{Watchdog}}</a></li>
  <li role="presentation"><a href="#controlestab" aria-controls="profile" role="tab" data-toggle="tab"><i class="fa fa-tachometer"></i> {{Equipements à surveiller}}</a></li>
  <li role="presentation"><a href="#infocmd" aria-controls="profile" role="tab" data-toggle="tab"><i class="fa fa-cogs"></i> {{Commandes}}</a></li>
</ul>

  <div class="tab-content">
<!--   <div class="tab-content" style="height:calc(100% - 50px);overflow:auto;overflow-x: hidden;"> -->
    <div role="tabpanel" class="tab-pane active" id="eqlogictab">
    <form class="form-horizontal"><br>
        <fieldset>
		
<br><legend><i class="fa animal-dog56"></i> {{Identification et options du watchdog}}</legend>

            <div class="form-group">
                <label class="col-sm-3 control-label">{{Nom du watchdog}}</label>
                <div class="col-sm-3">
                    <input type="text" class="eqLogicAttr form-control" data-l1key="id" style="display : none;" />
                    <input type="text" class="eqLogicAttr form-control" data-l1key="name" placeholder="{{Nom de l'équipement watchdog}}"/>
                </div>
            </div>
			
			
            <div class="form-group">
                <label class="col-sm-3 control-label" >{{Objet parent}}</label>
                <div class="col-sm-3">
                    <select id="sel_object" class="eqLogicAttr form-control" data-l1key="object_id">
                        <option value="">{{Aucun}}</option>
                        <?php
foreach (object::all() as $object) {
	echo '<option value="' . $object->getId() . '">' . $object->getName() . '</option>';
}
?>
                   </select>
               </div>
           </div>
	   <div class="form-group">
                <label class="col-sm-3 control-label">{{Catégorie}}</label>
                <div class="col-sm-9">
                 <?php
                    foreach (jeedom::getConfiguration('eqLogic:category') as $key => $value) {
                    echo '<label class="checkbox-inline">';
                    echo '<input type="checkbox" class="eqLogicAttr" data-l1key="category" data-l2key="' . $key . '" />' . $value['name'];
                    echo '</label>';
                    }
                  ?>
               </div>
           </div>

	<div class="form-group">
		<label class="col-sm-3 control-label"></label>
		<div class="col-sm-9">
			<label class="checkbox-inline"><input type="checkbox" class="eqLogicAttr" data-l1key="isEnable" checked >{{Activer}}</label>
			<label class="checkbox-inline"><input type="checkbox" class="eqLogicAttr" data-l1key="isVisible" checked >{{Visible}}</label>
		</div>
	</div>
	<br><br>
	
			<div class="form-group">
			<label class="col-xs-3 control-label">{{Auto-actualisation (cron)}}</label>
				<div class="col-xs-2">
					<div class="input-group">
					<input type="text" class="eqLogicAttr form-control" data-l1key="configuration" data-l2key="autorefresh" placeholder="{{Auto-actualisation (cron)}}"/>
					<span class="input-group-btn">
					<a class="btn btn-success btn-sm " id="bt_cronGenerator" ><i class="fas fa-question-circle"></i></a>
					</span>
					</div>
				</div>
			</div>
			
			
			
			


	
<br><legend><i class="fa fa-list-alt"></i> {{Mode de fonctionnement}}</legend>
	<div class="alert alert-info">
	Il existe trois modes de fonctionnement  : <br>
	* Actions sur chaque contrôle indépendamment : Ce mode teste indépendamment chaque contrôle et déclenche les actions quand ce contrôle a changé d'état<br>
	* Actions sur l'ensemble des contôles (avec méthode OU) : Ce mode teste le résultat global des contrôles en y appliquant un test "OU" entre chaque contrôle. Il déclenche les actions quand le résultat global a changé d'état.<br>
	* Actions sur l'ensemble des contôles (avec méthode ET) : Ce mode teste le résultat global des contrôles en y appliquant un test "ET" entre chaque contrôle. Il déclenche les actions quand le résultat global a changé d'état.	</div>				
			<div class="form-group">
                <label class="col-sm-3 control-label" >{{Mode de fonctionnement des contrôles}}</label>
                <div class="col-sm-3">
                    <select id="sel_object" class="eqLogicAttr form-control" data-l1key="configuration" data-l2key="typeControl">
<option value="">{{Actions sur chaque contrôle indépendamment}}</option>
<option value="OU">{{Actions sur l'ensemble des contôles (avec méthode OU)}}</option>
<option value="ET">{{Actions sur l'ensemble des contôles (avec méthode ET)}}</option>
                   </select>
               </div>
           </div>
		
			
	
	
</fieldset>
</form>
</div>
      <div role="tabpanel" class="tab-pane" id="controlestab">

<br><legend><i class="fa fa-tachometer"></i> {{Contrôles à effectuer}}</legend>
<a class="btn btn-success btn-sm bt_addControle pull-left" data-type="action" style="margin-top:5px;"><i class="fa fa-plus-circle"></i> {{Ajouter un contrôle}}</a><br>
<table id="table_controles" class="table  table-condensed ui-sortable table_controles">

    <thead>
        <tr>
            <th style="width: 200px;">{{Nom}}</th>
			<th>{{Controle}}</th>
			<th style="width: 100px;">{{Résultat}}</th>
			<th style="width: 100px;"{{Action}}</</th>
        </tr>
    </thead>
    <tbody>
    </tbody>

</table>
<?php
if ($typeControl!="")
{?>
<br>
<br><legend><i class="fa loisir-weightlift"></i> {{Résultat global des contrôles, méthode <?php print $typeControl;?>}}</legend>
<table id="table_controles_resultat" class="table  table-condensed ui-sortable table_controles_resultat">


</table>
<?php } ?>
<br>
<legend><i class="fa fa-clock-o"></i> {{Configuration des tempos}}</legend>
<div class="alert alert-info">
        Les tempos peuvent être utilisées pour faire des tests lors d'un contôle  : <br/>
        #tempo1# = Valeur en secondes  => mettre #tempo1# pour récupérer la valeur
        </div>
<table border="0">
<tbody>
<tr>
<td style="text-align: right; width: 100px;"><b>tempo1  : </b></td>
<td><input style="width: 100px;" type="text" class="eqLogicAttr form-control" data-l1key="configuration" data-l2key='tempo1' placeholder="{{En secondes}} "/></td>
<td style="text-align: right; width: 100px;"><b>tempo2 : </b></td>
<td><input style="width: 100px;" type="text" class="eqLogicAttr form-control" data-l1key="configuration" data-l2key='tempo2' placeholder="{{En secondes}} "/></td>
<td style="text-align: right; width: 100px;"><b>tempo3 : </b></td>
<td><input style="width: 100px;" type="text" class="eqLogicAttr form-control" data-l1key="configuration" data-l2key='tempo3' placeholder="{{En secondes}} "/></td>
</tr>
<tr>
<td></td>
<td><em>(en secondes)</em></td>
<td></td>
<td><em>(en secondes)</em></td>
<td></td>
<td><em>(en secondes)</em></td>
</tr>
</tbody>
</table>

</div>
       <div role="tabpanel" class="tab-pane" id="infocmd">
	   <?php
if ($typeControl=="")
{?>
<div class="alert alert-info">
        En mode "Actions sur chaque contrôle indépendamment"  : <br/>
        #name# = Nom du contrôle qui a déclenché l'action => mettre #name# pour récupérer la valeur
        </div>
		<?php } ?>
		<a class="btn btn-success btn-sm bt_addAction pull-left" style="margin-top:5px;"><i class="fa fa-plus-circle"></i> {{Ajouter une commande}}</a><br><br>
		
		<form class="form-horizontal">
			<div id="table_actions"></div>
		</form>
		
		
       </div>
</div>
</div>

<?php include_file('desktop', 'watchdog', 'js', 'watchdog');?>
<?php include_file('core', 'plugin.template', 'js');?>
