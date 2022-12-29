let sensorSensitivity = 0
let speed = 0
let driving = false
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.motorBalance(Kitronik_Move_Motor.SpinDirections.Right, 3)
    Kitronik_Move_Motor.setUltrasonicUnits(Kitronik_Move_Motor.Units.Centimeters)
    sensorSensitivity = 10
    speed = 30
    basic.showNumber(3)
    basic.showNumber(2)
    basic.showNumber(1)
    Kitronik_Move_Motor.beepHorn()
    driving = true
    while (driving) {
        rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
        leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
        sensorDifference = leftSensor - rightSensor
        if (sensorDifference > sensorSensitivity) {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, speed)
        } else if (sensorDifference < 0 - sensorSensitivity) {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, speed)
        } else {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
        }
        if (Kitronik_Move_Motor.measure() < 15) {
            Kitronik_Move_Motor.stop()
            Kitronik_Move_Motor.beepHorn()
            driving = false
        }
    }
})
input.onButtonPressed(Button.B, function () {
    Kitronik_Move_Motor.stop()
})
basic.forever(function () {
	
})
