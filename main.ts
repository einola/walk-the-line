let sensorSensitivity = 0
let speed = 0
let driving = false
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
input.onButtonPressed(Button.A, function () {
    // Just for this Kitronik Move
    Kitronik_Move_Motor.motorBalance(Kitronik_Move_Motor.SpinDirections.Right, 3)
    Kitronik_Move_Motor.setUltrasonicUnits(Kitronik_Move_Motor.Units.Centimeters)
    // Sensitivity of the optical sensor
    sensorSensitivity = 10
    // Speed of the robot
    speed = 30
    // count down!
    basic.showNumber(3)
    basic.showNumber(2)
    basic.showNumber(1)
    Kitronik_Move_Motor.beepHorn()
    // Drive!
    driving = true
    while (driving) {
        // Read sensors
        rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
        leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
        sensorDifference = leftSensor - rightSensor
        if (sensorDifference > sensorSensitivity) {
            // We need to turn right
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, speed)
        } else if (sensorDifference < 0 - sensorSensitivity) {
            // We need to turn left
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, speed)
        } else {
            // Hold the course
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, speed)
        }
        // Crash protection!
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
