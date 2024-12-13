
export const HARVESTER = "harvester"
export const UPGRADER = "upgrader"

export type Role =
    typeof HARVESTER |
    typeof UPGRADER

export const Roles: Role[] = [
    HARVESTER,
    UPGRADER
]
