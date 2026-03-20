import os
import pypdf
from pathlib import Path

PDF_DIR = r"C:\Users\PC\Desktop\KenelmDigby"
OUTPUT_DIR = r"c:\Dev\digby-game\data\research_summaries"

def scan_pdfs():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
    
    pdf_files = list(Path(PDF_DIR).glob("*.pdf"))
    print(f"Found {len(pdf_files)} PDFs.")
    
    for pdf_path in pdf_files:
        try:
            print(f"Scanning: {pdf_path.name}")
            with open(pdf_path, "rb") as f:
                reader = pypdf.PdfReader(f)
                # Just get the first 2 pages for a summary
                text = ""
                for i in range(min(3, len(reader.pages))):
                    text += reader.pages[i].extract_text() + "\n"
                
                safe_name = pdf_path.stem.replace(" ", "_").replace(",", "")[:50]
                output_path = os.path.join(OUTPUT_DIR, f"{safe_name}.txt")
                
                with open(output_path, "w", encoding="utf-8") as out:
                    out.write(text)
        except Exception as e:
            print(f"Error scanning {pdf_path.name}: {e}")

if __name__ == "__main__":
    scan_pdfs()
