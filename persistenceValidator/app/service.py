import paho.mqtt.client as paho
from pymongo import MongoClient
import datetime
import sys

################################################################################
# DATABASE
################################################################################
mongo_host = "mongo"
mongo_client = MongoClient(mongo_host)
db = mongo_client['gador']
devices = db['devices']
measurements = db['measurements']


def insertReading(id, value, unit):
    post = {
        "date": datetime.datetime.utcnow(),
        "tag": id,
        "val": [value, unit]
    }
    global measurements
    measurements.insert_one(post)


def isValidId(id):
    global devices
    d = devices.find_one({'tag': id})
    return (d is not None)

################################################################################
# MQTT
################################################################################
# msg.payload -> 'esp32,24'


def onMessage(client, userdata, msg):
    unit = msg.topic.split("/")[1][0]
    data = msg.payload.decode().split(",")
    insertReading(data[0], data[1], unit)


client = paho.Client()
client.on_message = onMessage

if client.connect("mosquitto", 1883, 60) != 0:
    print("Could not connect to MQTT Broker")
    sys.exit(-1)

client.subscribe("data/#")

try:
    print("Press CTRL+C to exit...")
    client.loop_forever()
except:
    print("Disconnecting from Broker")
client.disconnect()
