<?php

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
 use Symfony\Component\ExpressionLanguage\ExpressionLanguage;

/* * ***************************Includes********************************* */
require_once __DIR__  . '/../../../../core/php/core.inc.php';



class watchdog extends eqLogic {
    /*     * *************************Attributs****************************** */



    /*     * ***********************Methode static*************************** */
//public static $_boucleEnCours = "99999999";
//public static $_boucleEnCours="dd";

 /* public static function boucleEnCours()
  {
	  //$_boucleEnCours = "99999999";
     return $_boucleEnCours; //c'est là que je coince (est-ce possible au moins ?)
  }
*/
    /*
     * Fonction exécutée automatiquement toutes les minutes par Jeedom
      public static function cron() {

      }
     */


    /*
     * Fonction exécutée automatiquement toutes les heures par Jeedom
      public static function cronHourly() {

      }
     */

    /*
     * Fonction exécutée automatiquement tous les jours par Jeedom
      public static function cronDaily() {

      }
     */



    /*     * *********************Méthodes d'instance************************* */

    public function preInsert() {
 	log::add('watchdog','debug','[eqLogic] preInsert de '.$this->getName());        


		$this->setIsEnable(1);
		$this->setIsVisible(1);
		$this->setConfiguration('autorefresh', '*/5 * * * *');
    }

    public function postInsert() {
 	log::add('watchdog','debug','[eqLogic] postInsert de '.$this->getName());        
        
    }

    public function preSave() {
 	log::add('watchdog','debug','[eqLogic] preSave de '.$this->getName());	
	$this->setConfiguration('dernierLancement','SAVE '.date("d.m.Y")." ".date("H:i:s"));

	$typeControl= $this->getConfiguration('typeControl');

	$traceleCalcul="Calcul : Init à ";
	
	if ($typeControl=="ET") {
		$leResultatdelaBoucle=true;
	}
	else {
		$leResultatdelaBoucle=false;
	}
	
					//On passe toutes les commandes de l'eqLogic pour calculer le résultat global des tests
					foreach ($this->getCmd('info') as $cmd) {
						//$cmd->save();// On lance un save pour que la commande $cmd soit testée, ce sera finalement fait deux fois mais ce test est obligatoire avant le résultat global
						$leResultat=$cmd->getConfiguration('resultat');
						//log::add('watchdog', 'debug', '------->>>>>>> Le grand test :'.$leResultat);
						//2 lignes inutiles car le controle se fait déja au moment de preSave
						//$resultat=$cmd->faireTestExpression($cmd->getConfiguration('controle'));
						//$cmd->setConfiguration('resultat', $resultat);
						if ($leResultat == "True" || $leResultat == "False"){
							//Résultat valide, on continue le test
							if ($typeControl=="ET") {
								if ($leResultat == "False")	$leResultatdelaBoucle=false; // On est sur une fonction ET
							}
							else {
								if ($leResultat == "True")	$leResultatdelaBoucle=true; // On est sur une fonction OU
							}
						}
					}	
		if ($leResultatdelaBoucle) $leResultatdelaBoucle = 'True';
		else $leResultatdelaBoucle = 'False';
		
		//---------------------------------------------------
		// On va chercher si on est en SAUVEGARDE ou en CRON
			$dernierLancement=$this->getConfiguration('dernierLancement');
			$dernierLancement=substr($dernierLancement, 0, 4);
		//---------------------------------------------------
		
		$resultatPrecedent=$this->getConfiguration('dernierEtat');
		$this->setConfiguration('dernierEtat', $leResultatdelaBoucle);
       	
		if (($resultatPrecedent != $leResultatdelaBoucle) && ($dernierLancement =="CRON"))
			self::trigger($leResultatdelaBoucle);
    }

    public function postSave() {
 	log::add('watchdog','debug','[eqLogic] postSave de '.$this->getName());        
    }

    public function preUpdate() {
 	log::add('watchdog','debug','[eqLogic] preUpdate de '.$this->getName());        
       
    }

    public function postUpdate() {
 	log::add('watchdog','debug','[eqLogic] postUpdate de '.$this->getName());        
        
    }

    public function preRemove() {
 	log::add('watchdog','debug','[eqLogic] preRemove de '.$this->getName());        
        
    }

    public function postRemove() {
 	log::add('watchdog','debug','[eqLogic] postRemove de '.$this->getName());        
        
    }
	
	public function lancerControle($watchdog) {
		//set_boucleEnCours("7888885613");
		foreach ($watchdog->getCmd('info') as $cmd) {
					log::add('watchdog', 'debug', 'lancerControle '.$cmd->getName());
					//2 lignes inutiles car le controle se fait déja au moment de preSave
					//$resultat=$cmd->faireTestExpression($cmd->getConfiguration('controle'));
					//$cmd->setConfiguration('resultat', $resultat);
					$cmd->save();
				}
	}
		
