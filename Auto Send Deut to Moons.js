// This script will automatically top your moons up with deut.
// It only uses Largo cargos for now.
// It doesn't take in to account resources already on the way to the moon.
// It will not used reserved slots.
//
// Set this to how much total deut you want each moon to have. 
deutPerMoon = 100000000

// Which planet or moon to send the deut from.
sendDeutFrom = GetCachedCelestial("M:1:2:3")

// Time-delay range in seconds for each mission
minDelayToSend = 3
maxDelayToSend = 7

//---------------------------------

// Get how many slots we can use for the transport missions.
func getUpdatedSlots() {
    slots = GetSlots()
    return slots.Total - slots.InUse - GetFleetSlotsReserved()
}

// Total slots we can use.
totalSlots = getUpdatedSlots()

// Get a list of the players moons.
moon = GetMoons()

// Do the checks for each moon.
for moon in GetMoons() {
  coord, err = ConvertIntoCoordinate(moon)

  // Calculate deut we need to send to each moon.
  resources, err = GetResourcesDetails(moon)
  deutOnMoon = resources.Deuterium.Available
  deutToTransport = deutPerMoon - deutOnMoon

  // Calculate number of cargos required.
  lcNeeded, scNeeded = CalcCargo(deutToTransport)
  
// Only send if cargos are required.
if lcNeeded > 0 {
  
  // Send the mission to each moon.
  mainFleet = NewFleet()
  mainFleet.SetOrigin(sendDeutFrom)
  mainFleet.SetDestination(coord)
  mainFleet.SetSpeed(HUNDRED_PERCENT)
  mainFleet.SetMission(TRANSPORT)
  _, fuel = mainFleet.FlightTime()
  mainFleet.SetDeuterium(deutToTransport)
  mainFleet.AddShips(LARGECARGO, lcNeeded)
  mainFleet.SendNow()
  totalSlots--
  print(totalSlots)
}
SleepRAndSec(minDelayToSend, maxDelayToSend)
}
