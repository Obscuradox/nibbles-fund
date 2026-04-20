#!/usr/bin/env bash
# Mr. Nibbles web-asset batch generator (KIE AI Nano Banana 2)
# Generates 20 assets and downloads via images.weserv.nl proxy.
set -uo pipefail

cd "$(dirname "$0")"
source .env.local
export KIE_AI_API_KEY

OUT=public/images
mkdir -p "$OUT"

# --- Character consistency lock (prepended to every NIBBLES_* scene) ---
NIBBLES_BASE='A cartoon hamster character, chibi adult animation style. Small golden-brown hamster standing upright on hind legs wearing a tailored navy pinstripe three-piece suit, burgundy silk tie, gold pocket watch chain, half-moon reading glasses on his pink nose. Dead-serious focused professional expression, deadpan, unshakably composed. Style: thick black outlines, warm professional colors, cream and navy palette, highly detailed miniature props, editorial illustration quality, clearly the same character across every image.'

# Shared style suffix for non-character assets (seeds, dividers, textures)
EDITORIAL_STYLE='Style: editorial illustration, thick black outlines, warm cream and navy palette, minimal, clean lines. No text unless specified.'

# Entry format: name|aspect|resolution|format|prompt
# Heroes at 2K, rest at 1K. Transparent PNG where bg should drop out.
declare -a ASSETS=(
  # --- Hero ---
  "hero-desk|16:9|2K|jpg|${NIBBLES_BASE} Scene: Mr. Nibbles at a tiny mahogany executive desk, 3/4 angle positioned on the right side of frame, whiteboard behind him covered in accurate candlestick charts and handwritten annotations, a bowl of sunflower seeds on the desk, brass banker lamp with warm glow, floor-to-ceiling finance bookshelves softly out of focus in the background. CRITICAL COMPOSITION: The entire LEFT 40 PERCENT of the frame must be intentionally empty cream-colored background with nothing in it, for headline text overlay. Cinematic warm golden-hour window light from the right."

  # --- Team portraits (1:1) ---
  "team-nibbles|1:1|1K|png|${NIBBLES_BASE} Scene: Formal portrait bust of Mr. Nibbles centered on a neutral cream background, soft studio lighting, facing slightly left, one tiny paw adjusting his half-moon reading glasses. Editorial portrait treatment like a real fund website headshot. Clean, dignified, no extra props."

  "team-deborah|1:1|1K|png|A cartoon hamster character, chibi adult animation style, matched exactly to the Mr. Nibbles character sheet. A slightly smaller caramel-colored female hamster, standing upright. Wearing a tailored charcoal-grey pencil-skirt suit with a white blouse, small pearl necklace, tiny black-framed glasses. Fur styled in a neat elegant bun. Holds a small clipboard in one paw, a miniature fountain pen in the other. Expression: polite, coolly efficient, one eyebrow subtly raised. Centered portrait bust on a cream background, soft studio lighting. ${EDITORIAL_STYLE}"

  "team-craig|1:1|1K|png|A human 32-year-old man in a rumpled grey t-shirt and unbuttoned cardigan, scruffy stubble, thick-rimmed glasses askew, slightly confused expression. Shown from a three-quarter back angle, partially out of focus, positioned in the middle ground of a cluttered apartment with Bloomberg terminal glow in the background. Deliberately unflattering fluorescent lighting. He looks oblivious. The whole framing feels like a candid security-camera still of a man who does not know a hamster is running his life. ${EDITORIAL_STYLE}"

  # --- Seeds (1:1 whiteboard illustrations, no Nibbles) ---
  "seed-1-wheel|1:1|1K|png|Miniature whiteboard on a small wooden easel, hand-drawn black-marker illustration of a hamster running wheel with a stylized upward-trending arrow curving out of its top, plus tiny handwritten annotation 'SEED I'. Plain cream paper background around the whiteboard, soft top lighting. ${EDITORIAL_STYLE}"

  "seed-2-seed|1:1|1K|png|Miniature whiteboard on a small wooden easel, hand-drawn black-marker illustration showing a single sunflower seed with a green checkmark next to it, and a walnut with a red X through it. Annotation 'SEED II'. Plain cream paper background. ${EDITORIAL_STYLE}"

  "seed-3-cage|1:1|1K|png|Miniature whiteboard on a small wooden easel, hand-drawn black-marker illustration of an open hamster cage door with an arrow exiting through the bars toward a small candlestick chart. Annotation 'SEED III'. Plain cream paper background. ${EDITORIAL_STYLE}"

  # --- Letter signature decoration (4:3) ---
  "letter-signature|4:3|1K|png|Flat-lay top-down view of a cream parchment letter with an elegant cursive signature reading 'M. Nibbles', a miniature brass fountain pen resting on the paper beside it, and a tiny deep-red wax seal next to the signature stamped with a hamster paw print. Warm soft lamp light from the upper left, shallow shadow. ${EDITORIAL_STYLE}"

  # --- Performance background (16:9, ledger texture) ---
  "performance-bg|16:9|1K|jpg|Subtle aged ledger-book grid texture, cream-to-parchment tone, very low contrast faint pencil ruling lines, small random ink smudges, no foreground subject. Will sit behind chart/text overlay. Abstract, quiet, tasteful. No text."

  # --- How-to-Join step vignettes (1:1) ---
  "step-1-wallet|1:1|1K|png|${NIBBLES_BASE} Scene: Mr. Nibbles standing beside a tiny open leather briefcase that sits next to a modern smartphone showing a generic wallet-app silhouette icon. He is reaching toward the phone with one paw, expression analytical. Isolated on a plain cream background, soft top lighting. ${EDITORIAL_STYLE}"

  "step-2-fund|1:1|1K|png|${NIBBLES_BASE} Scene: Mr. Nibbles standing with paws clasped behind his back beside a small stack of banded hundred-dollar bills and a single glowing gold-leaf Solana SOL coin rendered with the Solana diamond-shaped logo. He approves with a subtle nod. Isolated on a plain cream background, soft top lighting. ${EDITORIAL_STYLE}"

  "step-3-buy|1:1|1K|png|${NIBBLES_BASE} Scene: Mr. Nibbles pointing a miniature red laser pointer at a small whiteboard that reads simply 'BUY' in bold hand-drawn black marker letters. One paw raised in emphasis. Isolated on a plain cream background, soft top lighting. ${EDITORIAL_STYLE}"

  # --- Press card mastheads (4:3) ---
  "press-hsj|4:3|1K|png|Antique newspaper nameplate typeset reading 'THE HAMSTER STREET JOURNAL' in bold faux-WSJ style serif lettering, centered on a slightly yellowed aged newsprint texture background with faint ink-bleed edges. Tight centered composition. NO other imagery, NO additional text."

  "press-rwf|4:3|1K|png|Aged finance magazine masthead reading 'RODENT WEEKLY FINANCE' in bold condensed serif capitals, with smaller subtitle 'EST. MMXXIV' below it, set on a cream newsprint paper background with subtle scan texture. NO other imagery, NO additional text."

  "press-forbes|4:3|1K|png|Bold red ink rubber-stamp style mark reading 'FORBES (fake)' on a cream paper background with slight stamp ink-smudge imperfection. NO other imagery."

  # --- Dividers (8:1 horizontal ornaments) ---
  "divider-seeds|8:1|1K|png|Single elegant editorial line-art illustration of a sunflower seed in brass-gold color, centered horizontally, extremely thin decorative flourishes extending to both sides like a typographic ornament. Transparent background, minimal, no text."

  "divider-chart|8:1|1K|png|Tiny line-art candlestick chart fragment of three to four candles in brass-gold color with extending thin horizontal rule lines on either side, typographic ornament style. Transparent background, minimal."

  "divider-whiteboard|8:1|1K|png|Miniature whiteboard sketch with a simple upward arrow in brass-gold line art, centered, with thin extending rule lines on both sides, typographic ornament style. Transparent background, minimal."

  # --- Brand / social ---
  "logo-pfp|1:1|1K|png|${NIBBLES_BASE} Scene: Perfect circular social-media profile portrait of Mr. Nibbles, head and upper shoulders only, centered, looking directly at the camera with stoic dignity. Cream circular background. A 2-pixel gold ring border encircles the portrait."

  "og-image|16:9|2K|jpg|${NIBBLES_BASE} Scene: Hero shot of Mr. Nibbles at his desk positioned in the RIGHT 60 PERCENT of frame, the LEFT 40 PERCENT must be completely empty cream background for overlay text 'THE NIBBLES FUND'. Cinematic warm light. Composition matches the main website hero. High quality social share image (1200x630 effective)."
)

