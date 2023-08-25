<?php

namespace Flynt\Components\BlockImageTwoCol;

use Flynt\FieldVariables;
use Flynt\Utils\Options;

add_filter('Flynt/addComponentData?name=BlockImageTwoCol', function ($data) {
    return $data;
});

function getACFLayout()
{
    return [
        'name' => 'blockImageTwoCol',
        'label' => __('Block: Image Content Two Column', 'flynt'),
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

Options::addTranslatable('BlockImageTwoCol', [

]);

Options::addGlobal('BlockImageTwoCol', [

]);
