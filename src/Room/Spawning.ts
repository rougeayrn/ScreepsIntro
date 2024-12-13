import { Role } from "Constants/Role"
import { creepLogic } from "Creep/Index"
import { SpawnInfo } from "Models/CreepRole"

export function spawnCreeps(room: Room) {

    // The `as Role[]` typecasting is typically not wise.
    // You are forcing typescript to consider the data as that instead of it being identifiably that. Typeguards are much better.
    let creepTypes = Object.keys(creepLogic) as Role[]

    // find a creep type that returns true for the .spawn() function
    let creepTypeNeeded = _.find(creepTypes, function(creepType) {
        return creepLogic[creepType]?.spawn(room)
    })


    let creepSpawnData: SpawnInfo | undefined
    if (creepTypeNeeded) creepSpawnData = creepLogic[creepTypeNeeded]?.spawnData(room)

    if (creepSpawnData) {
        // Generate Spawn Data

        // find the first or 0th spawn in the room
        let spawn = room.find(FIND_MY_SPAWNS)[0]
        let result = spawn.spawnCreep(creepSpawnData.body, creepSpawnData.name, { memory: creepSpawnData.memory })

        console.log("Tried to Spawn:", creepTypeNeeded, result)
    }
}
