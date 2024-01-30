// Automatically starts the expeditions bot in a time window you specify.

// Enter your Telegram chat ID and bot or username if you wish.
TelegramID = TELEGRAM_CHAT_ID

// Set the time range for when the script starts.
timeRangeStart = "09:12:00"
timeRangeEnd = "12:00:00"


//-----------------
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

// Turn expedition bot on.
StartExpeditionsBot()

// Notifies you on Telegram once its turned on.
SendTelegram(TelegramID, uniPlayerName + " Expediton bot started.")
}


RangeCronExec(timeRangeStart, timeRangeEnd, BotName + "Start expedition bot", autoExpo)
<-OnQuitCh // Blocks forever so that cronexec can be executed
