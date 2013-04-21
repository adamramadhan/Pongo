<?php

use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Constraints as Assert;

$app->match('/', function() use ($app) {

   return $app['twig']->render('main.html.twig', array (
        'data' => null, 
    ));

})->bind('homepage');

$app->match('/about', function() use ($app) {
    $aboutus = 'Lorem Ipsum er rett og slett dummytekst fra og for trykkeindustrien. Lorem Ipsum har vært bransjens standard for dummytekst helt siden 1500-tallet, da en ukjent boktrykker stokket en mengde bokstaver for å lage et prøveeksemplar av en bok. Lorem Ipsum har tålt tidens tann usedvanlig godt, og har i tillegg til å bestå gjennom fem århundrer også tålt spranget over til elektronisk typografi uten vesentlige endringer. Lorem Ipsum ble gjort allment kjent i 1960-årene ved lanseringen av Letraset-ark med avsnitt fra Lorem Ipsum, og senere med sideombrekkingsprogrammet Aldus PageMaker som tok i bruk nettopp Lorem Ipsum for dummytekst.';
    return $app['twig']->render('about.html.twig', array(
        'data' => $aboutus,
    ));
})->bind('about');

$app->match('/fact', function () use ($app) {
    $map = $app['map.google'];

    $marker1_options = array(
	    'title'	=> 'Borneo',
	    'content'	=> '<p><strong>Borneo, The Kalimantan</strong></p>'
    );
    $marker1 = \PHPGoogleMaps\Overlay\Marker::createFromLocation( 'Borneo, ID', $marker1_options );

    $marker1->setIcon( '_images/bullseye_marker.png' );

    $map->addObject( $marker1 );
    $map->disableAutoEncompass();
    $map->setZoom( 5 );
    $map->setCenter( $marker1->getPosition() );
    $map->enableStreetView();
    $map->printHeaderJS();
    $map->printMapJS();
    $map->printMap();

    return 0;

})->bind('fact');

$app->match('/photos', function () use ($app) {
    return 0;
})->bind('photos');

$app->match('/propagation', function () use ($app) {
    return 0;
})->bind('propagation');

$app->match('/facts', function () use ($app) {
    return 0;
})->bind('facts');


$app->error(function (\Exception $e, $code) use ($app) {
    if ($app['debug']) {
        return;
    }

    switch ($code) {
        case 404:
            $message = 'The requested page could not be found.';
            break;
        default:
            $message = 'We are sorry, but something went terribly wrong.';
    }

    return new Response($message, $code);
});


return $app;
