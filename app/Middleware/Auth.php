<?php

    namespace App\Middleware;
    // session_start();

    class Auth {
        public function __invoke($req, $res, $next){
            if(!isset($_SESSION['id'])){
                return $res->withRedirect('/login');
            }

            return $next($req, $res);
        }

    }

?>