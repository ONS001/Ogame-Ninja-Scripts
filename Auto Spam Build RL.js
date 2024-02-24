 nbTimes = 20
 nbToBuild = 19
 for i=0; i<nbTimes; i++ {
     Build("M:1:2:3", ROCKETLAUNCHER, nbToBuild)
     SleepRandSec(1, 2)
 }
