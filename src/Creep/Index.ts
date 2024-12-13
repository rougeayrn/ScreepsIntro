import { Role } from 'Constants/Role'
import CreepRole from 'Models/CreepRole'
import { Harvester } from './Harvester'


export let creepLogic: {[key in Role]?: CreepRole} = {
    harvester: new Harvester
}
