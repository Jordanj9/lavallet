<?php

namespace Tests\Unit\Transito\Cliente\Aplicacion\Create;

use Cantera\Transito\Cliente\Aplicacion\ClienteRequest;
use Tests\Unit\Transito\Shared\Domain\MotherCreator;
use Tests\Unit\Transito\Shared\Domain\NationalCodeMother;
use Tests\Unit\Transito\Shared\Domain\RandomElementPicker;
use Tests\Unit\Transito\Shared\Domain\WordMother;

final class ClienteRequestMother
{
    public static function create(string $id, string $identificacion, string $nombre, string $municipio, string $departamento, string $direccion, string $telefono, string $tipo, string $correo): ClienteRequest
    {
        return new ClienteRequest($id, $identificacion, $nombre, $municipio, $departamento, $direccion, $telefono, $tipo, $correo);
    }

    public static function random(): ClienteRequest
    {
        return self::create(
            MotherCreator::random()->uuid,
            NationalCodeMother::random(),
            MotherCreator::random()->name,
            WordMother::random(),
            WordMother::random(),
            MotherCreator::random()->address,
            MotherCreator::random()->e164PhoneNumber,
            RandomElementPicker::from('NATURAL', 'JURIDICA'),
            MotherCreator::random()->email
        );
    }

}
