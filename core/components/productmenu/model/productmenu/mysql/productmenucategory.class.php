<?php
/**
 * @package productmenu
 */
require_once (strtr(realpath(dirname(dirname(__FILE__))), '\\', '/') . '/productmenucategory.class.php');
class ProductMenuCategory_mysql extends ProductMenuCategory {}
?>