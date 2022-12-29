sensorSensitivity = 0
speed = 0
driving = False
rightSensor = 0
leftSensor = 0
sensorDifference = 0

def on_button_pressed_a():
    global sensorSensitivity, speed, driving, rightSensor, leftSensor, sensorDifference
    # Just for this Kitronik Move
    Kitronik_Move_Motor.motor_balance(Kitronik_Move_Motor.SpinDirections.RIGHT, 3)
    Kitronik_Move_Motor.set_ultrasonic_units(Kitronik_Move_Motor.Units.CENTIMETERS)
    # Sensitivity of the optical sensor
    sensorSensitivity = 10
    # Speed of the robot
    speed = 30
    # count down!
    basic.show_number(3)
    basic.show_number(2)
    basic.show_number(1)
    Kitronik_Move_Motor.beep_horn()
    # Drive!
    driving = True
    while driving:
        # Read sensors
        rightSensor = Kitronik_Move_Motor.read_sensor(Kitronik_Move_Motor.LfSensor.LEFT)
        leftSensor = Kitronik_Move_Motor.read_sensor(Kitronik_Move_Motor.LfSensor.RIGHT)
        sensorDifference = leftSensor - rightSensor
        if sensorDifference > sensorSensitivity:
            # We need to turn right
            Kitronik_Move_Motor.motor_off(Kitronik_Move_Motor.Motors.MOTOR_RIGHT)
            Kitronik_Move_Motor.motor_on(Kitronik_Move_Motor.Motors.MOTOR_LEFT,
                Kitronik_Move_Motor.MotorDirection.FORWARD,
                speed)
        elif sensorDifference < 0 - sensorSensitivity:
            # We need to turn left
            Kitronik_Move_Motor.motor_off(Kitronik_Move_Motor.Motors.MOTOR_LEFT)
            Kitronik_Move_Motor.motor_on(Kitronik_Move_Motor.Motors.MOTOR_RIGHT,
                Kitronik_Move_Motor.MotorDirection.FORWARD,
                speed)
        else:
            # Hold the course
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.FORWARD, speed)
        # Crash protection!
        if Kitronik_Move_Motor.measure() < 15:
            Kitronik_Move_Motor.stop()
            Kitronik_Move_Motor.beep_horn()
            driving = False
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    Kitronik_Move_Motor.stop()
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_forever():
    pass
basic.forever(on_forever)
