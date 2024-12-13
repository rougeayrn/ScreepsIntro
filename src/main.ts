// Put Extensions FIRST to force prototype creation before it is called elsewhere. Will throw errors otherwise.
import prototypeExtender from "./Extensions/Index"
prototypeExtender()

// Every other import
import { ErrorMapper } from "utils/ErrorMapper"
import { memHack } from "utils/MemHack"
import { creepLogic } from "Creep/Index"
import { roomLogic } from "Room/Index"
import { Role } from "Constants/Role"


declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number
    log: any
  }

  interface CreepMemory {
    role: Role
    room: string
  }

  // Memhack required
  interface RawMemory {
    [key: string]: any
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      Memory?: Memory
    }

  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // Memhack nonsense - cheating the game into thinking we access memory less than it otherwise would
  memHack.modifyMemory()

  console.log(`Current game tick is ${Game.time}`)

  // make a list of all of our rooms
  let myRooms = _.filter(Game.rooms, r => r.controller && r.controller.level > 0 && r.controller.my);

  // run spwan logic for each room in our empire
  _.forEach(myRooms, r => roomLogic.spawnCreeps(r));

  // run each creep role see /creeps/index.js
  for(var name in Game.creeps) {
      var creep = Game.creeps[name];

      let role = creep.memory.role;
      if (creepLogic[role]) {
          creepLogic[role]?.run(creep);
      }
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name]
    }
  }
});
