<?php
/**
 * Get list Categories
 *
 * @package productmenu
 * @subpackage processors
 */
class ProductMenuCategoriesGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'ProductMenuCategory';
    public $languageTopics = array('productmenu:default');
    public $defaultSortField = 'position';
    public $defaultSortDirection = 'ASC';
    public $objectType = 'productmenu.items';

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array(
                           'name:LIKE' => '%'.$query.'%'
                      ));
        }
        return $c;
    }
}
return 'ProductMenuCategoriesGetListProcessor';