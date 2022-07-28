let SY = 0
let SX = 0
let BUTTONS = 0
/**
 * 前後の傾きがP1、左右の傾きがP2
 * 
 * 傾きはアナログ値として出力されます。
 * 
 * 前後（P1）の出力値は、前方の最大傾斜が0・中立が511・後方の最大傾斜が1023になります。
 * 
 * 左右（P2）の出力値は、右方の最大傾斜が0・中立が511・左方の最大傾斜が1023になります。
 * 
 * この値には個体差がある
 */
/**
 * 4方向に取り付けられたボタン（赤・緑・青・黄）です。ボタン名と接続先は、赤がB1（P13）・緑がB2（P14）・青がB3（P15）・黄がB4（P16）です。ボタンの状態は、デジタル値で出力されます。出力値は、ボタンを押すと0、放すと1になります。プログラムでは「デジタル値を読み取る」ブロックを使います
 */
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P1) < 250) {
        SY = 1
    } else {
        if (pins.analogReadPin(AnalogPin.P1) > 750) {
            SY = 2
        } else {
            SY = 0
        }
    }
    if (pins.analogReadPin(AnalogPin.P2) < 250) {
        SX = 1
    } else {
        if (pins.analogReadPin(AnalogPin.P2) > 750) {
            SX = 2
        } else {
            SX = 0
        }
    }
    BUTTONS = 0
    if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        BUTTONS += 1
    }
    if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        BUTTONS += 2
    }
    if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        BUTTONS += 4
    }
    if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        BUTTONS += 8
    }
    radio.sendNumber(SX * 1000 + SY * 100 + BUTTONS)
    basic.pause(100)
})
