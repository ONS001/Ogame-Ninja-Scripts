// Enter your Telegram chat ID and bot or username if you wish.
TelegramID = enterChatIDHere
BotName = "enterBotNameHere"

// Set the time range for when the script starts.
timeRangeStart = "00:11:00"
timeRangeEnd = "00:11:05"

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
SendTelegram(TelegramID, BotName + " Expediton bot stopped.")
}


RangeCronExec(timeRangeStart, timeRangeEnd, BotName "Stop expedition bot", autoExpo)
<-OnQuitCh // Blocks forever so that cronexec can be executed
