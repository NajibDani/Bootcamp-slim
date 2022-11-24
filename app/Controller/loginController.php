<?php
    namespace App\Controller;
    use Medoo\Medoo;

    class LoginController {
        public static function login($app, $req, $rsp, $args) {
            $app->get('renderer')->render($rsp, 'login.twig', $args);
        }

        public static function islogin($app,$req, $res, $args){
            $body = $req->getParsedBody();
            $user = $body['username'];
            $pass = $body['password'];

            $data = $app->db->get("tbl_users",[
                'username', 'password'
            ], [
                'username'=>$user
            ]);

            if($data){
                if ($data['password'] = $pass){
                    $_SESSION['username'] = $data['username'];
                    
                    return $res
                        ->withHeader('content-type', 'application/json')
                        ->withStatus(200)
                        ->withRedirect('/');
                }
            }

            return $res
                        ->withHeader('content-type', 'application/json')
                        ->withStatus(403);
        }
    }
?>