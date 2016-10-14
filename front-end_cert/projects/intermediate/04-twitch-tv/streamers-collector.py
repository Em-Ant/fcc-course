# Python 2.7.6
# Fetch Twitch streamers data from Twitch API v3
# for the FCC Twitch API zipline

import requests
import json
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("-c", "--clientid", help="Use Twitch.tv baseUrl. Add your Client-ID")
args = parser.parse_args()

print "\nTwitch API Streamers collector\nby EmAnt - 2016\n"

if args.clientid :
    url = "https://api.twitch.tv/kraken"
    headers = {
        'Accept' : 'application/vnd.twitchtv.v3+json',
        'Client-ID' :  args.clientid 
    }
else :
    url = "http://wind-bow.hyperdev.space/twitch-api"
    headers = {}

users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
"storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "test_channel"]
types = ['streams', 'channels', 'users']

jData = {}
print "Fetching data...\n"
for u in users :
    jData[u] ={}
    for t in types :
        dataUrl = "{0}/{1}/{2}".format(url,t,u)
        print dataUrl
        response = requests.get(dataUrl, headers=headers)
        jData[u][t] = json.loads(response.content)
print "\nFetching done ! \n"
print "Exporting to JSON..."
with open('streamers.json', 'w') as out_file:
    json.dump(jData, out_file, sort_keys=True, indent=2)
print "JSON done !\n"
