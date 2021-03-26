<?php


namespace Cantera\Transito\Contrato\Aplicacion;


use Cantera\Transito\Cliente\Dominio\ClienteId;
use Cantera\Transito\Contrato\Dominio\ContratoBuilder;
use Cantera\Transito\Contrato\Dominio\ContratoFecha;
use Cantera\Transito\Contrato\Dominio\ContratoId;
use Cantera\Transito\Contrato\Dominio\ContratoSerie;
use Cantera\Transito\Contrato\Dominio\ContratoUbicacion;
use Cantera\Transito\Contrato\Dominio\IContratoRepository;
use Cantera\Transito\Contrato\Dominio\TerminoValueObject;
use Cantera\Transito\Contrato\Dominio\TransaccionValueObject;
use Cantera\Transito\Material\Dominio\IMaterialRepository;
use Cantera\Transito\Material\Dominio\MaterialId;
use Cantera\Transito\Serie\Dominio\ISerieRepository;
use Cantera\Transito\Serie\Dominio\Serie;
use Cantera\Transito\Serie\Dominio\SerieActual;
use Cantera\Transito\Serie\Dominio\SerieId;
use Cantera\Transito\Serie\Dominio\SeriePrefijo;
use Cantera\Transito\Serie\Dominio\SerieTipo;
use Cantera\Transito\Vehiculo\Dominio\IVehiculoRepository;
use Cantera\Transito\Vehiculo\Dominio\VehiculoId;

class GuardarContratoService
{
    private IContratoRepository $repository;
    private IMaterialRepository $materialRepository;
    private IVehiculoRepository $vehiculoRepository;
    private ISerieRepository $seriRepository;

    /**
     * GuardarContratoService constructor.
     * @param IContratoRepository $repository
     * @param IMaterialRepository $materialRepository
     * @param IVehiculoRepository $vehiculoRepository
     * @param ISerieRepository $serieRepository
     */
    public function __construct(IContratoRepository $repository, IMaterialRepository $materialRepository, IVehiculoRepository $vehiculoRepository, ISerieRepository $serieRepository)
    {
        $this->repository = $repository;
        $this->materialRepository = $materialRepository;
        $this->vehiculoRepository = $vehiculoRepository;
        $this->seriRepository = $serieRepository;

    }

    public function __invoke(ContratoRequest $request)
    {

        $ubicacion = $request->getUbicacion();
        $fecha = explode('/', $request->getFecha());
        $serie = $this->seriRepository->incrementrarSerie(new SerieId($request->getSerie()['id']));
        // $serie = new Serie(new SerieId($serie['id']), new SeriePrefijo($serie['prefijo']), new SerieActual($serie['actual'] + 1), new SerieTipo($serie['tipo']));
        $contratoBuilder = new ContratoBuilder(
            new ContratoId($request->getId()), $serie,
            new ContratoUbicacion($ubicacion['municipio'], $ubicacion['departamento'], $ubicacion['direccion']),
            new ContratoFecha($fecha[0], $fecha[1], $fecha[2]), new ClienteId($request->getClienteId())
        );
        $response = "DETALLES \n";
        $cont = 0;
        foreach ($request->getDetalles() as $detalle) {
            $material = $this->materialRepository->find(new MaterialId($detalle['material']));
            if ($material != null) {
                $contratoBuilder->addDetalle(new TerminoValueObject($detalle['termino']['volumen'], $detalle['termino']['tipo']), new TransaccionValueObject($detalle['transaccion']), $material);
                $response = $cont . $response . " El Material " . $material->getNombre()->value() . " fue agregado al contrato.\n";
            } else {
                $response = $cont . $response . "El Material " . $detalle['material'] . " no fue agregado al contrato porque no existe.\n";
            }
        }

        $response = $response . " VEHICULOS \n";
        foreach ($request->getVehiculos() as $vehiculo) {
            $vehiculo = $this->vehiculoRepository->search(new VehiculoId($vehiculo['id']));
            if ($vehiculo != null) {
                $contratoBuilder->addVechiculo($vehiculo);
                $response = $cont . $response . " El Vehiculo " . $vehiculo->getPlaca()->value() . " fue agregado al contrato.\n";
            } else {
                $response = $cont . $response . " El Vehiculo " . $vehiculo . " no fue agregado al contrato porque no existe.\n";
            }
        }
        $contrato = $contratoBuilder->build();
        $this->repository->save($contrato);
        $this->seriRepository->update($serie);
    }


}
