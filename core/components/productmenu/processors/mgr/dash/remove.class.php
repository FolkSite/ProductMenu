<?php
/**
 * Remove a Dash.
 * 
 * @package productmenu
 * @subpackage processors
 */
class ProductMenuDashRemoveProcessor extends modObjectRemoveProcessor {
    public $classKey = 'ProductMenuDash';
    public $languageTopics = array('productmenu:default');
    public $objectType = 'productmenu';
}
return 'ProductMenuDashRemoveProcessor';