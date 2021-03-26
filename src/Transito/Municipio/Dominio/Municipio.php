<?php


namespace Cantera\Transito\Municipio\Dominio;


use Cantera\Transito\Departamento\Dominio\DepartamentoId;

class Municipio
{
    private MunicipioId $id;
    private MunicipioNombre $nombre;
    private DepartamentoId $departamento_id;

    /**
     * Municipio constructor.
     * @param MunicipioId $id
     * @param MunicipioNombre $nombre
     * @param DepartamentoId $departamento_id
     */
    public function __construct(MunicipioId $id, MunicipioNombre $nombre, DepartamentoId $departamento_id)
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->departamento_id = $departamento_id;
    }

    /**
     * @return MunicipioId
     */
    public function getId(): MunicipioId
    {
        return $this->id;
    }

    /**
     * @return MunicipioNombre
     */
    public function getNombre(): MunicipioNombre
    {
        return $this->nombre;
    }

    /**
     * @return DepartamentoId
     */
    public function getDepartamentoId(): DepartamentoId
    {
        return $this->departamento_id;
    }

    public function toArray()
    {
        return [
            'id' => $this->getId()->value(),
            'nombre' => $this->getNombre()->value(),
            'departamento_id' => $this->getDepartamentoId()->value()
        ];
    }

    static function formtArray(array $model): self
    {
        return new self(new MunicipioId($model['id']), new MunicipioNombre($model['nombre']), new DepartamentoId($model['departamento_id']));
    }

}
