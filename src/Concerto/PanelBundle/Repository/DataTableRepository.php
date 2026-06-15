<?php

namespace Concerto\PanelBundle\Repository;

/**
 * DataTableRepository
 */
#[\AllowDynamicProperties]
class DataTableRepository extends AEntityRepository {
    public function findOneByName($name) {
        return $this->getEntityManager()->getRepository("ConcertoPanelBundle:DataTable")->findOneBy(array("name" => $name));
    }
}

?>