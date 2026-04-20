#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
source .env.local
export KIE_AI_API_KEY

OUT=renders
mkdir -p "$OUT"

BASE='A cartoon hamster character, chibi adult animation style. A small golden-brown hamster standing upright on hind legs wearing a tailored pinstripe suit and silk tie, half-moon reading glasses on his tiny nose. Dead-serious focused professional expression, deadpan, unshakably composed — the comedic contrast is that he is a tiny rodent with the demeanor of a Wall Street hedge fund manager. Style: thick black outlines, warm professional colors, highly detailed miniature props, cinematic lighting, endearing absurd tone, clearly the same character across images.'

declare -a SCENES=(
  "backroom|Mr Nibbles seated behind a hamster-sized executive desk in a dim smoky backroom, carefully counting towering stacks of real-size hundred dollar bills that dwarf him. A cigar smolders in a crystal ashtray, amber whiskey in a rocks glass, a brass banker lamp casting warm light. Scattered coins, a leather briefcase overflowing with cash, stock ticker tape on the floor. Serious focused expression as he counts with one tiny paw."
  "vault|Mr Nibbles standing on a mountain of hundred dollar bills inside a massive bank vault, gold bars stacked to the ceiling, a tiny whiteboard beside him covered in stock charts and ticker symbols (AAPL, NVDA, BTC). Dollar bills falling from above. His expression is calm, serious, professional — unimpressed by the wealth, already calculating the next trade."
  "tradingfloor|Mr Nibbles at a tiny trading desk surrounded by six glowing Bloomberg terminals showing green candlestick charts, crypto tickers, and P&L numbers. Neon purple and blue RGB lighting. Stacks of cash piled beside the keyboard, a red phone off the hook, coffee in a tiny espresso cup. Hamster wears pinstripe suit, one paw on a miniature laser pointer aimed at a chart spiking upward. Deadly serious expression."
  "cigar|Mr Nibbles in a leather wingback chair inside a dark mahogany cigar lounge, a lit cigar in one paw, a glass of single malt on the armrest. A briefcase open on the table next to him overflowing with banded stacks of hundreds and gold coins. Dim warm lighting, framed oil paintings, tufted leather, heavy drapes. His expression is calm, imperious, all-business."
  "rooftop|Mr Nibbles standing on the ledge of a rooftop overlooking a Wall Street skyline at golden hour, pinstripe suit tails flapping, holding a tiny briefcase in one paw and a whiteboard with an upward-trending chart in the other. Cash and dollar bills blowing in the wind around him. Bulls and bears silhouettes far below. Epic low angle, cinematic, stoic serious expression — a tiny rodent with the gravitas of a titan of finance."
)

NAMES=()
TIDS=()

echo "==> Creating tasks..."
for entry in "${SCENES[@]}"; do
  name="${entry%%|*}"
  scene="${entry#*|}"
  prompt="$BASE Scene: $scene"

  payload=$(jq -n \
    --arg model "nano-banana-2" \
    --arg prompt "$prompt" \
    '{model: $model, input: {prompt: $prompt, aspect_ratio: "16:9", resolution: "2K", output_format: "png"}}')

  resp=$(curl -s -X POST https://api.kie.ai/api/v1/jobs/createTask \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $KIE_AI_API_KEY" \
    -d "$payload")

  tid=$(echo "$resp" | jq -r '.data.taskId // empty')
  if [ -z "$tid" ]; then
    echo "FAILED to create $name: $resp"
    continue
  fi
  NAMES+=("$name")
  TIDS+=("$tid")
  echo "  $name -> $tid"
done

echo "==> Polling..."
for i in "${!NAMES[@]}"; do
  name="${NAMES[$i]}"
  tid="${TIDS[$i]}"
  while :; do
    r=$(curl -s "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=$tid" \
      -H "Authorization: Bearer $KIE_AI_API_KEY")
    state=$(echo "$r" | jq -r '.data.state // "unknown"')
    if [ "$state" = "success" ]; then
      url=$(echo "$r" | jq -r '.data.resultJson | fromjson | .resultUrls[0]')
      echo "  $name: DONE -> $url"
      curl -sSL -o "$OUT/$name.png" "$url"
      break
    elif [ "$state" = "fail" ]; then
      echo "  $name: FAIL -> $(echo "$r" | jq -c '.data')"
      break
    fi
    sleep 5
  done
done

echo "==> Done. Files:"
ls -lh "$OUT"
