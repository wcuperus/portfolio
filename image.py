import os

# Pad naar de map met afbeeldingen
IMAGE_DIR = r"C:\Users\Gebruiker\Documents\GitHub\portfolio\afbeeldingen"

# Pad naar output JS-bestand
OUTPUT_JS = os.path.join(os.path.dirname(IMAGE_DIR), "images.js")

# Toegestane extensies
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}

def generate_image_list_js():
    images = []
    for filename in sorted(os.listdir(IMAGE_DIR)):
        if os.path.splitext(filename)[1].lower() in ALLOWED_EXTENSIONS:
            images.append(filename)

    # JS-bestand inhoud
    js_content = "const images = [\n"
    js_content += ",\n".join([f'  "{img}"' for img in images])
    js_content += "\n];\n"
    js_content += "// images.js automatisch gegenereerd door generate_images_js.py\n"

    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"✅ {len(images)} afbeeldingen toegevoegd aan {OUTPUT_JS}")

if __name__ == "__main__":
    if not os.path.exists(IMAGE_DIR):
        print(f"❌ Map niet gevonden: {IMAGE_DIR}")
    else:
        generate_image_list_js()
