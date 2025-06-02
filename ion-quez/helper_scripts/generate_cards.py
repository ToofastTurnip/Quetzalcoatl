import sys
import json
import re
from pathlib import Path

def highlight_mentions_and_hashtags(text):
    # Highlight @mentions and #hashtags, but leave @ for now
    def replacer(match):
        return f'<span style="color: #3880ff;">{match.group(0)}</span>'

    highlighted = re.sub(r'[@#][\w]+', replacer, text)
    # Now replace all @ with &#64;
    return highlighted.replace('@', '&#64;')

def generate_ion_card(entry):
    username = entry.get("username", "")
    date = entry.get("glyph_date", "")
    content = entry.get("glyph_content", "")
    highlighted_content = highlight_mentions_and_hashtags(content)

    return f"""  <ion-card>
    <ion-card-header>
      <ion-card-title>&#64;{username}</ion-card-title>
      <ion-card-subtitle>{date}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      {highlighted_content}
    </ion-card-content>
  </ion-card>"""

def main():
    if len(sys.argv) != 2:
        print("Usage: python generate_cards.py path/to/input.json")
        sys.exit(1)

    input_path = Path(sys.argv[1])
    if not input_path.is_file():
        print(f"Error: File '{input_path}' not found.")
        sys.exit(1)

    with open(input_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Sort by reverse order of "rune" so newest posts appear first
    data.sort(key=lambda x: x.get("rune", 0), reverse=True)

    cards = [generate_ion_card(entry) for entry in data]
    output = "\n".join(cards)

    output_path = input_path.with_suffix(".cards.txt")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(output)

    print(f"Generated ion-card components saved to: {output_path}")

if __name__ == "__main__":
    main()
