<?php

declare(strict_types=1);

namespace Cantera\Transito\Shared\Dominio\ValueObject;

abstract class StringValueObject
{
    protected string $value;

    public function __construct(string $value)
    {
        $this->value = $value;
    }

    public function value(): string
    {
        return $this->value;
    }

    public function equals(StringValueObject $other): bool
    {
        return $this == $other;
    }

    public function __toString()
    {
        return $this->value();
    }
}
