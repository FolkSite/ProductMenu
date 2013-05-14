<?php
/**
 * @package productmenu
 */
$xpdo_meta_map['ProductMenuCategory']= array (
  'package' => 'productmenu',
  'version' => NULL,
  'table' => 'productmenu_categories',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'name' => '',
    'position' => NULL,
  ),
  'fieldMeta' => 
  array (
    'name' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '100',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'position' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'null' => false,
    ),
  ),
  'composites' => 
  array (
    'Dashes' => 
    array (
      'class' => 'ProductMenuDash',
      'local' => 'id',
      'foreign' => 'category',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
);
