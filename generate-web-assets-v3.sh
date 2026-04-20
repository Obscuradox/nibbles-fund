#!/usr/bin/env bash
# Mr. Nibbles web-asset v3 generator.
# Reference-chained character generation + rembg alpha post-processing.
set -uo pipefail

cd "$(dirname "$0")"
source .env.local
export KIE_AI_API_KEY

OUT=public/images
mkdir -p "$OUT"

# --- Character consistency lock ---
NIBBLES_BASE='A cartoon hamster character, chibi adult animation style. Small golden-brown hamster standing upright on hind legs wearing a tailored navy pinstripe three-piece suit, burgundy silk tie, gold pocket watch chain, half-moon reading glasses on his pink nose. Dead-serious focused professional expression, deadpan, unshakably composed. Style: thick black outlines, warm professional colors, cream and navy palette, highly detailed miniature props, editorial illustration quality.'

NEGATIVE='Negative: no wide eyes, no chibi mouse features, no grey fur, no red eyes, no modern flat digital style, no 3D render, no Pixar style, no Disney style, no hollow outline, no gradient background, no watermark, no extra limbs, no distorted proportions.'

DEBORAH_BASE='A cartoon female hamster character, chibi adult animation style, matched exactly to the Mr. Nibbles character sheet. Slightly smaller caramel-colored female hamster, standing upright, wearing a tailored charcoal-grey pencil-skirt suit with white blouse, small pearl necklace, tiny black-framed glasses, fur styled in neat elegant bun. Polite, coolly efficient expression. Style: thick black outlines, warm cream palette, editorial illustration quality.'

# Pure white background ALWAYS for isolates - rembg cleans them to true alpha
WHITE_BG='Pure flat #FFFFFF white background, no scene elements, no shadows, isolated subject centered in frame, chromakey-ready.'

