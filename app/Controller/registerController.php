<?php
    namespace App\Controller;
    use Medoo\Medoo;

    class signUpController {
        public static function signup($app, $req, $rsp, $args) {
            $app->get('renderer')->render($rsp, 'signup.twig', $args);
        }

        public static function register($app,$req, $res, $args){
            $body = $req->getParsedBody();
            $user = $body['username'];
            $fname = $body['first_name'];
            $lname = $body['last_name'];
            $pass = md5($body['password']);

            $data = $app->db->select("tbl_users",'*', [
                'username'=>$user
            ]);

            if($data){
                $data = $app->db->insert("tbl_users",'*', [
                    'username'=>$user
                ]);
            }

            return $res
                        ->withHeader('content-type', 'application/json')
                        ->withStatus(403);
        }
    }
?>