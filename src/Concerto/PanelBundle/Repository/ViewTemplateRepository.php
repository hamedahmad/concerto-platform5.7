<?php

namespace Concerto\PanelBundle\Repository;

use Concerto\PanelBundle\Repository\AEntityRepository;

/**
 * ViewTemplateRepository
 */
#[\AllowDynamicProperties]
class ViewTemplateRepository extends AEntityRepository {

    public function findOneByName($name) {
        return $this->getEntityManager()->getRepository("ConcertoPanelBundle:ViewTemplate")->findOneBy(array("name" => $name));
    }

}
