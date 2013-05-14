<?php
/**
 * Update a Dash
 * 
 * @package productmenu
 * @subpackage processors
 */

class ProductMenuUpdateProcessor extends modObjectUpdateProcessor {
    public $classKey = 'ProductMenuDash';
    public $languageTopics = array('productmenu:default');
    public $objectType = 'productmenu';

    public function beforeSet() {
        $name = $this->getProperty('name');

        if (empty($name)) {
            $this->addFieldError('name',$this->modx->lexicon('productmenu.dash_err_ns_name'));

        }

        return parent::beforeSave();
    }

}
return 'ProductMenuUpdateProcessor';