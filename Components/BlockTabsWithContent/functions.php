<?php

namespace Flynt\Components\BlockTabsWithContent;

use Flynt\FieldVariables;
use Flynt\Utils\Options;

add_filter('Flynt/addComponentData?name=BlockTabsWIthContent', function ($data) {
    return $data;
});

function getACFLayout()
{
    return [
        'name' => '<%= blockTabsWithContent %>',
        'label' => __('Block: Tabs WIth Content', 'flynt'),
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

Options::addTranslatable('BlockTabsWithContent', [

]);

Options::addGlobal('BlockTabsWithContent', [

]);
