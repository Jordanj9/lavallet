<?php
namespace Tests\Unit\Transito\Shared\Domain;
use Faker\Provider\es_ES\Person as PersonFaker;

final class NationalCodeMother
{

    public static function random() : string {
        return PersonFaker::dni();
    }

}