# Entry format: name|aspect|resolution|format|needs_alpha|prompt
# needs_alpha=1 means post-process through rembg
declare -a ASSETS=(
  # --- A) Character cutouts (true alpha via rembg) ---
  "nibbles-hero-pointer|1:1|1K|png|1|${NIBBLES_BASE} Pose: full-body standing, 3/4 turn facing right, right paw extended horizontally to his right holding a miniature red laser pointer with red beam visible at paw tip. Left paw relaxed at side. Dignified posture, confident, looking ahead. Character fills about 70 percent of frame height, feet at bottom of frame. ${WHITE_BG} ${NEGATIVE}"
  "nibbles-arms-crossed|1:1|1K|png|1|${NIBBLES_BASE} Pose: full-body facing camera directly, arms crossed over chest, deadpan stare, one eyebrow subtly raised. Character fills about 70 percent of frame height. ${WHITE_BG} ${NEGATIVE}"
  "nibbles-thinking|1:1|1K|png|1|${NIBBLES_BASE} Pose: standing full-body, right paw on chin in thinking gesture, looking slightly upward and to the left in thought. ${WHITE_BG} ${NEGATIVE}"
  "nibbles-signing|1:1|1K|png|1|${NIBBLES_BASE} Pose: seated behind a tiny mahogany desk edge (desk only shows the front edge, no full desk), signing a document on the desk with a brass fountain pen in right paw, head tilted down slightly toward paper. ${WHITE_BG} ${NEGATIVE}"
  "nibbles-phone|1:1|1K|png|1|${NIBBLES_BASE} Pose: standing, holding a vintage red desk phone receiver to his right ear with right paw, serious focused expression as if taking an important call, left paw adjusting glasses. ${WHITE_BG} ${NEGATIVE}"
  "nibbles-newspaper|1:1|1K|png|1|${NIBBLES_BASE} Pose: standing, holding a tiny pink Financial-Times-style newspaper with both paws, newspaper lowered slightly so his glasses and top of head peek above the fold, deadpan expression. ${WHITE_BG} ${NEGATIVE}"
  "nibbles-walking|3:4|1K|png|1|${NIBBLES_BASE} Pose: mid-stride walking to the right in profile, tiny leather briefcase in left paw, suit tails slightly flared back from motion, determined expression. ${WHITE_BG} ${NEGATIVE}"
  "nibbles-unimpressed|1:1|1K|png|1|${NIBBLES_BASE} Pose: bust composition (shoulders-up), staring directly at camera with classic deadpan expression, one eyebrow clearly raised higher than the other, mouth pressed flat. ${WHITE_BG} ${NEGATIVE}"
  "nibbles-stamping|1:1|1K|png|1|${NIBBLES_BASE} Pose: leaning slightly forward over a desk edge (only showing front edge of desk), right paw slamming down a red ink approval stamp onto a document, motion blur on the arm suggesting force. Serious authoritative expression. ${WHITE_BG} ${NEGATIVE}"
  "nibbles-peeking|1:1|1K|png|1|${NIBBLES_BASE} Pose: only the right half of his head and one paw visible, as if peeking out from behind the right edge of the frame. Just one eye, glasses, ear, and fingertips visible. ${WHITE_BG} ${NEGATIVE}"

  # --- B) Deborah cutouts (true alpha) ---
  "deborah-clipboard|1:1|1K|png|1|${DEBORAH_BASE} Pose: full-body facing camera, clipboard in left paw held up at chest level, fountain pen in right paw poised to write, eyebrow politely raised. ${WHITE_BG} ${NEGATIVE}"
  "deborah-pointing|1:1|1K|png|1|${DEBORAH_BASE} Pose: full-body, gesturing authoritatively off-frame to the right with right paw index finger extended, left paw holding a manila folder at her side, calm professional expression. ${WHITE_BG} ${NEGATIVE}"

  # --- C) Whiteboard illustrations (true alpha) ---
  "whiteboard-bullflag|4:3|1K|png|1|Tall white dry-erase whiteboard mounted on a dark wooden tripod easel, the whiteboard shows a hand-drawn black marker candlestick chart with about 12 candles forming a bull flag pattern breaking upward, handwritten annotations reading BULL FLAG and BREAKOUT CONFIRMED and a small upward arrow. Clean simple marker style. ${WHITE_BG} ${NEGATIVE}"
  "whiteboard-seedtheory|4:3|1K|png|1|Tall white dry-erase whiteboard on wooden easel. On the whiteboard, a hand-drawn flow diagram titled THE SEVEN SEEDS at the top, showing seven numbered nodes labeled I through VII connected by arrows in a circular/flower pattern. Each node has a simple icon beside it. Hand-drawn black marker style, clean. ${WHITE_BG} ${NEGATIVE}"
  "whiteboard-portfolio|4:3|1K|png|1|Tall white dry-erase whiteboard on wooden easel. Hand-drawn pie chart with slices labeled SOL 34 percent, BTC 18 percent, NIBBLES 12 percent, SEEDS 8 percent, CASH 28 percent. Hand-drawn black marker style with slice colors indicated by parallel hatch lines. ${WHITE_BG} ${NEGATIVE}"
  "whiteboard-buy|1:1|1K|png|1|Small white dry-erase whiteboard on a small easel, the whiteboard has a single word BUY written in large bold hand-drawn black marker letters, underlined twice for emphasis. ${WHITE_BG} ${NEGATIVE}"

  # --- D) Scene backgrounds (JPG, no alpha needed) ---
  "bg-boardroom|21:9|2K|jpg|0|Cinematic photograph of an empty dimly lit mahogany boardroom interior, long polished conference table, brown leather wingback chairs around it, ornate brass chandelier overhead, oil portraits in gilt frames on walls, heavy burgundy drapes, no people, cinematic low-key warm lighting, Citadel or Bridgewater corporate gravitas feel, deep navy and mahogany and brass palette, ambient atmospheric. ${NEGATIVE}"
  "bg-terminal-wall|21:9|2K|jpg|0|Cinematic photograph of a wall of Bloomberg terminal monitors, multiple screens glowing with green candlestick charts, blue ticker data, purple P&L readouts, very dark unlit room, subtle purple and blue ambient glow from the screens, no people, atmospheric, tight tight composition of just the screen wall. ${NEGATIVE}"
  "bg-ledger-parchment|16:9|1K|jpg|0|Aged cream parchment paper with faded handwritten ledger entries in brown ink, occasional wax seal marks, tea-stain edges, low contrast subtle texture, flat lay top down, no characters, no modern elements, historical document aesthetic. ${NEGATIVE}"
  "bg-safe-door|16:9|2K|jpg|0|Massive gleaming brass bank vault door partially open, thick round door with radial handle spokes, warm light spilling through the gap from inside the vault, no people, no dollar bills visible, deep navy and gold ambient atmosphere, luxurious serious tone. ${NEGATIVE}"

  # --- E) Decorative props (true alpha) ---
  "prop-stamp-approved|1:1|1K|png|1|A red ink rubber-stamp impression on cream paper reading APPROVED · M. NIBBLES with a tiny paw-print icon beside the text, stamp slightly tilted at a diagonal angle, ink slightly smudged at the edges for authentic rubber-stamp look. ${WHITE_BG} ${NEGATIVE}"
  "prop-wax-seal|1:1|1K|png|1|A deep burgundy wax seal pressed with a hamster paw-print impression on cream parchment paper, hardened bead of wax with visible texture and slight drip, close-up view. ${WHITE_BG} ${NEGATIVE}"
  "prop-fountain-pen|4:3|1K|png|1|A brass-and-black fountain pen resting diagonally on cream paper with nib down, a tiny drop of black ink beside the nib, elegant editorial still-life. ${WHITE_BG} ${NEGATIVE}"
  "prop-ledger-open|4:3|1K|png|1|An open leather-bound ledger book with cream pages, handwritten columnar entries in brown ink, a ribbon bookmark in the gutter, a small brass dish of sunflower seeds beside it. Top-down flat lay. ${WHITE_BG} ${NEGATIVE}"
)

