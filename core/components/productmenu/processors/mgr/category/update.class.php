<?php
/**
 * Update a Category
 * 
 * @package productmenu
 * @subpackage processors
 */

class ProductMenuCategoryUpdateProcessor extends modObjectUpdateProcessor {
    public $classKey = 'ProductMenuCategory';
    public $languageTopics = array('productmenu:default');
    public $objectType = 'productmenu.categories';

    public function beforeSet() {
        $name = $this->getProperty('name');

        if (empty($name)) {
            $this->addFieldError('name',$this->modx->lexicon('productmenu.categories.category_err_ns_name'));

        } else if ($this->modx->getCount($this->classKey, array('name' => $name)) && ($this->object->name != $name)) {
            $this->addFieldError('name',$this->modx->lexicon('productmenu.categories.category_err_ae'));
        }
        return parent::beforeSave();
    }

}
return 'ProductMenuCategoryUpdateProcessor';