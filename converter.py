# convert old strats format to new

import json

with open("./strats.json") as f:
    data = json.loads(f.read())

output = []

for _, index in enumerate(data):
    for v in data[index]:

        f = False
        for v2 in output:
            if v2["title"] == v[0]:
                f = True
                break

        if f == True:
            continue

        output.append({
            "title": v[0],
            "description": v[1],
            "team": "any"
        })


with open("./otp.json","w") as f:
    f.write(json.dumps({"common": output}))