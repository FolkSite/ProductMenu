<?php
/**
 * Create a Dash
 * 
 * @package productmenu
 * @subpackage processors
 */
class ProductMenuDashCreateProcessor extends modObjectCreateProcessor {
    public $classKey = 'ProductMenuDash';
    public $languageTopics = array('productmenu:default');
    public $objectType = 'productmenu';

    public function beforeSet(){
        $category = $this->getProperty('category');

        if (empty($category)) {
            $this->addFieldError('category',$this->modx->lexicon('productmenu.dash_err_ns_category'));
            return parent::beforeSet();
        }
        $items = $this->modx->getCollection($this->classKey, array('category' => $category));

        $this->setProperty('position', count($items));

        return parent::beforeSet();
    }

    public function beforeSave() {
        $name = $this->getProperty('name');
        $category = $this->getProperty('category');
        $price = $this->getProperty('price');

        if (empty($name)) {
            $this->addFieldError('name',$this->modx->lexicon('productmenu.dash_err_ns_name'));
        }

        if (empty($category)) {
            $this->addFieldError('category',$this->modx->lexicon('productmenu.dash_err_ns_category'));
        }

        if (empty($price)) {
            $this->addFieldError('price',$this->modx->lexicon('productmenu.dash_err_ns_price'));
        }
        return parent::beforeSave();
    }
}
return 'ProductMenuDashCreateProcessor';
