<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use App\Middleware\Auth;
use App\Controller\IndexController;
use App\Controller\loginController;
use App\Controller\registerController;
use App\Controller\homeController;
use App\Controller\DashboardController;

return function (App $app) {
    $container = $app->getContainer();

    $container['view'] = function ($container) {
        $view = new \Slim\Views\Twig('../templates', [
            'cache' => false
        ]);

        //instantiate and add slim specific extension
        $router = $container->get('router');
        $uri = \Slim\Http\Uri::createFromEnvironment(new \Slim\Http\Environment($_SERVER));
        $view->addExtension(new \Slim\Views\TwigExtension($router, $uri));

        return $view;
    };

    $app->get('/', function (Request $request, Response $response, array $args) use ($container) {
        return $this->view->render($response, 'home.twig', $args);
    });
    
    $app->get('/login', function (Request $request, Response $response, array $args) use ($container) {
        return $this->view->render($response, 'login.twig', $args);
    });
    $app->post('/login', function(Request $request, Response $response, array $args) use ($container) {
        $data = $request->getParsedBody();
        return loginController::islogin($this, $request, $response,[
            'data'=>$data
        ]);
    });
    
    $app->get('/home', function (Request $request, Response $response, array $args) use ($container) {
        return $this->view->render($response, 'home.twig', $args);
    });
    
    $app->get('/signup', function (Request $request, Response $response, array $args) use ($container) {
        return $this->view->render($response, 'register.twig', $args);
    });

    $app->post('/signup', function(Request $request, Response $response, array $args) use ($container) {
        $data = $request->getParsedBody();
        return registerController::register($this, $request, $response,[
            'data'=>$data
        ]);
    });

    $app->get('/getMenu', function (Request $request, Response $response, array $args) use ($container) {
        $data = $request->getParsedBody();
        return homeController::getMenu($this, $request, $response,[
            'data'=>$data
        ]);
    });
    
    $app->get('/dashboardMenu', function (Request $request, Response $response, array $args) use ($container) {
        $data = $request->getParsedBody();
        return DashboardController::dashboardMenu($this, $request, $response,[
            'data'=>$data
        ]);
    });

    $app->get('/showMenu', function (Request $request, Response $response, array $args) use ($container) {
        $data = $request->getParsedBody();
        return homeController::showMenu($this, $request, $response,[
            'data'=>$data
        ]);
    });

    $app->get('/dashboard', function (Request $request, Response $response, array $args) use ($container) {
        return $this->view->render($response, 'dashboard.twig', $args);
    });
};
