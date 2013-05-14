<?php
/**
 * ProductMenu Connector
 *
 * @package productmenu
 */
require_once dirname(dirname(dirname(dirname(__FILE__)))).'/config.core.php';
require_once MODX_CORE_PATH.'config/'.MODX_CONFIG_KEY.'.inc.php';
require_once MODX_CONNECTORS_PATH.'index.php';

$corePath = $modx->getOption('productmenu.core_path',null,$modx->getOption('core_path').'components/productmenu/');
require_once $corePath.'model/productmenu/productmenu.class.php';
$modx->productmenu = new ProductMenu($modx);

$modx->lexicon->load('productmenu:default');

/* handle request */
$path = $modx->getOption('processorsPath',$modx->productmenu->config,$corePath.'processors/');
$modx->request->handleRequest(array(
    'processors_path' => $path,
    'location' => '',
));