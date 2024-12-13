import { Role } from "Constants/Role"
import { Utils } from "utils/Index"

export default interface CreepRole {

    /** Main creep logic for the role. */
    run(creep: Creep): number

    /** Does the room need this creep role spawned? */
    spawn(room: Room): boolean

    /** Generates the info required to spawn the creep. */
    spawnData(room: Room): SpawnInfo
}

export interface SpawnInfo {
    name: string,
    body: BodyPartConstant[],
    memory: CreepMemory
}


