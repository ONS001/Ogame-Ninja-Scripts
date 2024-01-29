// Moon you're jumping your fleet from.
moonFrom = GetCachedCelestial("M:1:2:3")

// Moon you're jumping your fleet to.
moon2 = GetCachedCelestial("M:1:2:4")

// Exact time to use JumpGate.
timeToJump = "15:00:10" // Hours:Minutes:Seconds

// Set combat ships to JumpGate.
lightFighters = 0
heavyFighters = 0
cruisers = 0
battleships = 0
battlecruisers = 0
bombers = 0
destroyers = 0
deathstars = 0
reapers = 0
pathfinders = 0

// Set civil ships to JumpGate.
smallCargos = 0
largeCargos = 0
colonyShips = 0
recyclers = 0
espProbes = 0

// Handles which ships to jump based on the above settings.
ships = NewShipsInfos()
ships.Set(LIGHTFIGHTER, lightFighters)
ships.Set(HEAVYFIGHTER, heavyFighters)
ships.Set(CRUISER, cruisers)
ships.Set(BATTLESHIP, battleships)
ships.Set(BATTLECRUISER, battlecruisers)
ships.Set(BOMBER, bombers)
ships.Set(DESTROYER, destroyers)
ships.Set(DEATHSTAR, deathstars)
ships.Set(REAPER, reapers)
ships.Set(PATHFINDER, pathfinders)
ships.Set(SMALLCARGO, smallCargos)
ships.Set(LARGECARGO, largeCargos)
ships.Set(COLONYSHIP, colonyShips)
ships.Set(RECYCLER, recyclers)
ships.Set(ESPIONAGEPROBE, espProbes)

// Use JumpGate at specified time. 
ExecAtCh(timeToJump, func() {
JumpGate(moonFrom.GetID(), moonTo.GetID(), *ships)
}
