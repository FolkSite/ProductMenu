<?php
/**
 * Loads the home page.
 *
 * @package productmenu
 * @subpackage controllers
 */
class ProductMenuHomeManagerController extends ProductMenuBaseManagerController {
    public function process(array $scriptProperties = array()) {

    }
    public function getPageTitle() { return $this->modx->lexicon('productmenu'); }
    public function loadCustomCssJs() {
        $this->addJavascript($this->productmenu->config['jsUrl'].'mgr/extra/griddraganddrop.js');
        $this->addJavascript($this->productmenu->config['jsUrl'].'mgr/extra/categories.combo.js');

        $this->addJavascript($this->productmenu->config['jsUrl'].'mgr/widgets/categories.grid.js');

        $this->addJavascript($this->productmenu->config['jsUrl'].'mgr/widgets/dashes.grid.js');
        $this->addJavascript($this->productmenu->config['jsUrl'].'mgr/widgets/home.panel.js');
        $this->addLastJavascript($this->productmenu->config['jsUrl'].'mgr/sections/home.js');
    }
    public function getTemplateFile() { return $this->productmenu->config['templatesPath'].'home.tpl'; }
}