<?php


namespace Tests\Feature\Transito\Serie\ConsultarSerieTipo;


use Cantera\Transito\Serie\Infraestructura\Persistencia\Eloquent\SerieModel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Unit\Transito\Serie\Dominio\SerieMother;

class GetSerieByTypeTest extends TestCase
{
    use RefreshDatabase;

    public function testConsultarSeriePorTipo(): void
    {
        $array = factory(SerieModel::class)->create();
        $response = $this->get('/api/serie/' . $array->tipo);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'prefijo',
                'actual',
                'tipo'
            ],
            'mensaje'
        ]);
    }

    public function prepareSerieExisting(): void
    {
        factory(SerieModel::class, 10)->create();
    }
}
