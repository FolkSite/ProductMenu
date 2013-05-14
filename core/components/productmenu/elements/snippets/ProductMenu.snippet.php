<?php
/**
 * The base ProductMenu snippet.
 *
 * @package productmenu
 */
$ProductMenu = $modx->getService('productmenu', 'ProductMenu', $modx->getOption('productmenu.core_path', null, $modx->getOption('core_path') . 'components/productmenu/') . 'model/productmenu/', $scriptProperties);
if (!($ProductMenu instanceof ProductMenu)) return '';

$output = array();

// set variables
$tpl = $modx->getOption('tpl', $scriptProperties, 'pmCategory');
$itemTpl = $modx->getOption('itemTpl', $scriptProperties, 'pmProduct');

$outputSeparator = $modx->getOption('outputSeparator', $scriptProperties, "\n");
$toPlaceholder = $modx->getOption('toPlaceholder', $scriptProperties, false);

// get categories
$c = $modx->newQuery('ProductMenuCategory');
$c->sortBy('position', 'asc');

$categories = $modx->getCollection('ProductMenuCategory', $c);

foreach ($categories as $cat) {
    $output_dashes = array();

    $cat = $cat->toArray();

    // get dashes for current category
    $c = $modx->newQuery('ProductMenuDash');
    $c->where(array(
        'category' => $cat['id']
    ));
    $c->sortBy('position', 'asc');

    $dashes = $modx->getCollection('ProductMenuDash', $c);

    // skip category if no dashes
    if (count($dashes) < 1) {
        continue;
    }

	$idx = 0;
	foreach ($dashes as $dash) {
		 $idx+=1;
		 $dash = $dash->toArray();
		 $dash['idx'] = $idx;
		 $dash['current_price'] = (float) $dash['sale_price'] ? $dash['sale_price'] : $dash['price'];
		 $dash['old_price'] = $dash['sale_price'] ? (float) $dash['price'] : '';

        // render dash
        $output_dashes[] = $ProductMenu->getChunk($itemTpl, $dash);
    }

    // extend category for dashes render
    $cat['products'] = implode($outputSeparator, $output_dashes);

    // render category with dashes
    $output[] = $ProductMenu->getChunk($tpl, $cat);
}

// output
$output = implode($outputSeparator, $output);
if (!empty($toPlaceholder)) {
    // if using a placeholder, output nothing and set output to specified placeholder
    $modx->setPlaceholder($toPlaceholder, $output);
    return '';
}

// by default just return output
return $output;