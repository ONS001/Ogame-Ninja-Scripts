// Automatically stops the expeditions bot in a timeframe you specify.

// Enter your Telegram chat ID and bot or username if you wish.
TelegramID = TELEGRAM_CHAT_ID

// Set the time range for when the script starts.
timeRangeStart = "09:12:00"
timeRangeEnd = "12:00:00"


//------------------
// Variables for Telegram usage.
universeName = GetUniverseName()
playerName = GetCachedPlayer().PlayerName
uniPlayerName = universeName + " - " + playerName + ":"

func autoExpo() {
  
// Turn sleep mode off.  
StopSleepMode()
  
// Login if bot is logged out.
if !IsLoggedIn() {
  Login()
}

// Turn expedition bot off.
StopExpeditionsBot()

// Notifies you on Telegram once the Expediton bot is turned off.
SendTelegram(TelegramID, uniPlayerName + " Expediton bot stopped.")
}


RangeCronExec(timeRangeStart, timeRangeEnd, uniPlayerName + " Stop expedition bot", autoExpo)
<-OnQuitCh // Blocks forever so that cronexec can be executed
