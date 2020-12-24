from pymongo import MongoClient
url = '0.0.0.0'
client = MongoClient(url)
db = client['gador']
devices = db['devices']

print("test1")
results = devices.find()
for r in results:
    print(r)

print("test2")
id = "esp32"
result = devices.find_one({"tag" : id})
print(result)

print("test3")
print(result['tag'])
print(result['modbus'])

print("test4")
modbus = int(result['modbus'])
print("el addr es:", modbus)

print("test5")
error = devices.find_one({"tag" : "error"})
print(error)
if error is None:
    print("no existe")

print("test6")
if 'key' in result:
    print("falso positivo")
else:
    print("key no existe")