<?php
/**
 * Create a Category
 * 
 * @package productmenu
 * @subpackage processors
 */
class ProductMenuCategoryCreateProcessor extends modObjectCreateProcessor {
    public $classKey = 'ProductMenuCategory';
    public $languageTopics = array('productmenu:default');
    public $objectType = 'productmenu.categories';

    public function beforeSet(){
        $count = $this->modx->getCount($this->classKey);

        $this->setProperty('position', $count);

        return parent::beforeSet();
    }

    public function beforeSave() {
        $name = $this->getProperty('name');

        if (empty($name)) {
            $this->addFieldError('name',$this->modx->lexicon('productmenu.categories.category_err_ns_name'));
        } else if ($this->doesAlreadyExist(array('name' => $name))) {
            $this->addFieldError('name',$this->modx->lexicon('productmenu.categories.category_err_ae'));
        }
        return parent::beforeSave();
    }
}
return 'ProductMenuCategoryCreateProcessor';
