<?php

error_reporting(E_ALL & ~E_DEPRECATED & ~E_WARNING & ~E_NOTICE);

set_error_handler(function ($severity, $message) {
    if ($severity === E_DEPRECATED) {
        return true;
    }
    return false;
});