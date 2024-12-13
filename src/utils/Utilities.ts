

interface IPrototype {
    prototype?: any
}

export default class Utility {

    /**
     * A function that converts class properties to prototypes.
     * @param base The class you wish to add prototypes to
     * @param extra The class containing the prototypes
     */
    static extendClass(base: IPrototype, extra: IPrototype) {
        let descs = Object.getOwnPropertyDescriptors(extra.prototype)
        delete descs.prototype
        Object.defineProperties(base.prototype, descs)
    }

    /** Returns the energy cost of spawning a given BodyPart array. */
    static bodyCost(body: BodyPartConstant[]): number {
        if (!body || body.length == 0) return ERR_INVALID_ARGS;
        let sum = 0;
        for (let i in body)
            sum += BODYPART_COST[body[i]];
        return sum;
    }
}
