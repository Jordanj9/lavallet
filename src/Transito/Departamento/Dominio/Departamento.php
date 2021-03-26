<?php


namespace Cantera\Transito\Departamento\Dominio;


use Cantera\Transito\Municipio\Dominio\Municipio;
use Cantera\Transito\Municipio\Dominio\MunicipioId;
use Cantera\Transito\Municipio\Dominio\MunicipioNombre;
use phpDocumentor\Reflection\Types\This;

class Departamento
{
    private DepartamentoId $id;
    private DepartamentoNombre $nombre;
    private DepartamentoMunicipio $municipios;

    /**
     * Departamento constructor.
     * @param DepartamentoId $id
     * @param DepartamentoNombre $nombre
     */
    public function __construct(DepartamentoId $id, DepartamentoNombre $nombre)
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->municipios = new DepartamentoMunicipio();
    }

    /**
     * @return DepartamentoMunicipio
     */
    public function getMunicipios(): DepartamentoMunicipio
    {
        return $this->municipios;
    }

    /**
     * @return DepartamentoId
     */
    public function getId(): DepartamentoId
    {
        return $this->id;
    }

    /**
     * @return DepartamentoNombre
     */
    public function getNombre(): DepartamentoNombre
    {
        return $this->nombre;
    }

    /**
     * @param DepartamentoMunicipio $municipios
     */
    public function setMunicipios(DepartamentoMunicipio $municipios): void
    {
        $this->municipios = $municipios;
    }

    public function addMunicipios(Municipio $municipio)
    {
        $this->municipios = $this->municipios->add($municipio);
    }

    public function toArray(): array
    {
        return [
            'id' => $this->getId()->value(),
            'nombre' => $this->getNombre()->value()
        ];
    }

    static function formtArray(array $model): self
    {
        $depto = new self(new DepartamentoId($model['id']), new DepartamentoNombre($model['nombre']));
        if ($model['mun'] != null)
            $depto->llenarMunicipios($model['mun']);

        return $depto;
    }

    private function llenarMunicipios(array $array): void
    {
        foreach ($array as $item) {
            $this->addMunicipios(new Municipio(new MunicipioId($item['id']), new MunicipioNombre($item['nombre']), new DepartamentoId($item['departamento_id'])));
        }
    }


}
