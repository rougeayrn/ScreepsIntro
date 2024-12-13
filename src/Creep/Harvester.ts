import { HARVESTER, Role } from "Constants/Role";
import CreepRole, { SpawnInfo } from "Models/CreepRole";

export class Harvester implements CreepRole {

    run(creep: Creep): ScreepsReturnCode {
        //
        if(creep.store.getFreeCapacity() > 0) {
            let sources = creep.room.find(FIND_SOURCES)
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0])
            }
        }
        else {
            // here is the helloWorld() prototype
            creep.helloWorld();

            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
        return OK
    }

    // checks if the room needs to spawn a creep
    spawn(room: Room): boolean {
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name)
        console.log('Harvesters: ' + harvesters.length, room.name)

        if (harvesters.length < 2) {
            return true
        }
        return false
    }

    // returns an object with the data to spawn a new creep
    spawnData(room: Room): SpawnInfo {
            let name = 'Harvester' + Game.time
            let body = [WORK, CARRY, MOVE]
            let memory = {
                // Typecasting here - not wise long term
                role: HARVESTER as Role,
                room: room.name
            }

            return {name, body, memory}
    }
}
