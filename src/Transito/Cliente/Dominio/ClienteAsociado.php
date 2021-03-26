<?php


namespace Cantera\Transito\Cliente\Dominio;


use Cantera\Transito\Shared\Dominio\DomainError;

class ClienteAsociado extends DomainError
{

    private ClienteNombre $nombre;

    /**
     * ClienteAsociado constructor.
     * @param ClienteNombre $nombre
     */
    public function __construct(ClienteNombre $nombre)
    {
        $this->nombre = $nombre;
    }

    public function errorCode(): string
    {
        return "el_cliente_tiene_contratos_asociados_error.";
    }

    public function errorMessage(): string
    {
        return sprintf('El cliente %s no se puede eliminar porque tiene contratos asociados.', $this->nombre->value());
    }
}
