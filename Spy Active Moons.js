// Not my script, I'm just updating it with what suits me best.
origin = GetCachedCelestial("1:2:3")           // Celestial from where to spy from
spyFromSystem = 1                              // Lower limit system to spy
spyToSystem = 299                              // Upper limit system to spy
spy2send = 2                                   // Number of spy probes to send
playersToIgnore = ["Nickname1", "Nickname2"]   // Name of players to ignore
alliancesToIgnore = ["Alliance1", "Alliance2"] // Name of alliances to ignore
TelegramID = TELEGRAM_CHAT_ID

// Variables for Telegram usage.
universeName = GetUniverseName()
playerName = GetCachedPlayer().PlayerName
uniPlayerName = universeName + " - " + playerName

// Skip if player is inactive or player from my alliance
func shouldSkip(planetInfo) {
    if planetInfo == nil { return true }

    // Check ignored players list
    for playerName in playersToIgnore {
        if planetInfo.Player.Name == playerName {
            return true
        }
    }
    
    // Check ignored alliances list
    for allianceName in alliancesToIgnore {
        if (planetInfo.Alliance != nil && planetInfo.Alliance.Name == allianceName) {
            return true
        }
    }
    
    return planetInfo.Inactive || planetInfo.Vacation
}

// Sends spy probes to a coordinate
func spyCoord(coord) {
    for {
        slots = GetSlots()
        if slots.InUse < slots.Total {
            fleet = NewFleet()
            fleet.SetOrigin(origin)
            fleet.SetDestination(coord)
            fleet.SetMission(SPY)
            fleet.AddShips(ESPIONAGEPROBE, spy2send)
            fleet, err = fleet.SendNow()
            Print("Sending probes to", coord)
            break
        } else {
            SleepSec(30) // Wait 30s
        }
    }
}

// Foreach systems in the defined range, spy all active moons
if spyFromSystem < 1 { spyFromSystem = 1 }
if spyToSystem > SYSTEMS { spyToSystem = SYSTEMS }
for system = spyFromSystem; system <= spyToSystem; system++ {
    systemInfos, _ = GalaxyInfos(origin.GetCoordinate().Galaxy, system)
    for i = 1; i <= 15; i++ {
        planetInfo = systemInfos.Position(i)
        if !shouldSkip(planetInfo) && planetInfo.Moon != nil {
            pCoord = planetInfo.Coordinate
            mCoord = pCoord.Moon()
            spyCoord(mCoord)
        }
    }
}
SendTelegram(TelegramID, uniPlayerName + " Finished probing active moons, Check your spy reports.")
