<?php

namespace Flynt\Components\ModalVideoOembed;

use Timber\Timber;

add_action('wp_footer', function () {
    $context = Timber::get_context();
    Timber::render_string('{{ renderComponent("ModalVideoOembed") }}', $context);
});