	public function trigger($passe) {
		// La fonction trigger est appellé sur le résultat général des controles, on ne fait rien si on est en mode "Actions sur chaque cvontrole indépendamment"
	$typeControl= $this->getConfiguration('typeControl');
		if ($typeControl !="") {
			
			log::add('watchdog','debug','******************[eqLogic] triggerPasse à '.$passe.' de '.$this->getName());   
			
				foreach ($this->getConfiguration("watchdogAction") as $action) {
					try {
							$options = [];
							if (isset($action['options'])) $options = $action['options'];
												
						
					if (($action['actionType'] == $passe) && $options['enable'] == '1'){
						log::add('watchdog','debug','Lancement de : '.$action['cmd']);   
						scenarioExpression::createAndExec('action', $action['cmd'], $options);
					}					
					} catch (Exception $e) {
						log::add('watchdog', 'error', __('function trigger : Erreur lors de l\'éxecution de ', __FILE__) . $action['cmd'] . __('. Détails : ', __FILE__) . $e->getMessage());
					}
					
				}
		}
	}



		
	
	public static function update() {
		


//Mettre self: ??
		//set_boucleEnCours("79845613");
		foreach (self::byType('watchdog') as $watchdog) {
			$autorefresh = $watchdog->getConfiguration('autorefresh');
			$watchdog->setConfiguration('dernierLancement','CRON '.date("d.m.Y")." ".date("H:i:s"));
			if ($watchdog->getIsEnable() == 1 && $autorefresh != '') {
				try {
					$c = new Cron\CronExpression($autorefresh, new Cron\FieldFactory);
					if ($c->isDue()) {
						try {
							//$watchdog->setConfiguration('boucleEnCours', "CRON");

							//$_boucleEnCours="CRON";
							log::add('watchdog','debug','----------------');
							log::add('watchdog','debug','Lancement CRON '.$watchdog->getName());
							$watchdog->lancerControle($watchdog);
						} catch (Exception $exc) {
							log::add('watchdog', 'error', __('Erreur pour ', __FILE__) . $watchdog->getHumanName() . ' : ' . $exc->getMessage());
						}
					}
				} catch (Exception $exc) {
					log::add('watchdog', 'error', __('Expression cron non valide pour ', __FILE__) . $watchdog->getHumanName() . ' : ' . $autorefresh);
				}
			$watchdog->save();
			}
		}
	}
	    public function execute($_options = array()) {
 	log::add('watchdog','debug','[eqLogic] execute de '.$this->getName());        
    }

    /*
     * Non obligatoire mais permet de modifier l'affichage du widget si vous en avez besoin
      public function toHtml($_version = 'dashboard') {

      }
     */

    /*
     * Non obligatoire mais ca permet de déclencher une action après modification de variable de configuration
    public static function postConfig_<Variable>() {
    }
     */

    /*
     * Non obligatoire mais ca permet de déclencher une action avant modification de variable de configuration
    public static function preConfig_<Variable>() {
    }
     */

    /*     * **********************Getteur Setteur*************************** */
}

class watchdogCmd extends cmd {
    /*     * *************************Attributs****************************** */


    /*     * ***********************Methode static*************************** */

/*public static $_boucleEnCours="dd789765";
  public static function get_boucleEnCours()
  {
	  //$_boucleEnCours = "99999999";
     return $_boucleEnCours; //c'est là que je coince (est-ce possible au moins ?)
  }
    public static function set_boucleEnCours($valeur)
  {
	  $_boucleEnCours = $valeur;
  }
  */
public function faireTestExpression($_string) {	

		$scenario = null;
		//---------------------------------------------------
		// On va chercher les valeurs de tempo 1 2 et 3
			$eqLogic = $this->getEqLogic();
			$tempo1=$eqLogic->getConfiguration('tempo1');
			$tempo2=$eqLogic->getConfiguration('tempo2');
			$tempo3=$eqLogic->getConfiguration('tempo3');			
		//---------------------------------------------------
			$_string = str_replace("#tempo1#", $tempo1, $_string);
			$_string = str_replace("#tempo2#", $tempo2, $_string);
			$_string = str_replace("#tempo3#", $tempo3, $_string);

	//$_boucleEnCours="8541";
		$return = evaluate(scenarioExpression::setTags(jeedom::fromHumanReadable($_string), $scenario, true));
				if (is_bool($return)) {
					if ($return) $return = 'True';
					 else $return = 'False';
				}
				
					//	phpQuery::$documents[$documentID]->dataNodes[] = $node;

		//log::add('watchdog','debug','>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  : ' . eqLogic::$_boucleEnCours);
		
		
		
		
		log::add('watchdog','debug','Controle : ' . $_string.' => Resultat : ' . $return);
		return $return;
}


