#!/usr/bin/env bash
set -uo pipefail
cd "$(dirname "$0")"
source .env.local
OUT=public/images/memes
mkdir -p "$OUT"

REF_URL="https://nibbles-fund.vercel.app/images/nibbles-arms-crossed.png"

BASE='Same golden-brown cartoon hamster character across all renders — chibi adult animation style, thick black outlines, warm professional colors, dead-serious focused expression, deadpan, half-moon reading glasses, pinstripe suit or appropriate variation. The character must look IDENTICAL to the provided reference image — same face proportions, same fur color, same glasses. Comedy comes from the absurd situation, never from his expression — he remains composed and unbothered no matter the chaos.'

# name|aspect|scene
SCENES=(
  "casino|16:9|Mr Nibbles standing on a craps table in a glittering casino pit, pushing a massive pile of chips forward with both paws, dealer (a confused stork in a vest) watching. Neon signs overhead read CASINO. Champagne spraying from the background, two cocktail waitresses (human, out of focus) reacting. Stoic unimpressed expression. Chaotic Vegas vibe."
  "yacht|16:9|Mr Nibbles at the wheel of a gigantic white megayacht, wearing a tiny captain's cap over his pinstripe suit, cigar between teeth, sunset behind. The yacht is absurdly oversized compared to him. Money floating in the water. Dolphins leaping."
  "lambo|16:9|Mr Nibbles standing on the hood of a bright purple Lamborghini parked in front of a miami mansion at night, palm trees, neon lights. Money raining from above, a tiny hamster-sized briefcase open at his feet spilling hundreds. He stares directly at the viewer, unimpressed."
  "gym|3:2|Mr Nibbles bench-pressing a solid gold bar in a grungy back-alley gym, pinstripe tank top, headband, veins popping, sweat, one eye closed with effort, spotter is a massive bodybuilder bull-terrier. Dumbbells made of coins scattered around."
  "congress|16:9|Mr Nibbles tiny but erect at a Senate hearing desk behind a microphone, surrounded by towering human senators in a wood-paneled chamber, cameras flashing. His whiteboard labeled EXHIBIT A is propped beside him with a rising chart. He looks unbothered and slightly annoyed."
  "sauna|3:2|Mr Nibbles sitting in a sauna wrapped in a tiny white towel, wearing only the towel and several gold chains plus his reading glasses, cigar still in his paw. Two briefcases open on the bench beside him overflowing with hundred dollar bills. Steam rising."
  "court|16:9|Mr Nibbles on a courtroom witness stand, one paw raised swearing an oath on a tiny Bloomberg terminal instead of a Bible, the other paw holding a whiteboard covered in charts labeled EXHIBIT A. A judge (human) visibly exasperated in the background. Gavel. Wood paneling."
  "ramen|3:2|Mr Nibbles slurping noodles from a styrofoam cup at a messy desk covered in empty energy drink cans and stacks of cash, 6 monitors around him showing green candles, an RGB gaming chair too big for him, pizza box on the floor. 4am vibe, serious expression mid-slurp."
  "redbull|16:9|Mr Nibbles at a sim-racing desk with 6 vertical monitors all green charts, two energy drink cans stacked, confetti falling, a price alert reading 100X going off. He looks stoic and unimpressed while everything around him is exploding with celebration."
  "jet|16:9|Mr Nibbles in a private jet cabin, a cream leather seat far too big for him, champagne bottle popping with spray going everywhere, a human flight attendant looking utterly confused. Dollar bills scattered across the floor. Out the window: clouds and a Lamborghini wing-mounted to the fuselage."
  "tattoo|3:2|Mr Nibbles lying on a tattoo bench getting a rising candlestick chart tattooed on his tiny bicep by a massive bearded human tattoo artist. The artist is concentrating, Mr Nibbles is stoic and unflinching, pinstripe suit half off. Tattoo gun buzzing. Tattoo parlor walls covered in flash art."
  "ipo|16:9|Mr Nibbles standing on a tiny wooden step behind a giant brass bell at a stock exchange opening, confetti everywhere, a crowd of human traders cheering. He rings the bell with a single deadpan paw. Giant ticker screen above reads NIBBLES +847.3%."
)

declare -a TASK_NAMES
declare -a TASK_IDS

echo "==> Creating $(echo ${#SCENES[@]}) tasks..."
for entry in "${SCENES[@]}"; do
  IFS='|' read -r name aspect scene <<< "$entry"
  prompt="$BASE Scene: $scene"

  payload=$(jq -n \
    --arg model "nano-banana-2" \
    --arg prompt "$prompt" \
    --arg ref "$REF_URL" \
    --arg aspect "$aspect" \
    '{model: $model, input: {prompt: $prompt, image_input: [$ref], aspect_ratio: $aspect, resolution: "2K", output_format: "png"}}')

  resp=$(curl -s -X POST https://api.kie.ai/api/v1/jobs/createTask \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $KIE_AI_API_KEY" \
    -d "$payload")

  tid=$(echo "$resp" | jq -r '.data.taskId // empty')
  if [ -z "$tid" ]; then
    echo "  FAIL $name: $resp"
    continue
  fi
  TASK_NAMES+=("$name")
  TASK_IDS+=("$tid")
  echo "  $name -> $tid"
  sleep 0.6
done

echo "==> Polling..."
for i in "${!TASK_NAMES[@]}"; do
  name="${TASK_NAMES[$i]}"
  tid="${TASK_IDS[$i]}"
  while :; do
    r=$(curl -s "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=$tid" \
      -H "Authorization: Bearer $KIE_AI_API_KEY")
    state=$(echo "$r" | jq -r '.data.state // "unknown"')
    if [ "$state" = "success" ]; then
      url=$(echo "$r" | jq -r '.data.resultJson | fromjson | .resultUrls[0]')
      host_path="${url#https://}"
      proxied="https://images.weserv.nl/?url=${host_path}&output=png"
      echo "  $name: DONE"
      curl -s --max-time 180 -o "$OUT/$name.png" "$proxied"
      break
    elif [ "$state" = "fail" ]; then
      echo "  $name: FAIL $(echo "$r" | jq -c '.data')"
      break
    fi
    sleep 5
  done
done

ls -lh "$OUT"
