<?php
    namespace App\Controller;
    use Medoo\Medoo;

    class HomeController {
        public static function index($app, $req, $rsp, $args) {
            $app->get('renderer')->render($rsp, 'home.twig', $args);
        }

        public function getMenu($app, $req, $rsp, $args){
            $menu = $app->db->select('tbl_coffee', [
                'title', 'ingredients', 'image' 
            ]);
            return $rsp->withJson(array(
                'menu'=>$menu
            ));
        }
        
        public function showMenu($app, $req, $rsp, $args){
            $app->get('view')->render($rsp, 'home.twig', $args);
        }
    }
?>