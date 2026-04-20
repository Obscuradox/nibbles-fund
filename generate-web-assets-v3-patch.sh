#!/usr/bin/env bash
# Patch: 10 missing images — Craig, 5 advisors, 4 seed whiteboards
set -uo pipefail

cd "$(dirname "$0")"
source .env.local
export KIE_AI_API_KEY

OUT=public/images
mkdir -p "$OUT"

WHITE_BG='Pure flat #FFFFFF white background, no scene elements, no shadows, isolated subject centered in frame, chromakey-ready.'
NEG='Negative: no wide eyes, no modern flat digital style, no 3D render, no Pixar style, no hollow outline, no gradient background, no watermark, no extra limbs.'

declare -a ASSETS=(
  # Craig — rumpled 32yo human man (not a hamster). Portrait bust.
  "team-craig|1:1|1K|png|Portrait bust of a 32-year-old human man with messy brown hair, scruffy stubble, slightly confused expression, wearing a wrinkled grey t-shirt and an unbuttoned cardigan. Thick-rimmed glasses slightly askew. Looking off to the side as if unsure what is happening. Cartoon editorial illustration style with thick black outlines, warm professional colors, matching the Mr. Nibbles character sheet style. Tightly cropped on face and shoulders. ${WHITE_BG} ${NEG}"

  # Advisors — each with distinct fake-hedge-fund personality. Portrait bust format, editorial.
  "advisor-penelope|1:1|1K|png|Portrait bust of a 52-year-old British academic woman, silver streaked dark hair in neat bun, horn-rimmed reading glasses, wearing a tweed blazer with a silk blouse, small pearl earrings. Stern intelligent expression, one eyebrow slightly raised. Cartoon editorial illustration style with thick black outlines, warm professional colors, matching the Mr. Nibbles character sheet style, looks like she belongs in a portrait gallery at Oxford. ${WHITE_BG} ${NEG}"

  "advisor-reginald|1:1|1K|png|Portrait bust of an elderly 70-year-old aristocratic British gentleman, silver hair neatly combed, bushy grey eyebrows, neat silver moustache, monocle over his right eye, wearing a dark navy Saville Row three-piece suit with a crimson tie and white pocket square. Stern imperious expression, looking directly at the camera. Cartoon editorial illustration style with thick black outlines, warm professional colors, matching the Mr. Nibbles character sheet style, looks like an oil portrait in a gentlemen's club. ${WHITE_BG} ${NEG}"

  "advisor-margaret|1:1|1K|png|Portrait bust of a female academic hamster character, chibi adult animation style, matched to Mr. Nibbles character sheet. A small caramel-brown female hamster standing upright, wearing graduation academic robes with a burgundy hood and a black velvet cap with gold tassel, tiny round scholar glasses. Holding a rolled diploma in one paw. Confident dignified expression. Cartoon editorial style with thick black outlines, warm cream palette. ${WHITE_BG} ${NEG}"

  "advisor-anonymous|1:1|1K|png|A dramatic portrait of a human figure in complete silhouette against the white background — only the outline is visible as solid black shadow, no facial features, no details, just the distinct shape of a person in a suit with slicked-back hair. Mysterious negative space. A single white question mark glyph floats where the face would be. Cartoon editorial style. ${WHITE_BG} ${NEG}"

  "advisor-morgan|1:1|1K|png|An aged sepia-toned oil-painting-style portrait of a 19th century American industrialist resembling J. P. Morgan, stern older man with a bulbous red nose, heavy dark eyebrows, white mustache, wearing a formal black Victorian waistcoat and cravat. Cracked aged canvas texture visible. Cartoon editorial illustration style with thick black outlines, warm sepia tones. Frame of a gilded painting frame partially visible around the portrait. ${WHITE_BG} ${NEG}"

  # Seven Seeds whiteboards (hand-drawn marker style, each 4:3)
  "seed-2-nut|4:3|1K|png|Small white dry-erase whiteboard on wooden easel. Hand-drawn black marker illustration comparing a single sunflower seed on the left (green checkmark above it) to a walnut on the right (red X through it). Label at the top reads 'SEED II · NOT A NUT'. Clean simple marker style. ${WHITE_BG} ${NEG}"

  "seed-3-cage|4:3|1K|png|Small white dry-erase whiteboard on wooden easel. Hand-drawn black marker illustration showing a simple hamster cage with bars and its door hinged open. An arrow exits through the open door pointing outward toward a small candlestick chart drawn outside the cage. Label at the top reads 'SEED III · CAGE ≠ MARKET'. Clean marker style. ${WHITE_BG} ${NEG}"

  "seed-4-liquidity|4:3|1K|png|Small white dry-erase whiteboard on wooden easel. Hand-drawn black marker illustration of a large water droplet shape on the left with a question mark in it, an equal sign, and a bar chart on the right with a tall volume bar. Label at the top reads 'SEED IV · LIQUIDITY vs VOLUME'. Clean marker style. ${WHITE_BG} ${NEG}"

  "seed-5-patience|4:3|1K|png|Small white dry-erase whiteboard on wooden easel. Hand-drawn black marker illustration of a growing plant from a seed, three stages shown left to right: seed → sprout → flowering plant. A small hourglass is drawn above. Label at the top reads 'SEED V · PATIENCE COMPOUNDS'. Clean marker style. ${WHITE_BG} ${NEG}"

  "seed-6-rival|4:3|1K|png|Small white dry-erase whiteboard on wooden easel. Hand-drawn black marker illustration showing a simple silhouette of a rat with a red circle-with-slash drawn over it. Label at the top reads 'SEED VI · AVOID THE RAT'. Clean marker style. ${WHITE_BG} ${NEG}"
)

