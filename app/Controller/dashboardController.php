<?php
    namespace App\Controller;
    use Medoo\Medoo;

    class DashboardController {
        public static function index($app, $req, $rsp, $args) {
            $app->get('renderer')->render($rsp, 'dashboard.twig', $args);
        }

        public function dashboardMenu($app, $req, $rsp, $args){
            // $page = $req->getParam('page') ?? 1;
            // $per_page = $req->getParam('per_page') ?? 6;
            // $menu = $app->db->select(
            //     'tbl_coffee', '*'
            //     ,["LIMIT"=>
            //         [($page-1)*$per_page, $per_page]]);
            
            // $count = $app->db->count('tbl_coffee');

            // if (count($menu) < 1) {
            //     $menu["msg"] = "data tidak tersedia";
            //     return $rsp->withJson($menu, 404);
            //   }

            // return $rsp->withJson(array(
            //     'menu'=>$menu,
            //     "page" => $page,
            //     "per_page" => $perpage,
            //     "total_page" => ceil($count / $perpage),
          
            //     "jumlah" => $count
            // ));

            $menu = $app->db->select('tbl_coffee', [
                'id', 'title', 'description', 'ingredients', 'image' 
            ]);
            return $rsp->withJson(array(
                'menu'=>$menu
            ));
        }
        
        public function showMenu($app, $req, $rsp, $args){
            $app->get('view')->render($rsp, 'dashboard.twig', $args);
        }
    }
?>