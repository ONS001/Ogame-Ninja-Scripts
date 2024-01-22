TelegramID = enterChatIDHere
BotName = enterBotNameHere

timeRangeStart = "00:11:00"
timeRangeEnd = "00:11:05"

StopSleepMode()

if !IsLoggedIn() {
  Login()
}

func autoExpo() {
StartExpeditionsBot()

SendTelegram(TelegramID, "Expediton bot started for bot "{BotName}"")
}


RangeCronExec(timeRangeStart, timeRangeEnd, BotName "Start expedition bot", autoExpo)
<-OnQuitCh // Blocks forever so that cronexec can be executed
