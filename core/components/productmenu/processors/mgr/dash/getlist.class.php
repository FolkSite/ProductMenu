<?php
/**
 * Get list Dashes
 *
 * @package productmenu
 * @subpackage processors
 */
class ProductMenuDashGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'ProductMenuDash';
    public $languageTopics = array('productmenu:default');
    public $defaultSortField = 'company';
    public $defaultSortDirection = 'ASC';
    public $objectType = 'productmenu';

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $query = $this->getProperty('query');
        $filterCategory = $this->getProperty('filterCategory');

        $c->leftJoin('ProductMenuCategory', 'Category');

        if (!empty($query)) {
            $c->where(array(
                    'name:LIKE' => '%'.$query.'%',
                    'OR:description:LIKE' => '%'.$query.'%',
                ));
        }

        if (!empty($filterCategory)) {
            $c->where(array(
                           'category' => $filterCategory
                      ));
        }
        $c->sortby('Category.position','ASC');
        $c->sortby('ProductMenuDash.position','ASC');

//        if ($this->getProperty('sort')) {
//            $c->sortby($this->getProperty('sort'),$this->getProperty('dir'));
//        }

        return $c;
    }

    public function prepareQueryAfterCount(xPDOQuery $c) {
        $c->select($this->modx->getSelectColumns('ProductMenuDash', 'ProductMenuDash'));
        $c->select(array(
                        'category_text' => 'Category.name'
                   ));

        return $c;
    }


}
return 'ProductMenuDashGetListProcessor';