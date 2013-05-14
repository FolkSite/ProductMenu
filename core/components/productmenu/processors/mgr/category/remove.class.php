<?php
/**
 * Remove a Category.
 * 
 * @package productmenu
 * @subpackage processors
 */
class ProductMenuCategoryRemoveProcessor extends modObjectRemoveProcessor {
    public $classKey = 'ProductMenuCategory';
    public $languageTopics = array('productmenu:default');
    public $objectType = 'productmenu.categories';
}
return 'ProductMenuCategoryRemoveProcessor';