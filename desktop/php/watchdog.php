<?php
if (!isConnect('admin')) {
	throw new Exception('{{401 - Accès non autorisé}}');
}
$plugin = plugin::byId('watchdog');
sendVarToJS('eqType', $plugin->getId());
$eqLogics = eqLogic::byType($plugin->getId());
?>

<div class="row row-overflow">


    <div class="col-lg-2 col-md-3 col-sm-4">
        <div class="bs-sidebar">
            <ul id="ul_eqLogic" class="nav nav-list bs-sidenav">
                <a class="btn btn-default eqLogicAction" style="width : 100%;margin-top : 5px;margin-bottom: 5px;" data-action="add"><i class="fa fa-plus-circle"></i> {{Ajouter un watchdog}}</a>
                <li class="filter" style="margin-bottom: 5px;"><input class="filter form-control input-sm" placeholder="{{Rechercher}}" style="width: 100%"/></li>
                <?php
foreach ($eqLogics as $eqLogic) {
	echo '<li class="cursor li_eqLogic" data-eqLogic_id="' . $eqLogic->getId() . '"><a>' . $eqLogic->getHumanName(true) . '</a></li>';
}
?>
           </ul>
       </div>
   </div>






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
  <li role="presentation" class="active"><a href="#eqlogictab" aria-controls="home" role="tab" data-toggle="tab"><i class="fa fa-tachometer"></i> {{Watchdog}}</a></li>
  <li role="presentation"><a href="#infotab" aria-controls="profile" role="tab" data-toggle="tab"><i class="fa fa-list-alt"></i> {{Equipements à surveiller}}</a></li>
  <li role="presentation"><a href="#infocmd" aria-controls="profile" role="tab" data-toggle="tab"><i class="fa fa-list-alt"></i> {{Commandes}}</a></li>
</ul>


  <div class="tab-content" style="height:calc(100% - 50px);overflow:auto;overflow-x: hidden;">
		<div role="tabpanel" class="tab-pane active" id="eqlogictab">  
            <form class="form-horizontal">
                <fieldset>
                	<br />
                    <div class="form-group">
                        <label class="col-md-2 control-label">{{Nom du Watchdog}}</label>
                        <div class="col-sm-6">
                            <input type="text" class="eqLogicAttr form-control" data-l1key="id" style="display : none;" />
                            <input type="text" class="eqLogicAttr form-control" data-l1key="name" placeholder="{{Nom de l'équipement watchdog}}"/><br>
                        Le nom correspond au type d'équipements que vous souhaitez surveiller (exemple : <B>Nuts</B>, <B>Capteurs de mouvement</B>, ...)</div>
                    </div>					
                    <div class="form-group">
                        <label class="col-md-2 control-label" >{{Objet parent}}</label>
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
                  <label class="col-md-2 control-label">{{Catégorie}}</label>
                  <div class="col-md-8">
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
                  <label class="col-md-2 control-label" >{{Activer}}</label>
                  <div class="col-md-1">
                    <input type="checkbox" class="eqLogicAttr checkbox-inline" data-label-text="{{Activer}}" data-l1key="isEnable" checked/>
                  </div>
                  <label class="col-md-2 control-label prog_visible" >{{Visible}}</label>
                  <div class="col-md-1 prog_visible">
                    <input type="checkbox" class="eqLogicAttr checkbox-inline" data-label-text="{{Visible}}" data-l1key="isVisible" checked/>
                  </div>
                </div>
        </fieldset>
        </form>
           
        </div>
        
         <div role="tabpanel" class="tab-pane" id="infotab">      	      	
             <form class="form-horizontal">
            
      
		<a class="btn btn-success btn-sm cmdAction btAdd_table_cmd pull-right" data-action="addCmd" style="margin-top:5px;"> <i class="fa fa-plus-circle"></i> {{Ajouter un équipement}}</a>
    <br/><br/>
		

                <table id="table_cmd" class="table table-bordered table-condensed ui-sortable table_cmd">
                    <thead>
                        <tr>
                            <th style="width: 10%;">{{Nom}}</th>
                            <th  class="etat" >{{Commande Etat}}</th>
                            <th style="width: 5%;">{{Inverser}}</th>
                            <th style="width: 5%;">{{Effacer}}</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>  
                
             
              <div class="form-group"> 
                <label class="col-sm-1 control-label">{{Commande ON}}</label>
                <div class="col-sm-10">
                    <input type="text" class="eqLogicAttr form-control" data-l1key="configuration" data-l2key='nameOn' placeholder="{{Nom}} " />
                </div>
                <div class="col-sm-6">
                <span style="font-size: 75%;">{{Nom de la commande qui apparait dans la modale}}</span>
                </div> 
                
               </div>

              <div class="form-group"> 
                <label class="col-sm-1 control-label">{{Commande OFF}}</label>
                <div class="col-sm-1">
                    <input type="text" class="eqLogicAttr form-control" data-l1key="configuration" data-l2key='nameOff' placeholder="{{Nom}} " />
                </div>
                <div class="col-sm-6">
                <span style="font-size: 75%;">{{Nom de la commande qui apparait dans la modale}}</span>
                </div>                 
                
                
               </div>
                              
             <div class="form-group"> 
                <label class="col-sm-1 control-label">{{Icône On}}</label>
                
                <div id="div_on">
                    <div class="icone">
                         <div class="col-sm-2">
                            <a class="iconeOn btn btn-default btn-sm" data-l1key="chooseIcon"><i class="fa fa-flag"></i> {{Icône}}</a>
                            <span class="eqLogicAttr iconeAttrOn label label-info cursor"  data-l1key="configuration" data-l2key="iconOn"  style="font-size : 1em;" ></span>
                         </div>                  
                     </div>
                </div>  
            </div> 
               
			<div class="form-group">
            <label class="col-sm-1 control-label">{{Icône Off}}</label>
                <div id="div_off">
                    <div class="icone">
                         <div class="col-sm-2">
                            <a class="iconeOff btn btn-default btn-sm" data-l1key="chooseIcon"><i class="fa fa-flag"></i> {{Icône}}</a>
                            <span class="eqLogicAttr iconeAttrOff label label-info cursor" data-l1key="configuration" data-l2key="iconOff"  style="font-size : 1em;" ></span>
                         </div>                   
                     </div>
                </div>
            </div>
            <br/>
		</form>
		</div>
        
       <div role="tabpanel" class="tab-pane" id="infocmd">  
          <table style="width: 400px" id="table_info" class="table table-bordered table-condensed">
              <thead>
                  <tr>
                      <th>{{Nom}}</th>
                      <th>{{Action}}</th>
                  </tr>
              </thead>
              <tbody>
              </tbody>
          </table>             
       
       </div>
	</div>
</div>
</div>

<?php include_file('desktop', 'watchdog', 'js', 'watchdog');?>
<?php include_file('core', 'plugin.template', 'js');?>
