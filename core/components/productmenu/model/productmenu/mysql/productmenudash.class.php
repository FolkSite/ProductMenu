<?php
/**
 * @package productmenu
 */
require_once (strtr(realpath(dirname(dirname(__FILE__))), '\\', '/') . '/productmenudash.class.php');
class ProductMenuDash_mysql extends ProductMenuDash {}
?>