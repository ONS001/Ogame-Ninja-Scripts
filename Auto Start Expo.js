// Enter your Telegram chat ID and bot or username if you wish.
TelegramID = enterChatIDHere
BotName = "enterBotNameHere"

// Set the time range for when the script starts.
timeRangeStart = "09:11:00"
timeRangeEnd = "12:11:00"

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
SendTelegram(TelegramID, BotName + " Expediton bot started.")
}


RangeCronExec(timeRangeStart, timeRangeEnd, BotName "Start expedition bot", autoExpo)
<-OnQuitCh // Blocks forever so that cronexec can be executed
