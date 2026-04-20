#!/usr/bin/env bash
# Generates per-line earnings-call voiceover via KIE AI (ElevenLabs Eleven V3).
# Requires KIE_AI_API_KEY in .env.local.
# Output: public/audio/earnings/NN-slug.mp3

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ -f .env.local ]; then
  # shellcheck disable=SC1091
  set -a; . ./.env.local; set +a
fi

if [ -z "${KIE_AI_API_KEY:-}" ]; then
  echo "ERROR: KIE_AI_API_KEY not set. Add it to .env.local." >&2
  exit 1
fi

OUT="public/audio/earnings"
mkdir -p "$OUT"

# KIE AI ElevenLabs V3 voices (most expressive model)
V_OPERATOR="Daniel"  # deep, newscast-formal male — operator
V_DEBORAH="Sarah"    # crisp female executive — IR/compliance
V_MORGAN="Brian"     # deep narrator male — Morgan Stanley analyst
V_JPM="Adam"         # classic deep male — JPMorgan analyst
V_GOLDMAN="George"   # deep male — Goldman analyst

API="https://api.kie.ai"
MODEL="elevenlabs/text-to-dialogue-v3"

gen() {
  local idx="$1" voice="$2" speaker="$3" text="$4"
  local slug
  slug=$(printf '%s' "$speaker" | tr '[:upper:] ()/' 'a-z----' | sed 's/--*/-/g;s/^-//;s/-$//')
  local out
  out="$OUT/$(printf '%02d' "$idx")-${slug}.mp3"

  if [ -f "$out" ] && [ -s "$out" ]; then
    echo "[skip] $out"
    return
  fi
  echo "[gen ] $idx · $voice · $speaker"

  # 1) create task
  local body
  body=$(jq -n \
    --arg model "$MODEL" \
    --arg text "$text" \
    --arg voice "$voice" \
    '{
       model: $model,
       input: {
         dialogue: [ { text: $text, voice: $voice } ],
         stability: 0.5,
         language_code: "en"
       }
     }')

  local create_resp
  create_resp=$(curl -sS -X POST "$API/api/v1/jobs/createTask" \
    -H "Authorization: Bearer $KIE_AI_API_KEY" \
    -H "Content-Type: application/json" \
    --data "$body")

  local task_id
  task_id=$(printf '%s' "$create_resp" | jq -r '.data.taskId // empty')
  if [ -z "$task_id" ]; then
    echo "  FAILED to create task. Response: $create_resp" >&2
    exit 1
  fi
  echo "       taskId=$task_id"

  # 2) poll
  local state result_json url attempt=0 max_attempts=60
  while :; do
    sleep 3
    attempt=$((attempt + 1))
    local poll_resp
    poll_resp=$(curl -sS "$API/api/v1/jobs/recordInfo?taskId=$task_id" \
      -H "Authorization: Bearer $KIE_AI_API_KEY")
    state=$(printf '%s' "$poll_resp" | jq -r '.data.state // "unknown"')
    case "$state" in
      success)
        result_json=$(printf '%s' "$poll_resp" | jq -r '.data.resultJson // "{}"')
        url=$(printf '%s' "$result_json" | jq -r '.resultUrls[0] // empty')
        if [ -z "$url" ]; then
          echo "  FAILED: no resultUrls. Poll: $poll_resp" >&2
          exit 1
        fi
        echo "       url=$url"
        break
        ;;
      fail)
        echo "  FAILED: $poll_resp" >&2
        exit 1
        ;;
      waiting|queuing|generating)
        if [ "$attempt" -ge "$max_attempts" ]; then
          echo "  TIMEOUT after ${max_attempts} polls" >&2
          exit 1
        fi
        ;;
      *)
        echo "  unknown state=$state resp=$poll_resp" >&2
        ;;
    esac
  done

  # 3) download through weserv proxy (memory: tempfile.aiquickdraw.com TLS-resets
  #    from this sandbox; weserv.nl works)
  local host_path proxy_url
  host_path=$(printf '%s' "$url" | sed -E 's#^https?://##')
  proxy_url="https://images.weserv.nl/?url=$host_path"
  # For mp3 audio, weserv is image-only. Try direct first, fall back.
  if ! curl -fsSL --max-time 60 -o "$out" "$url"; then
    echo "  direct fetch failed, retrying once..." >&2
    sleep 2
    curl -fsSL --max-time 60 -o "$out" "$url"
  fi
  if [ ! -s "$out" ]; then
    echo "  download produced empty file" >&2
    rm -f "$out"
    exit 1
  fi
  echo "       wrote $out ($(wc -c <"$out") bytes)"
}

# idx, voice, speaker_tag, text
gen 0  "$V_OPERATOR" "operator" "Good afternoon. Welcome to the Nibbles Fund Q1 2026 earnings call. All participants are in listen-only mode. Today's call is being recorded."
gen 1  "$V_OPERATOR" "operator" "I will now turn the call over to Deborah."
gen 2  "$V_DEBORAH"  "deborah"  "Thank you, operator. Joining me today is Mr. Nibbles, Chief Investment Officer. Mr. Nibbles will not be speaking. He is observing."
gen 3  "$V_DEBORAH"  "deborah"  "Q1 was a quarter of expected outcomes. Seed one performed as disclosed. Seeds two through three performed within tolerance. Seeds four through seven performed, but the details are privileged."
gen 4  "$V_DEBORAH"  "deborah"  "Net net, the Fund is up. That is the presentation."
gen 5  "$V_OPERATOR" "operator" "We will now take questions."
gen 6  "$V_MORGAN"   "analyst-morgan-stanley" "Could you walk us through the decision to allocate eight percent to physical sunflower seeds?"
gen 7  "$V_DEBORAH"  "deborah"  "No."
gen 8  "$V_JPM"      "analyst-jpmorgan" "Does Mr. Nibbles have any comment on the Rat Coin situation?"
# line 9 is muted — intentionally no audio file
gen 10 "$V_DEBORAH"  "deborah"  "We will now take prepared remarks only."
gen 11 "$V_GOLDMAN"  "analyst-goldman" "Can you clarify the gate mechanism?"
gen 12 "$V_DEBORAH"  "deborah"  "The gate is at the Manager's discretion. The Manager has discretion."
gen 13 "$V_OPERATOR" "operator" "That concludes today's earnings call. Thank you for joining. A replay will not be available."

echo ""
echo "All audio generated. Files:"
ls -la "$OUT"
