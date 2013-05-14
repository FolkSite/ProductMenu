<?php
$productmenu = $modx->getService('productmenu','ProductMenu',$modx->getOption('productmenu.core_path',null,$modx->getOption('core_path').'components/productmenu/').'model/productmenu/',$scriptProperties);
if (!($productmenu instanceof ProductMenu)) return '';


$m = $modx->getManager();
$m->createObjectContainer('ProductMenuDash');
$m->createObjectContainer('ProductMenuCategory');
return 'Table created.';