	public function triggerEquip($passe) {
	$eqLogic = $this->getEqLogic();
	$typeControl= $eqLogic->getConfiguration('typeControl');
	
		if ($typeControl == "") {
		// La fonction trigger est appellé sur le résultat général des controles, on ne fait rien si on n'est pas en mode "Actions sur chaque cvontrole indépendamment"
			
	log::add('watchdog','debug','******************[TriggerEquip] '.$this->getName().' à '.$passe);   
			
				foreach ($eqLogic->getConfiguration("watchdogAction") as $action) {
					try {
							$options = [];
							if (isset($action['options'])) $options = $action['options'];
					if (($action['actionType'] == $passe) && $options['enable'] == '1'){
								// On va remplacer #name# par le nom du controle dans tous les champs du array "options"
								foreach ($options as $key => $option) {
									$options[$key]=str_replace("#name#", $this->getName(), $option);
								}

						// Rustine pour l'envoi à Pushover, l'option enable:1 donne un message d'erreur, donc je force enable à 0 (cette valeur vient de la case à cocher)
						//$options['enable'] = "0";
						
						log::add('watchdog','debug','Exécution de la commande ' . $action['cmd'] . " avec comme option(s) : ". json_encode($options));
						scenarioExpression::createAndExec('action', $action['cmd'], $options);
					}					
					} catch (Exception $e) {
						log::add('watchdog', 'error', __('function trigger : Erreur lors de l\'éxecution de ', __FILE__) . $action['cmd'] . __('. Détails : ', __FILE__) . $e->getMessage());
					}
					
				}
		}
	}


    /*     * *********************Methode d'instance************************* */
    public function preInsert() {
 	log::add('watchdog','debug','[cmd] preInsert de '.$this->getName());        

    }

    public function postInsert() {
 	log::add('watchdog','debug','[cmd] postInsert de '.$this->getName());        
        
    }

    public function preSave() {
 	log::add('watchdog','debug','[cmd] preSave de '.$this->getName());
		//$_boucleEnCours="1";
	if ($this->getType() == 'action') return; //On ne fait pas le test si c'est une Commande Action		
			
			
		//---------------------------------------------------
		// On va chercher si on est en SAUVEGARDE ou en CRON
			$eqLogic = $this->getEqLogic();
			$dernierLancement=$eqLogic->getConfiguration('dernierLancement');
			$dernierLancement=substr($dernierLancement, 0, 4);
		//---------------------------------------------------

				
				$resultatPrecedent=$this->getConfiguration('resultat');
				$resultat=self::faireTestExpression($this->getConfiguration('controle'));
				$this->setConfiguration('resultat', $resultat);
				
				if ($resultatPrecedent != $resultat)
				{
				// Si le résultat a changé, il faut actualiser le calcul du résultat global, pour cela, on utilise la variable cmd.configuration.aChange qui traitera le calcul dans postSave
				$this->setConfiguration('aChange', true);
						//On ne va lancer le trigger que si on est en mode CRON et pas si on est en mode SAVE
						if ($dernierLancement =="CRON") 
							$this->triggerEquip($resultat);			
				}
			
    }

    public function postSave() {
 	log::add('watchdog','debug','[cmd] postSave de '.$this->getName()); 
	
	if ($this->getConfiguration('aChange')) {
		// Cette boucle est déclenchée quand le résultat du controle a changé, il faut ainsi relancer le save du resultat global
		$this->setConfiguration('aChange', false);		
		$this->save();	
		$this->getEqLogic()->save(); //enregistre l'équipement entier (et donc le resultat global des controles)
	}
		
	
        
    }

    public function preUpdate() {
 	log::add('watchdog','debug','[cmd] preUpdate de '.$this->getName());        
       
    }

    public function postUpdate() {
 	log::add('watchdog','debug','[cmd] postUpdate de '.$this->getName());        
        
    }

    public function preRemove() {
 	log::add('watchdog','debug','[cmd] preRemove de '.$this->getName());        
        
    }

    public function postRemove() {
 	log::add('watchdog','debug','[cmd] postRemove de '.$this->getName());        
        
    }


    /*
     * Non obligatoire permet de demander de ne pas supprimer les commandes même si elles ne sont pas dans la nouvelle configuration de l'équipement envoyé en JS
      public function dontRemoveCmd() {
      return true;
      }
     */

    public function execute($_options = array()) {
 	log::add('watchdog','debug','[cmd] execute de '.$this->getName());        
    }

    /*     * **********************Getteur Setteur*************************** */
}


