<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Exception;

class DBtransaction
{
    /**
     * handle an incoming request.
     *
     * @param  \illuminate\http\request  $request
     * @param  \closure  $next
     * @return mixed
     */
    public function handle($request, closure $next)
    {
        db::begintransaction();

        try{
            $response = $next($request);
        }catch (exception $exception){
            db::rollback();
            throw  $exception;
        }

        if($response instanceof response && $response->getstatuscode() > 399){
            db::rollback();
        }else{
            db::commit();
        }

        return $response;
    }
}