NAMES=()
TIDS=()
FMTS=()

echo "==> Submitting ${#ASSETS[@]} patch tasks..."
for entry in "${ASSETS[@]}"; do
  IFS='|' read -r name aspect res fmt prompt <<< "$entry"

  payload=$(jq -n \
    --arg model "nano-banana-2" \
    --arg prompt "$prompt" \
    --arg ar "$aspect" \
    --arg rs "$res" \
    --arg of "$fmt" \
    '{model: $model, input: {prompt: $prompt, aspect_ratio: $ar, resolution: $rs, output_format: $of}}')

  resp=$(curl -s -X POST https://api.kie.ai/api/v1/jobs/createTask \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $KIE_AI_API_KEY" \
    -d "$payload")

  tid=$(echo "$resp" | jq -r '.data.taskId // empty')
  if [ -z "$tid" ]; then
    echo "  FAILED $name: $resp"
    continue
  fi
  NAMES+=("$name")
  TIDS+=("$tid")
  FMTS+=("$fmt")
  echo "  $name -> $tid"
done

echo ""
echo "==> Polling..."
REMAINING=()
for i in "${!NAMES[@]}"; do REMAINING+=("$i"); done

while [ ${#REMAINING[@]} -gt 0 ]; do
  NEXT=()
  for i in "${REMAINING[@]}"; do
    name="${NAMES[$i]}"
    tid="${TIDS[$i]}"
    fmt="${FMTS[$i]}"
    [ -s "$OUT/$name.$fmt" ] && continue
    r=$(curl -s "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=$tid" \
      -H "Authorization: Bearer $KIE_AI_API_KEY")
    state=$(echo "$r" | jq -r '.data.state // "unknown"')
    if [ "$state" = "success" ]; then
      url=$(echo "$r" | jq -r '.data.resultJson | fromjson | .resultUrls[0]')
      proxy_url="https://images.weserv.nl/?url=${url#https://}&output=${fmt}"
      curl -sSL --retry 2 --retry-delay 2 --max-time 120 -o "$OUT/$name.$fmt" "$proxy_url"
      echo "  [$name] saved"
    elif [ "$state" = "fail" ]; then
      echo "  [$name] FAIL"
    else
      NEXT+=("$i")
    fi
  done
  REMAINING=("${NEXT[@]:-}")
  if [ ${#REMAINING[@]} -gt 0 ] 2>/dev/null && [ -n "${REMAINING[0]:-}" ]; then
    echo "  ...${#REMAINING[@]} still going"
    sleep 10
  else
    break
  fi
done

# Post-process alpha for the character/advisor/seed images
echo ""
echo "==> Post-processing alpha..."
python3 <<'PY'
from rembg import remove
from PIL import Image
names = [
    "team-craig",
    "advisor-penelope", "advisor-reginald", "advisor-margaret",
    "advisor-anonymous", "advisor-morgan",
    "seed-2-nut", "seed-3-cage", "seed-4-liquidity",
    "seed-5-patience", "seed-6-rival",
]
base = "/Users/samsin369/mrnibbles/public/images"
for n in names:
    p = f"{base}/{n}.png"
    try:
        img = Image.open(p)
        out = remove(img)
        out.save(p)
        print(f"alpha: {n}")
    except FileNotFoundError:
        print(f"skip: {n}")
PY

echo ""
echo "==> Done. Files:"
ls -lh "$OUT" | tail -30
