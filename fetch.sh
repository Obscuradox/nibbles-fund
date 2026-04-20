#!/usr/bin/env bash
set -uo pipefail
cd "$(dirname "$0")"
source .env.local

OUT=renders
mkdir -p "$OUT"

NAMES=(backroom vault tradingfloor cigar rooftop)
TIDS=(fe8130a112cf15c16ae37e2034f35602 9eb05042efe3f8d49dcf628e28deda54 0e3fb828513e0c84fab97e6a8dac01cd edf4ffc36e1f02a4afa908fdebc217e3 69e91fddd5596e8390dc6a693afec4ca)

for i in "${!NAMES[@]}"; do
  name="${NAMES[$i]}"
  tid="${TIDS[$i]}"
  if [ -s "$OUT/$name.png" ]; then
    echo "  $name: already downloaded"
    continue
  fi
  while :; do
    r=$(curl -s "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=$tid" \
      -H "Authorization: Bearer $KIE_AI_API_KEY")
    state=$(echo "$r" | jq -r '.data.state // "unknown"')
    if [ "$state" = "success" ]; then
      url=$(echo "$r" | jq -r '.data.resultJson | fromjson | .resultUrls[0]')
      echo "  $name: DONE -> $url"
      for attempt in 1 2 3 4 5; do
        if curl -sSL --retry 3 --retry-delay 2 --max-time 120 -o "$OUT/$name.png" "$url" && [ -s "$OUT/$name.png" ]; then
          echo "    saved (attempt $attempt)"
          break
        else
          echo "    download attempt $attempt failed, retrying..."
          sleep 3
        fi
      done
      break
    elif [ "$state" = "fail" ]; then
      echo "  $name: FAIL -> $(echo "$r" | jq -c '.data')"
      break
    else
      echo "  $name: $state ..."
    fi
    sleep 5
  done
done

echo "==> Files:"
ls -lh "$OUT"
