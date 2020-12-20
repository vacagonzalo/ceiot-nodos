#!/bin/bash
mosquitto_pub -p 1883 -h 0.0.0.0 -m 'esp32,24' -t data/temp -d