<?php

declare(strict_types = 1);

namespace Tests\Unit\Transito\Shared\Infrastructure\Mockery;

use Mockery\Matcher\MatcherAbstract;
use PHPUnit\Framework\ExpectationFailedException;
use SebastianBergmann\Comparator\ComparisonFailure;
use SebastianBergmann\Comparator\Factory;

final class MatcherIsSimilar extends MatcherAbstract
{

    private $value;
    private $delta;

    public function __construct($value, $delta = 0.0)
    {
        parent::__construct($value);
        $this->value = $value;
        $this->delta = $delta;
    }

    private function evaluate($other, $description = '', $returnResult = false) : bool {

        if($this->value === $other)
           return true;

       $isValid = true;
       $factory = new Factory();

       try {
            $comparation = $factory->getComparatorFor($this->value,$other);
            $comparation->assertEquals($this->value,$other,$this->delta);
       }catch (ComparisonFailure $f){
           if(!$returnResult){
               throw new ExpectationFailedException(
                   trim($description . "\n" . $f->getMessage()),
                   $f
               );
           }
           $isValid = false;
       }

       return $isValid;
    }

    public function match(&$actual): bool
    {

        return $this->evaluate($actual, '', true);

    }

    public function __toString(): string
    {
        return 'Is similar';
    }
}
