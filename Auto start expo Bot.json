TelegramID = enterChatIDHere

timeRangeStart = "00:11:00"
timeRangeEnd = "00:11:05"

func autoExpo() {
StartExpeditionsBot()

SendTelegram(TelegramID, "Expediton bot started")
}


RangeCronExec(timeRangeStart, timeRangeEnd, "Start expedition bot", autoExpo)
<-OnQuitCh // Blocks forever so that cronexec can be executed
