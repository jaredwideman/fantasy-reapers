navigate_to() {
    local url=$1
    curl -s -X POST -H 'Content-Type: application/json' -d '{"url":"'${url}'"}' ${BASE_URL}/url
}

find_element() {
    local property=$1
    local value=$2
    curl -s -X POST -H 'Content-Type: application/json' \
    -d '{"using":"'$property'", "value": "'$value'"}' ${BASE_URL}/element | jq -r '.value.ELEMENT'
}

send_keys() {
    local elementId=$1
    local value=$2
    curl -s -X POST -H 'Content-Type: application/json' \
    -d '{"value": ["'$value'"]}' ${BASE_URL}/element/${elementId}/value >/dev/null
}

click() {
    local elementId=$1
    curl -s -X POST -H 'Content-Type: application/json' \
    -d '{}' ${BASE_URL}/element/${elementId}/click | jq -r '.value.ELEMENT'
}

getSource() {
    curl -s -X GET -H 'Content-Type: application/json' \
    -d '{}' ${BASE_URL}/source | jq -r '.value'
}

echo -n "Moving old stats over..."
mv ./src/statistics/batting_stats.json ./src/statistics/batting_stats_less_one.json && \
mv ./src/statistics/batting_stats_extra.json ./src/statistics/batting_stats_extra_less_one.json && \
mv ./src/statistics/fielding_stats.json ./src/statistics/fielding_stats_less_one.json && \
mv ./src/statistics/pitching_stats.json ./src/statistics/pitching_stats_less_one.json && \
mv ./src/statistics/pitching_stats_extra.json ./src/statistics/pitching_stats_extra_less_one.json
echo " Done."


echo -n "Logging into gamechanger..."
chromedriver &
CHROME_DRIVER_PID=$!
SESSION_ID=$(curl -X POST -H 'Content-Type: application/json' -d '{"desiredCapabilities": { "browserName": "chrome" }}' http://localhost:9515/session | jq -r '.sessionId')
ROOT=http://localhost:9515
BASE_URL=${ROOT}/session/${SESSION_ID}
navigate_to 'https://gc.com/login?redirect=/welcome'
emailTextBox=$(find_element 'id' 'email')
send_keys $emailTextBox "ferdabaseball@gmail.com"
passwordTextBox=$(find_element 'id' 'login_password')
send_keys $passwordTextBox "rydell123"
submitButton=$(find_element 'id' 'login')
click $submitButton
echo " Done."


echo -n "Downloading fresh stats..."
navigate_to 'https://gc.com/stats/team/62702155c4a63df6dd0f8dea/?stats_requested=%5B%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22GP%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22PA%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22AB%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22H%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%221B%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%222B%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%223B%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22HR%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22RBI%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22R%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22HBP%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22ROE%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22FC%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22CI%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22BB%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22SO%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22AVG%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22OBP%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22SLG%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22OPS%22%7D%5D&qualifying_stat=%7B%22key%22%3A%22GP%22%2C%22category%22%3A%22offense%22%7D&game_filter=Qualified'
source=$(getSource)
echo $source | grep -o '{.*}' > ./src/statistics/batting_stats.json

navigate_to 'https://gc.com/stats/team/62702155c4a63df6dd0f8dea/?stats_requested=%5B%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22GP%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22PA%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22AB%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22PA%2FBB%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22BB%2FK%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22C%25%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22SOL%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22SB%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22CS%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22SB%25%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22PIK%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22GIDP%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22GITP%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22XBH%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22TB%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22AB%2FHR%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22BA%2FRISP%22%7D%2C%7B%22category%22%3A%22offense%22%2C%22key%22%3A%22SLG%22%7D%5D&qualifying_stat=%7B%22key%22%3A%22GP%22%2C%22category%22%3A%22offense%22%7D&game_filter=Qualified'
source=$(getSource)
echo $source | grep -o '{.*}' > ./src/statistics/batting_stats_extra.json

navigate_to 'https://gc.com/stats/team/62702155c4a63df6dd0f8dea/?stats_requested=%5B%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22TC%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22A%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22PO%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22E%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22DP%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22TP%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22FPCT%22%7D%5D&qualifying_stat=%7B%22key%22%3A%22GP%3AF%22%2C%22category%22%3A%22defense%22%7D&game_filter=Qualified'
source=$(getSource)
echo $source | grep -o '{.*}' > ./src/statistics/fielding_stats.json

navigate_to 'https://gc.com/stats/team/62702155c4a63df6dd0f8dea/?stats_requested=%5B%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22outs%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22GP%3AP%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22GS%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22W%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22L%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22SV%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22SVO%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22BS%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22SV%25%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22H%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22R%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22ER%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22BB%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22SO%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22HBP%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22ERA%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22WHIP%22%7D%5D&qualifying_stat=%7B%22key%22%3A%22GP%3AP%22%2C%22category%22%3A%22defense%22%7D&game_filter=Qualified'
source=$(getSource)
echo $source | grep -o '{.*}' > ./src/statistics/pitching_stats.json

navigate_to 'https://gc.com/stats/team/62702155c4a63df6dd0f8dea/?stats_requested=%5B%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22outs%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22LOB%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22BK%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22PIK%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22SB%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22CS%22%7D%2C%7B%22category%22%3A%22defense%22%2C%22key%22%3A%22SB%25%22%7D%5D&qualifying_stat=%7B%22key%22%3A%22GP%3AP%22%2C%22category%22%3A%22defense%22%7D&game_filter=Qualified'
source=$(getSource)
echo $source | grep -o '{.*}' > ./src/statistics/pitching_stats_extra.json

kill $CHROME_DRIVER_PID

echo " Done."


if [ "$1" == "deploy" ]; then
    echo -n "Deploying website to remote..."
    yarn deploy
echo " Done."
fi

echo "Script complete!"