NAMES=()
TIDS=()
ALPHA_FLAGS=()
FMTS=()

echo "==> Submitting ${#ASSETS[@]} tasks to KIE AI..."
REFERENCE_URL=""

for i in "${!ASSETS[@]}"; do
  entry="${ASSETS[$i]}"
  IFS='|' read -r name aspect res fmt alpha prompt <<< "$entry"

  # Build payload. After first asset (reference), include image_input for character shots to lock consistency
  if [ "$i" -gt 0 ] && [ "$alpha" = "1" ] && [[ "$name" == nibbles-* ]] && [ -n "$REFERENCE_URL" ]; then
    payload=$(jq -n \
      --arg model "nano-banana-2" \
      --arg prompt "$prompt" \
      --arg ar "$aspect" \
      --arg rs "$res" \
      --arg of "$fmt" \
      --arg ref "$REFERENCE_URL" \
      '{model: $model, input: {prompt: $prompt, aspect_ratio: $ar, resolution: $rs, output_format: $of, image_input: [$ref]}}')
  else
    payload=$(jq -n \
      --arg model "nano-banana-2" \
      --arg prompt "$prompt" \
      --arg ar "$aspect" \
      --arg rs "$res" \
      --arg of "$fmt" \
      '{model: $model, input: {prompt: $prompt, aspect_ratio: $ar, resolution: $rs, output_format: $of}}')
  fi

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
  ALPHA_FLAGS+=("$alpha")
  FMTS+=("$fmt")
  echo "  [$i] $name [$aspect $res $fmt alpha=$alpha] -> $tid"

  # For the FIRST character (reference), wait for it to finish before continuing
  # so we can use its result URL as image_input for subsequent character shots
  if [ "$i" -eq 0 ]; then
    echo "  ...waiting for reference to complete before chaining..."
    while :; do
      r=$(curl -s "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=$tid" \
        -H "Authorization: Bearer $KIE_AI_API_KEY")
      state=$(echo "$r" | jq -r '.data.state // "unknown"')
      if [ "$state" = "success" ]; then
        REFERENCE_URL=$(echo "$r" | jq -r '.data.resultJson | fromjson | .resultUrls[0]')
        echo "  reference ready: $REFERENCE_URL"
        break
      elif [ "$state" = "fail" ]; then
        echo "  reference FAILED: $(echo "$r" | jq -c '.data')"
        break
      fi
      sleep 6
    done
  fi
done

echo ""
echo "==> Polling remaining tasks..."
REMAINING=()
for i in "${!NAMES[@]}"; do REMAINING+=("$i"); done

while [ ${#REMAINING[@]} -gt 0 ]; do
  NEXT_REMAINING=()
  for i in "${REMAINING[@]}"; do
    name="${NAMES[$i]}"
    tid="${TIDS[$i]}"
    alpha="${ALPHA_FLAGS[$i]}"
    fmt="${FMTS[$i]}"

    # Skip if file already saved
    if [ -s "$OUT/$name.$fmt" ]; then continue; fi

    r=$(curl -s "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=$tid" \
      -H "Authorization: Bearer $KIE_AI_API_KEY")
    state=$(echo "$r" | jq -r '.data.state // "unknown"')
    if [ "$state" = "success" ]; then
      url=$(echo "$r" | jq -r '.data.resultJson | fromjson | .resultUrls[0]')
      echo "  [$name] DONE -> $url"
      proxy_host="${url#https://}"
      proxy_url="https://images.weserv.nl/?url=${proxy_host}&output=${fmt}"
      saved=0
      for attempt in 1 2 3; do
        if curl -sSL --retry 2 --retry-delay 2 --max-time 120 -o "$OUT/$name.$fmt" "$proxy_url" && [ -s "$OUT/$name.$fmt" ]; then
          echo "    saved: $OUT/$name.$fmt"
          saved=1
          break
        fi
        sleep 2
      done
      if [ "$saved" = "1" ] && [ "$alpha" = "1" ]; then
        # Post-process through rembg for true alpha
        echo "    alpha processing via rembg..."
        if python3 -m rembg i "$OUT/$name.$fmt" "$OUT/${name}_alpha.$fmt" 2>/dev/null; then
          mv "$OUT/${name}_alpha.$fmt" "$OUT/$name.$fmt"
          echo "    alpha applied: $OUT/$name.$fmt"
        else
          echo "    WARN: rembg failed, keeping white-bg version"
        fi
      fi
    elif [ "$state" = "fail" ]; then
      echo "  [$name] FAIL: $(echo "$r" | jq -c '.data')"
    else
      NEXT_REMAINING+=("$i")
    fi
  done
  REMAINING=("${NEXT_REMAINING[@]:-}")
  if [ ${#REMAINING[@]} -gt 0 ] 2>/dev/null && [ -n "${REMAINING[0]:-}" ]; then
    echo "  ...${#REMAINING[@]} generating, sleep 10s"
    sleep 10
  else
    break
  fi
done

echo ""
echo "==> Done. Files:"
ls -lh "$OUT"
