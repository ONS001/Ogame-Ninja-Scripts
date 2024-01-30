// This script will automatically top your moons up with deut.
// It only uses Largo cargos for now.
// It doesn't take in to account resources already on the way to the moon.
// It will not use reserved slots.
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

// Calculate remaining deut we have left.
func updateDeutLeft() {
  resources, err = GetResourcesDetails(sendDeutFrom)
  deutLeft = resources.Deuterium.Available
  return deutLeft
}

// Total slots we can use.
totalSlots = getUpdatedSlots()

// Get a list of the players moons.
moon = GetMoons()

// Do the checks for each moon.
for moon in GetMoons() {
  coord, err = ConvertIntoCoordinate(moon)
  deutLeft = updateDeutLeft()
  print(deutLeft)

  // Calculate deut we need to send to each moon.
  resources, err = GetResourcesDetails(moon)
  deutOnMoon = resources.Deuterium.Available
  deutToTransport = deutPerMoon - deutOnMoon

  // Calculate number of cargos required and how many we have.
  lcNeeded, scNeeded = CalcCargo(deutToTransport)
  allShips, _ = sendDeutFrom.GetShips()
  largeCargosLeft = allShips.LargeCargo 
    
  // Only send if cargos are required.
  if lcNeeded > 0 and (lcNeeded > largeCargosLeft) and deutToTransport > deutLeft {
  
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
