<?php

namespace Flynt\Components\BlockThreeColContent;

use Flynt\FieldVariables;
use Flynt\Utils\Options;

add_filter('Flynt/addComponentData?name=BlockThreeColContent', function ($data) {
    return $data;
});

function getACFLayout()
{
    return [
        'name' => 'blockThreeColContent',
        'label' => __('Block: Three Col Content', 'flynt'),
        'sub_fields' => [
            [
                'label' => __('General', 'flynt'),
                'name' => 'generalTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ],
            [
                'label' => __('Options', 'flynt'),
                'name' => 'optionsTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ],
            [
                'label' => '',
                'name' => 'options',
                'type' => 'group',
                'layout' => 'row',
                'sub_fields' => [
                    FieldVariables\getTheme()
                ],
            ],
        ]
    ];
}

Options::addTranslatable('BlockThreeColContent', [

]);

Options::addGlobal('BlockThreeColContent', [

]);
