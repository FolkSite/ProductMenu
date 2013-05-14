<?php
require_once dirname(__FILE__) . '/model/productmenu/productmenu.class.php';
/**
 * @package productmenu
 */
class IndexManagerController extends ProductMenuBaseManagerController {
    public static function getDefaultController() { return 'home'; }
}

abstract class ProductMenuBaseManagerController extends modExtraManagerController {
    /** @var ProductMenu $productmenu */
    public $productmenu;
    public function initialize() {
        $this->productmenu = new ProductMenu($this->modx);

        $this->addCss($this->productmenu->config['cssUrl'].'mgr.css');
        $this->addJavascript($this->productmenu->config['jsUrl'].'mgr/productmenu.js');
        $this->addHtml('<script type="text/javascript">
        Ext.onReady(function() {
            ProductMenu.config = '.$this->modx->toJSON($this->productmenu->config).';
            ProductMenu.config.connector_url = "'.$this->productmenu->config['connectorUrl'].'";
        });
        </script>');
        return parent::initialize();
    }
    public function getLanguageTopics() {
        return array('productmenu:default');
    }
    public function checkPermissions() { return true;}
}