<?php
session_start();
session_destroy();
header('Location: hero-page.php');
exit();