#!/usr/bin/env bash
set -uo pipefail
cd "$(dirname "$0")"
source .env.local
OUT=public/images/timeline
mkdir -p "$OUT"

REF_URL="https://nibbles-fund.vercel.app/images/nibbles-arms-crossed.png"

BASE='Same golden-brown cartoon hamster character as the reference image — chibi adult animation style, thick black outlines, warm professional colors, dead-serious focused expression, deadpan, half-moon reading glasses perched on nose, small tailored pinstripe suit with burgundy silk tie. The character MUST look IDENTICAL to the provided reference — same face proportions, same fur color, same glasses, same suit. Cinematic storybook lighting. Nibbles Fund house style: warm cream + navy palette, painterly, hand-drawn feel.'

SCENES=(
  "origin-2021|16:9|2021 PetSmart store. A tiny Mr Nibbles in a small glass display cage on a retail shelf wearing his pinstripe suit, small price tag reading 14.99 dollars. A human hand (Craig, unseen except for arm) reaching in. Fluorescent store lighting, blurry pet aisle background with bags of pet food. Mr Nibbles looks unimpressed, already assessing the situation."
  "first-trade-2022|16:9|Late 2022, Craig's dim messy apartment at 3am. Mr Nibbles sitting atop a stack of books at a human-sized desk beside a Bloomberg terminal, a green candle chart on screen labeled SOL. Pizza box, empty beer cans, crumpled day-trading notes scattered. Mr Nibbles types on the keyboard with both paws, expressionless. A single lamp casts warm light."
  "hundred-k-2023|16:9|Q3 2023, a cramped studio apartment. Mr Nibbles standing on a desk unboxing a brand-new large whiteboard, the cardboard packaging half-open beside him. Caramel-brown female hamster Deborah in pencil skirt and pearl necklace stands beside him holding a clipboard, expression bored-approving. A monitor on the desk shows a portfolio balance of 100,034 dollars. Warm lamplight."
  "fund-founded-2024|16:9|January 2024, a small shoebox-converted office. Mr Nibbles and Deborah (caramel hamster, pearl necklace, bun) seated at a tiny dual-partner desk signing a stack of incorporation papers with miniature pens. A framed certificate labeled THE NIBBLES FUND LP hangs on the wall behind them. Craig (a frumpy human man in a bathrobe) hovers awkwardly in the doorway holding a coffee mug. Serious ceremonial mood."
  "outperformance-2024|16:9|Q2 2024, dawn. Mr Nibbles on a small rooftop overlooking the Manhattan skyline at sunrise, pinstripe suit, tiny coffee cup in paw, a miniature whiteboard propped beside him showing NIBBLES vs S&P line chart with Nibbles line far above. Golden hour light. His expression is stoic and pensive, not celebratory."
  "launch-2026|16:9|Q1 2026, launch day in the shoebox office. Mr Nibbles at his desk ringing a small brass bell with one paw. Deborah holding up a sign reading NIBBLES in block letters. A laptop on the desk displays a pump.fun token launch screen with a green live chart. Confetti falls, but Mr Nibbles does not react — same focused serious expression as always. Warm afternoon light through a window."
)

declare -a TASK_NAMES
declare -a TASK_IDS

echo "==> Creating ${#SCENES[@]} timeline tasks..."
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
  sleep 0.8
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
