<?php
/**
 * ProductMenu
 *
 * @author Oleg Pryadko <oleg@websitezen.com>
 * Based on https://github.com/COEXCZ
 * Which is based on work by Shaun McCormick
 *
 * ProductMenu is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * ProductMenu is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * ProductMenu; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package productmenu
 */
/**
 * Loads system settings into build
 *
 * @package productmenu
 * @subpackage build
 */
$settings = array();


$config = array(
	array(
		'key' => 'productmenu.default_image_url',
		'value' => '',
		'xtype' => 'textfield',
		'namespace' => 'productmenu',
		'area' => '',
	)
);

foreach ($config as $vals) {
	$setting = $modx->newObject('modSystemSetting');
	$setting->fromArray($vals,'',true,true);
	$settings[$vals['key']] = $setting;
}

return $settings;