NAMES=()
TIDS=()

echo "==> Submitting ${#ASSETS[@]} tasks to KIE AI..."
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
    echo "  FAILED to create $name: $resp"
    continue
  fi
  NAMES+=("$name")
  TIDS+=("$tid")
  echo "  $name [$aspect $res $fmt] -> $tid"
done

echo ""
echo "==> Polling all tasks (checking every 10s)..."
REMAINING=(${!NAMES[@]})
SAVED_URLS=()
while [ ${#REMAINING[@]} -gt 0 ]; do
  NEXT_REMAINING=()
  for i in "${REMAINING[@]}"; do
    name="${NAMES[$i]}"
    tid="${TIDS[$i]}"
    IFS='|' read -r _ _ _ fmt _ <<< "${ASSETS[$i]}"
    r=$(curl -s "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=$tid" \
      -H "Authorization: Bearer $KIE_AI_API_KEY")
    state=$(echo "$r" | jq -r '.data.state // "unknown"')
    if [ "$state" = "success" ]; then
      url=$(echo "$r" | jq -r '.data.resultJson | fromjson | .resultUrls[0]')
      echo "  [$name] DONE -> $url"
      # Proxy download via weserv.nl (strip https://)
      proxy_host="${url#https://}"
      proxy_url="https://images.weserv.nl/?url=${proxy_host}&output=${fmt}"
      for attempt in 1 2 3; do
        if curl -sSL --retry 2 --retry-delay 2 --max-time 120 -o "$OUT/$name.$fmt" "$proxy_url" && [ -s "$OUT/$name.$fmt" ]; then
          echo "    saved: $OUT/$name.$fmt (attempt $attempt)"
          SAVED_URLS+=("$name=$url")
          break
        else
          echo "    attempt $attempt failed, retrying..."
          sleep 2
        fi
      done
    elif [ "$state" = "fail" ]; then
      echo "  [$name] FAIL -> $(echo "$r" | jq -c '.data')"
    else
      NEXT_REMAINING+=("$i")
    fi
  done
  REMAINING=("${NEXT_REMAINING[@]}")
  if [ ${#REMAINING[@]} -gt 0 ]; then
    echo "  ...${#REMAINING[@]} still generating, sleeping 10s"
    sleep 10
  fi
done

echo ""
echo "==> All done. Files in $OUT:"
ls -lh "$OUT"

# Write a manifest for debugging
printf '%s\n' "${SAVED_URLS[@]}" > "$OUT/_manifest.txt"
