import { Utils } from 'utils/Index';

declare global {
    interface Creep {
        // Action Wrappers
        // give(target: AnyStoreStructure | Creep, resource: ResourceConstant, quantity?: number): number
        helloWorld(): ScreepsReturnCode
        mine(target: Source | Mineral | RoomPosition): number
    }
}

export default class Creep_Extended extends Creep {
    // give(target: AnyStoreStructure | Creep, resource: ResourceConstant, quantity?: number): number {
    //     Utils.Logger.log("Creep -> give()", TRACE)

    //     this.travel(target.pos);
    //     let result = this.transfer(target, resource, quantity);

    //     switch (result) {
    //         case OK: case ERR_BUSY: case ERR_NOT_IN_RANGE:
    //             return OK;
    //         case ERR_NOT_OWNER: case ERR_INVALID_TARGET: case ERR_INVALID_ARGS: case ERR_NOT_ENOUGH_RESOURCES: case ERR_FULL:
    //             return result;
    //     }
    //     return OK;
    // }

    helloWorld(): ScreepsReturnCode {
        this.say(`Hey, bossman.`, false)
        return OK
    }

    mine(target: Source | Mineral): number {
        console.log("Creep -> give()")

        if (this.pos.getRangeTo(target.pos) > 1) this.moveTo(target.pos)
        let result: number = this.harvest(target);

        switch (result) {
            case OK: case ERR_BUSY: case ERR_TIRED: case ERR_NOT_IN_RANGE:
                return OK;
            case ERR_NOT_OWNER: case ERR_NOT_FOUND: case ERR_NOT_ENOUGH_RESOURCES: case ERR_INVALID_TARGET: case ERR_NO_BODYPART:
                console.log(`${this.name} recieved result ${result} from Mine with args (${JSON.stringify(target.pos)}*).`);
                return result;
        }
        return OK;
    }

}
