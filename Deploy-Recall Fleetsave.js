//////////////////////////////////////
// Change these settings to your own.
// If you wish to use this script without it logging out, simply remove the Logout() lines.
//
// To set these to planets, simply remove the M: part.
sendFrom = "M:1:2:3" // Sending fleet from here.
sendTo = "M:1:2:4" // Sending fleet to here.
// Enter your Telegram Chat ID.
TelegramID = EnterTelegramIDHere
/* Sends at the desired fleet speed, if 20% fleet speed results in a 8 hour flight time one way then - 
that's how long the total flight time will be. */
fleetSpeed = TEN_PERCENT // TWENTY_PERCENT ... HUNDRED_PERCENT (Set to whichever speed you desire)
//////////////////////////////////////

// Variables for Telegram usage.
universeName = GetUniverseName()
playerName = GetCachedPlayer().PlayerName
uniPlayerName = universeName + " - " + playerName

// Creates a new fleet object for fleetsaving.
mainFleet = NewFleet()
mainFleet.SetOrigin(sendFrom)
mainFleet.SetDestination(sendTo)
mainFleet.SetSpeed(fleetSpeed)
mainFleet.SetMission(PARK)
mainFleet.SetAllResources()
mainFleet.SetAllShips()
fleet, err = mainFleet.SendNow()

// Calculates half the arrival time in order to recall the deploy half-way through the flight.
half = fleet.ArriveIn / 2 
Print("Fleetsaving for: ", ShortDur((half * 2)))

// Telegram Message for Fleetsaving.
SendTelegram(TelegramID, uniPlayerName + " Fleetsaving for: ", ShortDur((half*2)))

// Logs out the bot.
Logout()

// Recalls the deploy half-way through the flight with slight randomisation
Sleep(Random(half * 980, half * 1010))

// Logs you in if logged out.
if !IsLoggedIn() {
    Login()
}

// Waits 3-12 seconds, recalls fleet, waits 3-12 seconds then logs out again.
(Sleep(Random(3,12)*1000))
CancelFleet(fleet.ID)
SendTelegram(TelegramID, uniPlayerName + " Recalled fleet"
(Sleep(Random(3,12)*1000))
Logout()

// Logs you back in before your fleet lands, that way if defender is active your fleet is safe when it lands.
Sleep(Random(half * 800, half * 900))
Login()
SendTelegram(TelegramID, uniPlayerName + " Fleet arriving soon"
