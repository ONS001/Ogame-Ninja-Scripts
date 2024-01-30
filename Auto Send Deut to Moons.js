// This script will automatically top your moons up. 
//
// Set this to how much total deut you want each moon to have. 
deutPerMoon = 100000000
//
// Which planet or moon to send the deut from.
sendDeutFrom = GetCachedCelestial("M:1:2:3")

// Get a list of the players moons.
moon = GetMoons()

// 
for moon in GetMoons() {
  coord, err = ConvertIntoCoordinate(moon)

  // Calculate deut we need to send to each moon.
  resources, err = GetResourcesDetails(moon)
  deutOnMoon = resources.Deuterium.Available
  deutToTransport = deutPerMoon - deutOnMoon

  // Calculate number of cargos required.
  lcNeeded, scNeeded = CalcCargo(deutToTransport)
  
if lcNeeded > 0 {
  // Send the mission to each moon.
  mainFleet = NewFleet()
  mainFleet.SetOrigin(sendDeutFrom)
  mainFleet.SetDestination(coord)
  mainFleet.SetSpeed(HUNDRED_PERCENT)
  mainFleet.SetMission(TRANSPORT)
  _, fuel = mainFleet.FlightTime()
  mainFleet.SetDeuterium(deutToTransport)
  mainFleet.AddShips(LargeCargo, lcNeeded)
}
SleepSec(4)
}
