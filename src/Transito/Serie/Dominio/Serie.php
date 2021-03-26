<?php

namespace Cantera\Transito\Serie\Dominio;

final class Serie
{
    private SerieId $id;
    private SeriePrefijo $prefijo;
    private SerieActual $actual;
    private SerieTipo $tipo;

    public function __construct(SerieId $id, SeriePrefijo $prefijo, SerieActual $actual, SerieTipo $tipo)
    {
        $this->id = $id;
        $this->prefijo = $prefijo;
        $this->actual = $actual;
        $this->tipo = $tipo;
    }


    /**
     * @return SerieId
     */
    public function getId(): SerieId
    {
        return $this->id;
    }

    public function getPrefijo(): SeriePrefijo
    {
        return $this->prefijo;
    }


    public function getActual(): SerieActual
    {
        return $this->actual;
    }

    public function getTipo(): SerieTipo
    {
        return $this->tipo;
    }

    public function value(): string
    {
        return $this->getPrefijo()->value() . "-" . $this->getActual()->value();
    }

    public function toArray(): array
    {
        return [
            'id' => $this->getId()->value(),
            'prefijo' => $this->getPrefijo()->value(),
            'actual' => $this->getActual()->value(),
            'tipo' => $this->getTipo()->value()
        ];
    }

    static function formtArray(array $model): self
    {
        return new self(new SerieId($model['id']), new SeriePrefijo($model['prefijo']), new SerieActual($model['actual']), new SerieTipo($model['tipo']));
    }

}
